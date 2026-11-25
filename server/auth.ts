import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

interface StoredAdminCredential {
  salt: string;
  hash: string;
  claimedAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const RUNTIME_SESSION_SECRET =
  (process.env.SESSION_SECRET || '').trim() || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getEnvPasscode(): string {
  const raw = (process.env.ADMIN_PASSCODE || '').trim().replace(/^["']|["']$/g, '').trim();
  if (!raw || /^(MY_|YOUR_|REPLACE|CHANGE_ME)/i.test(raw)) {
    return '';
  }
  return raw;
}

function readStoredCredential(): StoredAdminCredential | null {
  ensureDataDir();
  if (!fs.existsSync(ADMIN_FILE)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8')) as Partial<StoredAdminCredential>;
    if (typeof parsed.salt === 'string' && typeof parsed.hash === 'string') {
      return {
        salt: parsed.salt,
        hash: parsed.hash,
        claimedAt: typeof parsed.claimedAt === 'string' ? parsed.claimedAt : new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function hashPasscode(passcode: string, salt: string): string {
  return crypto.scryptSync(passcode, salt, 64).toString('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function getAdminAuthStatus(): {
  configured: boolean;
  source: 'env' | 'claimed' | 'unclaimed';
} {
  if (getEnvPasscode()) {
    return { configured: true, source: 'env' };
  }
  if (readStoredCredential()) {
    return { configured: true, source: 'claimed' };
  }
  return { configured: false, source: 'unclaimed' };
}

export function claimInitialAdminPasscode(passcode: string): { ok: boolean; error?: string } {
  if (getEnvPasscode()) {
    return { ok: false, error: 'Admin passcode is already managed via server environment.' };
  }
  if (readStoredCredential()) {
    return { ok: false, error: 'Admin passcode has already been set up.' };
  }
  const trimmed = passcode.trim();
  if (trimmed.length < 8 || trimmed.length > 72) {
    return { ok: false, error: 'Passcode must be between 8 and 72 characters.' };
  }

  ensureDataDir();
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPasscode(trimmed, salt);
  const payload: StoredAdminCredential = {
    salt,
    hash,
    claimedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(payload, null, 2), { encoding: 'utf8', flag: 'wx' });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Admin passcode has already been claimed.' };
  }
}

export function verifyAdminPasscode(passcode: string): boolean {
  const trimmed = passcode.trim();
  if (!trimmed) return false;

  const envPass = getEnvPasscode();
  if (envPass) {
    return safeEqual(trimmed, envPass);
  }

  const stored = readStoredCredential();
  if (!stored) return false;
  const candidateHash = hashPasscode(trimmed, stored.salt);
  return safeEqual(candidateHash, stored.hash);
}

export function issueAdminToken(): { token: string; expiresAt: string } {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp })).toString('base64url');
  const sig = crypto
    .createHmac('sha256', RUNTIME_SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return {
    token: `${payload}.${sig}`,
    expiresAt: new Date(exp).toISOString(),
  };
}

export function verifyAdminBearerToken(authHeader: string | undefined): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7).trim();
  const dot = token.indexOf('.');
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expectedSig = crypto
    .createHmac('sha256', RUNTIME_SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  if (!safeEqual(sig, expectedSig)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      role?: string;
      exp?: number;
    };
    return decoded.role === 'admin' && typeof decoded.exp === 'number' && decoded.exp > Date.now();
  } catch {
    return false;
  }
}
