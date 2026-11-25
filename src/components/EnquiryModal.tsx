import React, { useEffect, useState } from 'react';
import { SITE_CONFIG, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';
import { buildPath } from './NavbarFooter';

export interface EnquiryPrefill {
  monthlyBill?: number;
  estimatedKw?: number;
  projectType?: string;
}

interface EnquiryModalProps {
  open: boolean;
  lang: Lang;
  prefill?: EnquiryPrefill;
  onClose: () => void;
  onNavigatePrivacy: (path: string) => void;
}

const CITY_OPTIONS = [
  'Patan',
  'Siddhpur',
  'Chanasma',
  'Radhanpur',
  'Harij',
  'Sami / Sankheshwar',
  'Patan GIDC',
  'Mehsana / Unjha',
  'Palanpur / Banaskantha',
  'Other Gujarat',
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  open,
  lang,
  prefill,
  onClose,
  onNavigatePrivacy,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [cityArea, setCityArea] = useState('Patan');
  const [address, setAddress] = useState('');
  const [projectType, setProjectType] = useState('Residential');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [estimatedKw, setEstimatedKw] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [savedResult, setSavedResult] = useState<{ id: string; whatsappUrl: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    setError('');
    setSavedResult(null);
    if (prefill?.projectType) {
      const map: Record<string, string> = {
        residential: 'Residential',
        commercial: 'Commercial',
        industrial: 'Industrial',
      };
      setProjectType(map[prefill.projectType.toLowerCase()] || prefill.projectType);
    }
    if (prefill?.monthlyBill) setMonthlyBill(String(prefill.monthlyBill));
    if (prefill?.estimatedKw) setEstimatedKw(String(prefill.estimatedKw));
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          mobile,
          cityArea,
          address,
          projectType,
          monthlyBill: monthlyBill ? Number(monthlyBill) : undefined,
          estimatedKw: estimatedKw ? Number(estimatedKw) : undefined,
          message,
          language: lang,
          sourcePage: window.location.pathname,
          utmSource: params.get('utm_source') || undefined,
          utmCampaign: params.get('utm_campaign') || undefined,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not save enquiry. Please verify your details.');
      }

      setSavedResult({ id: data.id, whatsappUrl: data.whatsappUrl });
      setName('');
      setMobile('');
      setAddress('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="contact-modal-content">
        <div className="contact-modal-heading">
          <button
            type="button"
            aria-label="Close contact form"
            className="contact-modal-close"
            onClick={onClose}
          >
            ×
          </button>
          <h2 id="enquiry-modal-title">
            {lang === 'gu'
              ? 'Riseion Solar નો સંપર્ક કરો'
              : lang === 'hi'
                ? 'Riseion Solar से संपर्क करें'
                : 'Contact Riseion Solar'}
          </h2>
        </div>

        <p className="contact-form-description">{t(UI_COPY.enquiryModal.sub, lang)}</p>

        {savedResult ? (
          <div className="space-y-4 text-center py-3">
            <h3 className="text-lg font-bold text-[#147a4b]">{t(UI_COPY.enquiryModal.successTitle, lang)}</h3>
            <p className="text-xs font-mono-num text-[#6d7a8a]">Reference ID: {savedResult.id}</p>
            <p className="text-sm text-[#26364a]">{t(UI_COPY.enquiryModal.successSub, lang)}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={savedResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green"
              >
                {t(UI_COPY.enquiryModal.whatsappBtn, lang)}
              </a>
              <button type="button" onClick={onClose} className="btn btn-blue">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="enquiry-form">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">{t(UI_COPY.enquiryModal.name, lang)}</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-mobile">{t(UI_COPY.enquiryModal.mobile, lang)}</label>
                <input
                  id="contact-mobile"
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter 10-digit mobile"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-city">{t(UI_COPY.enquiryModal.area, lang)}</label>
                <select
                  id="contact-city"
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value)}
                >
                  {CITY_OPTIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="solar-project-type">{t(UI_COPY.enquiryModal.projectType, lang)}</label>
                <select
                  id="solar-project-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  required
                >
                  <option value="Residential">Residential (Home)</option>
                  <option value="Commercial">Commercial (Shop / Office)</option>
                  <option value="Industrial">Industrial (Factory / GIDC)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-address">{t(UI_COPY.enquiryModal.address, lang)}</label>
              <textarea
                id="contact-address"
                rows={2}
                required
                minLength={4}
                maxLength={250}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter the address where solar may be installed"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-bill">{t(UI_COPY.enquiryModal.monthlyBill, lang)}</label>
                <input
                  id="contact-bill"
                  type="number"
                  min={0}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="Example: 2500"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-kw">Estimated Size (kW)</label>
                <input
                  id="contact-kw"
                  type="number"
                  step="0.01"
                  min={0}
                  value={estimatedKw}
                  onChange={(e) => setEstimatedKw(e.target.value)}
                  placeholder="Example: 2.18 or 3"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="solar-message">{t(UI_COPY.enquiryModal.message, lang)}</label>
              <textarea
                id="solar-message"
                rows={2}
                maxLength={600}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your solar needs (optional)"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs font-bold text-[#c0392b] mb-3">
                {error}
              </p>
            )}

            <button className="btn btn-orange full-button" type="submit" disabled={submitting}>
              {submitting ? t(UI_COPY.enquiryModal.submitting, lang) : t(UI_COPY.enquiryModal.submit, lang)}
            </button>

            <p className="form-note">
              {t(UI_COPY.enquiryModal.privacyNote, lang)}{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigatePrivacy(buildPath(lang, 'privacy-policy'));
                }}
                className="underline font-bold text-[#123b70] bg-transparent border-0 cursor-pointer"
              >
                {t(UI_COPY.nav.privacy, lang)}
              </button>{' '}
              · {SITE_CONFIG.phones[0].display}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
