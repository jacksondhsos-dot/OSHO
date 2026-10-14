import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_LIST } from '../data/booksData';

interface FaqSectionProps {
  language: 'en' | 'hi';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const isHi = language === 'hi';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#060e0a] border-b border-[#1b3325]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true">·</span>
            <span>अक्सर पूछे जाने वाले प्रश्न</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbfaf6]">
            {isHi ? 'पुस्तकों और ऑर्डर के संबंध में प्रश्न' : 'Everything You Need to Know'}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#091711] border border-[#1c3a28] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0c2217] transition-colors"
                >
                  <span className={`text-sm sm:text-base font-semibold text-[#f7f4ed] ${isHi ? 'font-hindi' : 'font-serif'}`}>
                    {isHi ? faq.qHi : faq.qEn}
                  </span>
                  <span className="text-[#d4af37] shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#9eb6a6] leading-relaxed border-t border-[#152e20]/50 bg-[#07130d]">
                    <p className={isHi ? 'font-hindi text-sm' : ''}>
                      {isHi ? faq.aHi : faq.aEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
