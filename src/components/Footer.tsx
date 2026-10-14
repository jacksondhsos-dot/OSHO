import React from 'react';
import { MessageCircle, Shield, BookOpen, Heart } from 'lucide-react';
import { LegalModalType } from './LegalModals';

interface FooterProps {
  onOpenLegal: (type: LegalModalType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenAdmin }) => {
  return (
    <footer className="bg-[#040907] border-t border-[#182e21] text-[#8fa799] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#14281d]">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c6b1a] flex items-center justify-center text-[#07110c] font-serif font-bold text-sm shadow-sm">
                ओ
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-[#f7f4ed]">
                OSHO <span className="text-[#d4af37] font-normal text-base">E-BOOKS</span>
              </span>
            </div>
            
            <p className="text-xs text-[#7e9988] leading-relaxed max-w-sm">
              Life, Meditation &amp; Philosophy. Delivering high-resolution digital PDF editions in English and Hindi at ₹49 per e-book.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/917822042721"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0e2417] hover:bg-[#143521] border border-[#22c55e]/30 rounded-lg text-xs font-semibold text-[#4ade80] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline: +91 7822042721</span>
              </a>
            </div>
          </div>

          {/* Editions & Links */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="text-xs font-semibold text-[#f7df94] uppercase tracking-wider block">
              Available Editions
            </span>
            <ul className="space-y-1.5 text-[#9eb6a6]">
              <li>
                <a href="#editions" className="hover:text-white transition-colors">
                  English Edition: Life and Philosophy (16 Pages)
                </a>
              </li>
              <li>
                <a href="#editions" className="hover:text-white transition-colors font-hindi">
                  हिंदी संस्करण: जीवन और दर्शन (17 पृष्ठ)
                </a>
              </li>
              <li>
                <a href="#editions" className="hover:text-white transition-colors">
                  Dual Edition Value Bundle (₹98)
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-white transition-colors">
                  Sample Book Previews
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-xs font-semibold text-[#f7df94] uppercase tracking-wider block">
              Customer Trust &amp; Policies
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#9eb6a6]">
              <button
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Privacy Policy
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Terms and Conditions
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenLegal('refund')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Refund Policy
              </button>
              <span>·</span>
              <button
                onClick={() => onOpenLegal('contact')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Contact &amp; Support
              </button>
            </div>

            <div className="pt-2 text-[11px] text-[#6b8577] leading-relaxed">
              <p>
                Payments secured via Indian UPI, Cards &amp; Razorpay. Instant verified downloads with 100% replacement guarantee.
              </p>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright Notice */}
        <div className="pt-8 space-y-3 text-[11px] text-[#637d6e] leading-relaxed">
          <p>
            <strong>Important Legal Disclaimer:</strong> The publications "OSHO — Life and Philosophy" and "ओशो — जीवन और दर्शन" offered on this website are independent introductory and analytical overviews of Osho's life, meditation teachings, and controversial public history, written in plain language. This website and its publications are completely independent and are not affiliated with, authorized by, sponsored by, or endorsed by Osho International Foundation or its related entities. "Osho" is used here strictly for historical identification and descriptive educational commentary.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#122319] text-[#718b7b]">
            <p>
              &copy; {new Date().getFullYear()} OSHO E-BOOKS. All rights reserved for this website's original design, text compilations, and presentation.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenAdmin}
                className="text-[#8fa799] hover:text-[#d4af37] transition-colors cursor-pointer"
              >
                Admin Console
              </button>
              <span>·</span>
              <span className="text-[#516b5c]">Built for Seekers Everywhere</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
