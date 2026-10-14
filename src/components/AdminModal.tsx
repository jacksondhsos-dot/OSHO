import React, { useState, useEffect } from 'react';
import { X, TrendingUp, IndianRupee, ShoppingCart, BookOpen, Download, RefreshCw, CheckCircle2, BookPlus, Trash2, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { downloadBookFile } from '../utils/pdfGenerator';
import { AdminBookAddPortal } from './AdminBookAddPortal';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBooksChanged?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onBooksChanged }) => {
  const [activeTab, setActiveTab] = useState<'add-book' | 'catalog' | 'orders' | 'prices'>('add-book');
  const [stats, setStats] = useState<any>(null);
  const [adminBooks, setAdminBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [englishPrice, setEnglishPrice] = useState(49);
  const [hindiPrice, setHindiPrice] = useState(49);
  const [priceMessage, setPriceMessage] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats & Orders
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      setStats(statsData);
      if (statsData.prices) {
        setEnglishPrice(statsData.prices.english);
        setHindiPrice(statsData.prices.hindi);
      }

      // 2. Fetch Books Catalog
      const booksRes = await fetch('/api/admin/books');
      const booksData = await booksRes.json();
      if (booksData.success) {
        setAdminBooks(booksData.books);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePriceUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPriceMessage('');
    try {
      const res = await fetch('/api/admin/update-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ english: Number(englishPrice), hindi: Number(hindiPrice) }),
      });
      const data = await res.json();
      if (data.success) {
        setPriceMessage('Prices successfully updated on the server!');
        setTimeout(() => setPriceMessage(''), 4000);
        if (onBooksChanged) onBooksChanged();
      }
    } catch (err) {
      console.error(err);
      setPriceMessage('Failed to update price');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm('Are you sure you want to delete this book from the store?')) return;
    try {
      const res = await fetch(`/api/admin/books/${bookId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setAdminBooks(prev => prev.filter(b => b.id !== bookId));
        if (onBooksChanged) onBooksChanged();
      } else {
        alert(data.error || 'Failed to delete book');
      }
    } catch (err) {
      console.error(err);
      alert('Error communicating with server');
    }
  };

  const handleNewBookAdded = (newBook: any) => {
    setAdminBooks(prev => [...prev, newBook]);
    if (onBooksChanged) onBooksChanged();
    setActiveTab('catalog');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#091510] border border-[#264733] rounded-2xl flex flex-col overflow-hidden shadow-2xl max-h-[94vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c3727] bg-[#060e0a]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#5f259f] border border-[#a855f7]/40 flex items-center justify-center text-white">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Store Administration Portal
                </h3>
                <span className="text-[10px] font-bold text-[#d8b4fe] bg-[#3b0764] px-2 py-0.5 rounded border border-[#9333ea]/30">
                  ONLY FOR ADMIN
                </span>
              </div>
              <p className="text-xs text-[#8fa799]">
                Manage e-book publications, orders, prices, and PhonePe settlements · Beneficiary: Yash Sakharam Salave
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="p-1.5 text-[#8fa799] hover:text-white rounded-lg hover:bg-[#152e20] transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8fa799] hover:text-white rounded-lg hover:bg-[#152e20] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#1c3727] bg-[#07130d] overflow-x-auto">
          <button
            onClick={() => setActiveTab('add-book')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-t border-x cursor-pointer whitespace-nowrap ${activeTab === 'add-book' ? 'bg-[#091510] text-[#f7df94] border-[#264733]' : 'border-transparent text-[#8fa799] hover:text-white'}`}
          >
            <BookPlus className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Add New Book (Admin Page)</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-t border-x cursor-pointer whitespace-nowrap ${activeTab === 'catalog' ? 'bg-[#091510] text-[#f7df94] border-[#264733]' : 'border-transparent text-[#8fa799] hover:text-white'}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Book Catalog ({adminBooks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-t border-x cursor-pointer whitespace-nowrap ${activeTab === 'orders' ? 'bg-[#091510] text-[#f7df94] border-[#264733]' : 'border-transparent text-[#8fa799] hover:text-white'}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Sales &amp; Orders ({stats?.totalOrders ?? 3})</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-t border-x cursor-pointer whitespace-nowrap ${activeTab === 'prices' ? 'bg-[#091510] text-[#f7df94] border-[#264733]' : 'border-transparent text-[#8fa799] hover:text-white'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Price Settings</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* TAB 1: ADD NEW BOOK (REQUESTED FEATURE: ONLY FOR ADMIN) */}
          {activeTab === 'add-book' && (
            <AdminBookAddPortal
              onBookAdded={handleNewBookAdded}
              onClose={onClose}
            />
          )}

          {/* TAB 2: MANAGE CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Current Store Catalog ({adminBooks.length} Publications)
                  </h4>
                  <p className="text-xs text-[#8fa799]">
                    All published e-books displayed to visitors on the website.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('add-book')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#07110c] gold-glow-btn rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <BookPlus className="w-3.5 h-3.5" />
                  <span>Add Another Book</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminBooks.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#8fa799] mb-1">
                        <span className="text-[#f7df94] font-medium">{b.badge || 'Published'}</span>
                        <span className="font-mono text-white">₹{b.price}</span>
                      </div>
                      <div className="flex gap-3">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-14 h-20 object-cover rounded border border-[#234631] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h5 className="font-semibold text-white text-xs truncate">
                            {b.title}
                          </h5>
                          {b.hindiTitle && (
                            <p className="font-hindi text-[11px] text-[#d4af37] truncate">
                              {b.hindiTitle}
                            </p>
                          )}
                          <p className="text-[11px] text-[#8fa799] line-clamp-2 mt-1">
                            {b.description || b.subtitle}
                          </p>
                          <span className="text-[10px] text-[#4ade80] font-mono mt-1 block">
                            {b.pages} Pages · {b.format}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#162e20] flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => downloadBookFile(b.id === 'hindi' ? 'hindi' : 'english')}
                        className="text-[#f7df94] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> Test PDF
                      </button>

                      {b.id !== 'english' && b.id !== 'hindi' ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteBook(b.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      ) : (
                        <span className="text-[10px] text-zinc-500 font-mono">Flagship Edition</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & REVENUE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              {/* Key Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl space-y-1">
                  <span className="text-[11px] text-[#8fa799] uppercase tracking-wider block">Total Revenue</span>
                  <div className="flex items-center gap-1 text-2xl font-bold font-mono text-[#f7df94]">
                    <IndianRupee className="w-5 h-5" />
                    <span>{stats?.totalRevenue ?? 196}</span>
                  </div>
                  <span className="text-[10px] text-[#4ade80]">Verified Gateway &amp; UPI</span>
                </div>

                <div className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl space-y-1">
                  <span className="text-[11px] text-[#8fa799] uppercase tracking-wider block">Total Orders</span>
                  <div className="text-2xl font-bold font-mono text-white">
                    {stats?.totalOrders ?? 3}
                  </div>
                  <span className="text-[10px] text-[#9eb6a6]">{stats?.paidOrdersCount ?? 3} Paid</span>
                </div>

                <div className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl space-y-1">
                  <span className="text-[11px] text-[#8fa799] uppercase tracking-wider block">English Sales</span>
                  <div className="text-2xl font-bold font-mono text-[#d4af37]">
                    {stats?.englishSales ?? 2}
                  </div>
                  <span className="text-[10px] text-[#8fa799]">₹49 / book</span>
                </div>

                <div className="p-4 bg-[#07130d] border border-[#1b3425] rounded-xl space-y-1">
                  <span className="text-[11px] text-[#8fa799] uppercase tracking-wider block">Hindi Sales</span>
                  <div className="text-2xl font-bold font-mono text-[#4ade80]">
                    {stats?.hindiSales ?? 2}
                  </div>
                  <span className="text-[10px] text-[#8fa799]">₹49 / book</span>
                </div>
              </div>

              {/* Orders Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#4ade80]" />
                  <span>Customer Orders &amp; Delivery Ledger</span>
                </h4>

                <div className="overflow-x-auto border border-[#1b3425] rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#07130d] text-[#8fa799] uppercase tracking-wider border-b border-[#1b3425]">
                      <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Edition</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Method</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#152a1e] bg-[#091711]">
                      {(stats?.orders || []).map((ord: any) => (
                        <tr key={ord.orderId} className="hover:bg-[#0c2217] transition-colors">
                          <td className="px-4 py-3 font-mono text-[#d4af37] font-medium">{ord.orderId}</td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-white block">{ord.customerName}</span>
                            <span className="text-[#8fa799] text-[11px] block">{ord.customerPhone}</span>
                          </td>
                          <td className="px-4 py-3 capitalize text-[#cad8cf]">
                            {ord.edition === 'both' ? 'English + Hindi' : `${ord.edition} (PDF)`}
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-[#f7df94]">
                            ₹{ord.amount}
                          </td>
                          <td className="px-4 py-3 text-[#8fa799]">{ord.paymentMethod}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-[#4ade80] font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#8fa799]">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PRICES & SETTINGS */}
          {activeTab === 'prices' && (
            <div className="p-5 bg-[#07130d] border border-[#1b3425] rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#d4af37]" />
                  <span>Update Live Book Prices</span>
                </h4>
                <span className="text-xs text-[#8fa799]">Standard: ₹49</span>
              </div>

              <form onSubmit={handlePriceUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs text-[#9eb6a6] mb-1">English Edition Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={englishPrice}
                    onChange={(e) => setEnglishPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0a1b12] border border-[#213e2e] rounded-lg text-sm font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9eb6a6] mb-1 font-hindi">हिंदी संस्करण मूल्य (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={hindiPrice}
                    onChange={(e) => setHindiPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0a1b12] border border-[#213e2e] rounded-lg text-sm font-mono text-white"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-xs font-semibold text-[#07110c] bg-[#d4af37] hover:bg-[#ebd074] rounded-lg transition-colors cursor-pointer"
                  >
                    Update Live Prices
                  </button>
                </div>
              </form>

              {priceMessage && (
                <p className="text-xs text-[#4ade80] font-medium">{priceMessage}</p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
