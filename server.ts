import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  claimInitialAdminPasscode,
  getAdminAuthStatus,
  issueAdminToken,
  verifyAdminBearerToken,
  verifyAdminPasscode,
} from './server/auth.ts';
import { calculateSolarEstimate, type PropertyCategory, type ConsumerCategory } from './server/calculator.ts';
import { buildRobotsTxt, buildSeoHeadMarkup, buildSitemapXml, resolveRouteSeo } from './server/seo.ts';
import {
  createEnquiry,
  deleteEnquiry,
  exportEnquiriesToCsv,
  forwardEnquiryWebhook,
  listEnquiries,
  updateEnquiry,
} from './server/store.ts';

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const ROOT_DIR = process.cwd();

function getBaseUrl(req: Request): string {
  const configured = (process.env.APP_URL || '').trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/$/, '');
  }
  const protoHeader = (req.headers['x-forwarded-proto'] as string | undefined)?.split(',')[0]?.trim();
  const proto = protoHeader || req.protocol || 'http';
  const host = (req.headers['x-forwarded-host'] as string | undefined)?.split(',')[0]?.trim() || req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

// Lightweight in-memory rate limiter for public enquiry & auth endpoints
function createRateLimiter(windowMs: number, maxRequests: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const ip =
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const now = Date.now();
    const record = hits.get(ip);
    if (!record || record.resetAt < now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (record.count >= maxRequests) {
      res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
      return;
    }
    record.count += 1;
    next();
  };
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  if (!verifyAdminBearerToken(req.headers.authorization)) {
    res.status(401).json({ error: 'Admin sign-in required.' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  // Baseline security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Dynamic SEO endpoints
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain; charset=utf-8').send(buildRobotsTxt(getBaseUrl(req)));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml; charset=utf-8').send(buildSitemapXml(getBaseUrl(req)));
  });

  app.get('/site.webmanifest', (_req, res) => {
    res.type('application/manifest+json; charset=utf-8').json({
      name: 'Riseion Solar',
      short_name: 'Riseion Solar',
      start_url: '/gu',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0c2a52',
      icons: [
        { src: '/assets/aistudio/favicon-192_ac30b54b.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/aistudio/favicon-512_ec9b5542.png', sizes: '512x512', type: 'image/png' },
      ],
    });
  });

  // Public API: health
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'riseion-solar-backend', timestamp: new Date().toISOString() });
  });

  // Public API: Solar & 2.18 kWp Gujarat Subsidy Calculator
  app.post('/api/calculate', (req, res) => {
    try {
      const body = req.body ?? {};
      const propertyType: PropertyCategory =
        body.propertyType === 'commercial' || body.propertyType === 'industrial'
          ? body.propertyType
          : 'residential';
      const consumerCategory: ConsumerCategory = body.consumerCategory === 'sc_st' ? 'sc_st' : 'general';

      const result = calculateSolarEstimate({
        propertyType,
        consumerCategory,
        monthlyBill: body.monthlyBill !== undefined ? Number(body.monthlyBill) : undefined,
        monthlyUnits: body.monthlyUnits !== undefined ? Number(body.monthlyUnits) : undefined,
        tariff: body.tariff !== undefined ? Number(body.tariff) : undefined,
        roofAreaSqft: body.roofAreaSqft !== undefined ? Number(body.roofAreaSqft) : undefined,
        panelWatt: body.panelWatt !== undefined ? Number(body.panelWatt) : undefined,
      });
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Invalid calculation input.' });
    }
  });

  // Public API: Submit Solar Enquiry (with honeypot + rate limit + local persistence + optional webhook)
  const enquiryLimiter = createRateLimiter(15 * 60 * 1000, 12);
  app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
    try {
      const body = req.body ?? {};
      // Honeypot check: silently accept bots without storing spam
      if (typeof body.website === 'string' && body.website.trim().length > 0) {
        res.status(201).json({ ok: true, id: 'RS-ACCEPTED' });
        return;
      }

      const saved = createEnquiry({
        name: body.name,
        mobile: body.mobile,
        address: body.address,
        cityArea: body.cityArea,
        projectType: body.projectType,
        monthlyBill: body.monthlyBill,
        estimatedKw: body.estimatedKw,
        message: body.message,
        language: body.language,
        sourcePage: body.sourcePage,
        utmSource: body.utmSource,
        utmCampaign: body.utmCampaign,
      });

      void forwardEnquiryWebhook(saved);

      const waSummary = [
        `New Solar Enquiry (${saved.id})`,
        `Name: ${saved.name}`,
        `Mobile: ${saved.mobile}`,
        `Area: ${saved.cityArea}`,
        `Address: ${saved.address}`,
        `Type: ${saved.projectType}`,
        saved.monthlyBill ? `Monthly Bill: Rs ${saved.monthlyBill}` : '',
        saved.estimatedKw ? `Estimated Size: ${saved.estimatedKw} kW` : '',
        saved.message ? `Message: ${saved.message}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      res.status(201).json({
        ok: true,
        id: saved.id,
        createdAt: saved.createdAt,
        whatsappUrl: `https://wa.me/917567776876?text=${encodeURIComponent(waSummary)}`,
      });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : 'Could not save enquiry.' });
    }
  });

  // Public API: Live SEO Inspector preview for /seo-hub
  app.get('/api/seo/preview', (req, res) => {
    const baseUrl = getBaseUrl(req);
    const sampleRoutes = ['/gu', '/en', '/hi', '/gu/subsidy-patan', '/en/subsidy-patan', '/gu/calculator', '/gu/privacy-policy'];
    res.json({
      baseUrl,
      robotsUrl: `${baseUrl}/robots.txt`,
      sitemapUrl: `${baseUrl}/sitemap.xml`,
      routes: sampleRoutes.map((routePath) => resolveRouteSeo(routePath)),
    });
  });

  // Admin Auth API
  const authLimiter = createRateLimiter(15 * 60 * 1000, 20);
  app.get('/api/admin/status', (_req, res) => {
    res.json(getAdminAuthStatus());
  });

  app.post('/api/admin/setup', authLimiter, (req, res) => {
    const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode : '';
    const result = claimInitialAdminPasscode(passcode);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
    const session = issueAdminToken();
    res.status(201).json({ ok: true, ...session });
  });

  app.post('/api/admin/login', authLimiter, (req, res) => {
    const passcode = typeof req.body?.passcode === 'string' ? req.body.passcode : '';
    if (!verifyAdminPasscode(passcode)) {
      res.status(401).json({ error: 'Invalid passcode.' });
      return;
    }
    const session = issueAdminToken();
    res.json({ ok: true, ...session });
  });

  // Protected Admin Lead Inbox API
  app.get('/api/admin/enquiries', requireAdminAuth, (req, res) => {
    const status = typeof req.query.status === 'string' ? req.query.status : 'all';
    const search = typeof req.query.search === 'string' ? req.query.search : '';
    const enquiries = listEnquiries({ status, search });
    res.json({ enquiries, total: enquiries.length });
  });

  app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req, res) => {
    const updated = updateEnquiry(req.params.id, {
      status: typeof req.body?.status === 'string' ? req.body.status : undefined,
      notes: typeof req.body?.notes === 'string' ? req.body.notes : undefined,
    });
    if (!updated) {
      res.status(404).json({ error: 'Enquiry not found.' });
      return;
    }
    res.json({ enquiry: updated });
  });

  app.delete('/api/admin/enquiries/:id', requireAdminAuth, (req, res) => {
    const ok = deleteEnquiry(req.params.id);
    if (!ok) {
      res.status(404).json({ error: 'Enquiry not found.' });
      return;
    }
    res.json({ ok: true });
  });

  app.get('/api/admin/enquiries/export.csv', requireAdminAuth, (_req, res) => {
    const csv = exportEnquiriesToCsv();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="riseion-solar-enquiries.csv"');
    res.send(`\uFEFF${csv}`);
  });

  // Redirect legacy static designer URLs cleanly with 301
  app.get('/index.html', (_req, res) => res.redirect(301, '/gu'));
  app.get('/calculation.html', (_req, res) => res.redirect(301, '/gu/calculator'));
  app.get('/projects.html', (_req, res) => res.redirect(301, '/gu/projects'));

  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.resolve(ROOT_DIR, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf8');
        const { lang, headHtml } = buildSeoHeadMarkup(getBaseUrl(req), req.path);
        template = template
          .replace('<html lang="gu">', `<html lang="${lang}">`)
          .replace('<!--SSR_SEO_HEAD-->', headHtml);
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distDir = path.resolve(ROOT_DIR, 'dist');
    app.use(express.static(distDir, { index: false }));

    app.get('*', (req, res) => {
      const templatePath = path.resolve(distDir, 'index.html');
      let template = fs.readFileSync(templatePath, 'utf8');
      const { lang, headHtml } = buildSeoHeadMarkup(getBaseUrl(req), req.path);
      template = template
        .replace('<html lang="gu">', `<html lang="${lang}">`)
        .replace('<!--SSR_SEO_HEAD-->', headHtml);
      res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Riseion Solar full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
