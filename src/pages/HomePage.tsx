import React from 'react';
import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';
import { buildPath } from '../components/NavbarFooter';

interface HomePageProps {
  lang: Lang;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (prefill?: { projectType?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate, onOpenEnquiry }) => {
  const solutionImages = {
    residential: SITE_CONFIG.assets.residentialPhoto,
    commercial: SITE_CONFIG.assets.commercialPhoto,
    industrial: SITE_CONFIG.assets.industrialPhoto,
  };

  const whyFeatures =
    lang === 'gu'
      ? [
          {
            symbol: '01',
            title: 'પાટણની પોતાની લોકલ ઓફિસ',
            desc: 'પદ્મનાભ ચોકડી પાસે અમારી કાયમી ઓફિસ હોવાથી સાઇટ વિઝિટ, UGVCL કામ અને ઇન્સ્ટોલેશન પછીના મેન્ટેનન્સ માટે ઝડપી મદદ મળે છે.',
          },
          {
            symbol: '02',
            title: '2.18 kWp અને PM સૂર્ય ઘર સબસિડી સહાય',
            desc: 'pmsuryaghar.gov.in પર અરજી, આધાર-બિલ-બેંક નામ ચકાસણી અને DBT સબસિડી જમા થાય ત્યાં સુધી પૂરો સાથ.',
          },
          {
            symbol: '03',
            title: 'DCR પેનલ અને BIS ઇન્વર્ટર',
            desc: 'સરકારી સબસિડી નિયમો મુજબ ભારતીય DCR પેનલ, BIS સર્ટિફાઇડ ઇન્વર્ટર અને ઉત્તર ગુજરાતની ગરમી સહન કરે તેવું મજબૂત સ્ટ્રક્ચર.',
          },
          {
            symbol: '04',
            title: 'પારદર્શક કિંમત અને મેન્ટેનન્સ',
            desc: 'કોઈ છુપા ચાર્જ નહીં — બિલ મુજબ સાચી kW ગણતરી, અર્થિંગ, લાઇટનિંગ અરેસ્ટર અને વાર્ષિક સફાઈ-સપોર્ટ માર્ગદર્શન.',
          },
        ]
      : lang === 'hi'
        ? [
            {
              symbol: '01',
              title: 'पाटन में स्थानीय कार्यालय',
              desc: 'पद्मनाभ चौकड़ी के पास स्थानीय ऑफिस होने से साइट विज़िट, UGVCL प्रक्रिया और बाद की सर्विस तेज़ी से मिलती है।',
            },
            {
              symbol: '02',
              title: '2.18 kWp और पीएम सूर्य घर सहायता',
              desc: 'pmsuryaghar.gov.in आवेदन, आधार-बिल-बैंक नाम मिलान और बैंक खाते में DBT सब्सिडी आने तक पूरा मार्गदर्शन।',
            },
            {
              symbol: '03',
              title: 'DCR पैनल और BIS इन्वर्टर',
              desc: 'सरकारी सब्सिडी मानकों के अनुसार भारतीय DCR पैनल, BIS प्रमाणित इन्वर्टर और उत्तर गुजरात की गर्मी के अनुकूल मजबूत स्ट्रक्चर।',
            },
            {
              symbol: '04',
              title: 'पारदर्शी कीमत और मेंटेनेंस',
              desc: 'बिना किसी छिपे शुल्क के बिल के अनुसार सटीक kW सुझाव, सुरक्षित अर्थिंग और नियमित क्लीनिंग-मेंटेनेंस सपोर्ट।',
            },
          ]
        : [
            {
              symbol: '01',
              title: 'Local Patan Office & Fast Support',
              desc: 'Based near Padmanabh Chokdi, Chanasma Highway Road, Patan — giving you direct site visits and quick after-sales service.',
            },
            {
              symbol: '02',
              title: '2.18 kWp & PM Surya Ghar Filing',
              desc: 'Complete pmsuryaghar.gov.in registration, Aadhaar-bill-bank name verification, and UGVCL net metering coordination.',
            },
            {
              symbol: '03',
              title: 'Subsidy-Ready DCR & BIS Hardware',
              desc: 'Indian-made DCR panels, BIS-certified inverters, surge protection, and galvanized structures built for North Gujarat heat.',
            },
            {
              symbol: '04',
              title: 'Transparent Sizing & Maintenance',
              desc: 'Honest kW recommendations based on your actual UGVCL bill — no inflated claims, plus ongoing inspection and cleaning support.',
            },
          ];

  return (
    <div>
      {/* 1. HERO (Exact Designer Layout) */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              {lang === 'gu' ? (
                <>
                  પાટણમાં ઘર, દુકાન અને ફેક્ટરી માટે <span>વિશ્વસનીય રૂફટોપ સોલાર</span>
                </>
              ) : lang === 'hi' ? (
                <>
                  पाटन में घर, दुकान और फैक्ट्री के लिए <span>भरोसेमंद रूफटॉप सोलर</span>
                </>
              ) : (
                <>
                  Trusted Rooftop Solar for <span>Patan &amp; North Gujarat</span>
                </>
              )}
            </h1>
            <p>{t(UI_COPY.hero.subtitle, lang)}</p>

            <div className="hero-buttons">
              <button
                type="button"
                className="btn btn-orange"
                onClick={() => onNavigate(buildPath(lang, 'calculator'))}
              >
                {t(UI_COPY.hero.primaryBtn, lang)}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => onNavigate(buildPath(lang, 'subsidy-patan'))}
              >
                {t(UI_COPY.hero.secondaryBtn, lang)}
              </button>
            </div>

            <div className="hero-points">
              <span>
                ✓ {lang === 'gu' ? 'UGVCL નેટ મીટરિંગ સપોર્ટ' : lang === 'hi' ? 'UGVCL नेट मीटरिंग सपोर्ट' : 'UGVCL Net Metering Support'}
              </span>
              <span>
                ✓ {lang === 'gu' ? '2.18 kWp & PM સૂર્ય ઘર સબસિડી' : lang === 'hi' ? '2.18 kWp व पीएम सूर्य घर सब्सिडी' : '2.18 kWp & PM Surya Ghar Filing'}
              </span>
              <span>
                ✓ {lang === 'gu' ? 'સ્થાનિક પાટણ ઓફિસ અને મેન્ટેનન્સ' : lang === 'hi' ? 'स्थानीय पाटन ऑफिस और मेंटेनेंस' : 'Local Patan Office & Maintenance'}
              </span>
            </div>
          </div>
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

      {/* 3. ABOUT SECTION */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div className="about-image">
            <img
              src={SITE_CONFIG.assets.technicianPhoto}
              alt={
                lang === 'gu'
                  ? 'પાટણમાં Riseion Solar ની ટીમ દ્વારા રૂફટોપ સોલાર તપાસ'
                  : 'Riseion Solar engineer inspecting rooftop solar panels in Patan, Gujarat'
              }
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="image-label">
              <strong>{SITE_CONFIG.brandName}</strong>
              <span>{t(UI_COPY.hero.tagline, lang)}</span>
            </div>
          </div>

          <div className="about-content">
            <h2>
              {lang === 'gu'
                ? 'પાટણ અને ઉત્તર ગુજરાત માટે તમારો સ્થાનિક સોલાર પાર્ટનર'
                : lang === 'hi'
                  ? 'पाटन और उत्तर गुजरात के लिए आपका स्थानीय सोलर पार्टनर'
                  : 'Your Local Patan Partner for Clean, Reliable Solar Energy'}
            </h2>
            <p>
              {lang === 'gu'
                ? 'Riseion Solar (Riseion Technologies નો વિભાગ) પાટણ જિલ્લા, સિદ્ધપુર, ચાણસ્મા, રાધનપુર, હારીજ, મહેસાણા અને ઉત્તર ગુજરાતનાં ઘરો, દુકાનો તથા GIDC ફેક્ટરીઓને ઉચ્ચ ગુણવત્તાવાળી રૂફટોપ સોલાર સિસ્ટમ પૂરી પાડે છે.'
                : lang === 'hi'
                  ? 'Riseion Solar (Riseion Technologies का प्रभाग) पाटन, सिद्धपुर, चाणस्मा, राधनपुर, हारीज, मेहसाणा और पूरे उत्तर गुजरात के घरों, दुकानों व GIDC फैक्ट्रियों के लिए भरोसेमंद रूफटॉप सोलर समाधान देता है।'
                  : 'Riseion Solar (a division of Riseion Technologies) delivers engineered rooftop solar installations, UGVCL net metering, subsidy documentation, and maintenance across Patan district, Siddhpur, Chanasma, Radhanpur, Mehsana, and North Gujarat.'}
            </p>
            <p>
              {lang === 'gu'
                ? 'પદ્મનાભ ચોકડી પાસે અમારી કાયમી ઓફિસ હોવાથી અમે પહેલા દિવસની સાઇટ વિઝિટથી લઈને UGVCL નેટ મીટર અને બેંકમાં સબસિડી જમા થાય ત્યાં સુધી દરેક પગલે તમારી સાથે રહીએ છીએ.'
                : lang === 'hi'
                  ? 'पद्मनाभ चौकड़ी, पाटन में हमारे स्थानीय कार्यालय के साथ, हम मुफ्त साइट निरीक्षण से लेकर UGVCL नेट मीटरिंग और बैंक में सब्सिडी आने तक हर चरण में आपका साथ देते हैं।'
                  : 'From our local office near Padmanabh Chokdi, Patan, we handle roof inspection, system engineering, PM Surya Ghar & 2.18 kWp state top-up filing, and long-term maintenance.'}
            </p>
            <div className="hero-buttons" style={{ marginTop: 22 }}>
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => onOpenEnquiry({ projectType: 'Residential' })}
              >
                {t(UI_COPY.nav.cta, lang)}
              </button>
              <button
                type="button"
                className="btn btn-green"
                onClick={() => onNavigate(buildPath(lang, 'projects'))}
              >
                {t(UI_COPY.nav.projects, lang)}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES / SOLUTIONS */}
      <section className="section light-section" id="services">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.solutions.heading, lang)}</h2>
            <p>{t(UI_COPY.solutions.sub, lang)}</p>
          </div>

          <div className="service-grid">
            {UI_COPY.solutions.items.map((item, idx) => (
              <article
                key={item.key}
                className={`service-card${idx === 1 ? ' featured-card' : ''}`}
              >
                <img
                  src={solutionImages[item.key]}
                  alt={t(item.title, lang)}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="service-card-body">
                  <div>
                    <h3>{t(item.title, lang)}</h3>
                    <p>{t(item.desc, lang)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      className="card-link"
                      onClick={() => onNavigate(buildPath(lang, 'calculator'))}
                    >
                      {t(item.cta, lang)} →
                    </button>
                    <button
                      type="button"
                      className="text-xs font-bold text-[#123b70] underline cursor-pointer bg-transparent border-0"
                      onClick={() =>
                        onOpenEnquiry({
                          projectType:
                            item.key === 'residential'
                              ? 'Residential'
                              : item.key === 'commercial'
                                ? 'Commercial'
                                : 'Industrial',
                        })
                      }
                    >
                      {t(UI_COPY.nav.cta, lang)}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALCULATOR & 2.18 kWp PATAN SUBSIDY BANNER */}
      <section className="calculator-banner">
        <div className="container banner-content">
          <div>
            <h2>
              {lang === 'gu'
                ? '2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ અને PM સૂર્ય ઘર સબસિડી — તમારી બચત ગણો'
                : lang === 'hi'
                  ? '2.18 kWp गुजरात राज्य टॉप-अप और पीएम सूर्य घर सब्सिडी — अपनी बचत जानें'
                  : 'Calculate Your 2.18 kWp State Top-Up & PM Surya Ghar Subsidy'}
            </h2>
            <p>
              {lang === 'gu'
                ? 'ગુજરાતની 2.18 kWp રહેણાંક યોજનામાં ₹1,08,100 MNRE બેન્ચમાર્ક પર ₹63,240 કેન્દ્રીય સબસિડી + ₹34,050 (જનરલ, ફાળો ₹10,810) અથવા ₹39,455 (SC/ST, ફાળો ₹5,405) સ્ટેટ ટોપ-અપ મળે છે. 3 kW+ પર ₹78,000 સુધી કેન્દ્રીય સબસિડી લાગુ છે.'
                : lang === 'hi'
                  ? '2.18 kWp घरेलू योजना में ₹1,08,100 बेंचमार्क पर ₹63,240 केंद्रीय सब्सिडी + ₹34,050 (सामान्य, अंश ₹10,810) या ₹39,455 (SC/ST, अंश ₹5,405) राज्य टॉप-अप मिलता है। 3 kW+ पर अधिकतम ₹78,000 केंद्रीय सब्सिडी लागू है।'
                  : 'For eligible UGVCL homes up to 2.18 kWp (₹1,08,100 benchmark), get ₹63,240 central subsidy + ₹34,050 state top-up for General (₹10,810 share) or ₹39,455 for SC/ST (₹5,405 share). Systems of 3 kW+ receive up to ₹78,000 central subsidy.'}
            </p>
            <div className="hero-buttons" style={{ marginTop: 22 }}>
              <button
                type="button"
                className="btn btn-orange"
                onClick={() => onNavigate(buildPath(lang, 'calculator'))}
              >
                {t(UI_COPY.hero.primaryBtn, lang)}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => onNavigate(buildPath(lang, 'subsidy-patan'))}
              >
                {t(UI_COPY.nav.subsidy, lang)}
              </button>
            </div>
          </div>

          <img
            src={SITE_CONFIG.assets.residentialPhoto}
            alt="Rooftop solar system in Patan Gujarat eligible for 2.18 kWp and PM Surya Ghar subsidy"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 6. 4-STEP PROCESS SECTION */}
      <section className="section process-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.process.heading, lang)}</h2>
            <p>
              {lang === 'gu'
                ? 'સાઇટ વિઝિટથી લઈને UGVCL નેટ મીટર અને બેંકમાં સબસિડી જમા થાય ત્યાં સુધી સરળ પ્રક્રિયા.'
                : lang === 'hi'
                  ? 'साइट विज़िट से लेकर UGVCL नेट मीटरिंग और बैंक में सब्सिडी आने तक की सरल प्रक्रिया।'
                  : 'Simple, transparent execution from free Patan site inspection to UGVCL net meter and DBT subsidy.'}
            </p>
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

      {/* 7. WHY RISEION SOLAR + SERVICE AREAS (LOCAL SEO) */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>
              {lang === 'gu'
                ? 'પાટણ અને ઉત્તર ગુજરાતમાં Riseion Solar કેમ પસંદ કરવું?'
                : lang === 'hi'
                  ? 'पाटन और उत्तर गुजरात में Riseion Solar क्यों चुनें?'
                  : 'Why Homeowners & Factories Choose Riseion Solar'}
            </h2>
            <p>{t(UI_COPY.areas.desc, lang)}</p>
          </div>

          <div className="feature-grid">
            {whyFeatures.map((feat) => (
              <div key={feat.symbol} className="feature-card">
                <span className="feature-symbol">{feat.symbol}</span>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Local Patan -> North Gujarat -> Gujarat Service Area Strip */}
          <div className="mt-12 rounded-2xl bg-[#eaf2fb] border border-[#d6e4f5] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-lg font-extrabold text-[#09264b] mb-2">
                  {t(UI_COPY.areas.heading, lang)}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#123b70] font-mono-num">
                  <a href={`tel:${SITE_CONFIG.phones[0].tel}`} className="inline-flex items-center gap-1.5 hover:text-[#20a66a]">
                    <Phone className="w-3.5 h-3.5 text-[#20a66a]" />
                    {SITE_CONFIG.phones[0].display}
                  </a>
                  <a href={`tel:${SITE_CONFIG.phones[1].tel}`} className="inline-flex items-center gap-1.5 hover:text-[#20a66a]">
                    <Phone className="w-3.5 h-3.5 text-[#20a66a]" />
                    {SITE_CONFIG.phones[1].display}
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {SITE_CONFIG.serviceAreas.map((area) => (
                  <span
                    key={area.en}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#d9e4f1] text-xs font-bold text-[#123b70]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#20a66a]" aria-hidden="true" />
                    {t(area, lang)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="section light-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.reviews.heading, lang)}</h2>
            <p>{t(UI_COPY.reviews.sampleNotice, lang)}</p>
          </div>

          <div className="review-grid">
            {SITE_CONFIG.reviews.map((rev) => (
              <article key={rev.id} className="review-card">
                <div>
                  <div className="stars" aria-label={`${rev.stars} out of 5 stars`}>
                    {'★'.repeat(rev.stars)}
                  </div>
                  <p>“{t(rev.text, lang)}”</p>
                </div>
                <div>
                  <strong>{t(rev.name, lang)}</strong>
                  <span>
                    {t(rev.location, lang)} · {rev.systemSize}
                    {rev.isSample ? ' (Sample)' : ''}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={
                SITE_CONFIG.googleReviewUrl ||
                getWhatsAppLink('Hello Riseion Solar Patan, I would like to share my solar review.')
              }
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green"
            >
              {t(UI_COPY.reviews.cta, lang)}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (AEO / Voice Search) */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.faq.heading, lang)}</h2>
            <p>
              {lang === 'gu'
                ? 'પાટણ અને ઉત્તર ગુજરાતમાં સોલાર લગાવતા પહેલાં ગ્રાહકો દ્વારા પૂછાતા સામાન્ય પ્રશ્નોના સ્પષ્ટ જવાબ.'
                : lang === 'hi'
                  ? 'पाटन और उत्तर गुजरात में सोलर लगवाने से पहले पूछे जाने वाले प्रमुख सवालों के स्पष्ट उत्तर।'
                  : 'Clear, verifiable answers on Gujarat 2.18 kWp subsidy, PM Surya Ghar, UGVCL net metering, and roof sizing.'}
            </p>
          </div>

          <div className="faq-list">
            {UI_COPY.faq.items.map((item, idx) => (
              <details key={idx} className="faq-item" open={idx === 0}>
                <summary>{t(item.q, lang)}</summary>
                <p>{t(item.a, lang)}</p>
              </details>
            ))}
          </div>

          <p className="faq-src">
            {t(UI_COPY.faq.sourceLine, lang)}{' '}
            <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer">
              pmsuryaghar.gov.in
            </a>
            {' · '}
            <a href="https://www.ugvcl.com" target="_blank" rel="noopener noreferrer">
              ugvcl.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};
