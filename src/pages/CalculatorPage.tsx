import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink, type Lang } from '../config/siteConfig';
import { UI_COPY, t } from '../content/translations';
import type { EnquiryPrefill } from '../components/EnquiryModal';
import { calculateSolarEstimate } from '../../server/calculator';

interface CalcApiResult {
  recommendedKw: number;
  panelsCount: number;
  panelWatt: number;
  monthlyGenerationUnits: number;
  monthlySavingsInr: number;
  annualSavingsInr: number;
  requiredRoofSqft: number;
  roofLimited: boolean;
  estimatedCentralSubsidyInr: number;
  gujaratTopUp218: {
    eligible: boolean;
    capacityKw: number;
    benchmarkCost: number;
    centralSubsidy: number;
    stateTopUpSubsidy: number;
    totalSubsidy: number;
    customerContribution: number;
    contributionPercent: number;
    note: string;
  } | null;
  assumptions: {
    unitsPerKwMonth: number;
    sqftPerKw: number;
    discom: string;
    lastVerifiedDate: string;
  };
}

interface CalculatorPageProps {
  lang: Lang;
  onOpenEnquiry: (prefill?: EnquiryPrefill) => void;
}

function formatInr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ lang, onOpenEnquiry }) => {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [consumerCategory, setConsumerCategory] = useState<'general' | 'sc_st'>('general');
  const [monthlyBill, setMonthlyBill] = useState('2000');
  const [monthlyUnits, setMonthlyUnits] = useState('250');
  const [tariff, setTariff] = useState('7.5');
  const [roofAreaSqft, setRoofAreaSqft] = useState('350');
  const [panelWatt, setPanelWatt] = useState('550');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<CalcApiResult | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      propertyType,
      consumerCategory,
      monthlyBill: monthlyBill ? Number(monthlyBill) : undefined,
      monthlyUnits: monthlyUnits ? Number(monthlyUnits) : undefined,
      tariff: tariff ? Number(tariff) : undefined,
      roofAreaSqft: roofAreaSqft ? Number(roofAreaSqft) : undefined,
      panelWatt: Number(panelWatt),
    };
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Please enter valid units or bill.');
        }
        setResult(data as CalcApiResult);
        return;
      }
      // Static-host fallback (e.g. GitHub Pages where Node backend isn't running)
      const localResult = calculateSolarEstimate(payload);
      setResult(localResult as CalcApiResult);
    } catch (err) {
      try {
        const localResult = calculateSolarEstimate(payload);
        setResult(localResult as CalcApiResult);
      } catch {
        setError(err instanceof Error ? err.message : 'Calculation failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 1. PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>
            {lang === 'gu' ? (
              <>
                પાટણ સોલાર કેલ્ક્યુલેટર — <span>બચત અને સબસિડી ગણો</span>
              </>
            ) : lang === 'hi' ? (
              <>
                पाटन सोलर कैलकुलेटर — <span>बचत और सब्सिडी जानें</span>
              </>
            ) : (
              <>
                Solar System &amp; <span>UGVCL Subsidy Calculator</span>
              </>
            )}
          </h1>
          <p>
            {lang === 'gu'
              ? 'તમારા UGVCL માસિક યુનિટ અથવા વીજ બિલ દાખલ કરો. સિસ્ટમ kW, પેનલ સંખ્યા, બચત અને 2.18 kWp સ્ટેટ ટોપ-અપ અથવા PM સૂર્ય ઘર સબસિડીનો પ્રાથમિક અંદાજ તરત મેળવો.'
              : lang === 'hi'
                ? 'अपने UGVCL मासिक यूनिट या बिजली बिल भरें और सोलर साइज, पैनल संख्या, बचत व सब्सिडी का अनुमान तुरंत पाएं।'
                : 'Enter your monthly UGVCL electricity bill or kWh units to estimate recommended kW size, panel count, monthly savings, and Gujarat 2.18 kWp / PM Surya Ghar subsidy.'}
          </p>
        </div>
      </section>

      {/* 2. CALCULATOR FORM + SIDE CARD */}
      <section className="section">
        <div className="container calculator-layout">
          <form onSubmit={handleCalculate} className="calculator-form">
            <h2>
              {lang === 'gu'
                ? 'તમારી UGVCL વીજળીની વિગતો ભરો'
                : lang === 'hi'
                  ? 'अपनी UGVCL बिजली की जानकारी भरें'
                  : 'Enter Your Electricity Details'}
            </h2>
            <p className="form-description">
              {lang === 'gu'
                ? 'ઉત્તર ગુજરાતના સરેરાશ તડકા (~120 યુનિટ/kW/મહિનો) મુજબ ગણતરી કરવામાં આવે છે.'
                : lang === 'hi'
                  ? 'उत्तर गुजरात की औसत धूप (~120 यूनिट/kW/माह) के आधार पर गणना की जाती है।'
                  : 'Calculated using North Gujarat average sunshine (~120 units/kW/month) and verified UGVCL slabs.'}
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="calc-property">
                  {lang === 'gu' ? 'પ્રોપર્ટીનો પ્રકાર' : lang === 'hi' ? 'प्रॉपर्टी का प्रकार' : 'Property Type'}
                </label>
                <select
                  id="calc-property"
                  value={propertyType}
                  onChange={(e) => {
                    const val = e.target.value as 'residential' | 'commercial' | 'industrial';
                    setPropertyType(val);
                    if (val === 'commercial') setTariff('9.5');
                    else if (val === 'industrial') setTariff('9.0');
                    else setTariff('7.5');
                  }}
                >
                  <option value="residential">
                    {lang === 'gu' ? 'ઘર (Residential)' : lang === 'hi' ? 'घर (Residential)' : 'Home (Residential)'}
                  </option>
                  <option value="commercial">
                    {lang === 'gu' ? 'દુકાન / ઓફિસ (Commercial)' : lang === 'hi' ? 'दुकान / ऑफिस (Commercial)' : 'Shop / Office (Commercial)'}
                  </option>
                  <option value="industrial">
                    {lang === 'gu' ? 'ફેક્ટરી / GIDC (Industrial)' : lang === 'hi' ? 'फैक्ट्री / GIDC (Industrial)' : 'Factory / Patan GIDC (Industrial)'}
                  </option>
                </select>
              </div>

              {propertyType === 'residential' ? (
                <div className="form-group">
                  <label htmlFor="calc-cat">
                    {lang === 'gu' ? '2.18 kWp સબસિડી કેટેગરી' : lang === 'hi' ? '2.18 kWp सब्सिडी श्रेणी' : '2.18 kWp Top-Up Category'}
                  </label>
                  <select
                    id="calc-cat"
                    value={consumerCategory}
                    onChange={(e) => setConsumerCategory(e.target.value as 'general' | 'sc_st')}
                  >
                    <option value="general">General (10% share — ₹10,810)</option>
                    <option value="sc_st">SC / ST (5% share — ₹5,405)</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="calc-watt-alt">Panel Wattage (DCR)</label>
                  <select
                    id="calc-watt-alt"
                    value={panelWatt}
                    onChange={(e) => setPanelWatt(e.target.value)}
                  >
                    <option value="500">500 Watt</option>
                    <option value="540">540 Watt</option>
                    <option value="550">550 Watt (Standard)</option>
                    <option value="580">580 Watt</option>
                    <option value="600">600 Watt</option>
                  </select>
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="calc-bill">
                  {lang === 'gu' ? 'માસિક વીજ બિલ (₹)' : lang === 'hi' ? 'मासिक बिजली बिल (₹)' : 'Monthly Electricity Bill (₹)'}
                </label>
                <input
                  id="calc-bill"
                  type="number"
                  min={0}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="calc-units">
                  {lang === 'gu' ? 'માસિક વપરાશ (યુનિટ / kWh)' : lang === 'hi' ? 'मासिक खपत (यूनिट / kWh)' : 'Monthly Units (kWh)'}
                </label>
                <input
                  id="calc-units"
                  type="number"
                  min={0}
                  value={monthlyUnits}
                  onChange={(e) => setMonthlyUnits(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="calc-tariff">
                  {lang === 'gu' ? 'વીજળી દર (₹ / યુનિટ)' : lang === 'hi' ? 'बिजली दर (₹ / यूनिट)' : 'Electricity Rate (₹ / Unit)'}
                </label>
                <input
                  id="calc-tariff"
                  type="number"
                  step="0.1"
                  min={1}
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="calc-roof">
                  {lang === 'gu' ? 'છતની જગ્યા (ચો. ફૂટ)' : lang === 'hi' ? 'छत का क्षेत्रफल (वर्ग फुट)' : 'Available Roof Area (sq. ft.)'}
                </label>
                <input
                  id="calc-roof"
                  type="number"
                  min={0}
                  value={roofAreaSqft}
                  onChange={(e) => setRoofAreaSqft(e.target.value)}
                />
              </div>
            </div>

            {propertyType === 'residential' && (
              <div className="form-group">
                <label htmlFor="calc-watt">
                  {lang === 'gu' ? 'પેનલ વોટેજ (DCR Mono / TopCon)' : lang === 'hi' ? 'पैनल वाटेज (DCR Mono / TopCon)' : 'Panel Wattage (DCR Mono / TopCon)'}
                </label>
                <select
                  id="calc-watt"
                  value={panelWatt}
                  onChange={(e) => setPanelWatt(e.target.value)}
                >
                  <option value="500">500 Watt</option>
                  <option value="540">540 Watt</option>
                  <option value="550">550 Watt (Standard)</option>
                  <option value="580">580 Watt</option>
                  <option value="600">600 Watt</option>
                </select>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-orange full-button"
            >
              {loading
                ? 'Calculating...'
                : lang === 'gu'
                  ? 'મારી સોલાર સિસ્ટમ ગણો'
                  : lang === 'hi'
                    ? 'मेरा सोलर सिस्टम गणना करें'
                    : 'Calculate My Solar System'}
            </button>

            <p className="form-note">
              {lang === 'gu'
                ? 'નોંધ: આ પ્રાથમિક અંદાજ છે (~120 યુનિટ/kW/મહિનો અને ~100 ચો.ફૂટ/kW). ચોક્કસ kW સાઇટ વિઝિટ પછી નક્કી થશે.'
                : lang === 'hi'
                  ? 'नोट: यह प्राथमिक अनुमान है (~120 यूनिट/kW/माह)। अंतिम क्षमता साइट विज़िट के बाद तय होगी।'
                  : 'Note: Estimate assumes ~120 units/kW/month in North Gujarat sunshine and ~100 sq. ft./kW. Final capacity is confirmed after free roof inspection.'}
            </p>
          </form>

          <aside className="calculator-side">
            <img
              src={SITE_CONFIG.assets.residentialPhoto}
              alt="Residential rooftop solar installation in Patan, Gujarat"
              referrerPolicy="no-referrer"
            />
            <div className="side-content">
              <span className="green-label">SMART ENERGY CHOICE · UGVCL PATAN</span>
              <h3>
                {lang === 'gu'
                  ? 'પાટણ માટે 2.18 kWp અને PM સૂર્ય ઘર સબસિડી'
                  : lang === 'hi'
                    ? 'पाटन के लिए 2.18 kWp व पीएम सूर्य घर सब्सिडी'
                    : 'Verified 2.18 kWp & PM Surya Ghar Slabs'}
              </h3>
              <p>
                {lang === 'gu'
                  ? 'મહિને 250 યુનિટ વપરાશ નાખીને ગણતરી કરો અને જુઓ ગુજરાતની 2.18 kWp સ્ટેટ ટોપ-અપ યોજનામાં તમારો અંદાજિત ફાળો કેટલો આવે છે.'
                  : lang === 'hi'
                    ? 'मासिक 250 यूनिट डालकर गणना करें और जानें कि 2.18 kWp गुजरात राज्य टॉप-अप में आपका हिस्सा कितना होगा।'
                    : 'Try 250 units/month for a Home to see the exact Gujarat 2.18 kWp State Top-Up breakdown (₹10,810 General / ₹5,405 SC-ST on ₹1,08,100 benchmark).'}
              </p>

              <div className="mt-5 pt-4 border-t border-white/15 space-y-2 text-xs font-mono-num">
                <div className="flex justify-between">
                  <span className="text-white/75">2.18 kWp General (10%)</span>
                  <strong className="text-[#69dfa2]">₹10,810 share</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">2.18 kWp SC / ST (5%)</span>
                  <strong className="text-[#69dfa2]">₹5,405 share</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">3 kW+ PM Surya Ghar</span>
                  <strong className="text-[#ff8b28]">₹78,000 subsidy</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. RESULTS SECTION */}
      <section className="section light-section" aria-live="polite">
        <div className="container">
          <div className="section-heading">
            <h2>
              {lang === 'gu'
                ? 'તમારો સોલાર સિસ્ટમ અંદાજ'
                : lang === 'hi'
                  ? 'आपका सोलर सिस्टम अनुमान'
                  : 'Your Estimated Solar Requirement'}
            </h2>
            <p>
              {result
                ? `UGVCL Patan Estimate · Verified ${result.assumptions.lastVerifiedDate}`
                : lang === 'gu'
                  ? 'ઉપરના ફોર્મમાં વિગતો ભરીને “મારી સોલાર સિસ્ટમ ગણો” પર ક્લિક કરો.'
                  : 'Submit the calculator form above to generate your live UGVCL solar & subsidy breakdown.'}
            </p>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <span>01</span>
              <h3>{lang === 'gu' ? 'સિસ્ટમ સાઇઝ' : 'Recommended Size'}</h3>
              <strong>{result ? `${result.recommendedKw} kW` : '2.18 kW'}</strong>
              <p>{result ? `${result.requiredRoofSqft} sq. ft. roof needed` : 'Based on UGVCL monthly units'}</p>
            </div>
            <div className="result-card">
              <span>02</span>
              <h3>{lang === 'gu' ? 'સોલાર પેનલ સંખ્યા' : 'Total Panels'}</h3>
              <strong>{result ? `${result.panelsCount} Panels` : '4 Panels'}</strong>
              <p>{result ? `${result.panelWatt}W DCR panels` : '550W DCR Mono / TopCon'}</p>
            </div>
            <div className="result-card">
              <span>03</span>
              <h3>{lang === 'gu' ? 'માસિક વીજ ઉત્પાદન' : 'Monthly Generation'}</h3>
              <strong>{result ? `${result.monthlyGenerationUnits} Units` : '~262 Units'}</strong>
              <p>North Gujarat avg. 120 u/kW/mo</p>
            </div>
            <div className="result-card">
              <span>04</span>
              <h3>{lang === 'gu' ? 'અંદાજિત માસિક બચત' : 'Est. Monthly Saving'}</h3>
              <strong>{result ? formatInr(result.monthlySavingsInr) : '₹1,962'}</strong>
              <p>{result ? `${formatInr(result.annualSavingsInr)} / year est.` : 'Click calculate for exact result'}</p>
            </div>
          </div>

          {result && (
            <div className="mt-8 bg-white border border-[#e3e9f0] rounded-2xl p-6 sm:p-8 shadow-sm">
              {result.roofLimited && (
                <div className="mb-5 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                  System capacity was adjusted to fit your available roof space (~{result.requiredRoofSqft} sq. ft. required).
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#e3e9f0]">
                <h3 className="text-lg font-extrabold text-[#09264b]">
                  UGVCL Subsidy &amp; Annual Savings Breakdown
                </h3>
                <span className="text-sm font-extrabold font-mono-num text-[#20a66a]">
                  Annual Saving: {formatInr(result.annualSavingsInr)} / yr
                </span>
              </div>

              {propertyType === 'residential' ? (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#e3e9f0]">
                    <span className="text-[#26364a] font-medium">
                      PM Surya Ghar Central Subsidy ({result.recommendedKw} kW)
                    </span>
                    <strong className="font-mono-num text-[#123b70]">
                      {formatInr(result.estimatedCentralSubsidyInr)}
                    </strong>
                  </div>

                  {result.gujaratTopUp218 && (
                    <div className="p-5 rounded-xl bg-[#e8f7ef] border border-[#bde6cf] space-y-3 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 font-extrabold text-[#09264b]">
                        <span>
                          Gujarat State Top-Up ({result.gujaratTopUp218.capacityKw} kWp ·{' '}
                          {result.gujaratTopUp218.contributionPercent}% consumer share)
                        </span>
                        <span className="text-xs font-extrabold text-[#147a4b]">
                          {result.gujaratTopUp218.eligible ? 'Eligible Size' : 'Reference Only (> 2.18 kWp)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#26364a] tabular-nums">
                        <div>MNRE Benchmark Cost:</div>
                        <div className="text-right font-mono-num font-bold">
                          {formatInr(result.gujaratTopUp218.benchmarkCost)}
                        </div>
                        <div>Central Subsidy (PM Surya Ghar):</div>
                        <div className="text-right font-mono-num font-bold">
                          {formatInr(result.gujaratTopUp218.centralSubsidy)}
                        </div>
                        <div>Gujarat State Top-Up:</div>
                        <div className="text-right font-mono-num font-bold text-[#147a4b]">
                          {formatInr(result.gujaratTopUp218.stateTopUpSubsidy)}
                        </div>
                        <div className="font-extrabold text-[#09264b]">Est. Customer Share on Benchmark:</div>
                        <div className="text-right font-mono-num font-extrabold text-[#09264b]">
                          {formatInr(result.gujaratTopUp218.customerContribution)}
                        </div>
                      </div>
                      <p className="text-xs text-[#26364a]/80 pt-1">{result.gujaratTopUp218.note}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#6d7a8a]">
                  PM Surya Ghar and 2.18 kWp Gujarat state top-up apply to residential homes only. Commercial shops and Patan GIDC industrial plants benefit from high daytime tariff savings (~{formatInr(result.annualSavingsInr)}/year) and eligible business tax depreciation.
                </p>
              )}

              <div className="hero-buttons mt-6">
                <button
                  type="button"
                  className="btn btn-orange"
                  onClick={() =>
                    onOpenEnquiry({
                      projectType: propertyType,
                      monthlyBill: monthlyBill ? Number(monthlyBill) : undefined,
                      estimatedKw: result.recommendedKw,
                    })
                  }
                >
                  {lang === 'gu' ? 'આ અંદાજ સાથે ક્વોટ બુક કરો' : 'Save Quote Request with this Estimate'}
                </button>
                <a
                  href={getWhatsAppLink(
                    `Hello Riseion Solar Patan, I used your calculator: ${result.recommendedKw} kW (${propertyType}), ${result.panelsCount} panels (${result.panelWatt}W), ~${result.monthlyGenerationUnits} units/month, est. saving ${formatInr(result.monthlySavingsInr)}/month. Please share exact quote.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-green"
                >
                  <MessageCircle className="w-4 h-4" />
                  {lang === 'gu' ? 'WhatsApp પર શેર કરો' : 'Share on WhatsApp'}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. COMPACT CTA */}
      <section className="section">
        <div className="container">
          <div className="compact-solar-cta">
            <div>
              <h2>
                {lang === 'gu'
                  ? 'તમારી છત માટે ચોક્કસ માપ અને સબસિડી રિપોર્ટ જોઈએ છે?'
                  : lang === 'hi'
                    ? 'अपनी छत के लिए सटीक माप और सब्सिडी रिपोर्ट चाहिए?'
                    : 'Need an Exact Roof Survey & Written Quote in Patan?'}
              </h2>
              <p>
                {lang === 'gu'
                  ? 'અમારી પાટણ ટીમ તમારી છતની મફત તપાસ કરી સાચી પેનલ ડિઝાઇન અને UGVCL સબસિડી ફાઇલિંગ સમજાવશે.'
                  : 'Our local Patan engineers visit your property, check shadow & UGVCL sanctioned load, and provide a transparent written quote.'}
              </p>
              <button
                type="button"
                className="btn btn-orange"
                onClick={() => onOpenEnquiry({ projectType: propertyType })}
              >
                {t(UI_COPY.nav.cta, lang)}
              </button>
            </div>
            <img
              src={SITE_CONFIG.assets.technicianPhoto}
              alt="Riseion Solar Patan site survey engineer"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 5. CALCULATOR FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t(UI_COPY.faq.heading, lang)}</h2>
          </div>
          <div className="faq-list">
            {UI_COPY.faq.items.slice(0, 3).map((item, idx) => (
              <details key={idx} className="faq-item" open={idx === 0}>
                <summary>{t(item.q, lang)}</summary>
                <p>{t(item.a, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
