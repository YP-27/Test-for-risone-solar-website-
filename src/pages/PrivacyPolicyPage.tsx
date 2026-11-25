import React from 'react';
import { SITE_CONFIG, type Lang } from '../config/siteConfig';
import { t } from '../content/translations';

interface PrivacyPolicyPageProps {
  lang: Lang;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ lang }) => {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>
            {lang === 'gu' ? (
              <>
                પ્રાઇવસી પોલિસી — <span>Riseion Solar</span>
              </>
            ) : lang === 'hi' ? (
              <>
                प्राइवेसी पॉलिसी — <span>Riseion Solar</span>
              </>
            ) : (
              <>
                Privacy Policy — <span>Riseion Solar</span>
              </>
            )}
          </h1>
          <p>
            Effective Date: 25 November 2026 · Meta Lead Ads &amp; India DPDP Act Ready · Operated by{' '}
            {SITE_CONFIG.parentCompany}, Patan, Gujarat, India.
          </p>
        </div>
      </section>

      <section className="section">
        <article className="container max-w-4xl space-y-8 text-sm text-[#26364a] leading-relaxed">
          {lang === 'gu' && (
            <section className="p-6 rounded-2xl bg-[#e8f7ef] border-l-[6px] border-[#20a66a] space-y-2">
              <h2 className="text-base font-extrabold text-[#09264b]">ગુજરાતી સારાંશ (ટૂંકી માહિતી)</h2>
              <p>
                <strong>Riseion Solar</strong> (<strong>{SITE_CONFIG.parentCompany}</strong> નો વિભાગ, પાટણ) તમારી અંગત માહિતીની સુરક્ષા કરે છે. જ્યારે તમે અમારી વેબસાઇટ, સોલાર કેલ્ક્યુલેટર અથવા Meta (Facebook / Instagram) લીડ ફોર્મ પર તમારું નામ, મોબાઇલ નંબર, સરનામું કે વીજ બિલની વિગતો આપો છો, ત્યારે તેનો ઉપયોગ ફક્ત સોલાર સાઇટ વિઝિટ, ક્વોટેશન અને UGVCL / PM સૂર્ય ઘર સબસિડી માર્ગદર્શન માટે જ થાય છે. અમે તમારી માહિતી ક્યારેય કોઈ ત્રીજી પાર્ટીને વેચતા નથી. તમારી માહિતી સુધારવા કે ડિલીટ કરવા માટે <strong>{SITE_CONFIG.phones[0].display}</strong> પર સંપર્ક કરો.
              </p>
            </section>
          )}

          {lang === 'hi' && (
            <section className="p-6 rounded-2xl bg-[#e8f7ef] border-l-[6px] border-[#20a66a] space-y-2">
              <h2 className="text-base font-extrabold text-[#09264b]">हिन्दी सारांश</h2>
              <p>
                <strong>Riseion Solar</strong> (<strong>{SITE_CONFIG.parentCompany}</strong>, पाटन) आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध है। वेबसाइट पूछताछ फॉर्म, सोलर कैलकुलेटर या Meta (Facebook / Instagram) लीड फॉर्म पर दिया गया नाम, मोबाइल नंबर, पता और बिजली बिल विवरण केवल सोलर साइट विज़िट, कोटेशन और UGVCL / पीएम सूर्य घर सब्सिडी सहायता के लिए उपयोग किया जाता है। हम आपका डेटा किसी थर्ड पार्टी को नहीं बेचते। डेटा हटाने के लिए <strong>{SITE_CONFIG.phones[0].display}</strong> पर संपर्क करें।
              </p>
            </section>
          )}

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#09264b]">1. Who We Are</h2>
            <p>
              This Privacy Policy explains how <strong>Riseion Solar</strong>, a rooftop solar service operated by{' '}
              <strong>{SITE_CONFIG.parentCompany}</strong>, located at{' '}
              <strong>{SITE_CONFIG.address.en}</strong>, collects, uses, stores, and protects personal information submitted through our website, solar calculator, WhatsApp chat, and Meta (Facebook &amp; Instagram) Lead Ads forms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#09264b]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Contact details: Full name, mobile / WhatsApp number, city/taluka, and site address.</li>
              <li>Solar planning details: Property type (Home, Shop, Factory), approximate monthly electricity bill or unit consumption, and roof area if provided.</li>
              <li>Campaign attribution metadata: Source page URL, language preference, and UTM campaign tags (for measuring Meta/Google ad performance).</li>
              <li>We do not collect Aadhaar, bank details, or payment card numbers via our public website forms. Official subsidy KYC documents are collected only in person/on official government portals (<code>pmsuryaghar.gov.in</code>) once you confirm an order.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#09264b]">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To contact you via phone call or WhatsApp regarding your solar enquiry or free rooftop site inspection.</li>
              <li>To prepare an accurate solar system sizing, pricing quotation, and UGVCL / PM Surya Ghar / Gujarat 2.18 kWp subsidy eligibility estimate.</li>
              <li>To coordinate installation, UGVCL net metering, and post-installation maintenance support.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#09264b]">4. Data Sharing &amp; Storage</h2>
            <p>
              We <strong>do not sell, rent, or trade</strong> your phone number or personal information to third-party marketers or lead brokers. Enquiry records are stored securely on our controlled backend server accessible only to authorized Riseion Solar staff. If you proceed with a solar installation, required details are shared solely with relevant utility/government portals (such as UGVCL and PM Surya Ghar National Portal) with your explicit consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#09264b]">5. Your Rights (Access, Correction &amp; Deletion)</h2>
            <p>
              Under applicable Indian data protection principles (including the Digital Personal Data Protection Act, 2023), you may request access to, correction of, or permanent deletion of your enquiry data at any time, or opt out of WhatsApp/phone follow-ups.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#f5f7fa] border border-[#e3e9f0] space-y-2">
            <h2 className="text-base font-extrabold text-[#09264b]">6. Grievance &amp; Privacy Contact</h2>
            <p><strong>Entity:</strong> Riseion Solar (Division of {SITE_CONFIG.parentCompany})</p>
            <p><strong>Address:</strong> {t(SITE_CONFIG.address, lang)}</p>
            <p className="font-mono-num">
              <strong>Phone / WhatsApp:</strong> {SITE_CONFIG.phones[0].display} / {SITE_CONFIG.phones[1].display}
            </p>
            <p><strong>Email:</strong> {SITE_CONFIG.email}</p>
          </section>
        </article>
      </section>
    </div>
  );
};
