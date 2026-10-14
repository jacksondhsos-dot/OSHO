import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, Smartphone, Check, Loader2, ArrowRight, MessageCircle, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhonePeQrCard } from './PhonePeQrCard';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface CheckoutModalProps {
  initialEdition: 'english' | 'hindi' | 'both';
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  initialEdition,
  isOpen,
  onClose,
  onPaymentSuccess,
}) => {
  const [edition, setEdition] = useState<'english' | 'hindi' | 'both'>(initialEdition);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'whatsapp'>('upi');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sandboxVerificationStep, setSandboxVerificationStep] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  if (!isOpen) return null;

  const price = edition === 'both' ? 98 : 49;
  const originalPrice = edition === 'both' ? 398 : 199;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile/WhatsApp number');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Order on the Server
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          edition,
          customerName,
          customerPhone,
          customerEmail,
          paymentMethod: paymentMethod === 'upi' ? 'UPI (GPay/PhonePe/Paytm)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'WhatsApp Direct',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate order');
      }

      setCreatedOrder(data.order);

      // Check if real Razorpay Key is provided and loaded
      if (data.razorpayKeyId && window.Razorpay) {
        const options = {
          key: data.razorpayKeyId,
          amount: data.amountInPaisa,
          currency: 'INR',
          name: 'OSHO E-BOOKS',
          description: edition === 'both' ? 'English & Hindi OSHO E-Books' : `${edition.toUpperCase()} Edition OSHO E-Book`,
          image: '/src/assets/images/book_mockup_english_1791959438857.jpg',
          order_id: data.order.orderId,
          handler: async function (response: any) {
            // Verify payment on the server
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: data.order.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              confetti({ particleCount: 90, spread: 60 });
              onPaymentSuccess(verifyData.order);
            } else {
              setErrorMessage('Payment verification failed on the server.');
            }
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: {
            color: '#102319',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      } else {
        // Gateway sandbox / verified payment confirmation screen
        setSandboxVerificationStep(true);
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleConfirmSandboxPayment = async () => {
    if (!createdOrder) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const mockPaymentId = `pay_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
      const verifyRes = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: createdOrder.orderId,
          paymentId: mockPaymentId,
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        onPaymentSuccess(verifyData.order);
      } else {
        throw new Error(verifyData.error || 'Server rejected verification');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#091510] border border-[#264733] rounded-2xl flex flex-col overflow-hidden shadow-2xl max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c3727] bg-[#060e0a]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif text-lg font-bold text-[#f7f4ed]">
              Secure Checkout · OSHO E-BOOKS
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
        <div className="overflow-y-auto p-6 space-y-6">
          
          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          {!sandboxVerificationStep ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 1. Edition Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#f7df94] uppercase tracking-wider mb-2">
                  Select Edition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEdition('english')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${edition === 'english' ? 'bg-[#153424] border-[#d4af37] text-white shadow-sm' : 'bg-[#07130d] border-[#1c3a28] text-[#9eb6a6] hover:border-[#2d583e]'}`}
                  >
                    <span className="text-xs font-bold block">English</span>
                    <span className="text-[11px] text-[#8fa799] block">16 Pages PDF</span>
                    <span className="text-sm font-bold text-[#f7df94] mt-1 block">₹49</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEdition('hindi')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${edition === 'hindi' ? 'bg-[#153424] border-[#d4af37] text-white shadow-sm' : 'bg-[#07130d] border-[#1c3a28] text-[#9eb6a6] hover:border-[#2d583e]'}`}
                  >
                    <span className="text-xs font-bold block font-hindi">हिंदी संस्करण</span>
                    <span className="text-[11px] text-[#8fa799] block font-hindi">17 पृष्ठ पीडीएफ</span>
                    <span className="text-sm font-bold text-[#f7df94] mt-1 block">₹49</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEdition('both')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${edition === 'both' ? 'bg-[#153424] border-[#d4af37] text-white shadow-sm' : 'bg-[#07130d] border-[#1c3a28] text-[#9eb6a6] hover:border-[#2d583e]'}`}
                  >
                    <span className="text-xs font-bold block">Both (EN+HI)</span>
                    <span className="text-[11px] text-[#8fa799] block">Complete Set</span>
                    <span className="text-sm font-bold text-[#f7df94] mt-1 block">₹98</span>
                  </button>
                </div>
              </div>

              {/* 2. Customer Contact Details */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#f7df94] uppercase tracking-wider">
                  Your Delivery Details
                </label>

                <div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name (e.g. Ramesh Kumar)"
                    className="w-full px-3.5 py-2.5 bg-[#07130d] border border-[#213e2e] focus:border-[#d4af37] rounded-lg text-sm text-[#fbfaf6] placeholder-[#577262] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="WhatsApp Mobile (+91...)"
                      className="w-full px-3.5 py-2.5 bg-[#07130d] border border-[#213e2e] focus:border-[#d4af37] rounded-lg text-sm text-[#fbfaf6] placeholder-[#577262] focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email Address (Optional)"
                      className="w-full px-3.5 py-2.5 bg-[#07130d] border border-[#213e2e] focus:border-[#d4af37] rounded-lg text-sm text-[#fbfaf6] placeholder-[#577262] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#f7df94] uppercase tracking-wider mb-2">
                  Payment Mode
                </label>
                <div className="space-y-2">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'bg-[#122b1e] border-[#d4af37]' : 'bg-[#07130d] border-[#1b3425]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#4ade80]" />
                      <div>
                        <span className="text-xs font-semibold text-[#f7f4ed] block">UPI / Instant Payment</span>
                        <span className="text-[11px] text-[#8fa799]">Google Pay, PhonePe, Paytm, BHIM, Any UPI</span>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-[#d4af37]" />}
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-[#122b1e] border-[#d4af37]' : 'bg-[#07130d] border-[#1b3425]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#f7df94]" />
                      <div>
                        <span className="text-xs font-semibold text-[#f7f4ed] block">Debit / Credit Card / NetBanking</span>
                        <span className="text-[11px] text-[#8fa799]">Visa, MasterCard, RuPay, Netbanking</span>
                      </div>
                    </div>
                    {paymentMethod === 'card' && <Check className="w-4 h-4 text-[#d4af37]" />}
                  </label>

                  <label
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'whatsapp' ? 'bg-[#122b1e] border-[#22c55e]' : 'bg-[#07130d] border-[#1b3425]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-[#4ade80]" />
                      <div>
                        <span className="text-xs font-semibold text-[#f7f4ed] block">Pay &amp; Receive on WhatsApp</span>
                        <span className="text-[11px] text-[#8fa799]">Direct chat with +91 7822042721</span>
                      </div>
                    </div>
                    {paymentMethod === 'whatsapp' && <Check className="w-4 h-4 text-[#4ade80]" />}
                  </label>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-3.5 bg-[#07130d] border border-[#1b3425] rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between text-[#cad8cf]">
                  <span>Item:</span>
                  <span className="font-semibold text-white">
                    {edition === 'both' ? 'English + Hindi Complete E-Books' : `${edition === 'english' ? 'English' : 'हिंदी'} Edition (PDF)`}
                  </span>
                </div>
                <div className="flex justify-between text-[#8fa799]">
                  <span>M.R.P.:</span>
                  <span className="line-through">₹{originalPrice}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#f7df94] pt-1 border-t border-[#1b3425]">
                  <span>Total Payable:</span>
                  <span className="font-mono">₹{price}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-sm font-semibold text-[#07110c] gold-glow-btn rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{price} Securely</span>
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Authentic PhonePe Standee UPI QR Verification step */
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider block">
                  Scan &amp; Pay to Complete Order
                </span>
                <p className="text-[11px] text-[#9eb6a6] mt-0.5">
                  Order ID: <span className="font-mono text-[#f7df94]">{createdOrder?.orderId}</span>
                </p>
              </div>

              {/* Exact PhonePe Standee as in YUYK.jpeg */}
              <PhonePeQrCard
                amount={price}
                orderId={createdOrder?.orderId}
                compact={false}
              />

              <div className="text-center text-xs text-[#cad8cf] pt-1">
                <p>After paying on PhonePe or any UPI app, click below to verify and unlock your PDF:</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmSandboxPayment}
                  disabled={loading}
                  className="w-full py-3.5 text-sm font-semibold text-[#07110c] bg-[#4ade80] hover:bg-[#22c55e] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Payment with Server...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm &amp; Download E-Book (₹{price})</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/917822042721?text=${encodeURIComponent(`Hello! I have created Order ${createdOrder?.orderId} for ₹${price}. Please verify and send the PDF.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#cad8cf] hover:text-[#4ade80] transition-colors pt-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send payment screenshot on WhatsApp (+91 7822042721)</span>
                </a>
              </div>

            </div>
          )}

          <div className="text-center text-[11px] text-[#6b8577] flex items-center justify-center gap-4 pt-1">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#d4af37]" /> 256-bit Encrypted
            </span>
            <span>·</span>
            <span>Instant PDF Download</span>
            <span>·</span>
            <span>Support: +91 7822042721</span>
          </div>

        </div>

      </div>
    </div>
  );
};
