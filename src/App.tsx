/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { BookPreviewModal } from './components/BookPreviewModal';
import { PhilosophySection } from './components/PhilosophySection';
import { TimelineSection } from './components/TimelineSection';
import { WhatsAppSection } from './components/WhatsAppSection';
import { FaqSection } from './components/FaqSection';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminModal } from './components/AdminModal';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { PhonePeModal } from './components/PhonePeModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BOOKS_DATA } from './data/booksData';
import { Sparkles, BookOpen, Check, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  // Modals state
  const [previewEdition, setPreviewEdition] = useState<'english' | 'hindi' | null>(null);
  const [checkoutEdition, setCheckoutEdition] = useState<'english' | 'hindi' | 'both' | null>(null);
  const [phonePeQrOpen, setPhonePeQrOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [legalType, setLegalType] = useState<LegalModalType>(null);

  const [dynamicBooks, setDynamicBooks] = useState<any[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      if (data.success && Array.isArray(data.books)) {
        setDynamicBooks(data.books);
      }
    } catch (err) {
      console.error('Error fetching live books:', err);
    }
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleOpenCheckout = (edition: 'english' | 'hindi' | 'both') => {
    setCheckoutEdition(edition);
  };

  const handlePaymentSuccess = (order: any) => {
    setCheckoutEdition(null);
    setConfirmedOrder(order);
  };

  const isHi = language === 'hi';

  return (
    <div className="min-h-screen bg-[#060e0a] text-[#f7f4ed] selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      
      {/* Top Banner Notice */}
      <div className="bg-[#0b1c13] border-b border-[#1b3827] py-1.5 px-4 text-center text-xs text-[#cad8cf] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>
          {isHi
            ? 'विशेष विमोचन: दोनों ई-बुक्स मात्र ₹49 प्रति प्रति में उपलब्ध · तुरंत डिजिटल डाउनलोड'
            : 'Limited Time Introductory Offer: Only ₹49 per e-book · Instant verified PDF download'}
        </span>
      </div>

      {/* Primary Top Bar */}
      <Navbar
        language={language}
        onLanguageToggle={toggleLanguage}
        onOpenCheckout={handleOpenCheckout}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenQr={() => setPhonePeQrOpen(true)}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          language={language}
          onBuyEnglish={() => handleOpenCheckout('english')}
          onBuyHindi={() => handleOpenCheckout('hindi')}
          onOpenPreview={(edition) => setPreviewEdition(edition)}
          onOpenQr={() => setPhonePeQrOpen(true)}
        />

        {/* 2. Products Section (English Edition & Hindi Edition) */}
        <section id="editions" className="py-20 sm:py-28 bg-[#07110c] border-b border-[#1b3325]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                <span>Choose Your Edition</span>
                <span aria-hidden="true">·</span>
                <span>अपनी पसंदीदा भाषा चुनें</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fbfaf6]">
                {isHi ? 'डिजिटल ई-बुक संस्करण' : 'Available Digital Editions'}
              </h2>
              <p className="text-sm sm:text-base text-[#9eb6a6] leading-relaxed text-balance">
                {isHi
                  ? 'अंग्रेजी और हिंदी दोनों में प्रामाणिक, उच्च-गुणवत्ता वाली पीडीएफ फाइलें। मात्र ₹49 में तुरंत डाउनलोड उपलब्ध।'
                  : 'Genuine, complete high-resolution PDF editions designed for deep reading, reflection, and meditation practice.'}
              </p>
            </div>

            {/* 2 Product Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
              <ProductCard
                book={BOOKS_DATA.english}
                onBuy={() => handleOpenCheckout('english')}
                onPreview={() => setPreviewEdition('english')}
              />

              <ProductCard
                book={BOOKS_DATA.hindi}
                onBuy={() => handleOpenCheckout('hindi')}
                onPreview={() => setPreviewEdition('hindi')}
              />
            </div>

            {/* Both Editions Bundle Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0d2317] via-[#102a1c] to-[#0d2317] border border-[#27533a] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-bold text-[#f7df94] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  <span>Ultimate Value Bundle · Complete Set</span>
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Get Both English &amp; Hindi Editions for Just ₹98
                </h3>
                <p className="text-xs sm:text-sm text-[#b5c7bc]">
                  Read both the comprehensive 16-page English study and the 17-page Hindi edition. M.R.P. ₹398 (75% savings).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() => handleOpenCheckout('both')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#07110c] gold-glow-btn rounded-xl flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buy Both Editions (₹98)</span>
                </button>
                <a
                  href={`https://wa.me/917822042721?text=${encodeURIComponent('Hello! I want to buy the OSHO English and Hindi e-books bundle for ₹98.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-xs font-semibold text-[#4ade80] bg-[#07130d] hover:bg-[#0b1f14] border border-[#22c55e]/30 rounded-xl transition-colors whitespace-nowrap"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Admin Added Dynamic Publications */}
            {dynamicBooks.filter(b => b.id !== 'english' && b.id !== 'hindi').length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#1b3425] space-y-8">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                    <span>Curated Admin Additions</span>
                    <span aria-hidden="true">·</span>
                    <span>नई जोड़ी गई पुस्तकें</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Special &amp; Collector Editions
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8fa799]">
                    Publications newly added via the Admin Dashboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {dynamicBooks.filter(b => b.id !== 'english' && b.id !== 'hindi').map((customBook) => (
                    <ProductCard
                      key={customBook.id}
                      book={customBook}
                      onBuy={() => handleOpenCheckout(customBook.id)}
                      onPreview={() => setPreviewEdition(customBook.id as any)}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 3. Core Philosophy & Active Meditation Section */}
        <PhilosophySection
          language={language}
          onExploreEdition={(ed) => handleOpenCheckout(ed)}
        />

        {/* 4. Biographical Timeline (1931-1990) */}
        <TimelineSection language={language} />

        {/* 5. WhatsApp Direct Ordering Section */}
        <WhatsAppSection language={language} />

        {/* 6. Frequently Asked Questions */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalType(type)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp language={language} />

      {/* Modals */}
      {previewEdition && (
        <BookPreviewModal
          edition={previewEdition}
          isOpen={true}
          onClose={() => setPreviewEdition(null)}
          onBuy={(ed) => {
            setPreviewEdition(null);
            handleOpenCheckout(ed);
          }}
        />
      )}

      {checkoutEdition && (
        <CheckoutModal
          initialEdition={checkoutEdition}
          isOpen={true}
          onClose={() => setCheckoutEdition(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          isOpen={true}
          onClose={() => setConfirmedOrder(null)}
          onOpenPreview={(ed) => setPreviewEdition(ed)}
        />
      )}

      {adminOpen && (
        <AdminModal
          isOpen={true}
          onClose={() => setAdminOpen(false)}
          onBooksChanged={fetchBooks}
        />
      )}

      {phonePeQrOpen && (
        <PhonePeModal
          isOpen={true}
          onClose={() => setPhonePeQrOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {legalType && (
        <LegalModals
          type={legalType}
          onClose={() => setLegalType(null)}
        />
      )}

    </div>
  );
}
