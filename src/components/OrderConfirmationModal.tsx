import React from 'react';
import { CheckCircle2, Download, Eye, MessageCircle, FileText, Printer, ArrowRight, X } from 'lucide-react';
import { downloadBookFile } from '../utils/pdfGenerator';
import { BOOKS_DATA } from '../data/booksData';

interface OrderConfirmationModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onOpenPreview: (edition: 'english' | 'hindi') => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenPreview,
}) => {
  if (!isOpen || !order) return null;

  const edition = order.edition as 'english' | 'hindi' | 'both';

  const handleDownload = (ed: 'english' | 'hindi') => {
    downloadBookFile(ed);
  };

  const waMsg = encodeURIComponent(
    `Hello! My Order ${order.orderId} for ₹${order.amount} has been paid successfully. Name: ${order.customerName}. Please confirm my receipt.`
  );
  const waUrl = `https://wa.me/917822042721?text=${waMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#091510] border border-[#22c55e]/40 rounded-2xl flex flex-col overflow-hidden shadow-2xl max-h-[94vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c3727] bg-[#060e0a]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
            <h3 className="font-serif text-lg font-bold text-white">
              Order Confirmed &amp; Verified
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8fa799] hover:text-white rounded-lg hover:bg-[#152e20] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Verification Badge */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#15803d]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#4ade80]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              Thank You, {order.customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-[#9eb6a6]">
              Your payment of <span className="text-[#f7df94] font-bold">₹{order.amount}</span> has been confirmed on the server. Your digital e-book is ready for instant download.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl text-xs space-y-2">
            <div className="flex justify-between text-[#8fa799]">
              <span>Order ID:</span>
              <span className="font-mono font-bold text-white">{order.orderId}</span>
            </div>
            <div className="flex justify-between text-[#8fa799]">
              <span>Payment ID:</span>
              <span className="font-mono text-[#cad8cf]">{order.paymentId || 'pay_confirmed'}</span>
            </div>
            <div className="flex justify-between text-[#8fa799]">
              <span>Edition Purchased:</span>
              <span className="font-semibold text-[#f7df94]">
                {edition === 'both' ? 'English & Hindi (Both Editions)' : edition === 'english' ? 'English Edition (16 Pages)' : 'हिंदी संस्करण (17 पृष्ठ)'}
              </span>
            </div>
            <div className="flex justify-between text-[#8fa799]">
              <span>Customer Mobile:</span>
              <span className="text-white">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between text-[#8fa799]">
              <span>Status:</span>
              <span className="text-[#4ade80] font-semibold flex items-center gap-1">
                ● PAID &amp; VERIFIED
              </span>
            </div>
          </div>

          {/* Download Action Section */}
          <div className="space-y-3 p-4 bg-[#0d2317] border border-[#234b35] rounded-2xl">
            <span className="text-xs font-semibold text-[#f7df94] uppercase tracking-wider block text-center">
              Your Purchased E-Book Downloads
            </span>

            {edition === 'both' ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleDownload('english')}
                  className="w-full py-3 text-xs sm:text-sm font-semibold text-[#07110c] gold-glow-btn rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download English Edition PDF (16 Pages)</span>
                </button>
                <button
                  onClick={() => handleDownload('hindi')}
                  className="w-full py-3 text-xs sm:text-sm font-semibold text-[#07110c] bg-[#4ade80] hover:bg-[#22c55e] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-hindi text-sm">हिंदी संस्करण पीडीएफ डाउनलोड करें (17 पृष्ठ)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleDownload(edition)}
                className="w-full py-3.5 text-sm font-semibold text-[#07110c] gold-glow-btn rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>
                  {edition === 'hindi' ? 'हिंदी संस्करण पीडीएफ डाउनलोड करें (17 पृष्ठ)' : 'Download English Edition PDF (16 Pages)'}
                </span>
              </button>
            )}

            <div className="flex items-center justify-center gap-3 pt-1 text-xs">
              <button
                onClick={() => {
                  onClose();
                  onOpenPreview(edition === 'both' ? 'english' : edition);
                }}
                className="text-[#9eb6a6] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Read in Browser</span>
              </button>
              <span className="text-[#3b5946]">·</span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4ade80] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send to my WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Assistance Note */}
          <div className="p-3 bg-[#07130d] rounded-lg text-center text-xs text-[#8fa799] space-y-1">
            <p>Need support or lost your file? WhatsApp us anytime at <span className="text-[#f7df94] font-mono">+91 7822042721</span> with Order ID <span className="font-mono text-white">{order.orderId}</span>.</p>
          </div>

        </div>

      </div>
    </div>
  );
};
