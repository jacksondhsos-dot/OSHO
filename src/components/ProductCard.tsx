import React from 'react';
import { BookOpen, Check, Download, Eye, MessageCircle, FileText, Sparkles } from 'lucide-react';
import { BookEdition } from '../data/booksData';

interface ProductCardProps {
  book: BookEdition;
  onBuy: () => void;
  onPreview: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ book, onBuy, onPreview }) => {
  const isHindi = book.id === 'hindi';

  const waMsg = encodeURIComponent(book.whatsappMessage);
  const waUrl = `https://wa.me/917822042721?text=${waMsg}`;

  const features = isHindi ? [
    'सम्पूर्ण 17 पृष्ठों का हाई-क्वालिटी पीडीएफ',
    'सक्रिय ध्यान: डायनामिक, कुंडलिनी व नादब्रह्म विधि',
    'प्रेम, संबंध, स्वतंत्रता और "ज़ोरबा द बुद्धा"',
    'ऐतिहासिक कालक्रम व ओरेगन विवाद का निष्पक्ष विश्लेषण',
    'मोबाइल, टैबलेट व कंप्यूटर पर आजीवन पढ़ने की सुविधा'
  ] : [
    'Complete 16-page high-resolution curated PDF',
    'Active meditation: Dynamic, Kundalini & Nadabrahma',
    'Essays on Love, Conditioning, and "Zorba the Buddha"',
    'Unbiased breakdown of Oregon years & historical timeline',
    'Universal compatibility across mobile, tablet, Kindle & PC'
  ];

  return (
    <div className="relative bg-[#0a1811] border border-[#213c2c] hover:border-[#d4af37]/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 group">
      
      {/* Top Header & Cover Section */}
      <div>
        {/* Unboxed Metadata Header */}
        <div className="flex items-center justify-between text-xs text-[#9eb6a6] pb-4 border-b border-[#1b3425]">
          <span className="text-[#f7df94] font-medium tracking-wide uppercase">
            {book.badge}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[#b8ccc0]">
            <span>{book.format}</span>
            <span>·</span>
            <span>{book.fileSize}</span>
          </div>
        </div>

        {/* 2-Column Product Layout on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 my-6 items-center">
          
          {/* Cover Image mockup */}
          <div className="sm:col-span-5 relative group/img overflow-hidden rounded-xl aspect-[3/4] bg-[#07130d] border border-[#264733] shadow-md">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
              <span className="font-semibold">{book.pages} Pages</span>
              <span className="text-[#d4af37] font-medium">Digital PDF</span>
            </div>
            <button
              onClick={onPreview}
              className="absolute inset-0 bg-[#060e0a]/75 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-[#f7df94] text-xs font-medium cursor-pointer"
            >
              <Eye className="w-6 h-6" />
              <span>{isHindi ? 'अध्याय पढ़ें' : 'Preview Book'}</span>
            </button>
          </div>

          {/* Book Info */}
          <div className="sm:col-span-7 space-y-3">
            <h3 className={`text-2xl font-bold text-[#fbfaf6] leading-snug ${isHindi ? 'font-hindi' : 'font-serif'}`}>
              {book.title}
            </h3>
            
            <p className={`text-xs sm:text-sm text-[#d4af37] italic ${isHindi ? 'font-hindi' : 'font-serif'}`}>
              {book.subtitle}
            </p>

            <p className={`text-xs sm:text-sm text-[#b5c7bc] leading-relaxed ${isHindi ? 'font-hindi' : ''}`}>
              {book.description}
            </p>

            {/* Price Presentation */}
            <div className="pt-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-bold text-[#f7df94] font-mono">
                  {book.currency}{book.price}
                </span>
                <span className="text-sm text-[#6c8676] line-through font-mono">
                  {book.currency}{book.originalPrice}
                </span>
                <span className="text-xs text-[#4ade80] font-medium">
                  {isHindi ? '75% छूट' : '75% OFF'}
                </span>
              </div>
              <p className="text-[11px] text-[#8fa799] mt-0.5">
                {isHindi ? 'एक बार भुगतान · आजीवन अधिकार' : 'One-time payment · Instant lifetime access'}
              </p>
            </div>
          </div>

        </div>

        {/* Feature Highlights */}
        <div className="space-y-2 py-4 border-t border-[#1b3425] text-xs text-[#cad8cf]">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span className={isHindi ? 'font-hindi leading-relaxed' : 'leading-relaxed'}>{feat}</span>
            </div>
          ))}
        </div>

        {/* Table of Contents Snapshot */}
        <div className="mt-2 p-3 bg-[#07130d] rounded-lg border border-[#1b3425]">
          <div className="flex items-center justify-between text-xs font-medium text-[#f7df94] mb-2">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>{isHindi ? 'अध्याय सूची (10 अध्याय)' : 'Table of Contents (10 Chapters)'}</span>
            </span>
            <button
              onClick={onPreview}
              className="text-[11px] text-[#4ade80] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>{isHindi ? 'विस्तार देखें' : 'View Sample'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#9eb6a6]">
            {book.chapters.slice(0, 6).map((ch) => (
              <div key={ch.number} className="truncate">
                <span className="text-[#d4af37] font-mono mr-1">{ch.number}.</span>
                <span className={isHindi ? 'font-hindi' : ''}>{ch.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="pt-6 mt-4 border-t border-[#1b3425] space-y-2.5">
        
        {/* Primary Buy Button */}
        <button
          onClick={onBuy}
          className="w-full py-3.5 text-sm font-semibold text-[#07110c] gold-glow-btn rounded-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span className={isHindi ? 'font-hindi text-base' : ''}>
            {isHindi ? `हिंदी संस्करण खरीदें (₹${book.price})` : `Buy English Edition (₹${book.price})`}
          </span>
        </button>

        {/* Secondary Buttons: Preview & WhatsApp */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onPreview}
            className="py-2.5 px-3 text-xs font-medium text-[#cad8cf] hover:text-white bg-[#0f241a] hover:bg-[#153424] border border-[#213e2e] rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{isHindi ? 'नमूना पढ़ें' : 'Read Preview'}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 text-xs font-medium text-[#4ade80] hover:text-[#86efac] bg-[#0b2917] hover:bg-[#0f3820] border border-[#22c55e]/30 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Order</span>
          </a>
        </div>

        {/* Disclaimer / Independent Note */}
        <p className="text-[10px] text-[#6d8477] text-center pt-1 leading-normal italic">
          {book.disclaimer}
        </p>

      </div>

    </div>
  );
};
