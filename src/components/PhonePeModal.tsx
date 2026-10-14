import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { PhonePeQrCard } from './PhonePeQrCard';

interface PhonePeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (order: any) => void;
}

export const PhonePeModal: React.FC<PhonePeModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#091510] border border-[#5f259f]/50 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#211630] bg-[#000000]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#5f259f] flex items-center justify-center text-white text-xs font-bold font-hindi">
              पे
            </div>
            <span className="font-bold text-white text-sm">Official PhonePe QR Payment</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[85vh]">
          <PhonePeQrCard
            amount={49}
            compact={false}
            onPaymentDone={() => {
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  orderId: `OSHO_PHONEPE_${Date.now().toString(36).toUpperCase()}`,
                  edition: 'english',
                  amount: 49,
                  customerName: 'Yash Sakharam Salave Customer',
                  customerPhone: '+91 7822042721',
                  paymentStatus: 'PAID',
                  paymentMethod: 'PhonePe UPI QR',
                  createdAt: new Date().toISOString(),
                });
              }
              onClose();
            }}
          />
        </div>

      </div>
    </div>
  );
};
