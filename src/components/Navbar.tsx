import React, { useState } from 'react';
import { BookOpen, MessageCircle, ShieldCheck, Settings, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
  onOpenCheckout: (edition: 'english' | 'hindi' | 'both') => void;
  onOpenAdmin: () => void;
  onOpenQr?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageToggle,
  onOpenCheckout,
  onOpenAdmin,
  onOpenQr,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHi = language === 'hi';

  const navLinks = [
    { href: '#editions', label: isHi ? 'ई-बुक्स' : 'Editions' },
    { href: '#preview', label: isHi ? 'किताब पढ़ें' : 'Book Preview' },
    { href: '#philosophy', label: isHi ? 'दर्शन' : 'Philosophy' },
    { href: '#timeline', label: isHi ? 'कालक्रम' : 'Timeline' },
    { href: '#faq', label: isHi ? 'प्रश्न' : 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060e0a]/90 backdrop-blur-md border-b border-[#21382b]/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c6b1a] flex items-center justify-center text-[#07110c] font-serif font-bold text-lg shadow-sm">
            ओ
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#f7f4ed] group-hover:text-[#f3e5ab] transition-colors">
            OSHO <span className="text-[#d4af37] font-normal text-base sm:text-lg">E-BOOKS</span>
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#b5c7bc]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#f7df94] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/917822042721?text=Hello!%20I%20want%20to%20purchase%20the%20OSHO%20Life%20and%20Philosophy%20E-Book%20for%20%E2%82%B949."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#4ade80] hover:text-[#86efac] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: +91 7822042721</span>
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + language toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#d4af37] bg-[#102319] hover:bg-[#183526] border border-[#d4af37]/30 rounded transition-colors whitespace-nowrap"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isHi ? 'English' : 'हिंदी'}</span>
          </button>

          {/* PhonePe QR Code Trigger */}
          {onOpenQr && (
            <button
              onClick={onOpenQr}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-white bg-[#5f259f] hover:bg-[#722ebd] rounded transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              title="Scan PhonePe QR / PhonePe से भुगतान करें"
            >
              <span className="w-4 h-4 rounded-full bg-white text-[#5f259f] flex items-center justify-center text-[10px] font-bold font-hindi leading-none">पे</span>
              <span className="hidden md:inline font-sans">PhonePe QR</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => onOpenCheckout('english')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#07110c] gold-glow-btn rounded whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isHi ? 'ई-बुक खरीदें · ₹49' : 'Buy E-Book · ₹49'}</span>
          </button>

          {/* Admin shortcut button */}
          <button
            onClick={onOpenAdmin}
            className="p-1.5 text-[#6c8676] hover:text-[#d4af37] transition-colors rounded"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#b5c7bc] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#21382b] bg-[#091510] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm text-[#b5c7bc]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#12241b] rounded text-[#f7f4ed]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/917822042721?text=Hello!%20I%20want%20to%20purchase%20the%20OSHO%20Life%20and%20Philosophy%20E-Book%20for%20%E2%82%B949."
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-2 flex items-center gap-2 text-[#4ade80]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 7822042721</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout('english');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#07110c] gold-glow-btn rounded"
            >
              {isHi ? 'अंग्रेजी संस्करण खरीदें · ₹49' : 'Buy English Edition · ₹49'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout('hindi');
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-[#f7df94] bg-[#12241b] border border-[#d4af37]/40 hover:bg-[#1a3427] rounded"
            >
              {isHi ? 'हिंदी संस्करण खरीदें · ₹49' : 'Buy Hindi Edition · ₹49'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
