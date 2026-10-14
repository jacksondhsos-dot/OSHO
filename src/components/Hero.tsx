import React from 'react';
import { BookOpen, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Download, Eye } from 'lucide-react';

interface HeroProps {
  language: 'en' | 'hi';
  onBuyEnglish: () => void;
  onBuyHindi: () => void;
  onOpenPreview: (edition: 'english' | 'hindi') => void;
  onOpenQr?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onBuyEnglish,
  onBuyHindi,
  onOpenPreview,
  onOpenQr,
}) => {
  const isHi = language === 'hi';

  const waEnglishMsg = encodeURIComponent("Hello! I want to purchase the OSHO Life and Philosophy English E-Book for ₹49. Please share the payment details.");
  const waHindiMsg = encodeURIComponent("नमस्ते! मुझे ओशो जीवन और दर्शन की हिंदी ई-बुक ₹49 में खरीदनी है। कृपया भुगतान की जानकारी भेजें।");
  const waUrl = `https://wa.me/917822042721?text=${isHi ? waHindiMsg : waEnglishMsg}`;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#1b3325]">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/meditation_nature_sanctuary_1791959412864.jpg"
          alt="Serene meditation nature sanctuary"
          className="w-full h-full object-cover object-center filter brightness-45 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e0a] via-[#060e0a]/80 to-[#060e0a]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Price Announcement Line (Clean unboxed metadata) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-medium tracking-wide">
              <span className="text-[#f7df94] uppercase tracking-wider font-semibold">Special Edition Release</span>
              <span className="text-[#527360]" aria-hidden="true">·</span>
              <span className="text-[#e2d8b3] font-bold">ONLY ₹49 PER E-BOOK</span>
              <span className="text-[#527360]" aria-hidden="true">·</span>
              <span className="text-[#9cb5a5] line-through">M.R.P. ₹199</span>
              <span className="text-[#527360]" aria-hidden="true">·</span>
              <span className="text-[#4ade80]">Instant PDF Delivery</span>
            </div>

            {/* Bilingual Headings */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbfaf6] leading-tight text-balance">
                Discover OSHO: <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Life &amp; Philosophy</span>
              </h1>
              
              <h2 className="font-hindi text-2xl sm:text-3xl lg:text-4xl text-[#d4af37] font-medium tracking-normal pt-1">
                ओशो: जीवन और दर्शन
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#cad8cf] max-w-2xl leading-relaxed text-balance">
              Explore meditation, awareness, love, freedom, and philosophy. An independent, clear introduction to the twentieth century’s most provocative mystic and his timeless active meditation techniques.
            </p>

            {/* Action Buttons Grid */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5">
              
              {/* Primary: Buy English */}
              <button
                onClick={onBuyEnglish}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#07110c] gold-glow-btn rounded flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buy English E-Book</span>
                <span className="text-xs opacity-75">(₹49)</span>
              </button>

              {/* Secondary: Buy Hindi */}
              <button
                onClick={onBuyHindi}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#f7df94] bg-[#0f241a] hover:bg-[#183929] border border-[#d4af37]/40 rounded flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span className="font-hindi text-base">हिंदी ई-बुक खरीदें</span>
                <span className="text-xs opacity-75 font-sans">(₹49)</span>
              </button>

              {/* WhatsApp Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-[#f0fdf4] bg-[#14532d] hover:bg-[#166534] border border-[#22c55e]/30 rounded flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#4ade80]" />
                <span>Order on WhatsApp</span>
              </a>

              {/* PhonePe QR Button */}
              {onOpenQr && (
                <button
                  type="button"
                  onClick={onOpenQr}
                  className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-white bg-[#5f259f] hover:bg-[#722ebd] rounded flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                >
                  <span className="w-4 h-4 rounded-full bg-white text-[#5f259f] flex items-center justify-center text-[10px] font-bold font-hindi leading-none">पे</span>
                  <span>PhonePe QR (₹49)</span>
                </button>
              )}
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#9eb6a6]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Verified Razorpay &amp; UPI Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-[#4ade80]" />
                <span>Complete 16–17 Page High-Res PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#f7df94]" />
                <span>Zero Ads · Instant Download Link</span>
              </div>
            </div>

          </div>

          {/* Right Column: Book Covers Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Subtle ambient gold aura glow behind books */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-[#10b981]/15 rounded-3xl blur-2xl opacity-60" />

              <div className="relative grid grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 bg-[#0a1811]/70 border border-[#213e2e] rounded-2xl backdrop-blur-md">
                
                {/* Book 1: English */}
                <div className="group flex flex-col space-y-2.5">
                  <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-[#12241b] border border-[#d4af37]/30 shadow-lg group-hover:border-[#d4af37] transition-all">
                    <img
                      src="/src/assets/images/book_mockup_english_1791959438857.jpg"
                      alt="OSHO Life and Philosophy English E-Book Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#060e0a]/80 backdrop-blur-xs text-[#f7df94] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#d4af37]/30">
                      English · 16 Pages
                    </div>
                    <button
                      onClick={() => onOpenPreview('english')}
                      className="absolute inset-0 bg-[#060e0a]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[#f7df94] text-xs font-medium cursor-pointer"
                    >
                      <Eye className="w-6 h-6" />
                      <span>Preview Book</span>
                    </button>
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-sm font-semibold text-[#f7f4ed] leading-tight">
                      English Edition
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 text-xs">
                      <span className="text-[#d4af37] font-bold">₹49</span>
                      <span className="text-[#6c8676] line-through text-[11px]">₹199</span>
                    </div>
                    <button
                      onClick={onBuyEnglish}
                      className="w-full py-1.5 text-[11px] font-medium text-[#07110c] bg-[#d4af37] hover:bg-[#ebd074] rounded transition-colors"
                    >
                      Buy English (₹49)
                    </button>
                  </div>
                </div>

                {/* Book 2: Hindi */}
                <div className="group flex flex-col space-y-2.5">
                  <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-[#12241b] border border-[#d4af37]/30 shadow-lg group-hover:border-[#d4af37] transition-all">
                    <img
                      src="/src/assets/images/book_mockup_hindi_1791959438631.jpg"
                      alt="ओशो जीवन और दर्शन हिंदी ई-बुक कवर"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#060e0a]/80 backdrop-blur-xs text-[#f7df94] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#d4af37]/30 font-hindi">
                      हिंदी · 17 पृष्ठ
                    </div>
                    <button
                      onClick={() => onOpenPreview('hindi')}
                      className="absolute inset-0 bg-[#060e0a]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-[#f7df94] text-xs font-medium cursor-pointer"
                    >
                      <Eye className="w-6 h-6" />
                      <span>नमूना पढ़ें</span>
                    </button>
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-hindi text-sm font-semibold text-[#f7f4ed] leading-tight">
                      हिंदी संस्करण
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 text-xs">
                      <span className="text-[#d4af37] font-bold">₹49</span>
                      <span className="text-[#6c8676] line-through text-[11px]">₹199</span>
                    </div>
                    <button
                      onClick={onBuyHindi}
                      className="w-full py-1.5 text-[11px] font-medium text-[#07110c] bg-[#d4af37] hover:bg-[#ebd074] rounded transition-colors font-hindi"
                    >
                      खरीदें (₹49)
                    </button>
                  </div>
                </div>

              </div>

              {/* Bundle banner below books */}
              <div className="mt-3 py-2 px-3 bg-[#0d2116] border border-[#264b36] rounded-lg flex items-center justify-between text-xs">
                <span className="text-[#d7e6dc]">Want both English &amp; Hindi?</span>
                <span className="text-[#f7df94] font-semibold">Special Bundle ₹98</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
