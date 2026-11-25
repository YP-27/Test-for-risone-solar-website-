/**
 * ============================================================================
 * RISEION SOLAR — CENTRAL EDITABLE SITE CONFIG
 * ============================================================================
 * Edit ONLY this file when replacing placeholder stats, reviews, project
 * details, contact numbers, Google Business Profile link, or images.
 * Every page (Gujarati /gu, English /en, Hindi /hi) reads from here.
 * ============================================================================
 */

export type Lang = 'gu' | 'en' | 'hi';

export function withBase(assetPath: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  const clean = assetPath.replace(/^\/+/, '');
  return base ? `${base}/${clean}` : `/${clean}`;
}

export interface LocalizedText {
  gu: string;
  en: string;
  hi: string;
}

export interface SiteStatItem {
  value: string;
  label: LocalizedText;
  /** Change to false once replaced with verified live company numbers */
  isSample?: boolean;
}

export interface CustomerReviewItem {
  id: string;
  name: LocalizedText;
  location: LocalizedText;
  systemSize: string;
  stars: number;
  text: LocalizedText;
  /** Change to false after replacing with a verified Google Business Profile review */
  isSample?: boolean;
}

export interface ProjectCaseItem {
  id: string;
  category: 'residential' | 'commercial' | 'industrial';
  title: LocalizedText;
  location: LocalizedText;
  capacity: string;
  discom: string;
  savingsNote: LocalizedText;
  summary: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  /** Change to false after uploading real Patan site photos & bill savings */
  isSample?: boolean;
}

export const SITE_CONFIG = {
  brandName: 'Riseion Solar',
  parentCompany: 'Riseion Technologies',
  parentWebsite: 'https://riseion.com',
  primaryDomain: 'https://riseionsolar.com', // <-- Replace with your final live domain

  // Exact NAP (Keep identical on Website, Google Business Profile, Justdial & IndiaMART)
  phones: [
    { display: '+91 75677 76876', tel: '+917567776876', whatsapp: '917567776876' },
    { display: '+91 75678 76776', tel: '+917567876776', whatsapp: '917567876776' },
  ],
  email: 'hello@riseion.com', // <-- Replace with solar@yourdomain.com once active
  address: {
    gu: 'FF-124, કૃષ્ણમ સ્કાયલાઇન, પદ્મનાભ ચોકડી પાસે, ચાણસ્મા હાઇવે રોડ, પાટણ, ગુજરાત - 384266',
    en: 'FF-124, Krushnam Skyline Complex, Near Padmanabh Chokdi, Chanasma Highway Road, Patan, Gujarat - 384266',
    hi: 'FF-124, कृष्णम स्काईलाइन कॉम्प्लेक्स, पद्मनाभ चौकड़ी के पास, चाणस्मा हाईवे रोड, पाटन, गुजरात - 384266',
  },
  officeHours: {
    gu: 'સોમવાર થી શનિવાર: સવારે 9:30 થી સાંજે 7:00',
    en: 'Monday to Saturday: 9:30 AM – 7:00 PM',
    hi: 'सोमवार से शनिवार: सुबह 9:30 से शाम 7:00 बजे तक',
  },

  // Paste your Google Business Profile "Ask for reviews" link here once GBP is live
  googleReviewUrl: '', // e.g. 'https://g.page/r/YOUR-GBP-ID/review'

  // Brand logos (uploaded assets) + Site photos (replace with your own real site photos anytime)
  assets: {
    logoColor: withBase('/assets/aistudio/logo_545a85a7.png'),
    logoWhite: withBase('/assets/aistudio/logo-white_c445306b.png'),
    ogImage: withBase('/assets/aistudio/og-image_e3ca4065.png'),
    heroRooftop: withBase('/src/assets/images/hero_rooftop_solar_patan_1795602725848.jpg'),
    residentialPhoto: withBase('/src/assets/images/solar_residential_gujarat_1795602726428.jpg'),
    commercialPhoto: withBase('/src/assets/images/solar_commercial_shop_1795602727167.jpg'),
    industrialPhoto: withBase('/src/assets/images/solar_industrial_factory_1795602727900.jpg'),
    technicianPhoto: withBase('/src/assets/images/solar_technician_install_1795602730144.jpg'),
  },

  // Service areas targeted for Patan, North Gujarat & Gujarat ranking
  serviceAreas: [
    { gu: 'પાટણ શહેર', en: 'Patan City', hi: 'पाटन शहर' },
    { gu: 'સિદ્ધપુર', en: 'Siddhpur', hi: 'सिद्धपुर' },
    { gu: 'ચાણસ્મા', en: 'Chanasma', hi: 'चाणस्मा' },
    { gu: 'રાધનપુર', en: 'Radhanpur', hi: 'राधनपुर' },
    { gu: 'હારીજ', en: 'Harij', hi: 'हारीज' },
    { gu: 'સમી અને શંખેશ્વર', en: 'Sami & Sankheshwar', hi: 'समी और शंखेश्वर' },
    { gu: 'પાટણ GIDC', en: 'Patan GIDC', hi: 'पाटन GIDC' },
    { gu: 'મહેસાણા અને ઊંઝા', en: 'Mehsana & Unjha', hi: 'मेहसाणा और ऊंझा' },
    { gu: 'પાલનપુર અને ડીસા', en: 'Palanpur & Deesa', hi: 'पालनपुर और डीसा' },
  ],

  // --------------------------------------------------------------------------
  // KEY METRICS (Sample placeholders — update with your verified numbers!)
  // --------------------------------------------------------------------------
  stats: [
    {
      value: '2.18 kWp',
      label: {
        gu: 'ગુજરાત સ્ટેટ ટોપ-અપ સહાય',
        en: 'Gujarat State Top-Up Support',
        hi: 'गुजरात राज्य टॉप-अप सहायता',
      },
      isSample: false,
    },
    {
      value: '₹78,000',
      label: {
        gu: 'PM સૂર્ય ઘર મહત્તમ સબસિડી',
        en: 'Max PM Surya Ghar Subsidy',
        hi: 'पीएम सूर्य घर अधिकतम सब्सिडी',
      },
      isSample: false,
    },
    {
      value: 'UGVCL',
      label: {
        gu: 'નેટ મીટરિંગ અને કાગળની કાર્યવાહી',
        en: 'Net Metering & Subsidy Filing',
        hi: 'नेट मीटरिंग और कागज़ी प्रक्रिया',
      },
      isSample: false,
    },
    {
      value: '25 Yr',
      label: {
        gu: 'પેનલ પરફોર્મન્સ વોરંટી સપોર્ટ',
        en: 'Panel Performance Warranty Guide',
        hi: 'पैनल परफॉर्मेंस वारंटी सपोर्ट',
      },
      isSample: false,
    },
  ] as SiteStatItem[],

  // --------------------------------------------------------------------------
  // CUSTOMER REVIEWS (Sample placeholders — replace with real Google reviews!)
  // --------------------------------------------------------------------------
  reviews: [
    {
      id: 'rev-1',
      isSample: true,
      stars: 5,
      systemSize: '3 kW Residential · UGVCL',
      name: { gu: 'રમેશભાઈ પટેલ', en: 'Rameshbhai Patel', hi: 'रमेशभाई पटेल' },
      location: { gu: 'સુભાષ ચોક, પાટણ', en: 'Subhash Chowk, Patan', hi: 'सुभाष चौक, पाटन' },
      text: {
        gu: 'સાઇટ વિઝિટથી લઈને UGVCL નેટ મીટર અને PM સૂર્ય ઘર સબસિડીના કાગળો સુધી Riseion Solar ની ટીમે બધું સમયસર સંભાળ્યું. અમારું ઉનાળાનું વીજ બિલ ખૂબ ઘટી ગયું છે.',
        en: 'From roof inspection to UGVCL net metering and PM Surya Ghar paperwork, the Riseion Solar team handled everything smoothly. Our summer electricity bill dropped sharply.',
        hi: 'साइट विज़िट से लेकर UGVCL नेट मीटर और पीएम सूर्य घर सब्सिडी के कागज़ात तक Riseion Solar की टीम ने सब कुछ समय पर संभाला। हमारा बिजली बिल काफी कम हो गया है।',
      },
    },
    {
      id: 'rev-2',
      isSample: true,
      stars: 5,
      systemSize: '2.18 kWp Residential · UGVCL',
      name: { gu: 'કિરણભાઈ ચૌધરી', en: 'Kiranbhai Chaudhary', hi: 'किरणभाई चौधरी' },
      location: { gu: 'સિદ્ધપુર, પાટણ જિલ્લો', en: 'Siddhpur, Patan District', hi: 'सिद्धपुर, पाटन जिला' },
      text: {
        gu: 'અમને 2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ યોજનાની સરળ ગુજરાતી ભાષામાં પૂરી માહિતી આપી. છત પર મજબૂત સ્ટ્રક્ચર અને ચોખ્ખું વાયરિંગ કરી આપ્યું.',
        en: 'They explained the 2.18 kWp Gujarat state top-up rules clearly in Gujarati, installed a sturdy galvanized structure, and delivered neat wiring.',
        hi: 'उन्होंने 2.18 kWp गुजरात राज्य टॉप-अप योजना की पूरी जानकारी सरल भाषा में दी। छत पर मजबूत स्ट्रक्चर और साफ वायरिंग करके दी।',
      },
    },
    {
      id: 'rev-3',
      isSample: true,
      stars: 5,
      systemSize: '25 kW Industrial · Patan GIDC',
      name: { gu: 'મહેશભાઈ ઠક્કર', en: 'Maheshbhai Thakkar', hi: 'महेशभाई ठक्कर' },
      location: { gu: 'પાટણ GIDC, ચાણસ્મા રોડ', en: 'Patan GIDC, Chanasma Road', hi: 'पाटन GIDC, चाणस्मा रोड' },
      text: {
        gu: 'અમારા વેરહાઉસ અને યુનિટ માટે 25 kW રૂફટોપ પ્લાન્ટ લગાવ્યો. ડે-ટાઇમ લોડ સોલાર પર ચાલે છે અને ટીમ મેન્ટેનન્સ માટે હંમેશા ઉપલબ્ધ રહે છે.',
        en: 'Installed a 25 kW rooftop array for our industrial unit in Patan GIDC. Daytime machinery load now runs on solar and the local team is responsive for cleaning checks.',
        hi: 'हमारे पाटन GIDC यूनिट के लिए 25 kW रूफटॉप प्लांट लगाया गया। दिन का लोड सोलर पर चलता है और स्थानीय टीम मेंटेनेंस के लिए हमेशा तैयार रहती है।',
      },
    },
  ] as CustomerReviewItem[],

  // --------------------------------------------------------------------------
  // PROJECT PORTFOLIO (Sample layouts — swap photos, kW & bill savings later!)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: 'proj-patan-home',
      category: 'residential',
      isSample: true,
      capacity: '3 kW On-Grid',
      discom: 'UGVCL · Patan',
      title: {
        gu: 'રહેણાંક રૂફટોપ સોલાર — પાટણ',
        en: 'Residential Rooftop Solar — Patan',
        hi: 'आवासीय रूफटॉप सोलर — पाटन',
      },
      location: { gu: 'પદ્મનાભ ચોકડી વિસ્તાર, પાટણ', en: 'Padmanabh Chokdi Area, Patan', hi: 'पद्मनाभ चौकड़ी क्षेत्र, पाटन' },
      savingsNote: {
        gu: 'અંદાજિત ~360 યુનિટ/મહિનો ઉત્પાદન',
        en: 'Approx. ~360 units/month generation',
        hi: 'लगभग ~360 यूनिट/माह उत्पादन',
      },
      summary: {
        gu: 'છતનો ઉપયોગ જળવાઈ રહે તે માટે એલિવેટેડ ગેલ્વેનાઇઝ્ડ સ્ટ્રક્ચર, DCR પેનલ અને UGVCL નેટ મીટરિંગ સાથે.',
        en: 'Elevated galvanized structure preserving terrace space, DCR panels, BIS inverter, and complete UGVCL net metering.',
        hi: 'छत की जगह बचाए रखने के लिए एलिवेटेड स्ट्रक्चर, DCR पैनल और पूर्ण UGVCL नेट मीटरिंग के साथ।',
      },
      image: withBase('/src/assets/images/solar_residential_gujarat_1795602726428.jpg'),
      imageAlt: {
        gu: 'પાટણમાં ઘરની છત પર લગાવેલી સોલાર પેનલ સિસ્ટમ',
        en: 'Elevated residential rooftop solar panels installed on a Patan home terrace',
        hi: 'पाटन में घर की छत पर लगा रूफटॉप सोलर सिस्टम',
      },
    },
    {
      id: 'proj-siddhpur-218',
      category: 'residential',
      isSample: true,
      capacity: '2.18 kWp On-Grid',
      discom: 'UGVCL · Siddhpur',
      title: {
        gu: '2.18 kWp રાજ્ય ટોપ-અપ ઘર સિસ્ટમ — સિદ્ધપુર',
        en: '2.18 kWp State Top-Up Home System — Siddhpur',
        hi: '2.18 kWp राज्य टॉप-अप होम सिस्टम — सिद्धपुर',
      },
      location: { gu: 'સિદ્ધપુર, પાટણ જિલ્લો', en: 'Siddhpur, Patan District', hi: 'सिद्धपुर, पाटन जिला' },
      savingsNote: {
        gu: 'અંદાજિત ~260 યુનિટ/મહિનો · સબસિડી માર્ગદર્શન',
        en: 'Approx. ~260 units/month · DBT Subsidy Filing',
        hi: 'लगभग ~260 यूनिट/माह · DBT सब्सिडी सहायता',
      },
      summary: {
        gu: 'મધ્યમ વર્ગના પરિવાર માટે 2.18 kWp ક્ષમતાનું આયોજન, PM સૂર્ય ઘર પોર્ટલ અરજી અને સમયસર UGVCL તપાસ.',
        en: 'Sized specifically to qualify under Gujarat 2.18 kWp state top-up guidelines with end-to-end portal filing.',
        hi: 'गुजरात 2.18 kWp राज्य टॉप-अप पात्रता के अनुसार डिज़ाइन और संपूर्ण पोर्टल आवेदन सहायता।',
      },
      image: withBase('/src/assets/images/hero_rooftop_solar_patan_1795602725848.jpg'),
      imageAlt: {
        gu: 'સિદ્ધપુરમાં 2.18 kWp સોલાર પેનલ ઇન્સ્ટોલેશન',
        en: '2.18 kWp rooftop solar system installed in Siddhpur, North Gujarat',
        hi: 'सिद्धपुर, उत्तर गुजरात में 2.18 kWp रूफटॉप सोलर प्लांट',
      },
    },
    {
      id: 'proj-chanasma-shop',
      category: 'commercial',
      isSample: true,
      capacity: '10 kW Commercial',
      discom: 'UGVCL · Chanasma',
      title: {
        gu: 'વ્યાપારી શોરૂમ અને ઓફિસ સોલાર — ચાણસ્મા રોડ',
        en: 'Commercial Showroom & Office Solar — Chanasma Road',
        hi: 'व्यावसायिक शोरूम और ऑफिस सोलर — चाणस्मा रोड',
      },
      location: { gu: 'ચાણસ્મા હાઇવે, પાટણ', en: 'Chanasma Highway, Patan', hi: 'चाणस्मा हाईवे, पाटन' },
      savingsNote: {
        gu: 'અંદાજિત ~1,200 યુનિટ/મહિનો · વ્યાપારી બિલ બચત',
        en: 'Approx. ~1,200 units/month · Commercial Tariff Offset',
        hi: 'लगभग ~1,200 यूनिट/माह · कमर्शियल बिल बचत',
      },
      summary: {
        gu: 'દિવસ દરમિયાન ચાલતા એસી અને લાઇટિંગ લોડ માટે 10 kW ઓન-ગ્રિડ સિસ્ટમ અને લાઇટનિંગ અરેસ્ટર પ્રોટેક્શન.',
        en: '10 kW three-phase commercial array designed to offset peak daytime AC and showroom lighting loads.',
        hi: 'दिन के समय एसी और शोरूम लाइटिंग लोड को कवर करने के लिए 10 kW थ्री-फेज़ ऑन-ग्रिड सिस्टम।',
      },
      image: withBase('/src/assets/images/solar_commercial_shop_1795602727167.jpg'),
      imageAlt: {
        gu: 'ચાણસ્મા રોડ પર વ્યાપારી બિલ્ડિંગની છત પર સોલાર પેનલ્સ',
        en: 'Commercial building rooftop solar array on Chanasma Highway, Patan',
        hi: 'चाणस्मा हाईवे, पाटन में व्यावसायिक इमारत पर सोलर पैनल',
      },
    },
    {
      id: 'proj-patan-gidc',
      category: 'industrial',
      isSample: true,
      capacity: '50 kW Industrial',
      discom: 'UGVCL · Patan GIDC',
      title: {
        gu: 'ફેક્ટરી શેડ રૂફટોપ પ્લાન્ટ — પાટણ GIDC',
        en: 'Factory Metal-Shed Rooftop Plant — Patan GIDC',
        hi: 'फैक्ट्री मेटल-शेड रूफटॉप प्लांट — पाटन GIDC',
      },
      location: { gu: 'પાટણ GIDC અને ઉત્તર ગુજરાત', en: 'Patan GIDC & North Gujarat', hi: 'पाटन GIDC और उत्तर गुजरात' },
      savingsNote: {
        gu: 'અંદાજિત ~6,000 યુનિટ/મહિનો · 3.5–4 વર્ષમાં પેબેક',
        en: 'Approx. ~6,000 units/month · High-ROI Industrial Array',
        hi: 'लगभग ~6,000 यूनिट/माह · उच्च बचत औद्योगिक प्लांट',
      },
      summary: {
        gu: 'ઇન્ડસ્ટ્રિયલ ટિન શેડ માટે નોન-પેનિટ્રેટિંગ રેલિંગ, વોકવે, સફાઈ પાઇપલાઇન અને થ્રી-ફેઝ ઇન્વર્ટર મોનિટરિંગ.',
        en: 'Engineered industrial shed mounting with walkway access, AC/DC surge protection, and live generation monitoring.',
        hi: 'औद्योगिक शेड के लिए सुरक्षित माउंटिंग, वॉकवे, सर्ज प्रोटेक्शन और लाइव मॉनिटरिंग।',
      },
      image: withBase('/src/assets/images/solar_industrial_factory_1795602727900.jpg'),
      imageAlt: {
        gu: 'પાટણ GIDC ફેક્ટરીના શેડ પર ઔદ્યોગિક સોલાર પેનલ્સ',
        en: 'Industrial solar arrays mounted on a Patan GIDC factory shed roof',
        hi: 'पाटन GIDC फैक्ट्री शेड पर लगा औद्योगिक सोलर प्लांट',
      },
    },
  ] as ProjectCaseItem[],
};

export function getWhatsAppLink(message: string, phoneIndex = 0): string {
  const num = SITE_CONFIG.phones[phoneIndex]?.whatsapp || SITE_CONFIG.phones[0].whatsapp;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
