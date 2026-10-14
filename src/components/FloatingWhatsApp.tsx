import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight } from 'lucide-react';

interface FloatingWhatsAppProps {
  language: 'en' | 'hi';
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ language }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isHi = language === 'hi';

  const waEnglishMsg = encodeURIComponent("Hello! I want to purchase the OSHO Life and Philosophy English E-Book for ₹49. Please share the payment details.");
  const waHindiMsg = encodeURIComponent("नमस्ते! मुझे ओशो जीवन और दर्शन की हिंदी ई-बुक ₹49 में खरीदनी है। कृपया भुगतान की जानकारी भेजें।");
  const waUrl = `https://wa.me/917822042721?text=${isHi ? waHindiMsg : waEnglishMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip on hover/touch */}
      {showTooltip && (
        <div className="mb-2 p-3 bg-[#0a1b12] border border-[#22c55e]/40 rounded-xl shadow-2xl text-xs text-white max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-semibold text-[#4ade80] flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support &amp; Orders
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#8fa799] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#cad8cf]">
            {isHi
              ? 'नमस्ते! सीधे WhatsApp पर ऑर्डर करने और ₹49 में तुरंत पीडीएफ पाने के लिए क्लिक करें।'
              : 'Chat with us directly to buy your ₹49 e-book or get instant support via WhatsApp.'}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[11px] font-semibold text-[#f7df94] hover:underline flex items-center gap-1"
          >
            <span>Open Chat (+91 7822042721)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#15803d] hover:bg-[#16a34a] text-white rounded-full shadow-2xl hover:shadow-[#22c55e]/40 border border-[#22c55e]/40 transition-all duration-300 hover:scale-105"
        aria-label="Order on WhatsApp (+91 7822042721)"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86efac] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4ade80]"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold whitespace-nowrap hidden sm:inline">
          {isHi ? 'व्हाट्सएप ऑर्डर' : 'WhatsApp Order'}
        </span>
      </a>

    </div>
  );
};
