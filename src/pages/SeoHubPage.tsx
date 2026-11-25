import React, { useCallback, useEffect, useState } from 'react';
import {
  Download,
  Lock,
  LogOut,
  Search,
  Trash2,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

type LeadStatus = 'new' | 'contacted' | 'site_visit' | 'quoted' | 'closed';

interface SolarEnquiry {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  mobile: string;
  address: string;
  cityArea: string;
  projectType: string;
  monthlyBill?: number;
  estimatedKw?: number;
  message: string;
  language: string;
  sourcePage: string;
  utmSource?: string;
  utmCampaign?: string;
  status: LeadStatus;
  notes: string;
}

interface SeoPreviewResponse {
  baseUrl: string;
  robotsUrl: string;
  sitemapUrl: string;
  routes: Array<{
    lang: string;
    canonicalPath: string;
    title: string;
    description: string;
    robots: string;
  }>;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  site_visit: 'Site Visit',
  quoted: 'Quoted',
  closed: 'Closed',
};

export const SeoHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'seo'>('leads');

  // Admin auth (Bearer token strictly kept in React memory, never localStorage)
  const [authStatus, setAuthStatus] = useState<{ configured: boolean; source: string } | null>(null);
  const [token, setToken] = useState<string>('');
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  // Leads state
  const [enquiries, setEnquiries] = useState<SolarEnquiry[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  // SEO live inspector
  const [seoPreview, setSeoPreview] = useState<SeoPreviewResponse | null>(null);

  useEffect(() => {
    fetch('/api/admin/status')
      .then((r) => r.json())
      .then((data) => setAuthStatus(data))
      .catch(() => setAuthStatus({ configured: false, source: 'unclaimed' }));

    fetch('/api/seo/preview')
      .then((r) => r.json())
      .then((data) => setSeoPreview(data))
      .catch(() => {});
  }, []);

  const loadEnquiries = useCallback(async () => {
    if (!token) return;
    setLoadingLeads(true);
    try {
      const qs = new URLSearchParams();
      if (statusFilter !== 'all') qs.set('status', statusFilter);
      if (searchQuery.trim()) qs.set('search', searchQuery.trim());
      const res = await fetch(`/api/admin/enquiries?${qs.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        setToken('');
        return;
      }
      const data = await res.json();
      setEnquiries(Array.isArray(data.enquiries) ? data.enquiries : []);
    } finally {
      setLoadingLeads(false);
    }
  }, [token, statusFilter, searchQuery]);

  useEffect(() => {
    void loadEnquiries();
  }, [loadEnquiries]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthBusy(true);
    try {
      const endpoint = authStatus?.configured ? '/api/admin/login' : '/api/admin/setup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcodeInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }
      setToken(data.token);
      setPasscodeInput('');
      setAuthStatus({ configured: true, source: authStatus?.source === 'env' ? 'env' : 'claimed' });
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleStatusChange = async (id: string, nextStatus: LeadStatus) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const { enquiry } = await res.json();
        setEnquiries((prev) => prev.map((item) => (item.id === id ? enquiry : item)));
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        const { enquiry } = await res.json();
        setEnquiries((prev) => prev.map((item) => (item.id === id ? enquiry : item)));
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setSavingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleExportCsv = async () => {
    const res = await fetch('/api/admin/enquiries/export.csv', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'riseion-solar-enquiries.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const seoChecklist = [
    {
      area: 'Technical SEO',
      item: 'Separate crawlable URLs (/gu, /en, /hi) with server-injected canonical & bidirectional hreflang',
      status: 'Built & Live',
      owner: 'Backend (Done)',
    },
    {
      area: 'Meta Ads Ready',
      item: 'Live Privacy Policy at /gu/privacy-policy & /en/privacy-policy + backend lead capture API',
      status: 'Built & Live',
      owner: 'Backend (Done)',
    },
    {
      area: 'Patan / UGVCL Content',
      item: 'Dedicated 2.18 kWp State Top-Up & PM Surya Ghar Subsidy Guide (/gu/subsidy-patan, /en/subsidy-patan)',
      status: 'Built & Live',
      owner: 'Backend (Done)',
    },
    {
      area: 'GEO / AI Search',
      item: 'robots.txt allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot + dynamic /sitemap.xml',
      status: 'Built & Live',
      owner: 'Backend (Done)',
    },
    {
      area: 'Local Maps (#1 Patan)',
      item: 'Verify Google Business Profile ("Solar Energy Company") with exact Padmanabh Chokdi, Patan 384266 NAP',
      status: 'Your Action',
      owner: 'Owner / Marketing',
    },
    {
      area: 'Replace Placeholders',
      item: 'Swap sample reviews, real Patan roof photos, Google review URL & live domain in src/config/siteConfig.ts',
      status: 'Your Action',
      owner: 'Owner / Marketing',
    },
    {
      area: 'Indexing & Entity Link',
      item: 'Submit /sitemap.xml to Google Search Console + Bing Webmaster Tools; add link from riseion.com -> Riseion Solar',
      status: 'Your Action',
      owner: 'You (Launch Day)',
    },
  ];

  return (
    <div className="bg-[#f5f7fa] min-h-[75vh]">
      <section
        className="text-white py-10 border-b-[5px] border-[#20a66a]"
        style={{ background: 'linear-gradient(110deg, #09264b, #123b70)' }}
      >
        <div className="container flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs text-[#69dfa2] font-bold">
              Internal Operations Console (noindex) · Riseion Solar Patan
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Lead Inbox &amp; SEO / AEO / GEO Hub
            </h1>
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-white/10 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 text-xs font-extrabold rounded-md cursor-pointer transition-colors border-0 ${
                activeTab === 'leads' ? 'bg-white text-[#123b70]' : 'bg-transparent text-white/85 hover:text-white'
              }`}
            >
              Lead Inbox (Backend)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 text-xs font-extrabold rounded-md cursor-pointer transition-colors border-0 ${
                activeTab === 'seo' ? 'bg-white text-[#123b70]' : 'bg-transparent text-white/85 hover:text-white'
              }`}
            >
              SEO / AEO / GEO Inspector
            </button>
          </div>
        </div>
      </section>

      <div className="container py-10">
        {activeTab === 'leads' ? (
          !token ? (
            <div className="max-w-md mx-auto bg-white border border-[#e3e9f0] rounded-2xl p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 text-[#09264b]">
                <Lock className="w-5 h-5 text-[#20a66a]" />
                <h2 className="text-lg font-extrabold">
                  {authStatus?.configured ? 'Sign In to Lead Inbox' : 'First-Run Admin Passcode Setup'}
                </h2>
              </div>
              <p className="text-xs text-[#6d7a8a] leading-relaxed">
                {authStatus?.configured
                  ? 'Enter your Riseion Solar admin passcode to view saved customer enquiries, update follow-up status, and export CSV.'
                  : 'No passcode is pre-set yet. Choose your own admin passcode (8+ characters) below to protect your Lead Inbox. You can also set ADMIN_PASSCODE in server Secrets at any time.'}
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="admin-pass">
                    {authStatus?.configured ? 'Admin Passcode' : 'Create Admin Passcode (min 8 chars)'}
                  </label>
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    minLength={authStatus?.configured ? 1 : 8}
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="Enter passcode"
                  />
                </div>
                {authError && (
                  <div role="alert" className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {authError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={authBusy}
                  className="btn btn-blue full-button"
                >
                  {authBusy
                    ? 'Verifying...'
                    : authStatus?.configured
                      ? 'Unlock Lead Inbox'
                      : 'Set Passcode & Unlock'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Lead Inbox Controls */}
              <div className="bg-white border border-[#e3e9f0] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 min-w-[220px] max-w-sm">
                    <Search className="w-4 h-4 text-[#6d7a8a] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, mobile, city, ID..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#d9e1eb] focus:border-[#20a66a] outline-none"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by lead status"
                    className="px-3 py-2 text-xs font-bold rounded-lg border border-[#d9e1eb] bg-white outline-none text-[#123b70]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="site_visit">Site Visit</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => void loadEnquiries()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9e1eb] bg-white hover:bg-[#f5f7fa] text-xs font-bold text-[#123b70] cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#20a66a] hover:bg-[#147a4b] text-white text-xs font-bold cursor-pointer border-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => setToken('')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d9e1eb] bg-white text-xs font-bold text-[#123b70] hover:bg-[#f5f7fa] cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Lock
                  </button>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="bg-white border border-[#e3e9f0] rounded-xl overflow-hidden shadow-sm">
                {loadingLeads ? (
                  <div className="p-8 text-center text-sm text-[#6d7a8a]">Loading saved enquiries...</div>
                ) : enquiries.length === 0 ? (
                  <div className="p-10 text-center space-y-2">
                    <p className="text-sm font-extrabold text-[#09264b]">No enquiries saved yet</p>
                    <p className="text-xs text-[#6d7a8a]">
                      Click “Free Site Visit” in the top navigation bar and submit a test enquiry — it will appear here instantly and persist in <code>data/enquiries.json</code>.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#f5f7fa] border-b border-[#e3e9f0] text-[#123b70]">
                          <th className="py-3 px-4 font-extrabold">Lead &amp; Date</th>
                          <th className="py-3 px-4 font-extrabold">Contact &amp; Area</th>
                          <th className="py-3 px-4 font-extrabold">System Details</th>
                          <th className="py-3 px-4 font-extrabold">Status &amp; Notes</th>
                          <th className="py-3 px-4 font-extrabold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e3e9f0]">
                        {enquiries.map((lead) => (
                          <tr key={lead.id} className="align-top hover:bg-[#f5f7fa]/70">
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-[#09264b]">{lead.name}</div>
                              <div className="font-mono-num text-[11px] text-[#6d7a8a] mt-0.5">{lead.id}</div>
                              <div className="font-mono-num text-[11px] text-[#6d7a8a]">
                                {new Date(lead.createdAt).toLocaleString('en-IN')}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 space-y-0.5">
                              <div className="font-mono-num font-bold text-[#09264b]">{lead.mobile}</div>
                              <div className="text-[#26364a] font-semibold">{lead.cityArea}</div>
                              <div className="text-[#6d7a8a] max-w-xs">{lead.address}</div>
                            </td>
                            <td className="py-3.5 px-4 space-y-1">
                              <div className="font-bold text-[#123b70]">
                                {lead.projectType} · Lang: {lead.language.toUpperCase()}
                              </div>
                              <div className="font-mono-num text-[#26364a]">
                                {lead.monthlyBill ? `Bill: ₹${lead.monthlyBill}` : 'Bill: —'}
                                {lead.estimatedKw ? ` · Est: ${lead.estimatedKw} kW` : ''}
                              </div>
                              {lead.message && <p className="text-[#6d7a8a] max-w-xs">{lead.message}</p>}
                            </td>
                            <td className="py-3.5 px-4 space-y-2 min-w-[200px]">
                              <select
                                value={lead.status}
                                disabled={savingId === lead.id}
                                onChange={(e) => void handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                className="w-full px-2.5 py-1.5 text-xs font-bold rounded border border-[#d9e1eb] bg-white text-[#123b70]"
                              >
                                {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((st) => (
                                  <option key={st} value={st}>
                                    {STATUS_LABELS[st]}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                defaultValue={lead.notes}
                                placeholder="Add note & press Enter..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    void handleSaveNotes(lead.id, (e.target as HTMLInputElement).value);
                                  }
                                }}
                                onBlur={(e) => {
                                  if (e.target.value !== lead.notes) {
                                    void handleSaveNotes(lead.id, e.target.value);
                                  }
                                }}
                                className="w-full px-2.5 py-1.5 text-xs rounded border border-[#e3e9f0] focus:border-[#20a66a] outline-none"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                              <a
                                href={`https://wa.me/${lead.mobile.replace(/\D/g, '')}?text=${encodeURIComponent(`Namaste ${lead.name}, this is Riseion Solar Patan regarding your solar enquiry (${lead.id}).`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Follow up on WhatsApp"
                                className="inline-flex items-center p-1.5 rounded border border-[#bde6cf] text-[#147a4b] hover:bg-[#e8f7ef]"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <button
                                type="button"
                                onClick={() => void handleDelete(lead.id)}
                                title="Delete enquiry"
                                className="inline-flex items-center p-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer bg-white"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="space-y-8">
            {/* Live Crawl Endpoints */}
            <div className="bg-white border border-[#e3e9f0] rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#09264b]">
                    Live Crawl Endpoints &amp; Hreflang Matrix
                  </h2>
                  <p className="text-xs text-[#6d7a8a] mt-0.5">
                    Server-rendered in Express before React loads so Googlebot, Bingbot, OAI-SearchBot &amp; PerplexityBot read all 3 languages directly.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#20a66a] underline"
                  >
                    /sitemap.xml <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#20a66a] underline"
                  >
                    /robots.txt <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {seoPreview && (
                <div className="overflow-x-auto border border-[#e3e9f0] rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f5f7fa] border-b border-[#e3e9f0] text-[#123b70]">
                        <th className="py-2.5 px-3 font-extrabold">Route</th>
                        <th className="py-2.5 px-3 font-extrabold">Lang</th>
                        <th className="py-2.5 px-3 font-extrabold">Server-Injected Title</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e3e9f0]">
                      {seoPreview.routes.map((r) => (
                        <tr key={r.canonicalPath}>
                          <td className="py-2.5 px-3 font-mono-num text-[#123b70] font-bold">
                            {r.canonicalPath}
                          </td>
                          <td className="py-2.5 px-3 font-mono-num uppercase text-[#6d7a8a]">{r.lang}</td>
                          <td className="py-2.5 px-3 text-[#26364a]">{r.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Patan -> North Gujarat -> Gujarat Action Checklist */}
            <div className="bg-white border border-[#e3e9f0] rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-extrabold text-[#09264b]">
                Patan → North Gujarat → Gujarat Ranking Action Checklist
              </h2>
              <div className="overflow-x-auto border border-[#e3e9f0] rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f5f7fa] border-b border-[#e3e9f0] text-[#123b70]">
                      <th className="py-2.5 px-3 font-extrabold">Pillar</th>
                      <th className="py-2.5 px-3 font-extrabold">Deliverable</th>
                      <th className="py-2.5 px-3 font-extrabold">Status</th>
                      <th className="py-2.5 px-3 font-extrabold">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e3e9f0]">
                    {seoChecklist.map((row) => (
                      <tr key={row.item}>
                        <td className="py-3 px-3 font-bold text-[#09264b] whitespace-nowrap">{row.area}</td>
                        <td className="py-3 px-3 text-[#26364a]">{row.item}</td>
                        <td className="py-3 px-3 whitespace-nowrap font-bold">
                          <span className={row.status === 'Built & Live' ? 'text-[#147a4b] inline-flex items-center gap-1' : 'text-[#e87512]'}>
                            {row.status === 'Built & Live' && <CheckCircle2 className="w-3.5 h-3.5" />}
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#6d7a8a] whitespace-nowrap">{row.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-[#e8f7ef] border border-[#bde6cf] text-xs text-[#26364a] space-y-1">
                <div className="font-extrabold text-[#09264b]">Single File for Your Custom Details:</div>
                <p>
                  Edit <code>src/config/siteConfig.ts</code> to replace sample reviews, sample project photos, Google Business Profile review link (<code>googleReviewUrl</code>), and live domain (<code>primaryDomain</code>). Exact NAP configured: <strong>{SITE_CONFIG.address.en}</strong> · <strong>{SITE_CONFIG.phones[0].display}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
