import React, { useState } from 'react';
import { PlusCircle, BookPlus, Trash2, Check, Sparkles, Image, Lock, ShieldCheck, Eye, Download, AlertCircle } from 'lucide-react';
import { StoreBook } from '../../server';
import { downloadBookFile } from '../utils/pdfGenerator';

interface AdminBookAddPortalProps {
  onBookAdded: (newBook: any) => void;
  onClose: () => void;
}

export const AdminBookAddPortal: React.FC<AdminBookAddPortalProps> = ({ onBookAdded, onClose }) => {
  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Bilingual'>('English');
  const [price, setPrice] = useState(49);
  const [originalPrice, setOriginalPrice] = useState(199);
  const [pages, setPages] = useState(20);
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('New Release · Collector Edition');
  const [coverPreset, setCoverPreset] = useState<string>('emerald');
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [status, setStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  
  // Dynamic chapter list
  const [chapters, setChapters] = useState<{ number: number; title: string; previewExcerpt: string }[]>([
    { number: 1, title: 'Introduction & Background', previewExcerpt: 'An introductory overview of core principles and insights.' },
    { number: 2, title: 'The Path of Meditation', previewExcerpt: 'Techniques, daily awareness practices, and experiential understanding.' }
  ]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Cover image presets
  const coverPresets: Record<string, { label: string; url: string; previewBg: string }> = {
    emerald: {
      label: 'Deep Emerald Green & Gold',
      url: '/src/assets/images/book_mockup_english_1791959438857.jpg',
      previewBg: 'bg-[#0f2d1e]',
    },
    obsidian: {
      label: 'Obsidian Black & Devanagari Gold',
      url: '/src/assets/images/book_mockup_hindi_1791959438631.jpg',
      previewBg: 'bg-[#121212]',
    },
    nature: {
      label: 'Osho Meditating in Nature',
      url: '/src/assets/images/meditating_guru_serene_nature_1791962512476.jpg',
      previewBg: 'bg-[#1c2e22]',
    },
    sanctuary: {
      label: 'Dawn Sanctuary Landscape',
      url: '/src/assets/images/meditation_nature_sanctuary_1791959412864.jpg',
      previewBg: 'bg-[#2d2215]',
    }
  };

  const selectedCoverUrl = customCoverUrl.trim() || coverPresets[coverPreset]?.url || coverPresets.emerald.url;

  const handleAddChapter = () => {
    const nextNum = chapters.length + 1;
    setChapters([
      ...chapters,
      {
        number: nextNum,
        title: `Chapter ${nextNum}`,
        previewExcerpt: `Excerpts and study guidance for chapter ${nextNum}.`,
      }
    ]);
  };

  const handleRemoveChapter = (index: number) => {
    if (chapters.length <= 1) return;
    const updated = chapters.filter((_, idx) => idx !== index).map((ch, idx) => ({
      ...ch,
      number: idx + 1,
    }));
    setChapters(updated);
  };

  const handleChapterChange = (index: number, field: 'title' | 'previewExcerpt', value: string) => {
    const updated = [...chapters];
    updated[index][field] = value;
    setChapters(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!title.trim()) {
      setErrorMessage('Please enter the book title');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        hindiTitle,
        subtitle,
        language,
        price: Number(price) || 49,
        originalPrice: Number(originalPrice) || 199,
        pages: Number(pages) || 20,
        description,
        coverImage: selectedCoverUrl,
        badge,
        status,
        chapters,
      };

      const res = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to add book');
      }

      setSuccessMessage(`Success! "${data.book.title}" is now added to the store catalog.`);
      onBookAdded(data.book);

      // Reset form
      setTitle('');
      setHindiTitle('');
      setSubtitle('');
      setDescription('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error creating new book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Notice Header */}
      <div className="p-4 bg-[#140b24] border border-[#7e22ce]/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5f259f] border border-[#a855f7]/40 flex items-center justify-center text-white shrink-0">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d8b4fe]">
                RESTRICTED PAGE · ONLY FOR ADMIN
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              Add new digital OSHO e-books, configure pricing, upload chapters, and publish live to the storefront.
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-zinc-400 shrink-0">
          <span>Admin: <strong className="text-white">Mr Yash Sakharam Salave</strong></span>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center gap-3 text-emerald-200 text-xs">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-950/80 border border-red-500 rounded-xl flex items-center gap-3 text-red-200 text-xs">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Book Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic Information */}
        <div className="p-5 bg-[#07130d] border border-[#1b3425] rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f7df94] uppercase tracking-wider border-b border-[#1b3425] pb-2">
            <BookPlus className="w-4 h-4 text-[#d4af37]" />
            <span>1. Book Titles &amp; Metadata</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* English Title */}
            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Book Title (English) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Book of Secrets: 112 Tantra Meditations"
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-[#587262] focus:outline-none"
              />
            </div>

            {/* Hindi Title */}
            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5 font-hindi">
                हिंदी शीर्षक (Hindi Title)
              </label>
              <input
                type="text"
                value={hindiTitle}
                onChange={(e) => setHindiTitle(e.target.value)}
                placeholder="उदा. द बुक ऑफ़ सीक्रेट्स (112 ध्यान विधियाँ)"
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-[#587262] focus:outline-none font-hindi"
              />
            </div>

            {/* Subtitle */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Subtitle / One-Line Hook
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. An experiential exploration of classical mindfulness, witnessing, and silence"
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-[#587262] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Full Description (Displayed on product card)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a clear, compelling summary of the teachings, meditation methods, or discourses covered in this publication..."
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-[#587262] focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Pricing, Language & Pages */}
        <div className="p-5 bg-[#07130d] border border-[#1b3425] rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f7df94] uppercase tracking-wider border-b border-[#1b3425] pb-2">
            <span>2. Pricing &amp; Language Specification</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Selling Price (₹)
              </label>
              <input
                type="number"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm font-mono font-bold text-[#f7df94] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Original M.R.P. (₹)
              </label>
              <input
                type="number"
                min="1"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm font-mono text-[#8fa799] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white focus:outline-none"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Bilingual">Bilingual (द्विभाषी)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Total Pages
              </label>
              <input
                type="number"
                min="1"
                required
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm font-mono text-white focus:outline-none"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Badge / Tagline
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. New Release · Featured Edition"
                className="w-full px-3.5 py-2.5 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-sm text-white placeholder-[#587262] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
                Publishing Status
              </label>
              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-emerald-400 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'PUBLISHED'}
                    onChange={() => setStatus('PUBLISHED')}
                    className="accent-emerald-500"
                  />
                  <span>Published (Live in Store)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'DRAFT'}
                    onChange={() => setStatus('DRAFT')}
                    className="accent-zinc-500"
                  />
                  <span>Draft (Hidden)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Book Cover Selection */}
        <div className="p-5 bg-[#07130d] border border-[#1b3425] rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#f7df94] uppercase tracking-wider border-b border-[#1b3425] pb-2">
            <Image className="w-4 h-4 text-[#d4af37]" />
            <span>3. Select Book Cover Mockup</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(coverPresets).map(([key, preset]) => (
              <div
                key={key}
                onClick={() => {
                  setCoverPreset(key);
                  setCustomCoverUrl('');
                }}
                className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${coverPreset === key && !customCoverUrl ? 'border-[#d4af37] bg-[#12281c] shadow-md' : 'border-[#1f3d2b] bg-[#091710] opacity-75 hover:opacity-100'}`}
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 border border-[#244833] relative">
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {coverPreset === key && !customCoverUrl && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#d4af37] text-black rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium text-white block truncate">{preset.label}</span>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#cad8cf] mb-1.5">
              Or Custom Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={customCoverUrl}
              onChange={(e) => setCustomCoverUrl(e.target.value)}
              placeholder="https://example.com/my-custom-book-cover.jpg"
              className="w-full px-3.5 py-2 bg-[#0a1c12] border border-[#213e2e] focus:border-[#d4af37] rounded-xl text-xs text-white placeholder-[#587262] focus:outline-none"
            />
          </div>
        </div>

        {/* Section 4: Chapter Builder */}
        <div className="p-5 bg-[#07130d] border border-[#1b3425] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#1b3425] pb-2">
            <span className="text-xs font-bold text-[#f7df94] uppercase tracking-wider">
              4. Chapters &amp; Table of Contents Preview
            </span>
            <button
              type="button"
              onClick={handleAddChapter}
              className="px-2.5 py-1 text-xs font-semibold text-[#07110c] bg-[#4ade80] hover:bg-[#22c55e] rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Chapter</span>
            </button>
          </div>

          <div className="space-y-3">
            {chapters.map((ch, idx) => (
              <div key={idx} className="p-3.5 bg-[#0a1b12] border border-[#1d3a28] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#d4af37]">
                    Chapter {ch.number}
                  </span>
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChapter(idx)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Remove Chapter"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={ch.title}
                    onChange={(e) => handleChapterChange(idx, 'title', e.target.value)}
                    placeholder="Chapter Title"
                    className="w-full px-3 py-1.5 bg-[#07130d] border border-[#213e2e] rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="text"
                    value={ch.previewExcerpt}
                    onChange={(e) => handleChapterChange(idx, 'previewExcerpt', e.target.value)}
                    placeholder="Short chapter preview / synopsis"
                    className="w-full px-3 py-1.5 bg-[#07130d] border border-[#213e2e] rounded-lg text-xs text-[#cad8cf] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8fa799]">
            This portal is strictly accessible only to Admin. Newly created books instantly persist on the server and appear in the store.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#cad8cf] hover:text-white bg-[#0e2117] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#07110c] gold-glow-btn rounded-xl flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{loading ? 'Publishing Book...' : 'Publish Book to Storefront'}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
