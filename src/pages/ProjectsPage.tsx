import React, { useState } from 'react';
import { SITE_CONFIG, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';

interface ProjectsPageProps {
  lang: Lang;
  onOpenEnquiry: (prefill?: { projectType?: string }) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ lang, onOpenEnquiry }) => {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'industrial'>('all');

  const filtered =
    filter === 'all'
      ? SITE_CONFIG.projects
      : SITE_CONFIG.projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* 1. PROJECTS HERO */}
      <section className="page-hero projects-hero">
        <div className="container">
          <h1>
            {lang === 'gu' ? (
              <>
                પાટણ અને ઉત્તર ગુજરાત <span>સોલાર પ્રોજેક્ટ્સ</span>
              </>
            ) : lang === 'hi' ? (
              <>
                पाटन और उत्तर गुजरात <span>सोलर प्रोजेक्ट्स</span>
              </>
            ) : (
              <>
                Solar Installations Across <span>Patan &amp; North Gujarat</span>
              </>
            )}
          </h1>
          <p>
            {lang === 'gu'
              ? 'ઘર, દુકાન અને પાટણ GIDC ફેક્ટરી માટેના અમારા સોલાર મોડેલ કેસ સ્ટડી જુઓ. (હાલ સેમ્પલ પ્લેસહોલ્ડર છે — src/config/siteConfig.ts માં તમારા વાસ્તવિક સાઇટ ફોટા ઉમેરી શકાશે.)'
              : lang === 'hi'
                ? 'घर, दुकान और पाटन GIDC फैक्ट्री के लिए सोलर इंस्टॉलेशन उदाहरण देखें। (src/config/siteConfig.ts में अपनी असली साइट फोटो आसानी से बदलें।)'
                : 'Residential, commercial, and Patan GIDC industrial solar case templates — swap real Patan site photos and verified bill savings anytime in src/config/siteConfig.ts.'}
          </p>
          <button
            type="button"
            className="btn btn-orange"
            onClick={() => onOpenEnquiry()}
          >
            {t(UI_COPY.nav.cta, lang)}
          </button>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="stats-section">
        <div className="container stats-grid">
          {SITE_CONFIG.stats.map((stat) => (
            <div key={stat.value} className="stat-box">
              <h2>{stat.value}</h2>
              <p>{t(stat.label, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FILTERABLE PROJECTS GRID */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>
              {lang === 'gu'
                ? 'ઘર, દુકાન અને ફેક્ટરી સોલાર પોર્ટફોલિયો'
                : lang === 'hi'
                  ? 'घर, दुकान और फैक्ट्री सोलर पोर्टफोलियो'
                  : 'Featured Solar Installation Portfolio'}
            </h2>
            <p>
              {lang === 'gu'
                ? 'કેટેગરી મુજબ પ્રોજેક્ટ્સ ફિલ્ટર કરો:'
                : lang === 'hi'
                  ? 'श्रेणी के अनुसार प्रोजेक्ट्स देखें:'
                  : 'Filter rooftop systems by property category across Patan, Siddhpur, Chanasma & GIDC.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {([
              { id: 'all' as const, label: lang === 'gu' ? 'બધા પ્રોજેક્ટ્સ' : 'All Projects' },
              { id: 'residential' as const, label: lang === 'gu' ? 'ઘર (Residential)' : 'Residential' },
              { id: 'commercial' as const, label: lang === 'gu' ? 'દુકાન (Commercial)' : 'Commercial' },
              { id: 'industrial' as const, label: lang === 'gu' ? 'ફેક્ટરી (Industrial)' : 'Industrial' },
            ]).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer border ${
                  filter === tab.id
                    ? 'bg-[#123b70] text-white border-[#123b70]'
                    : 'bg-white text-[#123b70] border-[#d9e1eb] hover:border-[#20a66a]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filtered.map((proj) => (
              <article key={proj.id} className="project-card">
                <div className="project-image">
                  <img
                    src={proj.image}
                    alt={t(proj.imageAlt, lang)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="project-category">
                    {proj.category} · {proj.capacity}
                  </span>
                </div>
                <div className="project-details">
                  <div>
                    <h3>{t(proj.title, lang)}</h3>
                    <p>{t(proj.summary, lang)}</p>
                  </div>
                  <div className="project-meta">
                    <span>
                      {t(proj.location, lang)} · {proj.discom}
                      {proj.isSample ? ' · Sample template' : ''}
                    </span>
                    <strong>{t(proj.savingsNote, lang)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-STEP PROCESS */}
      <section className="section process-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.process.heading, lang)}</h2>
          </div>
          <div className="process-grid">
            {UI_COPY.process.steps.map((step) => (
              <div key={step.num} className="process-card">
                <span>{step.num}</span>
                <h3>{t(step.title, lang)}</h3>
                <p>{t(step.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPACT CTA */}
      <section className="section">
        <div className="container">
          <div className="compact-solar-cta">
            <div>
              <h2>
                {lang === 'gu'
                  ? 'તમારા ઘર કે ફેક્ટરી માટે સોલાર પ્લાન તૈયાર કરાવો'
                  : lang === 'hi'
                    ? 'अपने घर या फैक्ट्री के लिए सोलर प्लान तैयार करवाएं'
                    : 'Plan Your Rooftop Solar Project with Riseion Solar'}
              </h2>
              <p>
                {lang === 'gu'
                  ? 'પાટણ અને ઉત્તર ગુજરાતમાં મફત સાઇટ વિઝિટ, kW ગણતરી અને UGVCL સબસિડી માર્ગદર્શન માટે આજે જ સંપર્ક કરો.'
                  : 'Book a free roof visit across Patan, Siddhpur, Chanasma, Radhanpur, or Mehsana with transparent pricing and UGVCL filing support.'}
              </p>
              <button
                type="button"
                className="btn btn-orange"
                onClick={() => onOpenEnquiry()}
              >
                {t(UI_COPY.nav.cta, lang)}
              </button>
            </div>
            <img
              src={SITE_CONFIG.assets.industrialPhoto}
              alt="Industrial and residential solar installation across Patan GIDC"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
