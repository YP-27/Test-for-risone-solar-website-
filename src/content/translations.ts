import type { Lang } from '../config/siteConfig';

export const UI_COPY = {
  nav: {
    home: { gu: 'હોમ', en: 'Home', hi: 'होम' },
    subsidy: { gu: 'પાટણ સબસિડી', en: 'Patan Subsidy', hi: 'पाटन सब्सिडी' },
    calculator: { gu: 'કેલ્ક્યુલેટર', en: 'Calculator', hi: 'कैलकुलेटर' },
    projects: { gu: 'પ્રોજેક્ટ્સ', en: 'Projects', hi: 'प्रोजेक्ट्स' },
    hub: { gu: 'SEO અને લીડ્સ', en: 'SEO & Leads', hi: 'SEO और लीड्स' },
    cta: { gu: 'મફત સાઇટ વિઝિટ', en: 'Free Site Visit', hi: 'मुफ्त साइट विज़िट' },
    privacy: { gu: 'પ્રાઇવસી પોલિસી', en: 'Privacy Policy', hi: 'प्राइवेसी पॉलिसी' },
  },
  hero: {
    kicker: {
      gu: 'પાટણ, સિદ્ધપુર, ચાણસ્મા, રાધનપુર અને ઉત્તર ગુજરાત · UGVCL સોલાર સેવા',
      en: 'Patan, Siddhpur, Chanasma, Radhanpur & North Gujarat · UGVCL Rooftop Solar',
      hi: 'पाटन, सिद्धपुर, चाणस्मा, राधनपुर और उत्तर गुजरात · UGVCL रूफटॉप सोलर',
    },
    title: {
      gu: 'પાટણમાં ઘર, દુકાન અને ફેક્ટરી માટે વિશ્વસનીય રૂફટોપ સોલાર.',
      en: 'Trusted Rooftop Solar for Homes, Shops & Factories in Patan.',
      hi: 'पाटन और उत्तर गुजरात में घर, दुकान व फैक्ट्री के लिए भरोसेमंद रूफटॉप सोलर।',
    },
    subtitle: {
      gu: 'સાઇટ વિઝિટ, મજબૂત ઇન્સ્ટોલેશન, 2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ અને PM સૂર્ય ઘર સબસિડીના કાગળો તથા મેન્ટેનન્સ — બધું એક જ સ્થાનિક ટીમ દ્વારા.',
      en: 'Roof survey, engineered installation, 2.18 kWp Gujarat state top-up & PM Surya Ghar subsidy paperwork, UGVCL net metering, and after-sales maintenance from one local Patan team.',
      hi: 'साइट विज़िट, मजबूत इंस्टॉलेशन, 2.18 kWp गुजरात राज्य टॉप-अप व पीएम सूर्य घर सब्सिडी कागज़ात, UGVCL नेट मीटरिंग और मेंटेनेंस — सब एक ही स्थानीय टीम द्वारा।',
    },
    primaryBtn: {
      gu: 'તમારી સબસિડી અને બચત ગણો',
      en: 'Calculate Subsidy & Savings',
      hi: 'सब्सिडी और बचत की गणना करें',
    },
    secondaryBtn: {
      gu: '2.18 kWp પાટણ સબસિડી ગાઇડ વાંચો',
      en: 'Read Patan 2.18 kWp Subsidy Guide',
      hi: 'पाटन 2.18 kWp सब्सिडी गाइड पढ़ें',
    },
    tagline: {
      gu: 'સોલાર પેનલ અમારી, વીજળીની બચત તમારી.',
      en: 'Our solar panels, your electricity savings.',
      hi: 'सोलर पैनल हमारे, बिजली की बचत आपकी।',
    },
  },
  solutions: {
    heading: {
      gu: 'દરેક જરૂરિયાત માટે યોગ્ય સોલાર સોલ્યુશન',
      en: 'Rooftop Solar Solutions Built for North Gujarat Weather',
      hi: 'उत्तर गुजरात के मौसम के अनुसार हर जरूरत के लिए सोलर समाधान',
    },
    sub: {
      gu: 'પાટણની ગરમી અને ધૂળને ધ્યાનમાં રાખીને મજબૂત ગેલ્વેનાઇઝ્ડ સ્ટ્રક્ચર, DCR પેનલ અને BIS ઇન્વર્ટર સાથે.',
      en: 'Engineered for Patan heat and dust with corrosion-resistant structures, DCR panels, BIS inverters, and UGVCL-ready wiring.',
      hi: 'पाटन की गर्मी और धूल को ध्यान में रखते हुए मजबूत स्ट्रक्चर, DCR पैनल और BIS इन्वर्टर के साथ।',
    },
    items: [
      {
        index: '01',
        key: 'residential' as const,
        title: { gu: 'ઘર માટે રૂફટોપ સોલાર (1 kW થી 10 kW)', en: 'Residential Rooftop Solar (1 kW – 10 kW)', hi: 'घर के लिए रूफटॉप सोलर (1 kW – 10 kW)' },
        desc: {
          gu: '2.18 kWp ગુજરાત સ્ટેટ ટોપ-અપ અને PM સૂર્ય ઘર (₹78,000 સુધી) સબસિડી સાથે ઘરનું વીજ બિલ ઝીરોની નજીક લાવો.',
          en: 'Cut monthly UGVCL home electricity bills with PM Surya Ghar central subsidy (up to ₹78,000) or the Gujarat 2.18 kWp residential top-up.',
          hi: '2.18 kWp गुजरात राज्य टॉप-अप और पीएम सूर्य घर (₹78,000 तक) सब्सिडी के साथ घर का बिजली बिल न्यूनतम करें।',
        },
        cta: { gu: 'ઘર માટે બચત ગણો', en: 'Calculate for Home', hi: 'घर के लिए गणना करें' },
      },
      {
        index: '02',
        key: 'commercial' as const,
        title: { gu: 'દુકાન, શોરૂમ અને ઓફિસ સોલાર', en: 'Commercial Solar for Shops & Offices', hi: 'दुकान, शोरूम और ऑफिस के लिए सोलर' },
        desc: {
          gu: 'ઊંચા કોમર્શિયલ યુનિટ દરથી બચવા માટે દિવસના એસી અને લાઇટિંગ લોડ માટે કાર્યક્ષમ ઓન-ગ્રિડ સિસ્ટમ.',
          en: 'Offset high commercial electricity tariffs for retail shops, clinics, schools, and showrooms across Patan, Siddhpur, and Mehsana.',
          hi: 'दुकानों, क्लीनिक और शोरूम के महंगे कमर्शियल बिजली बिल बचाने के लिए प्रभावी ऑन-ग्रिड सिस्टम।',
        },
        cta: { gu: 'વ્યવસાય માટે ગણતરી', en: 'Calculate for Shop', hi: 'व्यापार के लिए गणना' },
      },
      {
        index: '03',
        key: 'industrial' as const,
        title: { gu: 'પાટણ GIDC અને ફેક્ટરી સોલાર પ્લાન્ટ', en: 'Industrial Solar for Patan GIDC & Factories', hi: 'पाटन GIDC और फैक्ट्री सोलर प्लांट' },
        desc: {
          gu: 'ફેક્ટરી શેડ, કોલ્ડ સ્ટોરેજ અને જીનિંગ મિલ માટે મોટા પાયે રૂફટોપ પ્લાન્ટ, GERC નેટ મીટરિંગ અને ટેક્સ ડેપ્રિસિએશન લાભ.',
          en: 'High-capacity metal-shed rooftop plants for Patan GIDC factories, cold storages, and agro mills with fast payback and depreciation benefits.',
          hi: 'फैक्ट्री शेड, कोल्ड स्टोरेज और मिलों के लिए बड़े स्तर का रूफटॉप प्लांट और GERC नेट मीटरिंग सहायता।',
        },
        cta: { gu: 'ફેક્ટરી ક્વોટ મેળવો', en: 'Estimate Factory Plant', hi: 'फैक्ट्री अनुमान पाएं' },
      },
    ],
  },
  process: {
    heading: {
      gu: 'UGVCL પાટણમાં સોલાર લગાવવાના 4 સરળ પગલાં',
      en: '4-Step Solar & UGVCL Net Metering Workflow',
      hi: 'पाटन (UGVCL) में सोलर लगाने के 4 आसान चरण',
    },
    steps: [
      {
        num: '01',
        title: { gu: 'મફત સાઇટ વિઝિટ અને બિલ તપાસ', en: 'Free Site Visit & Bill Audit', hi: 'मुफ्त साइट विज़िट और बिल जांच' },
        desc: {
          gu: 'અમે તમારી છત, છાંયો, UGVCL સેન્ક્શન્ડ લોડ અને છેલ્લા બિલ તપાસીને સાચી kW સાઇઝ સૂચવીએ છીએ.',
          en: 'We inspect shadow-free roof area, orientation, UGVCL sanctioned load, and monthly units before recommending a size.',
          hi: 'हम आपकी छत, छाया, UGVCL लोड और बिजली बिल देखकर सही kW क्षमता का सुझाव देते हैं।',
        },
      },
      {
        num: '02',
        title: { gu: 'PM સૂર્ય ઘર અને UGVCL અરજી', en: 'PM Surya Ghar & UGVCL Filing', hi: 'पीएम सूर्य घर और UGVCL आवेदन' },
        desc: {
          gu: 'pmsuryaghar.gov.in પર અરજી. બિલ, આધાર અને બેંક નામની ચકાસણી કરીને રિજેક્શન અટકાવીએ છીએ.',
          en: 'We prepare your pmsuryaghar.gov.in filing under UGVCL and verify exact name matching across UGVCL bill, Aadhaar, and bank account.',
          hi: 'pmsuryaghar.gov.in पर UGVCL के अंतर्गत आवेदन और बिजली बिल, आधार व बैंक नाम की सटीक जांच।',
        },
      },
      {
        num: '03',
        title: { gu: 'મજબૂત સ્ટ્રક્ચર અને DCR પેનલ ફિટિંગ', en: 'Engineered Installation (DCR + BIS)', hi: 'मजबूत इंस्टॉलेशन (DCR + BIS)' },
        desc: {
          gu: 'સબસિડી નિયમ મુજબ ભારતીય DCR પેનલ, BIS ઇન્વર્ટર, અર્થિંગ અને લાઇટનિંગ અરેસ્ટર સાથે સુરક્ષિત ફિટિંગ.',
          en: 'Installed using subsidy-eligible Indian DCR panels, BIS-certified inverters, DC/AC surge protection, and proper earthing.',
          hi: 'सब्सिडी मानकों के अनुसार भारतीय DCR पैनल, BIS इन्वर्टर, अर्थिंग और सुरक्षित वायरिंग के साथ इंस्टॉलेशन।',
        },
      },
      {
        num: '04',
        title: { gu: 'UGVCL નેટ મીટર અને બેંકમાં સબસિડી (DBT)', en: 'UGVCL Net Meter & Direct Subsidy (DBT)', hi: 'UGVCL नेट मीटर और बैंक में सब्सिडी (DBT)' },
        desc: {
          gu: 'UGVCL તપાસ પછી બાય-ડાયરેક્શનલ નેટ મીટર લાગે છે અને કમિશનિંગ બાદ સબસિડી સીધી તમારા બેંક ખાતામાં જમા થાય છે.',
          en: 'After UGVCL inspection and bi-directional net-meter installation, commissioning triggers Direct Bank Transfer subsidy credit.',
          hi: 'UGVCL निरीक्षण और नेट मीटर लगने के बाद कमिशनिंग रिपोर्ट पर सब्सिडी सीधे आपके बैंक खाते (DBT) में आती है।',
        },
      },
    ],
  },
  areas: {
    heading: {
      gu: 'પાટણથી સમગ્ર ઉત્તર ગુજરાત અને ગુજરાતમાં સેવા',
      en: 'Serving Patan District, North Gujarat & Across Gujarat',
      hi: 'पाटन जिले से पूरे उत्तर गुजरात और गुजरात में सेवा',
    },
    desc: {
      gu: 'અમારી ઓફિસ પાટણમાં પદ્મનાભ ચોકડી પાસે આવેલી છે, જેથી સાઇટ વિઝિટ, UGVCL ફોલો-અપ અને ઇન્સ્ટોલેશન પછીના મેન્ટેનન્સ માટે તમને ઝડપી સ્થાનિક સપોર્ટ મળે છે.',
      en: 'Headquartered near Padmanabh Chokdi, Patan — giving homeowners, shopkeepers, and GIDC factory owners fast local site visits and dependable post-installation service.',
      hi: 'पद्मनाभ चौकड़ी, पाटन में स्थानीय कार्यालय होने से साइट विज़िट, UGVCL फॉलो-अप और इंस्टॉलेशन के बाद की सर्विस तेज़ी से मिलती है।',
    },
  },
  reviews: {
    heading: {
      gu: 'પાટણ અને ઉત્તર ગુજરાતના ગ્રાહકોનો વિશ્વાસ',
      en: 'What Solar Customers Across Patan Say',
      hi: 'पाटन और उत्तर गुजरात के ग्राहकों के अनुभव',
    },
    sampleNotice: {
      gu: 'નોંધ: નીચેના રિવ્યૂ હાલ સેમ્પલ પ્લેસહોલ્ડર છે — Google Business Profile લાઇવ થતાં જ src/config/siteConfig.ts માં વાસ્તવિક ગ્રાહક રિવ્યૂ મૂકી શકાશે.',
      en: 'Sample placeholder reviews — swap with verified Google Business Profile customer reviews in src/config/siteConfig.ts once collected.',
      hi: 'नोट: नीचे सैंपल रिव्यू दिए गए हैं — Google Business Profile लाइव होने पर src/config/siteConfig.ts में असली रिव्यू बदल दें।',
    },
    cta: {
      gu: 'તમારો અનુભવ શેર કરો (WhatsApp / Google)',
      en: 'Share Your Experience',
      hi: 'अपना अनुभव साझा करें',
    },
  },
  faq: {
    heading: {
      gu: 'પાટણ સોલાર અને સબસિડી વિશેના મુખ્ય પ્રશ્નો (AEO / Voice Search)',
      en: 'Direct Answers on Patan Solar & UGVCL Subsidy',
      hi: 'पाटन सोलर और UGVCL सब्सिडी से जुड़े आम सवाल',
    },
    sourceLine: {
      gu: 'છેલ્લે ચકાસેલ: 25 નવેમ્બર 2026 · સત્તાવાર પોર્ટલ:',
      en: 'Last verified: 25 November 2026 · Official portals:',
      hi: 'अंतिम जांच: 25 नवंबर 2026 · आधिकारिक पोर्टल:',
    },
    items: [
      {
        q: {
          gu: 'પાટણ (UGVCL) માં 2.18 kWp સોલાર સબસિડીમાં ગ્રાહકે કેટલા રૂપિયા ભરવાના હોય છે?',
          en: 'How much does a consumer pay under Gujarat 2.18 kWp solar top-up in Patan (UGVCL)?',
          hi: 'पाटन (UGVCL) में 2.18 kWp गुजरात सोलर सब्सिडी में ग्राहक को कितना देना होता है?',
        },
        a: {
          gu: 'ગુજરાત સરકારની 2.18 kWp સુધીની રહેણાંક ટોપ-અપ યોજના મુજબ MNRE બેન્ચમાર્ક ખર્ચ ₹1,08,100 ગણાય છે. તેમાં ₹63,240 કેન્દ્રીય સબસિડી મળે છે. જનરલ કેટેગરી માટે 10% એટલે ₹10,810 (રાજ્ય ટોપ-અપ ₹34,050) અને SC/ST માટે 5% એટલે ₹5,405 (રાજ્ય ટોપ-અપ ₹39,455) ફાળો આવે છે. આ યોજના લેનાર 3 વર્ષ સુધી ક્ષમતા વધારી શકતા નથી.',
          en: 'Under Gujarat’s residential top-up policy for systems up to 2.18 kWp, the MNRE benchmark cost is ₹1,08,100 and PM Surya Ghar central subsidy is ₹63,240. General consumers contribute 10% (₹10,810; ₹34,050 state top-up) and SC/ST consumers contribute 5% (₹5,405; ₹39,455 state top-up). A 3-year expansion lock applies.',
          hi: 'गुजरात की 2.18 kWp तक की घरेलू टॉप-अप नीति में MNRE बेंचमार्क लागत ₹1,08,100 और केंद्रीय सब्सिडी ₹63,240 है। सामान्य श्रेणी को 10% (₹10,810; राज्य टॉप-अप ₹34,050) और SC/ST को 5% (₹5,405; राज्य टॉप-अप ₹39,455) देना होता है। इसमें 3 वर्ष तक क्षमता बढ़ाने पर रोक रहती है।',
        },
      },
      {
        q: {
          gu: 'PM સૂર્ય ઘર યોજનામાં 1 kW, 2 kW અને 3 kW પર કેટલી સબસિડી મળે છે?',
          en: 'What is the PM Surya Ghar subsidy for 1 kW, 2 kW, and 3 kW systems?',
          hi: 'पीएम सूर्य घर योजना में 1 kW, 2 kW और 3 kW पर कितनी सब्सिडी मिलती है?',
        },
        a: {
          gu: 'ઘરની છત પર સોલાર માટે 1 kW પર ₹30,000, 2 kW પર ₹60,000 અને 3 kW કે તેથી વધુ પર મહત્તમ ₹78,000 કેન્દ્રીય સબસિડી DBT થી સીધી બેંકમાં મળે છે. 2.18 kWp થી મોટી સિસ્ટમ પર ગુજરાત સ્ટેટ ટોપ-અપ મળતો નથી.',
          en: 'Under PM Surya Ghar: Muft Bijli Yojana, residential rooftops receive ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum cap of ₹78,000 for 3 kW and above via DBT. Systems exceeding 2.18 kWp do not receive the Gujarat state top-up.',
          hi: 'घरेलू छत पर 1 kW के लिए ₹30,000, 2 kW के लिए ₹60,000 और 3 kW या अधिक पर अधिकतम ₹78,000 केंद्रीय सब्सिडी DBT से सीधे बैंक खाते में मिलती है। 2.18 kWp से बड़ी क्षमता पर राज्य टॉप-अप लागू नहीं होता।',
        },
      },
      {
        q: {
          gu: 'પાટણમાં UGVCL નેટ મીટરિંગ અને સબસિડી માટે કયા દસ્તાવેજો જોઈએ?',
          en: 'Which documents are needed for UGVCL net metering and solar subsidy in Patan?',
          hi: 'पाटन में UGVCL नेट मीटरिंग और सब्सिडी के लिए कौन से दस्तावेज़ चाहिए?',
        },
        a: {
          gu: 'તાજેતરનું UGVCL વીજ બિલ, આધાર કાર્ડ, કેન્સલ ચેક અથવા બેંક પાસબુક, પાસપોર્ટ ફોટો અને પ્રોપર્ટી ટેક્સ બિલ. ખાસ ધ્યાન રાખો કે UGVCL બિલ, આધાર અને બેંક ખાતામાં નામ એકસરખું હોવું જરૂરી છે.',
          en: 'Latest UGVCL electricity bill, Aadhaar card, cancelled cheque or bank passbook, passport photo, and property tax receipt. Your name must match identically across your UGVCL bill, Aadhaar, and bank account to avoid DBT rejection.',
          hi: 'ताज़ा UGVCL बिजली बिल, आधार कार्ड, कैंसल चेक या बैंक पासबुक, पासपोर्ट फोटो और प्रॉपर्टी टैक्स रसीद। रिजेक्शन से बचने के लिए UGVCL बिल, आधार और बैंक में नाम बिल्कुल समान होना चाहिए।',
        },
      },
      {
        q: {
          gu: 'શું દુકાન અને પાટણ GIDC ફેક્ટરી માટે સરકારી સબસિડી મળે છે?',
          en: 'Are shops and Patan GIDC factories eligible for PM Surya Ghar subsidy?',
          hi: 'क्या दुकानों और पाटन GIDC फैक्ट्रियों को पीएम सूर्य घर सब्सिडी मिलती है?',
        },
        a: {
          gu: 'ના. PM સૂર્ય ઘર અને 2.18 kWp ગુજરાત ટોપ-અપ ફક્ત રહેણાંક (ઘર) માટે છે. દુકાનો અને ફેક્ટરીઓને ઊંચા વ્યાપારી બિલ પર સીધી બચત, GERC નેટ મીટરિંગ અને ટેક્સ ડેપ્રિસિએશનનો મોટો આર્થિક ફાયદો મળે છે.',
          en: 'No. Both PM Surya Ghar and Gujarat 2.18 kWp subsidies are strictly for residential connections. Commercial shops and factories gain rapid ROI by offsetting higher commercial tariffs plus eligible tax depreciation.',
          hi: 'नहीं। पीएम सूर्य घर और 2.18 kWp गुजरात सब्सिडी केवल घरेलू कनेक्शन के लिए हैं। दुकानों और फैक्ट्रियों को ऊंचे कमर्शियल बिल में सीधी बचत, नेट मीटरिंग और टैक्स डेप्रिसिएशन का लाभ मिलता है।',
        },
      },
      {
        q: {
          gu: '1 kW સોલાર સિસ્ટમ પાટણમાં રોજ કેટલા યુનિટ વીજળી બનાવે છે અને કેટલી જગ્યા જોઈએ?',
          en: 'How many units does 1 kW solar generate in Patan and how much roof space is needed?',
          hi: 'पाटन में 1 kW सोलर रोज़ कितनी यूनिट बनाता है और छत की कितनी जगह चाहिए?',
        },
        a: {
          gu: 'ઉત્તર ગુજરાતના સારા તડકામાં 1 kW સોલાર સિસ્ટમ સરેરાશ રોજ ~4 યુનિટ (મહિને ~120 યુનિટ) વીજળી બનાવે છે અને લગભગ 80 થી 100 ચો. ફૂટ છાંયા વગરની છતની જગ્યા જરૂરી રહે છે.',
          en: 'In North Gujarat sunshine, a 1 kW rooftop system generates roughly 4 units/day (~120 units/month) on average and requires about 80–100 sq. ft. of shadow-free roof area.',
          hi: 'उत्तर गुजरात की अच्छी धूप में 1 kW सिस्टम औसतन रोज़ ~4 यूनिट (~120 यूनिट/माह) बिजली बनाता है और इसके लिए लगभग 80–100 वर्ग फुट छाया-रहित छत चाहिए।',
        },
      },
    ],
  },
  enquiryModal: {
    title: {
      gu: 'મફત સાઇટ વિઝિટ અને ક્વોટ બુક કરો',
      en: 'Book Your Free Site Visit & Quote',
      hi: 'मुफ्त साइट विज़िट और कोटेशन बुक करें',
    },
    sub: {
      gu: 'તમારી વિગતો અમારા સુરક્ષિત બેકએન્ડમાં સેવ થશે અને Riseion Solar પાટણની ટીમ તમને સંપર્ક કરશે.',
      en: 'Your enquiry is saved directly to our Riseion Solar Patan backend so our local engineering team can call you back promptly.',
      hi: 'आपकी जानकारी हमारे Riseion Solar पाटन बैकएंड में सुरक्षित सेव होगी और हमारी स्थानीय टीम आपसे संपर्क करेगी।',
    },
    name: { gu: 'તમારું નામ *', en: 'Full Name *', hi: 'पूरा नाम *' },
    mobile: { gu: 'મોબાઇલ નંબર (10 અંક) *', en: 'Mobile Number (10 digits) *', hi: 'मोबाइल नंबर (10 अंक) *' },
    area: { gu: 'શહેર / તાલુકો *', en: 'City / Taluka *', hi: 'शहर / तालुका *' },
    address: { gu: 'પ્રોપર્ટી / છતનું સરનામું *', en: 'Site / Property Address *', hi: 'साइट / प्रॉपर्टी का पता *' },
    projectType: { gu: 'પ્રોજેક્ટનો પ્રકાર *', en: 'Property Type *', hi: 'प्रोजेक्ट का प्रकार *' },
    monthlyBill: { gu: 'અંદાજિત માસિક UGVCL બિલ (₹)', en: 'Approx. Monthly UGVCL Bill (₹)', hi: 'अनुमानित मासिक बिजली बिल (₹)' },
    message: { gu: 'વધારાની માહિતી (વૈકલ્પિક)', en: 'Additional Details (optional)', hi: 'अतिरिक्त जानकारी (वैकल्पिक)' },
    submit: { gu: 'વિનંતી સેવ કરો અને મોકલો', en: 'Save & Submit Enquiry', hi: 'पूछताछ सेव करें और भेजें' },
    submitting: { gu: 'સેવ થઈ રહ્યું છે...', en: 'Saving enquiry...', hi: 'सेव हो रहा है...' },
    successTitle: { gu: 'તમારી વિનંતી સુરક્ષિત રીતે સેવ થઈ ગઈ છે!', en: 'Enquiry Saved Successfully!', hi: 'आपकी पूछताछ सुरक्षित सेव हो गई है!' },
    successSub: {
      gu: 'અમારી પાટણ ટીમ ટૂંક સમયમાં તમને કૉલ કરશે. ઝડપી જવાબ માટે નીચેથી WhatsApp પર પણ મોકલી શકો છો.',
      en: 'Our Patan team has logged your request and will call you shortly. You can also send this summary on WhatsApp for an instant reply.',
      hi: 'हमारी पाटन टीम ने आपका अनुरोध दर्ज कर लिया है और जल्द ही कॉल करेगी। त्वरित जवाब के लिए नीचे WhatsApp पर भी भेज सकते हैं।',
    },
    whatsappBtn: { gu: 'WhatsApp પર મોકલો', en: 'Also Send on WhatsApp', hi: 'WhatsApp पर भी भेजें' },
    privacyNote: {
      gu: 'વિનંતી મોકલીને તમે અમારી પ્રાઇવસી પોલિસી સાથે સંમત થાઓ છો. અમે તમારો નંબર કોઈ ત્રીજી પાર્ટીને વેચતા નથી.',
      en: 'By submitting, you agree to our Privacy Policy. We never sell your phone number to third parties.',
      hi: 'सबमिट करके आप हमारी प्राइवेसी पॉलिसी से सहमत होते हैं। हम आपका नंबर किसी थर्ड पार्टी को नहीं बेचते।',
    },
  },
  footer: {
    about: {
      gu: 'પાટણ અને ઉત્તર ગુજરાતનાં ઘરો, દુકાનો અને ફેક્ટરીઓ માટે વિશ્વસનીય રૂફટોપ સોલાર, UGVCL નેટ મીટરિંગ અને સબસિડી માર્ગદર્શન (Riseion Technologies નો વિભાગ).',
      en: 'Rooftop solar installation, UGVCL net metering, subsidy paperwork, and maintenance for homes, shops, and factories in Patan & North Gujarat (a division of Riseion Technologies).',
      hi: 'पाटन और उत्तर गुजरात के घरों, दुकानों व फैक्ट्रियों के लिए रूफटॉप सोलर, UGVCL नेट मीटरिंग और सब्सिडी सहायता (Riseion Technologies का प्रभाग)।',
    },
    quickLinks: { gu: 'મહત્વની લિંક્સ', en: 'Quick Links', hi: 'त्वरित लिंक' },
    languages: { gu: 'ભાષા પસંદ કરો (SEO URLs)', en: 'Languages (Crawlable URLs)', hi: 'भाषा चुनें (SEO URLs)' },
    contact: { gu: 'સંપર્ક અને ઓફિસ', en: 'Contact & Patan Office', hi: 'संपर्क और पाटन ऑफिस' },
  },
};

export function t(obj: { gu: string; en: string; hi: string }, lang: Lang): string {
  return obj[lang] || obj.gu;
}
