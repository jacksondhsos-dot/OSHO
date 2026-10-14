import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Smartphone, ShieldCheck, ExternalLink } from 'lucide-react';

interface PhonePeQrCardProps {
  amount?: number;
  orderId?: string;
  onPaymentDone?: () => void;
  compact?: boolean;
}

export const PhonePeQrCard: React.FC<PhonePeQrCardProps> = ({
  amount = 49,
  orderId,
  onPaymentDone,
  compact = false,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Beneficiary details from the uploaded PhonePe Standee (YUYK.jpeg)
  const payeeName = 'Mr Yash Sakharam Salave';
  const upiId = '7822042721@ybl';
  const phoneNumber = '7822042721';

  // Construct standard NPCI UPI URI string
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(orderId ? `OSHO E-Book Order ${orderId}` : 'OSHO E-Book Life & Philosophy')}`;

  useEffect(() => {
    let isMounted = true;

    // Generate high-resolution QR Code
    QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => console.error('Failed to generate PhonePe QR Code:', err));

    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  const copyToClipboard = (text: string, type: 'upi' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  return (
    <div className={`w-full max-w-sm mx-auto bg-black text-white rounded-2xl border border-[#2b2b2b] shadow-2xl overflow-hidden flex flex-col items-center select-none ${compact ? 'p-4' : 'p-6'}`}>
      
      {/* 1. PhonePe Brand Header */}
      <div className="flex items-center gap-2.5 mb-2">
        {/* PhonePe "पे" Icon */}
        <div className="w-9 h-9 rounded-full bg-[#5f259f] flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg font-hindi">पे</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-sans">
          PhonePe
        </span>
      </div>

      {/* 2. ACCEPTED HERE Banner */}
      <div className="text-center mb-3">
        <span className="text-xs font-extrabold tracking-widest text-[#a855f7] uppercase">
          ACCEPTED HERE
        </span>
        <p className="text-[11px] text-zinc-300 font-medium mt-0.5">
          Scan &amp; Pay Using PhonePe App
        </p>
        <span className="text-[10px] text-zinc-500 block">
          (Also accepts Google Pay, Paytm, BHIM &amp; Any UPI)
        </span>
      </div>

      {/* 3. The QR Code Canvas with embedded PhonePe logo */}
      <div className="relative p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center my-1">
        {qrDataUrl ? (
          <div className="relative w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center">
            <img
              src={qrDataUrl}
              alt={`PhonePe UPI QR Code for ${payeeName}`}
              className="w-full h-full object-contain"
            />
            {/* Embedded Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#5f259f] border-2 border-white flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base font-hindi">पे</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-56 h-56 flex items-center justify-center text-zinc-400 text-xs">
            Loading QR Code...
          </div>
        )}
      </div>

      {/* 4. Amount indicator */}
      <div className="my-2 py-1 px-4 bg-[#141414] border border-[#2b2b2b] rounded-full flex items-center gap-2">
        <span className="text-[11px] text-zinc-400">Payable Amount:</span>
        <span className="text-sm font-bold text-[#f7df94] font-mono">₹{amount}</span>
      </div>

      {/* 5. Beneficiary Name */}
      <div className="text-center mt-1">
        <p className="text-sm font-bold text-white tracking-wide">
          {payeeName}
        </p>
        <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
          <ShieldCheck className="w-3 h-3" /> Verified PhonePe Merchant / User
        </span>
      </div>

      {/* 6. UPI ID & Phone Copy Options */}
      <div className="w-full mt-3 pt-3 border-t border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs px-2 py-1.5 bg-[#121212] rounded-lg border border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase">UPI ID</span>
            <span className="font-mono text-zinc-200 text-xs select-all">{upiId}</span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(upiId, 'upi')}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors cursor-pointer"
            title="Copy UPI ID"
          >
            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs px-2 py-1.5 bg-[#121212] rounded-lg border border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase">PhonePe Number</span>
            <span className="font-mono text-zinc-200 text-xs select-all">+91 {phoneNumber}</span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(phoneNumber, 'phone')}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded transition-colors cursor-pointer"
            title="Copy Number"
          >
            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 7. Mobile Intent: Open Directly in PhonePe / UPI App */}
      <div className="w-full mt-3 space-y-2">
        <a
          href={upiUri}
          className="w-full py-2.5 px-3 bg-[#5f259f] hover:bg-[#722ebd] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <Smartphone className="w-4 h-4" />
          <span>Pay via PhonePe / UPI App (₹{amount})</span>
        </a>

        {onPaymentDone && (
          <button
            type="button"
            onClick={onPaymentDone}
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>I Have Completed Payment</span>
          </button>
        )}
      </div>

      {/* 8. PhonePe Copyright Footer from YUYK.jpeg */}
      <p className="text-[9px] text-zinc-500 text-center mt-4 leading-tight">
        &copy; 2026, All rights reserved, PhonePe Ltd (Formerly known as &lsquo;PhonePe Private Ltd&rsquo;)
      </p>

    </div>
  );
};
