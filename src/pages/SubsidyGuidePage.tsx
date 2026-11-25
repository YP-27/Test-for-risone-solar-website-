import React from 'react';
import { CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { SITE_CONFIG, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';
import { buildPath } from '../components/NavbarFooter';

interface SubsidyGuidePageProps {
  lang: Lang;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (prefill?: { projectType?: string }) => void;
}

export const SubsidyGuidePage: React.FC<SubsidyGuidePageProps> = ({
  lang,
  onNavigate,
  onOpenEnquiry,
}) => {
  const rows = [
    {
      size: '1 kW',
      benchmark: '₹50,000',
      central: '₹30,000',
      stateGen: '₹15,000',
      payGen: '₹5,000 (10%)',
      stateSc: '₹17,500',
      paySc: '₹2,500 (5%)',
    },
    {
      size: '2 kW',
      benchmark: '₹1,00,000',
      central: '₹60,000',
      stateGen: '₹30,000',
      payGen: '₹10,000 (10%)',
      stateSc: '₹35,000',
      paySc: '₹5,000 (5%)',
    },
    {
      size: '2.18 kWp (Max Top-Up)',
      benchmark: '₹1,08,100',
      central: '₹63,240',
      stateGen: '₹34,050',
      payGen: '₹10,810 (10%)',
      stateSc: '₹39,455',
      paySc: '₹5,405 (5%)',
      highlight: true,
    },
    {
      size: '3 kW & above',
      benchmark: 'Market / EPC quote',
      central: '₹78,000 (Max cap)',
      stateGen: 'Not applicable',
      payGen: 'Invoice − ₹78,000',
      stateSc: 'Not applicable',
      paySc: 'Invoice − ₹78,000',
    },
  ];

  const rules =
    lang === 'gu'
      ? [
          '10% (જનરલ) અને 5% (SC/ST) ગ્રાહક ફાળો MNRE બેન્ચમાર્ક ખર્ચ (₹1,08,100) પર ગણાય છે — જો તમે પ્રીમિયમ પેનલ કે ઊંચું સ્ટ્રક્ચર લો તો વધારાનો તફાવત અલગ ગણાય.',
          '2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ સબસિડી મેળવનાર ગ્રાહક ઇન્સ્ટોલેશનની તારીખથી 3 વર્ષ સુધી સોલાર ક્ષમતા વધારી શકતા નથી.',
          '2.18 kWp થી વધુ ક્ષમતાની સિસ્ટમ (જેમ કે 3 kW) પર આ સ્ટેટ ટોપ-અપ લાગુ પડતો નથી — તેને ફક્ત કેન્દ્રીય PM સૂર્ય ઘર સબસિડી (મહત્તમ ₹78,000) મળે છે.',
          'સબસિડી માટે pmsuryaghar.gov.in પર નોંધાયેલ વેન્ડર, ભારતીય DCR પેનલ અને BIS ઇન્વર્ટર ફરજિયાત છે.',
        ]
      : lang === 'hi'
        ? [
            '10% (सामान्य) और 5% (SC/ST) ग्राहक योगदान MNRE बेंचमार्क लागत (₹1,08,100) पर आधारित होता है।',
            '2.18 kWp राज्य टॉप-अप लेने के बाद उपभोक्ता 3 वर्ष तक रूफटॉप सोलर क्षमता नहीं बढ़ा सकते।',
            '2.18 kWp से बड़ी क्षमता (जैसे 3 kW) पर राज्य टॉप-अप लागू नहीं होता — केवल ₹78,000 तक केंद्रीय पीएम सूर्य घर सब्सिडी मिलती है।',
            'सब्सिडी के लिए pmsuryaghar.gov.in पर पंजीकृत वेंडर, भारतीय DCR पैनल और BIS इन्वर्टर अनिवार्य हैं।',
          ]
        : [
            'The 10% (General) and 5% (SC/ST) customer share is computed on the MNRE benchmark cost (₹1,08,100), not custom structural upgrades.',
            'Consumers claiming the Gujarat 2.18 kWp state top-up cannot expand rooftop solar capacity for 3 years from commissioning.',
            'Systems exceeding 2.18 kWp (such as 3 kW or 5 kW) do not receive the state top-up — they qualify for PM Surya Ghar central subsidy up to ₹78,000.',
            'Both subsidies require a pmsuryaghar.gov.in empanelled vendor, Indian-made DCR panels, BIS-certified inverter, and UGVCL net-meter inspection.',
          ];

  const docs =
    lang === 'gu'
      ? [
          'તાજેતરનું UGVCL વીજ બિલ (કન્ઝ્યુમર નંબર અને સેન્ક્શન્ડ લોડ સાથે)',
          'આધાર કાર્ડ (નામ UGVCL બિલ સાથે બરાબર મળતું આવવું જોઈએ)',
          'બેંક પાસબુક અથવા કેન્સલ ચેક (DBT સબસિડી જમા થવા માટે — નામ એકસરખું હોવું જરૂરી)',
          'પાસપોર્ટ સાઇઝ ફોટો અને મોબાઇલ નંબર (OTP માટે)',
          'SC/ST કેટેગરીના 5% લાભ માટે માન્ય જાતિનું પ્રમાણપત્ર (જો લાગુ પડે તો)',
        ]
      : lang === 'hi'
        ? [
            'ताज़ा UGVCL बिजली बिल (कंज्यूमर नंबर और सैंक्शंड लोड के साथ)',
            'आधार कार्ड (UGVCL बिल से नाम हूबहू मिलना चाहिए)',
            'बैंक पासबुक या कैंसल चेक (DBT सब्सिडी के लिए समान नाम जरूरी)',
            'पासपोर्ट साइज फोटो और OTP हेतु सक्रिय मोबाइल नंबर',
            'SC/ST 5% लाभ के लिए वैध जाति प्रमाण पत्र (यदि लागू हो)',
          ]
        : [
            'Latest UGVCL electricity bill showing consumer number and sanctioned load',
            'Aadhaar card (name must match the UGVCL electricity bill exactly)',
            'Cancelled cheque or bank passbook front page for DBT subsidy credit (same account holder name)',
            'Passport-size photograph and active mobile number for portal OTP',
            'Valid caste certificate if claiming the 5% SC/ST Gujarat top-up slab',
          ];

  return (
    <div>
      {/* 1. PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>
            {lang === 'gu' ? (
              <>
                પાટણ (UGVCL) સોલાર સબસિડી ગાઇડ 2026: <span>2.18 kWp અને PM સૂર્ય ઘર</span>
              </>
            ) : lang === 'hi' ? (
              <>
                पाटन (UGVCL) सोलर सब्सिडी गाइड 2026: <span>2.18 kWp व पीएम सूर्य घर</span>
              </>
            ) : (
              <>
                Patan &amp; North Gujarat (UGVCL) <span>Solar Subsidy Guide 2026</span>
              </>
            )}
          </h1>
          <p>
            {lang === 'gu'
              ? 'ઘરની છત પર સોલાર લગાવતા પહેલાં 2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ અને 3 kW+ PM સૂર્ય ઘર સબસિડીના સત્તાવાર નિયમો, ગણતરી અને UGVCL નેટ મીટરિંગ પ્રક્રિયા એક જ જગ્યાએ જાણો.'
              : lang === 'hi'
                ? 'घर की छत पर सोलर लगवाने से पहले 2.18 kWp गुजरात राज्य टॉप-अप और 3 kW+ पीएम सूर्य घर सब्सिडी की सटीक गणना, नियम और UGVCL नेट मीटरिंग प्रक्रिया जानें।'
                : 'Complete, verifiable breakdown of the Gujarat 2.18 kWp residential state top-up, PM Surya Ghar central slabs up to ₹78,000, UGVCL net metering steps, and required documents.'}
          </p>
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
              onClick={() => onOpenEnquiry({ projectType: 'Residential' })}
            >
              {t(UI_COPY.nav.cta, lang)}
            </button>
          </div>
        </div>
      </section>

      {/* 2. AEO QUICK ANSWER + VERIFIED TABLE */}
      <section className="section">
        <div className="container space-y-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#e8f7ef] border-l-[6px] border-[#20a66a]">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#09264b] mb-3">
              {lang === 'gu'
                ? 'ટૂંકો જવાબ: પાટણમાં 2.18 kWp vs 3 kW — કયું પસંદ કરવું?'
                : lang === 'hi'
                  ? 'संक्षिप्त उत्तर: पाटन में 2.18 kWp बनाम 3 kW — कौन सा बेहतर है?'
                  : 'Quick Answer: 2.18 kWp State Top-Up vs 3 kW PM Surya Ghar in Patan'}
            </h2>
            <p className="text-sm text-[#26364a] leading-relaxed">
              {lang === 'gu'
                ? 'જો તમારું માસિક UGVCL વપરાશ 200 થી 260 યુનિટની આસપાસ હોય, તો 2.18 kWp સિસ્ટમમાં કુલ ₹97,290 (જનરલ) થી ₹1,02,695 (SC/ST) સુધીની સબસિડી મળે છે (MNRE બેન્ચમાર્ક ₹1,08,100 પર ગ્રાહક ફાળો ₹10,810 / ₹5,405). જો ઘરમાં 2+ એસી હોય અને મહિને 350+ યુનિટ વપરાય, તો 3 kW અથવા વધુ (₹78,000 કેન્દ્રીય સબસિડી) વધુ યોગ્ય રહે છે કારણ કે 2.18 kWp યોજનામાં 3 વર્ષ સુધી ક્ષમતા વધારી શકાતી નથી.'
                : lang === 'hi'
                  ? 'यदि आपकी मासिक UGVCL खपत ~200–260 यूनिट है, तो 2.18 kWp सिस्टम पर कुल ₹97,290 (सामान्य) से ₹1,02,695 (SC/ST) तक सब्सिडी मिलती है (₹1,08,100 बेंचमार्क पर आपका हिस्सा ₹10,810 / ₹5,405)। यदि खपत 350+ यूनिट/माह है, तो 3 kW या अधिक (₹78,000 केंद्रीय सब्सिडी) चुनें क्योंकि 2.18 kWp योजना में 3 साल तक विस्तार नहीं किया जा सकता।'
                  : 'If your Patan UGVCL home uses ~200–260 units/month, a 2.18 kWp system qualifies for ₹97,290 total subsidy (General: ₹10,810 customer share on ₹1,08,100 benchmark) or ₹1,02,695 (SC/ST: ₹5,405 share). If you run multiple ACs and consume 350+ units/month, choose 3 kW or larger (₹78,000 central subsidy cap) since the 2.18 kWp state top-up carries a 3-year expansion lock.'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <h2 className="text-2xl font-extrabold text-[#09264b]">
                {lang === 'gu'
                  ? 'સબસિડી ગણતરી કોષ્ટક (UGVCL રહેણાંક — MNRE બેન્ચમાર્ક મુજબ)'
                  : lang === 'hi'
                    ? 'सब्सिडी तुलना तालिका (UGVCL घरेलू — MNRE बेंचमार्क अनुसार)'
                    : 'Official Residential Subsidy Table (UGVCL · MNRE Benchmark)'}
              </h2>
              <span className="text-xs font-semibold text-[#6d7a8a]">
                Benchmark: ₹50,000/kW (up to 2 kW) + ₹45,000/kW (2–2.18 kWp)
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#e3e9f0] shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#123b70] text-white text-xs">
                    <th className="py-3.5 px-4 font-bold">System Size</th>
                    <th className="py-3.5 px-4 font-bold text-right">MNRE Benchmark</th>
                    <th className="py-3.5 px-4 font-bold text-right">Central (PM Surya Ghar)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Gujarat Top-Up (Gen)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Customer Share (Gen)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Gujarat Top-Up (SC/ST)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Customer Share (SC/ST)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e3e9f0] tabular-nums">
                  {rows.map((r) => (
                    <tr
                      key={r.size}
                      className={r.highlight ? 'bg-[#e8f7ef] font-semibold' : 'bg-white hover:bg-[#f5f7fa]'}
                    >
                      <td className="py-3.5 px-4 text-[#09264b] font-bold">{r.size}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num">{r.benchmark}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num text-[#123b70]">{r.central}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num text-[#147a4b]">{r.stateGen}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num font-extrabold">{r.payGen}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num text-[#147a4b]">{r.stateSc}</td>
                      <td className="py-3.5 px-4 text-right font-mono-num font-extrabold">{r.paySc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-[#6d7a8a]">
              Official portals:{' '}
              <a
                href="https://pmsuryaghar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#20a66a] underline font-bold inline-flex items-center gap-1"
              >
                pmsuryaghar.gov.in <ExternalLink className="w-3 h-3" />
              </a>
              {' · '}
              <a
                href="https://www.ugvcl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#20a66a] underline font-bold inline-flex items-center gap-1"
              >
                ugvcl.com <ExternalLink className="w-3 h-3" />
              </a>
              {' · '}Last verified: 25 November 2026. Verify active DISCOM circular at application time.
            </p>
          </div>

          {/* Rules + UGVCL Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-7 rounded-2xl border border-[#f5d4b3] border-t-4 border-t-[#ff8b28] bg-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#09264b] font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-[#ff8b28] shrink-0" />
                <h3>
                  {lang === 'gu'
                    ? 'સબસિડી માટે અગત્યના નિયમો (બુકિંગ પહેલાં વાંચો)'
                    : lang === 'hi'
                      ? 'सब्सिडी के महत्वपूर्ण नियम (बुकिंग से पहले पढ़ें)'
                      : 'Key Subsidy Rules & Disclosures'}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#26364a] leading-relaxed">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono-num text-xs font-extrabold text-[#ff8b28] mt-1">
                      0{idx + 1}.
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl border border-[#e3e9f0] border-t-4 border-t-[#20a66a] bg-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#09264b] font-extrabold text-base">
                <CheckCircle2 className="w-5 h-5 text-[#20a66a] shrink-0" />
                <h3>
                  {lang === 'gu'
                    ? 'UGVCL અરજી માટે જરૂરી દસ્તાવેજો'
                    : lang === 'hi'
                      ? 'UGVCL आवेदन के लिए आवश्यक दस्तावेज़'
                      : 'Documents Needed for UGVCL Filing'}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#26364a] leading-relaxed">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#20a66a] shrink-0 mt-1" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPACT CTA */}
      <section className="section light-section">
        <div className="container">
          <div className="compact-solar-cta">
            <div>
              <h2>
                {lang === 'gu'
                  ? 'તમારા UGVCL બિલ મુજબ ચોક્કસ સબસિડી અને સાઇઝ જાણવી છે?'
                  : lang === 'hi'
                    ? 'अपने UGVCL बिल के अनुसार सटीक सब्सिडी और साइज जानना चाहते हैं?'
                    : 'Want Exact Sizing & Subsidy Eligibility for Your UGVCL Bill?'}
              </h2>
              <p>
                {lang === 'gu'
                  ? 'અમારું કેલ્ક્યુલેટર વાપરો અથવા પાટણ ટીમ સાથે મફત સાઇટ વિઝિટ બુક કરો — અમે દુકાન અને પાટણ GIDC ફેક્ટરીઓ માટે પણ વિગતવાર ક્વોટ આપીએ છીએ.'
                  : `Use our UGVCL calculator or book a free roof inspection with our Patan team (${SITE_CONFIG.phones[0].display}).`}
              </p>
              <div className="hero-buttons mt-4">
                <button
                  type="button"
                  className="btn btn-orange"
                  onClick={() => onNavigate(buildPath(lang, 'calculator'))}
                >
                  {t(UI_COPY.nav.calculator, lang)}
                </button>
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={() => onOpenEnquiry({ projectType: 'Residential' })}
                >
                  {t(UI_COPY.nav.cta, lang)}
                </button>
              </div>
            </div>
            <img
              src={SITE_CONFIG.assets.residentialPhoto}
              alt="Patan rooftop solar panels under UGVCL subsidy"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
