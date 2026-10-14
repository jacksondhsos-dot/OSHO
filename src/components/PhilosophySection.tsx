import React from 'react';
import { Eye, Wind, Heart, Flame, Sparkles, BookOpen } from 'lucide-react';
import { CORE_PHILOSOPHY_PILLARS } from '../data/booksData';

interface PhilosophySectionProps {
  language: 'en' | 'hi';
  onExploreEdition: (edition: 'english' | 'hindi') => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  language,
  onExploreEdition,
}) => {
  const isHi = language === 'hi';

  const icons = [
    <Eye className="w-5 h-5 text-[#f7df94]" />,
    <Wind className="w-5 h-5 text-[#4ade80]" />,
    <Sparkles className="w-5 h-5 text-[#d4af37]" />,
    <Heart className="w-5 h-5 text-[#f87171]" />
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#060e0a] border-b border-[#1b3325]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <span>Core Teachings &amp; Methods</span>
            <span aria-hidden="true">·</span>
            <span>मूल सिद्धांत और ध्यान</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fbfaf6] text-balance">
            {isHi ? 'ध्यान, साक्षी-भाव और स्वतंत्रता का मार्ग' : 'The Convergence of Meditation, Love & Freedom'}
          </h2>
          <p className="text-sm sm:text-base text-[#9eb6a6] leading-relaxed text-balance">
            {isHi
              ? 'ओशो का दर्शन किसी रूढ़िवादी मत या धर्म का प्रचार नहीं, बल्कि आधुनिक मनुष्य को तनाव से मुक्त कर भीतरी जागरण की ओर ले जाने वाला व्यावहारिक विज्ञान है।'
              : 'Osho presented spirituality not as ascetic renunciation or blind doctrine, but as an experiential science of awakening and total presence in everyday life.'}
          </p>
        </div>

        {/* 2-Column Split: Portrait & Biography + Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#091510] group">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src="/src/assets/images/meditating_guru_serene_nature_1791962512476.jpg"
                  alt="Osho meditating in serene nature"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060e0a] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center sm:text-left">
                  <span className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">Osho Meditating in Serene Nature</span>
                  <h3 className="font-serif text-2xl font-bold text-white">Acharya Rajneesh · Osho</h3>
                  <p className="text-xs text-[#cad8cf] mt-1 italic">
                    "Meditation is not what you do; it is what happens when you are in absolute stillness."
                  </p>
                </div>
              </div>
              <div className="p-4 bg-[#08140e] border-t border-[#1b3425] text-xs text-[#8fa799] leading-relaxed">
                {isHi
                  ? 'यह पुस्तक ओशो के जीवन के सकारात्मक योगदान और विवादों दोनों का निष्पक्ष और दस्तावेजी सार प्रस्तुत करती है।'
                  : 'An objective historical summary examining both his groundbreaking meditation techniques and controversial commune history.'}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Pillars of Philosophy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CORE_PHILOSOPHY_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#0a1811] border border-[#1d3828] hover:border-[#d4af37]/50 rounded-xl transition-all duration-300 hover:-translate-y-0.5 space-y-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-[#0e2418] border border-[#234631] flex items-center justify-center shrink-0">
                      {icons[idx]}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#fbfaf6]">
                      {isHi ? pillar.hiTitle : pillar.enTitle}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9eb6a6] leading-relaxed">
                    {isHi ? pillar.hiDesc : pillar.enDesc}
                  </p>
                </div>
              ))}
            </div>

            {/* Dynamic Meditation 5-Stage Visual Strip */}
            <div className="p-5 bg-[#0b1c13] border border-[#21432f] rounded-xl space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f7df94] uppercase tracking-wider flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-[#4ade80]" />
                  <span>{isHi ? 'डायनामिक ध्यान के 5 चरण' : 'Dynamic Meditation: 5 Active Stages'}</span>
                </span>
                <span className="text-[11px] text-[#8fa799]">60 Min · Morning</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2.5 bg-[#07130d] rounded border border-[#1b3425]">
                  <span className="text-[#d4af37] font-bold block mb-1">Stage 1</span>
                  <span className="text-[#cad8cf] text-[11px] leading-tight block">Chaotic Breathing (10m)</span>
                </div>
                <div className="p-2.5 bg-[#07130d] rounded border border-[#1b3425]">
                  <span className="text-[#d4af37] font-bold block mb-1">Stage 2</span>
                  <span className="text-[#cad8cf] text-[11px] leading-tight block">Catharsis &amp; Release (10m)</span>
                </div>
                <div className="p-2.5 bg-[#07130d] rounded border border-[#1b3425]">
                  <span className="text-[#d4af37] font-bold block mb-1">Stage 3</span>
                  <span className="text-[#cad8cf] text-[11px] leading-tight block">Hoo Mantra Jumping (10m)</span>
                </div>
                <div className="p-2.5 bg-[#07130d] rounded border border-[#1b3425]">
                  <span className="text-[#d4af37] font-bold block mb-1">Stage 4</span>
                  <span className="text-[#d4af37] text-[11px] font-semibold leading-tight block">Freeze &amp; Witness (15m)</span>
                </div>
                <div className="p-2.5 bg-[#07130d] rounded border border-[#1b3425] col-span-2 sm:col-span-1">
                  <span className="text-[#4ade80] font-bold block mb-1">Stage 5</span>
                  <span className="text-[#cad8cf] text-[11px] leading-tight block">Celebration &amp; Dance (15m)</span>
                </div>
              </div>

              <p className="text-[11px] text-[#8fa799] italic text-center">
                {isHi
                  ? 'पहले शरीर और मन का सामान्य शोर शांत किया जाता है ताकि मौन और साक्षीभाव स्वाभाविक रूप से घटित हो सके।'
                  : 'By exhausting mental chatter through physical catharsis, inner silence and stillness become effortlessly accessible.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
