import React from 'react';
import { Calendar, Compass, ShieldCheck } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/booksData';

interface TimelineSectionProps {
  language: 'en' | 'hi';
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ language }) => {
  const isHi = language === 'hi';

  return (
    <section id="timeline" className="py-20 sm:py-24 bg-[#08130d] border-b border-[#1b3325]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Calendar className="w-4 h-4" />
            <span>Biographical Timeline (1931 – 1990)</span>
            <span aria-hidden="true">·</span>
            <span>संक्षिप्त कालक्रम</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbfaf6]">
            {isHi ? 'कुचवाड़ा से पुणे: जीवन यात्रा का कालक्रम' : 'From Kuchwada to Pune: The Arc of a Life'}
          </h2>
          <p className="text-xs sm:text-sm text-[#9eb6a6] max-w-2xl mx-auto">
            {isHi
              ? 'एक छात्र और प्राध्यापक से लेकर विश्वव्यापी ध्यान आंदोलन के प्रणेता बनने तक के प्रमुख ऐतिहासिक पड़ाव।'
              : 'Key historical milestones from his early academic career to the global meditation movement and controversies.'}
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-[#1f3c2b] ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-8">
          {TIMELINE_EVENTS.map((item, idx) => (
            <div key={idx} className="relative group">
              
              {/* Year badge on the left */}
              <div className="sm:absolute sm:-left-36 top-0 font-mono text-xs sm:text-sm font-bold text-[#d4af37] py-0.5 px-2 bg-[#0d2117] border border-[#213e2e] rounded sm:text-right w-24 mb-1 sm:mb-0">
                {item.year}
              </div>

              {/* Node dot on the line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#102319] border-2 border-[#d4af37] group-hover:scale-125 transition-transform" />

              {/* Content box */}
              <div className="p-4 bg-[#0a1811] border border-[#1b3425] group-hover:border-[#d4af37]/40 rounded-xl transition-colors">
                <p className={`text-xs sm:text-sm text-[#cad8cf] leading-relaxed ${isHi ? 'font-hindi' : ''}`}>
                  {isHi ? item.hi : item.en}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Footnote on objectivity */}
        <div className="mt-12 p-4 bg-[#0b1c13] border border-[#1e3c2b] rounded-xl text-center text-xs text-[#8fa799]">
          <p className="italic">
            {isHi
              ? 'नोट: यह संक्षिप्त कालक्रम सामान्य पाठकों के लिए एक तथ्यात्मक सार है। अधिक जानकारी के लिए ओशो के प्रकाशित प्रवचन व जीवनी देखें।'
              : 'Historical Note: This summary provides a balanced overview for general readers based on verified public archives and published records.'}
          </p>
        </div>

      </div>
    </section>
  );
};
