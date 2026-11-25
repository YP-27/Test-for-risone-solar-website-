import React, { useEffect, useRef, useState } from 'react';
import { SITE_CONFIG, getWhatsAppLink, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';

export type PageSlug = 'home' | 'subsidy-patan' | 'calculator' | 'projects' | 'privacy-policy' | 'seo-hub';

interface LayoutProps {
  lang: Lang;
  page: PageSlug;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (prefill?: { monthlyBill?: number; estimatedKw?: number; projectType?: string }) => void;
  children: React.ReactNode;
}

export function buildPath(lang: Lang, page: PageSlug): string {
  if (page === 'seo-hub') return '/seo-hub';
  if (page === 'home') return `/${lang}`;
  return `/${lang}/${page}`;
}

const LANG_NAMES: Record<Lang, string> = {
  gu: 'ગુજરાતી',
  en: 'English',
  hi: 'हिन्दी',
};

export const SiteLayout: React.FC<LayoutProps> = ({
  lang,
  page,
  onNavigate,
  onOpenEnquiry,
  children,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const switchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (switchRef.current && !switchRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangMenuOpen(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const navItems: Array<{ key: PageSlug; label: string; href: string }> = [
    { key: 'home', label: t(UI_COPY.nav.home, lang), href: buildPath(lang, 'home') },
    { key: 'subsidy-patan', label: t(UI_COPY.nav.subsidy, lang), href: buildPath(lang, 'subsidy-patan') },
    { key: 'calculator', label: t(UI_COPY.nav.calculator, lang), href: buildPath(lang, 'calculator') },
    { key: 'projects', label: t(UI_COPY.nav.projects, lang), href: buildPath(lang, 'projects') },
    { key: 'seo-hub', label: t(UI_COPY.nav.hub, lang), href: '/seo-hub' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setLangMenuOpen(false);
    onNavigate(href);
  };

  const langPageTarget: PageSlug = page === 'seo-hub' ? 'home' : page;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Designer Exact Header */}
      <header className="header">
        <div className="container navbar">
          <a
            className="logo"
            href={buildPath(lang, 'home')}
            onClick={(e) => handleLinkClick(e, buildPath(lang, 'home'))}
            aria-label="Riseion Solar home"
          >
            <img
              className="logo-img"
              src={SITE_CONFIG.assets.logoColor}
              alt="Riseion Solar"
              width={640}
              height={252}
            />
            <small>{t(UI_COPY.hero.tagline, lang)}</small>
          </a>

          <nav aria-label="Primary Navigation">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={page === item.key ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              className="nav-contact"
              onClick={() => onOpenEnquiry()}
            >
              {lang === 'gu' ? 'સંપર્ક કરો' : lang === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </button>

            {/* Exact Designer Language Dropdown wired to real SEO URLs (/gu, /en, /hi) */}
            <div
              ref={switchRef}
              className={`language-switch${langMenuOpen ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="language-toggle"
                aria-label="Select language"
                aria-expanded={langMenuOpen}
                onClick={() => setLangMenuOpen((prev) => !prev)}
              >
                <span className="language-globe" aria-hidden="true">🌐</span>
                <span className="language-current">{LANG_NAMES[lang]}</span>
                <span className="language-chevron" aria-hidden="true" />
              </button>
              <div className="language-menu" role="menu" aria-label="Choose language">
                {(['gu', 'en', 'hi'] as const).map((code) => {
                  const targetHref = buildPath(code, langPageTarget);
                  const selected = lang === code;
                  return (
                    <a
                      key={code}
                      href={targetHref}
                      hrefLang={`${code}-IN`}
                      role="menuitem"
                      onClick={(e) => handleLinkClick(e, targetHref)}
                      className={`language-option${selected ? ' is-selected' : ''}`}
                    >
                      <span>{LANG_NAMES[code]}</span>
                      <span className="language-check">✓</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      {/* Designer Exact Footer */}
      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div className="footer-about">
            <a
              className="logo footer-logo"
              href={buildPath(lang, 'home')}
              onClick={(e) => handleLinkClick(e, buildPath(lang, 'home'))}
              aria-label="Riseion Solar home"
            >
              <img
                className="logo-img"
                src={SITE_CONFIG.assets.logoWhite}
                alt="Riseion Solar"
                width={640}
                height={252}
                loading="lazy"
              />
            </a>
            <p>{t(UI_COPY.footer.about, lang)}</p>
            <p>
              <a href={SITE_CONFIG.parentWebsite} target="_blank" rel="noopener noreferrer">
                {SITE_CONFIG.parentCompany}
              </a>
            </p>
          </div>

          <div>
            <h3>{t(UI_COPY.footer.quickLinks, lang)}</h3>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={buildPath(lang, 'privacy-policy')}
              onClick={(e) => handleLinkClick(e, buildPath(lang, 'privacy-policy'))}
            >
              {t(UI_COPY.nav.privacy, lang)}
            </a>
          </div>

          <div>
            <h3>{t(UI_COPY.footer.languages, lang)}</h3>
            <a href="/gu" onClick={(e) => handleLinkClick(e, '/gu')}>
              ગુજરાતી વેબસાઇટ (/gu)
            </a>
            <a href="/en" onClick={(e) => handleLinkClick(e, '/en')}>
              English Website (/en)
            </a>
            <a href="/hi" onClick={(e) => handleLinkClick(e, '/hi')}>
              हिन्दी वेबसाइट (/hi)
            </a>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              XML Sitemap
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
              robots.txt
            </a>
          </div>

          <div>
            <h3>{t(UI_COPY.footer.contact, lang)}</h3>
            {SITE_CONFIG.phones.map((p) => (
              <p key={p.tel}>
                <a href={`tel:${p.tel}`}>Phone: {p.display}</a>
              </p>
            ))}
            <address className="footer-address">{t(SITE_CONFIG.address, lang)}</address>
          </div>
        </div>

        <div className="copyright">
          © 2026 {SITE_CONFIG.brandName} ({SITE_CONFIG.parentCompany}). All Rights Reserved.
        </div>
      </footer>

      {/* Designer Exact WhatsApp Floating Button */}
      <a
        className="wa-float"
        href={getWhatsAppLink('Hello Riseion Solar Patan, I want to know about solar & UGVCL subsidy.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.1 1.3z" />
        </svg>
      </a>
    </div>
  );
};
