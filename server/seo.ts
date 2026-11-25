export type SupportedLang = 'gu' | 'en' | 'hi';
export type PageKey = 'home' | 'subsidy-patan' | 'calculator' | 'projects' | 'privacy-policy' | 'seo-hub';

export interface RouteSeoMeta {
  lang: SupportedLang;
  locale: string;
  pageKey: PageKey;
  canonicalPath: string;
  title: string;
  description: string;
  robots: string;
  pageName: string;
  includeFaqSchema?: boolean;
  includeCalculatorSchema?: boolean;
}

const NORTH_GUJARAT_AREAS = [
  'Patan, Gujarat',
  'Siddhpur, Gujarat',
  'Chanasma, Gujarat',
  'Radhanpur, Gujarat',
  'Harij, Gujarat',
  'Sami, Gujarat',
  'Sankheshwar, Gujarat',
  'Patan GIDC, Gujarat',
  'Mehsana, Gujarat',
  'Unjha, Gujarat',
  'Banaskantha, Gujarat',
  'Palanpur, Gujarat',
  'Deesa, Gujarat',
  'North Gujarat, India',
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function parseRouteInfo(pathname: string): { lang: SupportedLang; pageKey: PageKey; canonicalPath: string } {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/seo-hub' || clean === '/admin') {
    return { lang: 'en', pageKey: 'seo-hub', canonicalPath: '/seo-hub' };
  }

  const parts = clean.split('/').filter(Boolean);
  let lang: SupportedLang = 'gu';
  let rest = parts;

  if (parts[0] === 'gu' || parts[0] === 'en' || parts[0] === 'hi') {
    lang = parts[0];
    rest = parts.slice(1);
  }

  const slug = rest[0] || '';
  let pageKey: PageKey = 'home';
  if (slug === 'calculator' || slug === 'calculation.html') pageKey = 'calculator';
  else if (slug === 'subsidy-patan') pageKey = 'subsidy-patan';
  else if (slug === 'projects' || slug === 'projects.html') pageKey = 'projects';
  else if (slug === 'privacy-policy') pageKey = 'privacy-policy';
  else if (slug === 'seo-hub') return { lang: 'en', pageKey: 'seo-hub', canonicalPath: '/seo-hub' };

  const canonicalPath =
    pageKey === 'home'
      ? lang === 'gu'
        ? '/gu'
        : `/${lang}`
      : `/${lang}/${pageKey}`;

  return { lang, pageKey, canonicalPath };
}

const META_TABLE: Record<
  Exclude<PageKey, 'seo-hub'>,
  Record<SupportedLang, { title: string; description: string; pageName: string }>
> = {
  home: {
    gu: {
      title: 'પાટણ અને ઉત્તર ગુજરાતમાં સોલાર પેનલ ઇન્સ્ટોલેશન | Riseion Solar',
      description:
        'પાટણ, સિદ્ધપુર, ચાણસ્મા, રાધનપુર, મહેસાણા અને ઉત્તર ગુજરાત (UGVCL) માં ઘર, દુકાન અને ફેક્ટરી માટે રૂફટોપ સોલાર. 2.18 kWp ગુજરાત ટોપ-અપ અને PM સૂર્ય ઘર સબસિડી સહાય.',
      pageName: 'હોમ (ગુજરાતી)',
    },
    en: {
      title: 'Solar Panel Installation in Patan & North Gujarat (UGVCL) | Riseion Solar',
      description:
        'Rooftop solar for homes, shops & factories in Patan, Siddhpur, Chanasma, Radhanpur, Mehsana & North Gujarat. PM Surya Ghar & 2.18 kWp Gujarat subsidy support by Riseion Solar.',
      pageName: 'Home (English)',
    },
    hi: {
      title: 'पाटन और उत्तर गुजरात में सोलर पैनल इंस्टॉलेशन (UGVCL) | Riseion Solar',
      description:
        'पाटन, सिद्धपुर, चाणस्मा, राधनपुर, मेहसाणा और उत्तर गुजरात में घर, दुकान और फैक्ट्री के लिए रूफटॉप सोलर। 2.18 kWp गुजरात राज्य टॉप-अप और पीएम सूर्य घर सब्सिडी सहायता।',
      pageName: 'होम (हिन्दी)',
    },
  },
  'subsidy-patan': {
    gu: {
      title: 'પાટણ UGVCL સોલાર સબસિડી ગાઇડ 2026: 2.18 kWp અને PM સૂર્ય ઘર | Riseion Solar',
      description:
        'પાટણ અને ઉત્તર ગુજરાત (UGVCL) માટે 2.18 kWp ગુજરાત રાજ્ય ટોપ-અપ (₹10,810 જનરલ / ₹5,405 SC-ST) અને PM સૂર્ય ઘર ₹78,000 સબસિડીની સત્તાવાર ગણતરી અને અરજી પ્રક્રિયા.',
      pageName: 'પાટણ સોલાર સબસિડી ગાઇડ',
    },
    en: {
      title: 'Patan & North Gujarat UGVCL Solar Subsidy Guide 2026 (2.18 kWp & PM Surya Ghar) | Riseion Solar',
      description:
        'Verified breakdown of Gujarat 2.18 kWp residential state top-up (₹10,810 General / ₹5,405 SC-ST) vs PM Surya Ghar up to ₹78,000, UGVCL net metering steps, and required documents.',
      pageName: 'Patan UGVCL Subsidy Guide',
    },
    hi: {
      title: 'पाटन UGVCL सोलर सब्सिडी गाइड 2026: 2.18 kWp और पीएम सूर्य घर | Riseion Solar',
      description:
        'पाटन और उत्तर गुजरात (UGVCL) के लिए 2.18 kWp गुजरात राज्य टॉप-अप (₹10,810 सामान्य / ₹5,405 SC-ST) और पीएम सूर्य घर ₹78,000 सब्सिडी की पूरी जानकारी और प्रक्रिया।',
      pageName: 'पाटन सोलर सब्सिडी गाइड',
    },
  },
  calculator: {
    gu: {
      title: 'સોલાર કેલ્ક્યુલેટર પાટણ: 2.18 kWp સબસિડી અને બચત ગણતરી | Riseion Solar',
      description:
        'તમારા UGVCL માસિક વીજ બિલ અથવા યુનિટ પરથી જરૂરી સોલાર kW, પેનલ સંખ્યા, માસિક બચત અને 2.18 kWp ગુજરાત રાજ્ય ટોપ-અપ સબસિડીની ગણતરી કરો.',
      pageName: 'સોલાર કેલ્ક્યુલેટર',
    },
    en: {
      title: 'Patan UGVCL Solar Calculator: Size, Savings & 2.18 kWp Subsidy | Riseion Solar',
      description:
        'Calculate rooftop solar kW capacity, panel count, monthly savings, PM Surya Ghar central subsidy, and Gujarat 2.18 kWp top-up for UGVCL homes, shops, and factories.',
      pageName: 'Solar Calculator',
    },
    hi: {
      title: 'सोलर कैलकुलेटर पाटन: साइज, बचत और 2.18 kWp सब्सिडी अनुमान | Riseion Solar',
      description:
        'अपने UGVCL बिजली बिल या यूनिट से रूफटॉप सोलर क्षमता, पैनल संख्या, मासिक बचत और 2.18 kWp गुजरात राज्य सब्सिडी का अनुमान निकालें।',
      pageName: 'सोलर कैलकुलेटर',
    },
  },
  projects: {
    gu: {
      title: 'સોલાર પ્રોજેક્ટ્સ પાટણ અને ઉત્તર ગુજરાત: ઘર, દુકાન, ફેક્ટરી | Riseion Solar',
      description:
        'પાટણ, સિદ્ધપુર, ચાણસ્મા, રાધનપુર, પાટણ GIDC અને ઉત્તર ગુજરાત માટે રહેણાંક, વ્યાપારી અને ઔદ્યોગિક સોલાર ઇન્સ્ટોલેશન તથા 4-પગલાંની પ્રક્રિયા.',
      pageName: 'પ્રોજેક્ટ્સ',
    },
    en: {
      title: 'Solar Installations in Patan & North Gujarat: Home, Shop & Factory | Riseion Solar',
      description:
        'Explore residential, commercial, and Patan GIDC industrial rooftop solar installations and our 4-step UGVCL commissioning workflow across North Gujarat.',
      pageName: 'Projects',
    },
    hi: {
      title: 'पाटन और उत्तर गुजरात सोलर प्रोजेक्ट्स: घर, दुकान और फैक्ट्री | Riseion Solar',
      description:
        'पाटन, सिद्धपुर, चाणस्मा, राधनपुर और पाटन GIDC में घरेलू, व्यावसायिक और औद्योगिक सोलर प्रोजेक्ट्स तथा हमारी 4-चरण UGVCL प्रक्रिया देखें।',
      pageName: 'प्रोजेक्ट्स',
    },
  },
  'privacy-policy': {
    gu: {
      title: 'પ્રાઇવસી પોલિસી (Privacy Policy) | Riseion Solar પાટણ',
      description:
        'Riseion Solar (Riseion Technologies, પાટણ) વેબસાઇટ પૂછપરછ ફોર્મ, સોલાર કેલ્ક્યુલેટર અને Meta Lead Ads માટે ગ્રાહક માહિતી સુરક્ષા નીતિ.',
      pageName: 'પ્રાઇવસી પોલિસી',
    },
    en: {
      title: 'Privacy Policy | Riseion Solar (Riseion Technologies, Patan)',
      description:
        'Official Privacy Policy of Riseion Solar, Patan, Gujarat covering website enquiry forms, WhatsApp communication, solar calculator inputs, and Meta Lead Ads compliance.',
      pageName: 'Privacy Policy',
    },
    hi: {
      title: 'प्राइवेसी पॉलिसी (Privacy Policy) | Riseion Solar पाटन',
      description:
        'Riseion Solar (Riseion Technologies, पाटन) वेबसाइट पूछताछ फॉर्म, सोलर कैलकुलेटर और Meta Lead Ads के लिए डेटा सुरक्षा और गोपनीयता नीति।',
      pageName: 'प्राइवेसी पॉलिसी',
    },
  },
};

export function resolveRouteSeo(pathname: string): RouteSeoMeta {
  const { lang, pageKey, canonicalPath } = parseRouteInfo(pathname);
  const locale = lang === 'gu' ? 'gu_IN' : lang === 'hi' ? 'hi_IN' : 'en_IN';

  if (pageKey === 'seo-hub') {
    return {
      lang: 'en',
      locale: 'en_IN',
      pageKey,
      canonicalPath: '/seo-hub',
      title: 'Lead Inbox & SEO/AEO/GEO Hub | Riseion Solar',
      description: 'Internal enquiry database, CSV export, and Patan/Gujarat SEO/AEO/GEO audit console.',
      robots: 'noindex, nofollow',
      pageName: 'Lead Inbox & SEO Hub',
    };
  }

  const copy = META_TABLE[pageKey][lang];
  return {
    lang,
    locale,
    pageKey,
    canonicalPath,
    title: copy.title,
    description: copy.description,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large',
    pageName: copy.pageName,
    includeFaqSchema: pageKey === 'home' || pageKey === 'subsidy-patan',
    includeCalculatorSchema: pageKey === 'calculator',
  };
}

export function buildJsonLdScripts(baseUrl: string, meta: RouteSeoMeta): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const fullUrl = `${cleanBase}${meta.canonicalPath}`;

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${cleanBase}/#business`,
    name: 'Riseion Solar',
    alternateName: ['રાઇઝિયન સોલાર', 'राइज़ियन सोलर'],
    url: `${cleanBase}/gu`,
    logo: `${cleanBase}/assets/aistudio/logo_545a85a7.png`,
    image: `${cleanBase}/assets/aistudio/og-image_e3ca4065.png`,
    description:
      'Rooftop solar panel systems, UGVCL net metering, PM Surya Ghar & 2.18 kWp Gujarat state subsidy paperwork, installation, and maintenance for homes, shops, and factories in Patan and North Gujarat.',
    telephone: '+91-75677-76876',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-75677-76876',
        contactType: 'sales',
        areaServed: 'IN-GJ',
        availableLanguage: ['Gujarati', 'Hindi', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-75678-76776',
        contactType: 'customer support',
        areaServed: 'IN-GJ',
        availableLanguage: ['Gujarati', 'Hindi', 'English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'FF-124, Krushnam Skyline Complex, Near Padmanabh Chokdi, Chanasma Highway Road',
      addressLocality: 'Patan',
      addressRegion: 'Gujarat',
      postalCode: '384266',
      addressCountry: 'IN',
    },
    areaServed: NORTH_GUJARAT_AREAS.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    knowsLanguage: ['gu-IN', 'en-IN', 'hi-IN'],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Riseion Technologies',
      url: 'https://riseion.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rooftop Solar Services in Patan & North Gujarat',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Rooftop Solar with 2.18 kWp Gujarat Top-Up & PM Surya Ghar Support',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Rooftop Solar for Shops, Showrooms & Offices in Patan',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Industrial Rooftop Solar for Patan GIDC & North Gujarat Factories',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Solar Panel Cleaning, AMC & Inverter Maintenance',
          },
        },
      ],
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Riseion Solar',
        item: `${cleanBase}/${meta.lang}`,
      },
      ...(meta.pageKey !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: meta.pageName,
              item: fullUrl,
            },
          ]
        : []),
    ],
  };

  const blocks: unknown[] = [localBusiness, breadcrumb];

  if (meta.includeCalculatorSchema) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Riseion Solar Patan UGVCL Subsidy & Size Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      url: fullUrl,
      inLanguage: ['gu-IN', 'en-IN', 'hi-IN'],
      description:
        'Estimate rooftop solar kW capacity, panel count, monthly savings, PM Surya Ghar central subsidy, and Gujarat 2.18 kWp state top-up for UGVCL consumers.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    });
  }

  if (meta.includeFaqSchema) {
    const faqEntities =
      meta.lang === 'gu'
        ? [
            {
              q: 'પાટણ (UGVCL) માં 2.18 kWp સોલાર સબસિડી યોજનામાં ગ્રાહકે કેટલા રૂપિયા ભરવાના હોય છે?',
              a: 'ગુજરાત સરકારની 2.18 kWp સુધીની રહેણાંક ટોપ-અપ યોજના મુજબ MNRE બેન્ચમાર્ક ખર્ચ ₹1,08,100 ગણાય છે. તેમાં ₹63,240 કેન્દ્રીય સબસિડી મળે છે. જનરલ ગ્રાહકે 10% એટલે ₹10,810 (રાજ્ય ટોપ-અપ ₹34,050) અને SC/ST ગ્રાહકે 5% એટલે ₹5,405 (રાજ્ય ટોપ-અપ ₹39,455) ભરવાના થાય છે. આ યોજના લેનાર 3 વર્ષ સુધી ક્ષમતા વધારી શકતા નથી.',
            },
            {
              q: 'PM સૂર્ય ઘર યોજનામાં 1 kW, 2 kW અને 3 kW પર કેટલી સબસિડી મળે છે?',
              a: 'PM સૂર્ય ઘર: મફત વીજળી યોજનામાં રહેણાંક છત માટે 1 kW પર ₹30,000, 2 kW પર ₹60,000 અને 3 kW કે તેથી વધુ પર મહત્તમ ₹78,000 કેન્દ્રીય સબસિડી મળે છે. 2.18 kWp થી મોટી સિસ્ટમ પર ગુજરાત સ્ટેટ ટોપ-અપ લાગુ પડતો નથી.',
            },
            {
              q: 'પાટણમાં UGVCL સોલાર નેટ મીટરિંગ માટે કયા દસ્તાવેજો જોઈએ?',
              a: 'તાજેતરનું UGVCL વીજ બિલ, આધાર કાર્ડ, કેન્સલ ચેક અથવા બેંક પાસબુક (વીજ બિલ, આધાર અને બેંકમાં નામ એકસરખું હોવું જરૂરી), પાસપોર્ટ ફોટો અને પ્રોપર્ટી ટેક્સ બિલ. DCR પેનલ અને BIS ઇન્વર્ટર ફરજિયાત છે.',
            },
            {
              q: 'શું દુકાન અને પાટણ GIDC ફેક્ટરી માટે સરકારી સબસિડી મળે છે?',
              a: 'ના. PM સૂર્ય ઘર અને 2.18 kWp ગુજરાત ટોપ-અપ ફક્ત રહેણાંક (ઘરેલુ) કનેક્શન માટે છે. દુકાનો અને ફેક્ટરીઓને ઊંચા વ્યાપારી ટેરિફ પર સીધી બિલ બચત, GERC નેટ મીટરિંગ અને ટેક્સ ડેપ્રિસિએશનનો લાભ મળે છે.',
            },
          ]
        : meta.lang === 'hi'
          ? [
              {
                q: 'पाटन (UGVCL) में 2.18 kWp गुजरात सोलर सब्सिडी योजना में ग्राहक को कितना भुगतान करना होता है?',
                a: 'गुजरात की 2.18 kWp तक की घरेलू टॉप-अप नीति में MNRE बेंचमार्क लागत ₹1,08,100 है। ₹63,240 केंद्रीय सब्सिडी के बाद सामान्य श्रेणी के उपभोक्ता 10% (₹10,810; राज्य टॉप-अप ₹34,050) और SC/ST उपभोक्ता 5% (₹5,405; राज्य टॉप-अप ₹39,455) देते हैं। इसमें 3 वर्ष तक क्षमता बढ़ाने पर रोक रहती है।',
              },
              {
                q: 'पीएम सूर्य घर योजना में 1 kW, 2 kW और 3 kW पर कितनी केंद्रीय सब्सिडी मिलती है?',
                a: 'घरेलू रूफटॉप सोलर पर 1 kW के लिए ₹30,000, 2 kW के लिए ₹60,000 और 3 kW या उससे अधिक पर अधिकतम ₹78,000 केंद्रीय सब्सिडी DBT से बैंक खाते में आती है।',
              },
              {
                q: 'UGVCL पाटन में सोलर नेट मीटरिंग और सब्सिडी की प्रक्रिया क्या है?',
                a: 'साइट विज़िट के बाद pmsuryaghar.gov.in पर UGVCL के अंतर्गत आवेदन, DCR पैनल और BIS इन्वर्टर इंस्टॉलेशन, UGVCL निरीक्षण व नेट मीटर स्थापना, और कमिशनिंग रिपोर्ट के बाद DBT सब्सिडी प्राप्त होती है।',
              },
            ]
          : [
              {
                q: 'How much does a customer pay under Gujarat 2.18 kWp rooftop solar top-up in Patan (UGVCL)?',
                a: 'Under Gujarat residential top-up rules (up to 2.18 kWp), MNRE benchmark cost is ₹1,08,100 with ₹63,240 PM Surya Ghar central subsidy. General category consumers pay 10% (₹10,810; ₹34,050 state top-up) and SC/ST consumers pay 5% (₹5,405; ₹39,455 state top-up). A 3-year capacity expansion restriction applies.',
              },
              {
                q: 'What is the PM Surya Ghar subsidy for 1 kW, 2 kW, and 3 kW home solar in Patan?',
                a: 'Residential rooftop systems under UGVCL receive ₹30,000 for 1 kW, ₹60,000 for 2 kW, and up to ₹78,000 maximum cap for 3 kW and above via DBT. Systems above 2.18 kWp receive central subsidy only.',
              },
              {
                q: 'What is the UGVCL net metering and installation process in Patan?',
                a: '1) Site inspection and UGVCL bill review, 2) Online application on pmsuryaghar.gov.in with matching Aadhaar/UGVCL/bank names, 3) Installation using DCR panels and BIS inverter by an empanelled vendor, 4) UGVCL inspection and bi-directional net meter, 5) Direct Bank Transfer subsidy release.',
              },
              {
                q: 'Do shops and factories in Patan GIDC get PM Surya Ghar subsidy?',
                a: 'No. PM Surya Ghar and 2.18 kWp Gujarat state top-up are for residential homes only. Shops and factories save directly against higher commercial tariffs via GERC net metering and eligible business depreciation.',
              },
            ];

    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntities.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return blocks
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`
    )
    .join('\n    ');
}

export function buildSeoHeadMarkup(baseUrl: string, pathname: string): { lang: SupportedLang; headHtml: string } {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const meta = resolveRouteSeo(pathname);
  const fullUrl = `${cleanBase}${meta.canonicalPath}`;
  const ogImage = `${cleanBase}/assets/aistudio/og-image_e3ca4065.png`;

  const slugSuffix = meta.pageKey === 'home' ? '' : `/${meta.pageKey}`;
  const hreflangTags =
    meta.pageKey === 'seo-hub'
      ? ''
      : [
          `<link rel="alternate" hreflang="gu-IN" href="${escapeHtml(cleanBase)}/gu${slugSuffix}" />`,
          `<link rel="alternate" hreflang="en-IN" href="${escapeHtml(cleanBase)}/en${slugSuffix}" />`,
          `<link rel="alternate" hreflang="hi-IN" href="${escapeHtml(cleanBase)}/hi${slugSuffix}" />`,
          `<link rel="alternate" hreflang="x-default" href="${escapeHtml(cleanBase)}/gu${slugSuffix}" />`,
        ].join('\n    ');

  const headHtml = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(fullUrl)}" />`,
    hreflangTags,
    `<meta property="og:site_name" content="Riseion Solar" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${escapeHtml(meta.locale)}" />`,
    `<meta property="og:url" content="${escapeHtml(fullUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    buildJsonLdScripts(cleanBase, meta),
  ]
    .filter(Boolean)
    .join('\n    ');

  return { lang: meta.lang, headHtml };
}

export function buildSitemapXml(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const lastmod = '2026-11-25';
  const pages: Array<{ slug: string; priority: string; changefreq: string }> = [
    { slug: '', priority: '1.0', changefreq: 'weekly' },
    { slug: '/subsidy-patan', priority: '0.95', changefreq: 'weekly' },
    { slug: '/calculator', priority: '0.9', changefreq: 'monthly' },
    { slug: '/projects', priority: '0.85', changefreq: 'monthly' },
    { slug: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  ];

  const entries: string[] = [];
  for (const page of pages) {
    const alternates = `
    <xhtml:link rel="alternate" hreflang="gu-IN" href="${cleanBase}/gu${page.slug}" />
    <xhtml:link rel="alternate" hreflang="en-IN" href="${cleanBase}/en${page.slug}" />
    <xhtml:link rel="alternate" hreflang="hi-IN" href="${cleanBase}/hi${page.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${cleanBase}/gu${page.slug}" />`;

    for (const lang of ['gu', 'en', 'hi'] as const) {
      entries.push(`  <url>
    <loc>${cleanBase}/${lang}${page.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${lang === 'gu' ? page.priority : (Math.max(0.4, Number(page.priority) - 0.05)).toFixed(2)}</priority>${alternates}
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

export function buildRobotsTxt(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return `# Riseion Solar (Patan & North Gujarat) - Search & AI Crawler Directives
User-agent: *
Allow: /
Disallow: /api/
Disallow: /seo-hub
Disallow: /admin

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${cleanBase}/sitemap.xml
`;
}
