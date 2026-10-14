export interface Chapter {
  id: number;
  title: string;
  hindiTitle: string;
  page: number;
  subsections?: {
    title: string;
    hindiTitle?: string;
    content: string;
    hindiContent?: string;
  }[];
  content: string;
  hindiContent: string;
}

export interface BookEdition {
  id: 'english' | 'hindi';
  title: string;
  subtitle: string;
  language: 'English' | 'Hindi';
  languageNative: 'English' | 'हिंदी';
  price: number;
  originalPrice: number;
  currency: string;
  format: string;
  pages: number;
  fileSize: string;
  description: string;
  coverImage: string;
  badge: string;
  publishedYear: string;
  disclaimer: string;
  whatsappMessage: string;
  chapters: {
    number: number;
    title: string;
    previewExcerpt: string;
  }[];
}

export const BOOKS_DATA: Record<'english' | 'hindi', BookEdition> = {
  english: {
    id: 'english',
    title: 'OSHO — Life and Philosophy',
    subtitle: 'An introduction to the mystic, his ideas, and his legacy',
    language: 'English',
    languageNative: 'English',
    price: 49,
    originalPrice: 199,
    currency: '₹',
    format: 'Digital PDF (Instant Download)',
    pages: 16,
    fileSize: '3.4 MB',
    description: 'An independent, balanced introduction to Osho\'s life, core ideas, meditation methods, and enduring cultural legacy.',
    coverImage: '/src/assets/images/book_mockup_english_1791959438857.jpg',
    badge: 'Bestseller · English Edition',
    publishedYear: '2026 Edition',
    disclaimer: 'An original, independent introduction written in plain language. It summarises Osho\'s life and ideas and does not reproduce his own copyrighted words. Not affiliated with Osho International Foundation.',
    whatsappMessage: 'Hello! I want to purchase the OSHO Life and Philosophy English E-Book for ₹49. Please share the payment details.',
    chapters: [
      {
        number: 1,
        title: 'Who Was Osho?',
        previewExcerpt: 'Few spiritual teachers of the twentieth century provoked as much admiration and as much argument as Osho. Born Chandra Mohan Jain in central India, he became a university teacher of philosophy, then a travelling public speaker, and finally the head of a worldwide movement of meditators...'
      },
      {
        number: 2,
        title: 'From Jabalpur to Pune: Early Life',
        previewExcerpt: 'Chandra Mohan Jain was born on 11 December 1931 in the village of Kuchwada in Madhya Pradesh. Accounts of his childhood describe a questioning, independent boy who disliked rote learning. He went on to teach philosophy at Sanskrit college in Raipur and Jabalpur University...'
      },
      {
        number: 3,
        title: 'The Core Ideas',
        previewExcerpt: 'Osho never offered a single tidy system, and he deliberately contradicted himself to keep listeners awake. 1. Awareness over belief — witnessing thoughts without being swallowed by them. 2. Conditioning and the false self. 3. The body is not the enemy. 4. Freedom and responsibility. 5. Celebration...'
      },
      {
        number: 4,
        title: 'Meditation: The Heart of the Work',
        previewExcerpt: 'For Osho, meditation was not a single technique but a quality of being awake. Because modern humans carry so much tension, he designed active methods that release energy first: Dynamic Meditation (5 stages: intense breathing, release, jumping, freezing, celebration), Kundalini Meditation, and Nadabrahma...'
      },
      {
        number: 5,
        title: 'Love, Relationship and Freedom',
        previewExcerpt: 'Osho spoke about love more than almost any other subject. He argued that most relationships are built on need, possession and fear of loneliness, and that these turn love into a trade. His alternative was a love resting on inner wholeness: aloneness and love as partners...'
      },
      {
        number: 6,
        title: 'Zorba the Buddha',
        previewExcerpt: 'His best-known phrase for the ideal person is the "new man", or "Zorba the Buddha". It combines two figures: Zorba, who loves food, music and life, and the Buddha, the quiet awakened master. Someone fully alive in the world and fully at peace inside...'
      },
      {
        number: 7,
        title: 'The Oregon Years and Controversy',
        previewExcerpt: 'In 1981 Osho left India for the United States. Followers bought a large ranch in Oregon and built Rajneeshpuram. The community clashed with local residents and authorities. In 1984, members led by Ma Anand Sheela carried out the salmonella contamination. In 1985, the leadership collapsed...'
      },
      {
        number: 8,
        title: 'Return to Pune and Final Years',
        previewExcerpt: 'In 1987 he returned to Pune, where the ashram reopened. In 1989 he took the name Osho. He passed away on 19 January 1990. His resting place remains at the meditation resort in Pune...'
      },
      {
        number: 9,
        title: 'Books and How to Read Them',
        previewExcerpt: 'Osho wrote little by hand; hundreds of books emerged from transcriptions of his spoken discourses. Key starting books: "Meditation: The First and Last Freedom", "The Book of Secrets", "Courage", and "Intuition"...'
      },
      {
        number: 10,
        title: 'Legacy, Criticism and Questions to Keep',
        previewExcerpt: 'Today his ideas on meditation, acceptance of the body, and spirituality without dogma helped shape modern mindfulness. Questions worth carrying: What do I believe only because I was taught to? Where do I confuse rebellion with real freedom?...'
      }
    ]
  },
  hindi: {
    id: 'hindi',
    title: 'ओशो — जीवन और दर्शन',
    subtitle: 'रहस्यदर्शी, उनके विचारों और उनकी विरासत का परिचय',
    language: 'Hindi',
    languageNative: 'हिंदी',
    price: 49,
    originalPrice: 199,
    currency: '₹',
    format: 'डिजिटल पीडीएफ (तुरंत डाउनलोड)',
    pages: 17,
    fileSize: '3.6 MB',
    description: 'ओशो के जीवन, विचारों, सक्रिय ध्यान पद्धतियों और वैश्विक दर्शन का निष्पक्ष, सरल और प्रामाणिक हिंदी परिचय।',
    coverImage: '/src/assets/images/book_mockup_hindi_1791959438631.jpg',
    badge: 'लोकप्रिय संस्करण · हिंदी एडिशन',
    publishedYear: '2026 संस्करण',
    disclaimer: 'यह सरल भाषा में लिखा गया एक स्वतंत्र परिचय है। यह ओशो के जीवन और विचारों का सार प्रस्तुत करता है और उनके अपने कॉपीराइट वाले शब्दों को पुनः प्रस्तुत नहीं करता। ओशो इंटरनेशनल से कोई प्रत्यक्ष संबद्धता नहीं है।',
    whatsappMessage: 'नमस्ते! मुझे ओशो जीवन और दर्शन की हिंदी ई-बुक ₹49 में खरीदनी है। कृपया भुगतान की जानकारी भेजें।',
    chapters: [
      {
        number: 1,
        title: 'ओशो कौन थे?',
        previewExcerpt: 'बीसवीं सदी के बहुत कम आध्यात्मिक गुरुओं ने इतनी प्रशंसा और इतना विवाद एक साथ पाया, जितना ओशो ने। मध्य भारत में चंद्र मोहन जैन के रूप में जन्मे ओशो पहले दर्शनशास्त्र के प्राध्यापक बने, फिर देश भर में प्रवचन देने वाले वक्ता, और अंत में ध्यान करने वालों के एक विश्वव्यापी आंदोलन के केंद्र...'
      },
      {
        number: 2,
        title: 'जबलपुर से पुणे तक: प्रारंभिक जीवन',
        previewExcerpt: 'चंद्र मोहन जैन का जन्म 11 दिसंबर 1931 को मध्य प्रदेश के कुचवाड़ा गाँव में हुआ। उन्होंने दर्शनशास्त्र पढ़ा और रायपुर व जबलपुर विश्वविद्यालय में पढ़ाया। 21 मार्च 1953 को उन्होंने गहरा जागरण अनुभव किया। 1970 में मुंबई और 1974 में पुणे आश्रम की स्थापना हुई...'
      },
      {
        number: 3,
        title: 'मूल विचार',
        previewExcerpt: 'ओशो ने कभी कोई एक सुव्यवस्थित प्रणाली नहीं दी: 1. विश्वास से ऊपर जागरूकता (साक्षी-भाव)। 2. संस्कार और झूठा "मैं"। 3. शरीर शत्रु नहीं है (कामुकता और भावनाओं को स्वीकारना)। 4. स्वतंत्रता और उत्तरदायित्व। 5. उत्सव (हँसता-खेलता हुआ अध्यात्म)...'
      },
      {
        number: 4,
        title: 'ध्यान: उनके कार्य का हृदय',
        previewExcerpt: 'ओशो के लिए ध्यान कोई एक तकनीक नहीं, बल्कि जागे हुए होने की एक गुणवत्ता था। आधुनिक मनुष्य के तनाव को दूर करने के लिए सक्रिय विधियां: डायनामिक ध्यान के 5 चरण (तीव्र श्वास, विसर्जन, कूदना, ठहर जाना, उत्सव), कुंडलिनी ध्यान, नादब्रह्म, घूर्णन (व्हर्लिंग), और विपश्यना-शैली साक्षीभाव...'
      },
      {
        number: 5,
        title: 'प्रेम, संबंध और स्वतंत्रता',
        previewExcerpt: 'ओशो ने प्रेम पर सबसे अधिक बोला। उनका कहना था कि अधिकांश संबंध स्वामित्व और अकेलेपन के भय पर टिके होते हैं जिससे प्रेम सौदा बन जाता है। उनका विकल्प था भीतरी पूर्णता पर आधारित प्रेम: एकांत और प्रेम परस्पर साथी हैं...'
      },
      {
        number: 6,
        title: 'ज़ोरबा द बुद्धा',
        previewExcerpt: 'आदर्श व्यक्ति के लिए उनका प्रसिद्ध मुहावरा "नया मनुष्य" या "ज़ोरबा द बुद्धा" था। सांसारिक आनंद से लबरेज़ यूनानी पात्र ज़ोरबा और शांत अंतर्मुखी बुद्ध का एक ही मनुष्य में मिलन — संसार में पूरी तरह जीवंत और भीतर से शांत...'
      },
      {
        number: 7,
        title: 'ओरेगन के वर्ष और विवाद',
        previewExcerpt: '1981 में वे अमेरिका गए और ओरेगन में रजनीशपुरम बसाया। 1984 में स्थानीय तनाव और नेतृत्व के अपराध (साल्मोनेला विषैला मामला) सामने आए। 1985 में ओशो की गिरफ्तारी और अमेरिका से निर्वासन हुआ...'
      },
      {
        number: 8,
        title: 'पुणे वापसी और अंतिम वर्ष',
        previewExcerpt: '1987 में पुणे आश्रम लौटे। 1989 में "ओशो" नाम अपनाया। 19 जनवरी 1990 को पुणे में उनका निर्वाण हुआ। उनकी समाधि आज भी पुणे के ध्यान-रिसॉर्ट में स्थित है...'
      },
      {
        number: 9,
        title: 'पुस्तकें और उन्हें कैसे पढ़ें',
        previewExcerpt: 'ओशो ने स्वयं हाथ से बहुत कम लिखा, उनके प्रवचनों से सैकड़ों पुस्तकें बनीं। शुरुआती पुस्तकें: ध्यान: पहली और अंतिम मुक्ति (Meditation: The First and Last Freedom), द बुक ऑफ़ सीक्रेट्स, साहस, और अंतर्ज्ञान...'
      },
      {
        number: 10,
        title: 'विरासत, आलोचना और साथ रखने योग्य प्रश्न',
        previewExcerpt: 'आधुनिक माइंडफुलनेस और वेलनेस पर गहरा प्रभाव। साथ रखने योग्य जीवन प्रश्न: मैं क्या केवल इसलिए मानता हूँ क्योंकि मुझे सिखाया गया था? मैं कहाँ विद्रोह को सच्ची स्वतंत्रता समझ बैठता हूँ?...'
      }
    ]
  }
};

export const CORE_PHILOSOPHY_PILLARS = [
  {
    enTitle: 'Witnessing (Sakshi-Bhav)',
    hiTitle: 'साक्षी-भाव (जागरूकता)',
    enDesc: 'Observing the stream of thoughts and emotions without becoming lost in them or identifying as the ego.',
    hiDesc: 'विचारों और भावनाओं को बिना उनमें डूबे एक शांत साक्षी बनकर देखना।'
  },
  {
    enTitle: 'Active Meditation',
    hiTitle: 'सक्रिय ध्यान विधियाँ',
    enDesc: 'Dynamic & Kundalini catharsis to exhaust modern bodily agitation and mental chatter before entering silent stillness.',
    hiDesc: 'आधुनिक तनाव को पहले शरीर से बाहर निकालकर सहज मौन में उतरने का वैज्ञानिक मार्ग।'
  },
  {
    enTitle: 'Zorba the Buddha',
    hiTitle: 'ज़ोरबा द बुद्धा (नया मनुष्य)',
    enDesc: 'Unifying material celebration with transcendental meditation: living fully alive in the world yet utterly silent within.',
    hiDesc: 'संसार के आनंद और समाधि के मौन का पूर्ण समन्वय — जीवन का उत्सव और भीतरी शांति।'
  },
  {
    enTitle: 'Love & Aloneness',
    hiTitle: 'प्रेम और एकांत',
    enDesc: 'Love rooted not in dependency or possession, but blossoming from one\'s own inner fulfillment and freedom.',
    hiDesc: 'किसी पर निर्भरता या अधिकार नहीं, बल्कि अपनी पूर्णता से बहता हुआ सच्चा प्रेम।'
  }
];

export const TIMELINE_EVENTS = [
  { year: '1931', en: 'Born Chandra Mohan Jain on Dec 11 in Kuchwada, Madhya Pradesh.', hi: '11 दिसंबर को कुचवाड़ा, मध्य प्रदेश में चंद्र मोहन जैन के रूप में जन्म।' },
  { year: '1953', en: 'Reported spiritual awakening on March 21 in Jabalpur.', hi: '21 मार्च को जबलपुर में गहरा आत्म-जागरण अनुभव किया।' },
  { year: '1958-66', en: 'Professor of Philosophy at Jabalpur University; travels across India giving public discourses.', hi: 'जबलपुर विश्वविद्यालय में दर्शनशास्त्र के प्राध्यापक; पूरे भारत में ऐतिहासिक व्याख्यान।' },
  { year: '1970', en: 'Relocates to Bombay (Mumbai) and introduces Dynamic Meditation.', hi: 'मुंबई आगमन और ऐतिहासिक डायनामिक ध्यान विधि की शुरुआत।' },
  { year: '1974', en: 'Establishes the international ashram in Koregaon Park, Pune.', hi: 'पुणे में अंतरराष्ट्रीय आश्रम की स्थापना, दुनिया भर से साधकों का आगमन।' },
  { year: '1981', en: 'Departs for USA; followers construct Rajneeshpuram in Oregon.', hi: 'अमेरिका प्रस्थान; ओरेगन में रजनीशपुरम नगर की स्थापना।' },
  { year: '1985', en: 'Community leadership collapse, arrest, plea agreement, and departure from USA.', hi: 'नेतृत्व का पतन, आप्रवासन आरोपों पर समझौता और अमेरिका से प्रस्थान।' },
  { year: '1987', en: 'Returns to Pune, revitalizing the commune and expanding meditation practices.', hi: 'पुणे वापसी, आश्रम का पुनरोद्धार और ध्यान विधियों का नया विस्तार।' },
  { year: '1989', en: 'Formally adopts the title "Osho", derived from William James\' oceanic feeling.', hi: 'औपचारिक रूप से "ओशो" नाम अपनाया।' },
  { year: '1990', en: 'Leaves the physical body on January 19 in Pune; epitaph: "Never Born, Never Died — Only Visited this Planet Earth".', hi: '19 जनवरी को पुणे में महापरिनिर्वाण; समाधि आज भी पुणे में स्थित।' }
];

export const FAQ_LIST = [
  {
    qEn: 'What is the format of the e-book and how do I receive it?',
    qHi: 'ई-बुक किस फॉर्मेट में है और मुझे यह कैसे प्राप्त होगी?',
    aEn: 'The e-book is a high-resolution PDF readable on all phones, tablets, Kindle devices, and computers. Immediately after completing the ₹49 payment, you are redirected to the order confirmation page with a direct one-click download button. A copy is also available via WhatsApp if you order through chat.',
    aHi: 'यह ई-बुक हाई-क्वालिटी पीडीएफ फॉर्मेट में है जिसे मोबाइल, टैबलेट, आईपैड और कंप्यूटर पर आसानी से पढ़ा जा सकता है। ₹49 के भुगतान के तुरंत बाद आपको डायरेक्ट डाउनलोड बटन मिल जाता है।'
  },
  {
    qEn: 'Are both English and Hindi versions available?',
    qHi: 'क्या अंग्रेजी और हिंदी दोनों संस्करण उपलब्ध हैं?',
    aEn: 'Yes! You can choose the English Edition (16 pages) or the Hindi Edition (17 pages) for ₹49 each. You can also purchase both in a single checkout.',
    aHi: 'हाँ! आप अंग्रेजी संस्करण (16 पृष्ठ) या हिंदी संस्करण (17 पृष्ठ) प्रत्येक ₹49 में खरीद सकते हैं, या दोनों एक साथ ले सकते हैं।'
  },
  {
    qEn: 'What payment methods are supported in India?',
    qHi: 'भारत में भुगतान के कौन-कौन से तरीके उपलब्ध हैं?',
    aEn: 'We support all major Indian payment methods: Google Pay, PhonePe, Paytm, BHIM UPI, debit & credit cards (Visa, MasterCard, RuPay), Net Banking, and instant WhatsApp Pay support.',
    aHi: 'आप Google Pay, PhonePe, Paytm, UPI, डेबिट/क्रेडिट कार्ड और नेट बैंकिंग के माध्यम से सुरक्षित भुगतान कर सकते हैं। इसके अलावा WhatsApp पर भी सीधा ऑर्डर कर सकते हैं।'
  },
  {
    qEn: 'Is this an official publication or an independent work?',
    qHi: 'क्या यह आधिकारिक पुस्तक है या स्वतंत्र परिचय?',
    aEn: 'This is an independent, objective introductory study of Osho\'s life, meditation techniques, core philosophy, and controversial history, written in plain language without reproducing copyrighted lecture transcripts. It is not affiliated with the Osho International Foundation.',
    aHi: 'यह ओशो के जीवन, ध्यान विधियों और दर्शन पर आधारित एक स्वतंत्र, निष्पक्ष और मौलिक अध्ययन पुस्तक है।'
  },
  {
    qEn: 'Can I order directly on WhatsApp instead?',
    qHi: 'क्या मैं सीधे WhatsApp पर ऑर्डर कर सकता/सकती हूँ?',
    aEn: 'Yes! Simply click the "Order on WhatsApp" button. It will open WhatsApp with our verified number +91 7822042721 and a prefilled message. Our team will send UPI details and provide the PDF directly to your chat.',
    aHi: 'बिल्कुल! "Order on WhatsApp" बटन दबाएं, यह हमारे नंबर +91 7822042721 पर संदेश खोलेगा और आपको तुरंत चैट पर पीडीएफ और क्यूआर कोड उपलब्ध कराया जाएगा।'
  }
];
