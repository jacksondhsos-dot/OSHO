import React from 'react';
import { X, Shield, FileText, RefreshCcw, Mail, Phone, MapPin } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'refund' | 'contact' | null;

interface LegalModalsProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091510] border border-[#264733] rounded-2xl flex flex-col overflow-hidden shadow-2xl max-h-[88vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c3727] bg-[#060e0a]">
          <h3 className="font-serif text-lg font-bold text-white capitalize flex items-center gap-2">
            {type === 'privacy' && <><Shield className="w-4 h-4 text-[#d4af37]" /> Privacy Policy</>}
            {type === 'terms' && <><FileText className="w-4 h-4 text-[#d4af37]" /> Terms &amp; Conditions</>}
            {type === 'refund' && <><RefreshCcw className="w-4 h-4 text-[#4ade80]" /> Refund &amp; Cancellation Policy</>}
            {type === 'contact' && <><Mail className="w-4 h-4 text-[#f7df94]" /> Contact &amp; Support</>}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8fa799] hover:text-white rounded-lg hover:bg-[#152e20] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-[#cad8cf] leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                At <strong>OSHO E-BOOKS — Life, Meditation &amp; Philosophy</strong>, accessible via our official portal, we prioritize user privacy and data security.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Information We Collect</h4>
              <p>
                When purchasing an e-book or reaching out on WhatsApp, we collect minimal customer contact details: your full name, phone number / WhatsApp handle, and optional email address solely to process order fulfillment, deliver digital download tokens, and provide customer support.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Payment Security</h4>
              <p>
                All transactions are encrypted using TLS/SSL standards. We do not store sensitive payment credentials, debit/credit card numbers, or UPI PINs on our servers. Transactions are handled directly via legitimate Reserve Bank of India compliant payment networks (Razorpay, UPI).
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Zero Spam Guarantee</h4>
              <p>
                We do not sell, rent, or trade customer information with third parties or external marketing networks.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                By accessing this website or purchasing our digital e-books, you agree to comply with and be bound by the following Terms and Conditions:
              </p>
              <h4 className="font-bold text-white text-sm pt-2">1. Nature of the Work &amp; Intellectual Property</h4>
              <p>
                The e-books offered on this website ("OSHO — Life and Philosophy" and "ओशो — जीवन और दर्शन") are independent introductory studies of Osho's life, meditation concepts, and legacy. They are written in plain educational language and do not claim official affiliation with or endorsement by the Osho International Foundation.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">2. Single-User Personal License</h4>
              <p>
                Purchasing an edition grants you a personal, non-exclusive, non-transferable license to read and retain the digital PDF on your personal devices. Redistribution, bulk resale, or unauthorized public re-hosting without prior written consent is prohibited.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">3. Delivery of Digital Goods</h4>
              <p>
                Digital e-books are delivered electronically via instant download link upon verified payment receipt, or directly via WhatsApp (+91 7822042721).
              </p>
            </>
          )}

          {type === 'refund' && (
            <>
              <p>
                <strong>100% Delivery &amp; Quality Guarantee</strong>
              </p>
              <p>
                Because our products are delivered instantly as digital PDF files (at ₹49 per e-book), standard returns are generally not applicable once a file is downloaded.
              </p>
              <h4 className="font-bold text-white text-sm pt-2">Replacement &amp; Dispute Protection</h4>
              <p>
                However, customer satisfaction is our highest priority:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#9eb6a6]">
                <li>If you encounter any corrupted download or file issue, we provide an immediate fresh copy.</li>
                <li>If you accidentally made a duplicate payment for the same book, simply contact our WhatsApp support at <strong>+91 7822042721</strong> with your Order ID, and a full refund for the duplicate transaction will be credited back to your original source account within 24 to 48 hours.</li>
                <li>If you ever misplace your file, our team will re-send your purchased PDF via WhatsApp or email anytime free of charge.</li>
              </ul>
            </>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p>
                We are here to assist you with order delivery, payment confirmations, and reading assistance.
              </p>
              <div className="p-4 bg-[#07130d] border border-[#1c3a28] rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#4ade80]" />
                  <div>
                    <span className="text-xs text-[#8fa799] block">WhatsApp &amp; Support Helpline</span>
                    <a href="https://wa.me/917822042721" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-white hover:text-[#4ade80]">
                      +91 7822042721
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <span className="text-xs text-[#8fa799] block">Direct Order Support</span>
                    <span className="font-mono text-white">support@osho-ebooks.store</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#f7df94]" />
                  <div>
                    <span className="text-xs text-[#8fa799] block">Support Hours</span>
                    <span className="text-white">Monday – Sunday, 8:00 AM – 11:00 PM IST (Fast WhatsApp response)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1c3727] bg-[#07120d] text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#07110c] bg-[#d4af37] hover:bg-[#ebd074] rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
