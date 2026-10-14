import React from 'react';
import { MessageCircle, QrCode, Send, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PhonePeQrCard } from './PhonePeQrCard';

interface WhatsAppSectionProps {
  language: 'en' | 'hi';
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ language }) => {
  const isHi = language === 'hi';

  const waEnglishMsg = encodeURIComponent("Hello! I want to purchase the OSHO Life and Philosophy English E-Book for ₹49. Please share the payment details.");
  const waHindiMsg = encodeURIComponent("नमस्ते! मुझे ओशो जीवन और दर्शन की हिंदी ई-बुक ₹49 में खरीदनी है। कृपया भुगतान की जानकारी भेजें।");
  const waBothMsg = encodeURIComponent("Hello! I want to purchase BOTH English and Hindi OSHO E-Books for ₹98. Please share payment details.");

  const englishUrl = `https://wa.me/917822042721?text=${waEnglishMsg}`;
  const hindiUrl = `https://wa.me/917822042721?text=${waHindiMsg}`;
  const bothUrl = `https://wa.me/917822042721?text=${waBothMsg}`;

  return (
    <section id="whatsapp-order" className="py-20 bg-gradient-to-b from-[#060e0a] via-[#091711] to-[#060e0a] border-b border-[#1b3325]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#091911] border border-[#234b34] overflow-hidden shadow-2xl">
          
          {/* Subtle green ambient light */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#143d26] border border-[#22c55e]/40 rounded-full text-xs text-[#86efac] font-medium">
                <MessageCircle className="w-4 h-4 text-[#4ade80]" />
                <span>Instant WhatsApp Ordering Service</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {isHi ? 'सीधे WhatsApp पर ऑर्डर करें' : 'Prefer to Order Directly on WhatsApp?'}
              </h2>

              <p className="text-sm sm:text-base text-[#cad8cf] leading-relaxed">
                {isHi
                  ? 'यदि आप वेबसाइट पेमेंट गेटवे के बजाय सीधे चैट पर खरीदना चाहते हैं, तो एक क्लिक में हमारे आधिकारिक व्हाट्सएप नंबर (+91 7822042721) पर संदेश भेजें। आपको तुरंत क्यूआर कोड और पीडीएफ भेजा जाएगा।'
                  : 'Skip website checkout and order in seconds via WhatsApp. Click below to start a chat with our verified number (+91 7822042721) with a prefilled message. Pay via UPI and receive your PDF right in chat.'}
              </p>

              {/* Steps list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#07130d] border border-[#1b3425] rounded-lg space-y-1">
                  <span className="text-[#d4af37] font-bold">Step 1</span>
                  <p className="text-[#b5c7bc]">Click below or message +91 7822042721</p>
                </div>
                <div className="p-3 bg-[#07130d] border border-[#1b3425] rounded-lg space-y-1">
                  <span className="text-[#d4af37] font-bold">Step 2</span>
                  <p className="text-[#b5c7bc]">Send ₹49 via Google Pay / PhonePe / UPI</p>
                </div>
                <div className="p-3 bg-[#07130d] border border-[#1b3425] rounded-lg space-y-1">
                  <span className="text-[#4ade80] font-bold">Step 3</span>
                  <p className="text-[#b5c7bc]">Instant PDF file delivered directly to your chat</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={englishUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#15803d] hover:bg-[#16a34a] rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order English (₹49)</span>
                </a>

                <a
                  href={hindiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#f7df94] bg-[#0c2b1a] hover:bg-[#123e26] border border-[#d4af37]/40 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#d4af37]" />
                  <span className="font-hindi text-sm">हिंदी ई-बुक ऑर्डर करें (₹49)</span>
                </a>

                <a
                  href={bothUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-[#cad8cf] hover:text-white bg-[#07130d] border border-[#213c2c] rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span>Both Editions (₹98)</span>
                </a>
              </div>

            </div>

            {/* Right Card: Official PhonePe QR Standee */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <PhonePeQrCard
                  amount={49}
                  compact={true}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
