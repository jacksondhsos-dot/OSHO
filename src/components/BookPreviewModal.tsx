import React, { useState } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight, Download, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { BOOKS_DATA, BookEdition } from '../data/booksData';

interface BookPreviewModalProps {
  edition: 'english' | 'hindi';
  isOpen: boolean;
  onClose: () => void;
  onBuy: (edition: 'english' | 'hindi') => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  edition,
  isOpen,
  onClose,
  onBuy,
}) => {
  const [activeEdition, setActiveEdition] = useState<'english' | 'hindi'>(edition);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  if (!isOpen) return null;

  const currentBook: BookEdition = (BOOKS_DATA as any)[activeEdition] || BOOKS_DATA.english;
  const chapters = currentBook.chapters;
  const currentChapter = chapters[activeChapterIndex] || chapters[0];
  const isHindi = activeEdition === 'hindi';

  const waMsg = encodeURIComponent(currentBook.whatsappMessage);
  const waUrl = `https://wa.me/917822042721?text=${waMsg}`;

  // Rich chapter content snippets directly matching the user's PDF
  const englishChapterSnippets: Record<number, { title: string; content: string[] }> = {
    1: {
      title: "Who Was Osho?",
      content: [
        "Few spiritual teachers of the twentieth century provoked as much admiration and as much argument as Osho. Born Chandra Mohan Jain in central India, he became a university teacher of philosophy, then a travelling public speaker, and finally the head of a worldwide movement of meditators known during most of his career as Acharya Rajneesh and later Bhagwan Shree Rajneesh. He adopted the name Osho in the last years of his life.",
        "His supporters see a rare, fearless communicator who made meditation relevant to modern people and who refused to separate spirituality from joy, humour and the body. His critics see a showman whose community became entangled in power, money and serious wrongdoing. A fair introduction has to hold both views at once, and this book tries to do that."
      ]
    },
    2: {
      title: "From Jabalpur to Pune: Early Life",
      content: [
        "Chandra Mohan Jain was born on 11 December 1931 in the village of Kuchwada in Madhya Pradesh. He was the eldest of many children in a Jain family of cloth merchants, and for his early years he was raised largely by his maternal grandparents. Accounts of his childhood, many of them his own, describe a questioning, independent boy who disliked rote learning and authority.",
        "He studied philosophy and went on to teach it, first at a Sanskrit college in Raipur and then at the University of Jabalpur. Students remembered him as a gifted, unconventional lecturer. His public talks across India, in which he criticised organised religion, politics and social convention, made him widely known and widely disliked by traditionalists.",
        "Followers hold that on 21 March 1953, while he was a student in Jabalpur, he underwent a deep awakening that he described as the turning point of his life. By the late 1960s he had left the university to conduct meditation camps, moving to Bombay in 1970 and establishing the international commune in Pune in 1974."
      ]
    },
    3: {
      title: "The Core Ideas",
      content: [
        "Osho never offered a single tidy system, and he deliberately contradicted himself to keep listeners awake. Even so, a handful of themes return again and again:",
        "1. Awareness over belief: The foundation of his teaching is awareness — the ability to watch your thoughts, feelings and actions without being swallowed by them. He called this witnessing. Belief systems, he argued, are borrowed answers, while awareness is first-hand.",
        "2. Conditioning and the false self: Family, school, religion and society install a set of ideas about who you should be. The task of a seeker is to notice this conditioning, loosen it, and discover what remains when it is seen through.",
        "3. The body is not the enemy: In contrast with ascetic traditions that treat the body as an obstacle, he taught acceptance of the body, of emotion and of sexuality as parts of a whole person.",
        "4. Freedom and responsibility: Rebellion comes from inner clarity, distinct from mere reaction.",
        "5. Celebration: Seriousness had been the great sickness of religion. He wanted a spirituality that laughs, dances and plays."
      ]
    },
    4: {
      title: "Meditation: The Heart of the Work",
      content: [
        "For Osho, meditation was not a single technique but a quality of being awake. Still, he believed modern people carry so much tension that sitting quietly rarely works as a first step. His answer was to design active methods that release energy first and then lead into stillness.",
        "Dynamic Meditation: Practised in the early morning in about an hour and in several stages: 1. Intense chaotic breathing. 2. Catharsis and emotional release. 3. Jumping with a repeated sound. 4. Sudden freeze into absolute stillness. 5. Celebration and dance.",
        "Other active methods include Kundalini Meditation (shaking, dancing, sitting, lying), Nadabrahma (sound humming), Whirling, and Vipassana-style breath watching."
      ]
    },
    6: {
      title: "Zorba the Buddha",
      content: [
        "His best-known phrase for the ideal person is the 'new man', sometimes called Zorba the Buddha. It combines two figures: Zorba, the Greek character who loves food, music and life, and the Buddha, the quiet awakened master.",
        "Osho's complaint about older religions was that they had split these two apart, offering either worldly pleasure without depth or spiritual depth without pleasure. He wanted both in one person: someone fully alive in the world and fully at peace inside."
      ]
    }
  };

  const hindiChapterSnippets: Record<number, { title: string; content: string[] }> = {
    1: {
      title: "ओशो कौन थे?",
      content: [
        "बीसवीं सदी के बहुत कम आध्यात्मिक गुरुओं ने इतनी प्रशंसा और इतना विवाद एक साथ पाया, जितना ओशो ने। मध्य भारत में चंद्र मोहन जैन के रूप में जन्मे ओशो पहले दर्शनशास्त्र के प्राध्यापक बने, फिर देश भर में प्रवचन देने वाले वक्ता, और अंत में ध्यान करने वालों के एक विश्वव्यापी आंदोलन के केंद्र।",
        "अपने अधिकांश जीवन में वे आचार्य रजनीश और बाद में भगवान श्री रजनीश के नाम से जाने गए। 'ओशो' नाम उन्होंने जीवन के अंतिम वर्षों में अपनाया।",
        "उनके अनुयायी उन्हें एक निर्भीक और दुर्लभ संवादकार मानते हैं, जिसने ध्यान को आधुनिक मनुष्य के लिए प्रासंगिक बनाया और अध्यात्म को आनंद, हास्य और शरीर से अलग नहीं होने दिया। उनके आलोचक उन्हें एक ऐसा प्रदर्शनप्रिय व्यक्ति मानते हैं, जिसका समुदाय सत्ता, धन और गंभीर अपराधों में उलझ गया। किसी भी ईमानदार परिचय को दोनों दृष्टियों को साथ रखना होगा, और यह पुस्तक वही करने का प्रयास करती है।"
      ]
    },
    2: {
      title: "जबलपुर से पुणे तक: प्रारंभिक जीवन",
      content: [
        "चंद्र मोहन जैन का जन्म 11 दिसंबर 1931 को मध्य प्रदेश के कुचवाड़ा गाँव में हुआ। वे कपड़े के व्यापारी एक जैन परिवार में कई भाई-बहनों में सबसे बड़े थे, और बचपन के आरंभिक वर्षों में मुख्यतः अपने नाना-नानी के पास पले।",
        "उन्होंने दर्शनशास्त्र पढ़ा और फिर उसे पढ़ाया, पहले रायपुर के एक संस्कृत महाविद्यालय में और फिर जबलपुर विश्वविद्यालय में। छात्र उन्हें एक प्रतिभाशाली और अपारंपरिक वक्ता के रूप में याद करते थे।",
        "21 मार्च 1953 को जबलपुर में उन्हें एक गहरा जागरण हुआ। 1970 में वे मुंबई आ गए, जहाँ उन्होंने डायनामिक ध्यान की शुरुआत की, और 1974 में पुणे में प्रसिद्ध आश्रम की नींव रखी।"
      ]
    },
    3: {
      title: "मूल विचार",
      content: [
        "ओशो ने कभी कोई एक सुव्यवस्थित प्रणाली नहीं दी, और श्रोताओं को जगाए रखने के लिए वे जान-बूझकर अपनी ही बात का खंडन भी कर देते थे। फिर भी कुछ विषय बार-बार लौटते हैं:",
        "1. विश्वास से ऊपर जागरूकता (साक्षी-भाव): अपने विचारों, भावनाओं और कर्मों को उनमें डूबे बिना देख पाने की क्षमता।",
        "2. संस्कार और झूठा 'मैं': परिवार, विद्यालय और समाज हमारे भीतर यह विचार बैठा देते हैं कि हमें कैसा होना चाहिए। साधक का काम इस संस्कारण को ढीला करना है।",
        "3. शरीर शत्रु नहीं है: तपस्वी परंपराओं के विपरीत उन्होंने शरीर, भावनाओं और कामुकता को संपूर्ण व्यक्तित्व का हिस्सा मानकर स्वीकारने की बात की।",
        "4. स्वतंत्रता और उत्तरदायित्व: विद्रोह भीतरी स्पष्टता से आता है।",
        "5. उत्सव: उनकी दृष्टि में धर्म की सबसे बड़ी बीमारी गंभीरता रही है। वे ऐसा अध्यात्म चाहते थे जो हँसे, नाचे और खेले।"
      ]
    },
    4: {
      title: "ध्यान: उनके कार्य का हृदय",
      content: [
        "ओशो के लिए ध्यान कोई एक तकनीक नहीं, बल्कि जागे हुए होने की एक गुणवत्ता था। आधुनिक मनुष्य इतना तनाव ढोता है कि पहले ही कदम पर चुपचाप बैठना काम नहीं करता। उनका उत्तर था ऐसी सक्रिय विधियाँ, जो पहले ऊर्जा को मुक्त करें और फिर मौन की ओर ले जाएँ।",
        "डायनामिक ध्यान के पाँच चरण: 1. तीव्र श्वास, 2. विसर्जन (रेचन), 3. कूदना (हू ध्वनि के साथ), 4. ठहर जाना (फ्रीज), 5. उत्सव।",
        "अन्य विधियाँ: कुंडलिनी ध्यान (हिलना, नाचना, शांत बैठना), नादब्रह्म (गुंजन ध्यान), घूर्णन (व्हर्लिंग), और विपश्यना-शैली साक्षीभाव।"
      ]
    },
    6: {
      title: "ज़ोरबा द बुद्धा",
      content: [
        "आदर्श व्यक्ति के लिए उनका सबसे प्रसिद्ध वाक्यांश 'नया मनुष्य' है, जिसे कभी-कभी 'ज़ोरबा द बुद्धा' भी कहा जाता है। इसमें दो आकृतियाँ मिलती हैं: ज़ोरबा, जो भोजन, संगीत और जीवन से प्रेम करता है, और बुद्ध, शांत जागृत गुरु।",
        "पुराने धर्मों से ओशो की शिकायत यह थी कि उन्होंने इन दोनों को अलग कर दिया। वे दोनों को एक ही व्यक्ति में चाहते थे: जो संसार में पूरी तरह जीवंत हो और भीतर से पूरी तरह शांत।"
      ]
    }
  };

  const snippets = isHindi ? hindiChapterSnippets : englishChapterSnippets;
  const chData = snippets[currentChapter.number] || {
    title: currentChapter.title,
    content: [currentChapter.previewExcerpt, isHindi ? 'सम्पूर्ण अध्याय पढ़ने के लिए ₹49 में पूरी ई-बुक डाउनलोड करें।' : 'To read this complete chapter along with exercises and notes, unlock the full PDF edition for ₹49.']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#091510] border border-[#264733] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1c3727] bg-[#060e0a]">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h2 className={`text-base sm:text-lg font-bold text-[#f7f4ed] leading-tight ${isHindi ? 'font-hindi' : 'font-serif'}`}>
                {currentBook.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#8fa799]">
                <span>Sample Book Reader</span>
                <span>·</span>
                <span>Page {activeChapterIndex + 1} of {currentBook.pages}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Edition Switcher inside modal */}
            <div className="bg-[#102319] p-0.5 rounded border border-[#21382b] flex items-center text-xs">
              <button
                onClick={() => { setActiveEdition('english'); setActiveChapterIndex(0); }}
                className={`px-2.5 py-1 rounded transition-colors ${activeEdition === 'english' ? 'bg-[#d4af37] text-[#07110c] font-semibold' : 'text-[#8fa799] hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => { setActiveEdition('hindi'); setActiveChapterIndex(0); }}
                className={`px-2.5 py-1 rounded font-hindi transition-colors ${activeEdition === 'hindi' ? 'bg-[#d4af37] text-[#07110c] font-semibold' : 'text-[#8fa799] hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8fa799] hover:text-white hover:bg-[#152e20] rounded-lg transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Chapter Navigation Sidebar + Reader */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Chapter Selector Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#1c3727] bg-[#07120d] p-3 overflow-y-auto max-h-48 md:max-h-full shrink-0">
            <span className="text-[11px] font-semibold text-[#f7df94] uppercase tracking-wider block px-2 mb-2">
              {isHindi ? 'अध्याय सूची' : 'Table of Contents'}
            </span>
            <div className="space-y-1">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.number}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`w-full text-left px-2.5 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${activeChapterIndex === idx ? 'bg-[#153424] text-[#f7df94] font-medium border border-[#d4af37]/40' : 'text-[#9eb6a6] hover:bg-[#0e2117] hover:text-white'}`}
                >
                  <span className={`truncate mr-2 ${isHindi ? 'font-hindi' : ''}`}>
                    <span className="font-mono text-[#d4af37] mr-1.5">{ch.number}.</span>
                    {ch.title}
                  </span>
                  <span className="text-[10px] text-[#5e7768] font-mono">p.{ch.number + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Canvas */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#060e0a]">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Chapter Header */}
              <div className="border-b border-[#1c3727] pb-4">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
                  {isHindi ? `अध्याय ${currentChapter.number}` : `Chapter ${currentChapter.number}`}
                </span>
                <h3 className={`text-2xl sm:text-3xl font-bold text-[#fbfaf6] mt-1 ${isHindi ? 'font-hindi' : 'font-serif'}`}>
                  {chData.title}
                </h3>
              </div>

              {/* Chapter Body */}
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed text-[#cad8cf] ${isHindi ? 'font-hindi text-base sm:text-lg' : 'font-serif text-lg'}`}>
                {chData.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Sample Watermark / Call to purchase */}
              <div className="mt-8 p-5 bg-[#0b1c13] border border-[#21432f] rounded-xl text-center space-y-3">
                <p className="text-xs text-[#9eb6a6]">
                  {isHindi
                    ? 'आप नमूना अध्याय पढ़ रहे हैं। संपूर्ण पुस्तक में सभी 10 अध्याय, कालक्रम और ध्यान विधियाँ शामिल हैं।'
                    : 'You are viewing a sample excerpt. The full edition contains all 10 chapters, detailed diagrams, timeline, and complete text.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onBuy(activeEdition);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-[#07110c] gold-glow-btn rounded cursor-pointer"
                  >
                    {isHindi ? `पूरी ई-बुक डाउनलोड करें · ₹${currentBook.price}` : `Unlock Full PDF Edition · ₹${currentBook.price}`}
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-medium text-[#4ade80] bg-[#112a1c] border border-[#22c55e]/30 rounded hover:bg-[#163a26] transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 border-t border-[#1c3727] bg-[#07120d] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
              disabled={activeChapterIndex === 0}
              className="px-3 py-1.5 bg-[#0e2117] hover:bg-[#153424] disabled:opacity-40 text-[#cad8cf] rounded flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isHindi ? 'पिछला अध्याय' : 'Previous'}</span>
            </button>
            <button
              onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
              disabled={activeChapterIndex === chapters.length - 1}
              className="px-3 py-1.5 bg-[#0e2117] hover:bg-[#153424] disabled:opacity-40 text-[#cad8cf] rounded flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{isHindi ? 'अगला अध्याय' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onBuy(activeEdition);
            }}
            className="px-4 py-1.5 text-xs font-semibold text-[#07110c] bg-[#d4af37] hover:bg-[#ebd074] rounded transition-colors cursor-pointer"
          >
            {isHindi ? 'खरीदें · ₹49' : 'Buy Now · ₹49'}
          </button>
        </div>

      </div>
    </div>
  );
};
