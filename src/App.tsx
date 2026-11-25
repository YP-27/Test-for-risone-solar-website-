import { useCallback, useEffect, useState } from 'react';
import { SiteLayout, type PageSlug } from './components/NavbarFooter';
import { EnquiryModal, type EnquiryPrefill } from './components/EnquiryModal';
import { HomePage } from './pages/HomePage';
import { SubsidyGuidePage } from './pages/SubsidyGuidePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { SeoHubPage } from './pages/SeoHubPage';
import type { Lang } from './config/siteConfig';

interface ParsedRoute {
  lang: Lang;
  page: PageSlug;
}

function parseClientPath(pathname: string): ParsedRoute {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  let stripped = pathname;
  if (base && stripped.toLowerCase().startsWith(base.toLowerCase())) {
    stripped = stripped.slice(base.length) || '/';
  }
  const clean = stripped.replace(/\/+$/, '') || '/';
  if (clean === '/seo-hub' || clean === '/admin') {
    return { lang: 'en', page: 'seo-hub' };
  }

  const parts = clean.split('/').filter(Boolean);
  let lang: Lang = 'gu';
  let rest = parts;

  if (parts[0] === 'gu' || parts[0] === 'en' || parts[0] === 'hi') {
    lang = parts[0];
    rest = parts.slice(1);
  }

  const slug = rest[0] || '';
  let page: PageSlug = 'home';
  if (slug === 'subsidy-patan') page = 'subsidy-patan';
  else if (slug === 'calculator' || slug === 'calculation.html') page = 'calculator';
  else if (slug === 'projects' || slug === 'projects.html') page = 'projects';
  else if (slug === 'privacy-policy') page = 'privacy-policy';
  else if (slug === 'seo-hub') return { lang: 'en', page: 'seo-hub' };

  return { lang, page };
}

export default function App() {
  const [route, setRoute] = useState<ParsedRoute>(() => parseClientPath(window.location.pathname));
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = route.lang;
  }, [route.lang]);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseClientPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(parseClientPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openEnquiry = useCallback((prefill?: EnquiryPrefill) => {
    setEnquiryPrefill(prefill);
    setEnquiryOpen(true);
  }, []);

  return (
    <SiteLayout
      lang={route.lang}
      page={route.page}
      onNavigate={navigate}
      onOpenEnquiry={openEnquiry}
    >
      {route.page === 'home' && (
        <HomePage lang={route.lang} onNavigate={navigate} onOpenEnquiry={openEnquiry} />
      )}
      {route.page === 'subsidy-patan' && (
        <SubsidyGuidePage lang={route.lang} onNavigate={navigate} onOpenEnquiry={openEnquiry} />
      )}
      {route.page === 'calculator' && (
        <CalculatorPage lang={route.lang} onOpenEnquiry={openEnquiry} />
      )}
      {route.page === 'projects' && (
        <ProjectsPage lang={route.lang} onOpenEnquiry={openEnquiry} />
      )}
      {route.page === 'privacy-policy' && <PrivacyPolicyPage lang={route.lang} />}
      {route.page === 'seo-hub' && <SeoHubPage />}

      <EnquiryModal
        open={enquiryOpen}
        lang={route.lang}
        prefill={enquiryPrefill}
        onClose={() => setEnquiryOpen(false)}
        onNavigatePrivacy={navigate}
      />
    </SiteLayout>
  );
}
