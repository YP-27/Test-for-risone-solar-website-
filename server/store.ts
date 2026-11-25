import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export type LeadStatus = 'new' | 'contacted' | 'site_visit' | 'quoted' | 'closed';

export interface SolarEnquiry {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  mobile: string;
  address: string;
  cityArea: string;
  projectType: 'Residential' | 'Commercial' | 'Industrial' | 'Other';
  monthlyBill?: number;
  estimatedKw?: number;
  message: string;
  language: 'gu' | 'en' | 'hi';
  sourcePage: string;
  utmSource?: string;
  utmCampaign?: string;
  status: LeadStatus;
  notes: string;
}

export interface CreateEnquiryInput {
  name: string;
  mobile: string;
  address: string;
  cityArea?: string;
  projectType: string;
  monthlyBill?: number | string;
  estimatedKw?: number | string;
  message?: string;
  language?: string;
  sourcePage?: string;
  utmSource?: string;
  utmCampaign?: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readAllEnquiries(): SolarEnquiry[] {
  ensureDataDir();
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SolarEnquiry[]) : [];
  } catch {
    return [];
  }
}

function writeAllEnquiries(items: SolarEnquiry[]): void {
  ensureDataDir();
  const tempFile = `${ENQUIRIES_FILE}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(items, null, 2), 'utf8');
  fs.renameSync(tempFile, ENQUIRIES_FILE);
}

function cleanText(val: unknown, maxLen: number): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function normalizePhone(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return '';
}

function normalizeOptionalNumber(raw: unknown, maxVal: number): number | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const num = Number(raw);
  if (!Number.isFinite(num) || num <= 0 || num > maxVal) return undefined;
  return Math.round(num * 100) / 100;
}

const ALLOWED_PROJECT_TYPES = new Set(['Residential', 'Commercial', 'Industrial', 'Other']);
const ALLOWED_STATUSES = new Set<LeadStatus>(['new', 'contacted', 'site_visit', 'quoted', 'closed']);

export function createEnquiry(input: CreateEnquiryInput): SolarEnquiry {
  const name = cleanText(input.name, 80);
  const mobile = normalizePhone(input.mobile);
  const address = cleanText(input.address, 260);
  const cityArea = cleanText(input.cityArea, 60) || 'Patan';
  const projectTypeRaw = cleanText(input.projectType, 30);
  const projectType = (
    ALLOWED_PROJECT_TYPES.has(projectTypeRaw) ? projectTypeRaw : 'Residential'
  ) as SolarEnquiry['projectType'];

  if (name.length < 2) {
    throw new Error('Please enter a valid name (at least 2 characters).');
  }
  if (!mobile) {
    throw new Error('Please enter a valid 10-digit Indian mobile number.');
  }
  if (address.length < 4) {
    throw new Error('Please enter your property or site address.');
  }

  const language: SolarEnquiry['language'] =
    input.language === 'en' || input.language === 'hi' ? input.language : 'gu';

  const now = new Date().toISOString();
  const record: SolarEnquiry = {
    id: `RS-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
    createdAt: now,
    updatedAt: now,
    name,
    mobile,
    address,
    cityArea,
    projectType,
    monthlyBill: normalizeOptionalNumber(input.monthlyBill, 5000000),
    estimatedKw: normalizeOptionalNumber(input.estimatedKw, 5000),
    message: cleanText(input.message, 600),
    language,
    sourcePage: cleanText(input.sourcePage, 160) || '/',
    utmSource: cleanText(input.utmSource, 60) || undefined,
    utmCampaign: cleanText(input.utmCampaign, 80) || undefined,
    status: 'new',
    notes: '',
  };

  const current = readAllEnquiries();
  current.unshift(record);
  writeAllEnquiries(current);
  return record;
}

export function listEnquiries(filters?: { status?: string; search?: string }): SolarEnquiry[] {
  let items = readAllEnquiries();
  if (filters?.status && filters.status !== 'all' && ALLOWED_STATUSES.has(filters.status as LeadStatus)) {
    items = items.filter((item) => item.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.mobile.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.cityArea.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      );
    }
  }
  return items;
}

export function updateEnquiry(
  id: string,
  patch: { status?: string; notes?: string }
): SolarEnquiry | null {
  const items = readAllEnquiries();
  const idx = items.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  const existing = items[idx];
  const nextStatus =
    patch.status && ALLOWED_STATUSES.has(patch.status as LeadStatus)
      ? (patch.status as LeadStatus)
      : existing.status;
  const nextNotes =
    typeof patch.notes === 'string' ? cleanText(patch.notes, 800) : existing.notes;

  const updated: SolarEnquiry = {
    ...existing,
    status: nextStatus,
    notes: nextNotes,
    updatedAt: new Date().toISOString(),
  };

  items[idx] = updated;
  writeAllEnquiries(items);
  return updated;
}

export function deleteEnquiry(id: string): boolean {
  const items = readAllEnquiries();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  writeAllEnquiries(filtered);
  return true;
}

function escapeCsvCell(value: string | number | undefined): string {
  const str = value === undefined || value === null ? '' : String(value);
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function exportEnquiriesToCsv(): string {
  const items = readAllEnquiries();
  const headers = [
    'Lead ID',
    'Created At',
    'Name',
    'Mobile',
    'City/Area',
    'Address',
    'Project Type',
    'Monthly Bill (INR)',
    'Estimated kW',
    'Language',
    'Status',
    'Source Page',
    'UTM Source',
    'UTM Campaign',
    'Message',
    'Internal Notes',
  ];
  const rows = items.map((item) =>
    [
      item.id,
      item.createdAt,
      item.name,
      item.mobile,
      item.cityArea,
      item.address,
      item.projectType,
      item.monthlyBill ?? '',
      item.estimatedKw ?? '',
      item.language,
      item.status,
      item.sourcePage,
      item.utmSource ?? '',
      item.utmCampaign ?? '',
      item.message,
      item.notes,
    ]
      .map(escapeCsvCell)
      .join(',')
  );
  return [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
}

function isSafeWebhookUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '169.254.169.254' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
      host.endsWith('.local') ||
      host.endsWith('.internal')
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function forwardEnquiryWebhook(enquiry: SolarEnquiry): Promise<void> {
  const webhookUrl = (process.env.LEAD_WEBHOOK_URL || '').trim();
  if (!webhookUrl || !isSafeWebhookUrl(webhookUrl)) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch {
    // Non-blocking: lead is already persisted locally
  }
}
