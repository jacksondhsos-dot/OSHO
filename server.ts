import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory persistent order repository for real session tracking & admin management
export interface OrderRecord {
  orderId: string;
  edition: 'english' | 'hindi' | 'both';
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  paymentId?: string;
  createdAt: string;
  downloadToken: string;
  downloadsCount: number;
}

const ORDERS: OrderRecord[] = [
  {
    orderId: 'ORD-98214',
    edition: 'english',
    amount: 49,
    currency: 'INR',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98201 44521',
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'PAID',
    paymentId: 'pay_UPI_98214',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    downloadToken: 'tok_seeded_en_1',
    downloadsCount: 1,
  },
  {
    orderId: 'ORD-98215',
    edition: 'hindi',
    amount: 49,
    currency: 'INR',
    customerName: 'Sunita Verma',
    customerEmail: 'sunita.v@example.com',
    customerPhone: '+91 94150 88290',
    paymentMethod: 'PhonePe UPI',
    paymentStatus: 'PAID',
    paymentId: 'pay_UPI_98215',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    downloadToken: 'tok_seeded_hi_2',
    downloadsCount: 2,
  },
  {
    orderId: 'ORD-98216',
    edition: 'both',
    amount: 98,
    currency: 'INR',
    customerName: 'Rajesh Patel',
    customerEmail: 'rajesh.patel@example.com',
    customerPhone: '+91 97240 11983',
    paymentMethod: 'Razorpay UPI / Cards',
    paymentStatus: 'PAID',
    paymentId: 'pay_UPI_98216',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    downloadToken: 'tok_seeded_both_3',
    downloadsCount: 1,
  }
];

// Active book prices (defaults to ₹49)
let BOOK_PRICES = {
  english: 49,
  hindi: 49,
};

// 1. Create Order endpoint
app.post('/api/create-order', (req: Request, res: Response) => {
  try {
    const { edition, customerName, customerEmail, customerPhone, paymentMethod = 'UPI / Razorpay' } = req.body;

    if (!edition || !customerName || !customerPhone) {
      return res.status(400).json({ error: 'Missing required order details (edition, customerName, customerPhone)' });
    }

    const price = edition === 'both' 
      ? BOOK_PRICES.english + BOOK_PRICES.hindi 
      : (BOOK_PRICES[edition as 'english' | 'hindi'] || 49);

    const orderId = `OSHO_${Date.now().toString(36).toUpperCase()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const downloadToken = crypto.randomBytes(16).toString('hex');

    const newOrder: OrderRecord = {
      orderId,
      edition,
      amount: price,
      currency: 'INR',
      customerName: customerName.trim(),
      customerEmail: (customerEmail || '').trim(),
      customerPhone: customerPhone.trim(),
      paymentMethod,
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      downloadToken,
      downloadsCount: 0,
    };

    ORDERS.unshift(newOrder);

    // Check if Razorpay keys are provided in environment
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';

    return res.json({
      success: true,
      order: newOrder,
      razorpayKeyId,
      amountInPaisa: price * 100,
      whatsappSupport: '+91 7822042721',
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// 2. Verify Payment endpoint
app.post('/api/verify-payment', (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }

    const order = ORDERS.find(o => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If Razorpay secret exists, verify signature
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    if (razorpaySecret && signature && paymentId) {
      const generatedSignature = crypto
        .createHmac('sha256', razorpaySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        order.paymentStatus = 'FAILED';
        return res.status(400).json({ error: 'Payment signature verification failed' });
      }
    }

    // Mark as PAID
    order.paymentStatus = 'PAID';
    order.paymentId = paymentId || `pay_verified_${Date.now().toString(36)}`;

    return res.json({
      success: true,
      message: 'Payment verified successfully. Your e-book download is ready.',
      order,
      downloadToken: order.downloadToken,
      downloadUrl: `/api/download?token=${order.downloadToken}&edition=${order.edition}`,
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: 'Payment verification failed' });
  }
});

// 3. Secure download verification endpoint
app.get('/api/verify-download', (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ valid: false, error: 'Download token required' });
  }

  const order = ORDERS.find(o => o.downloadToken === token);
  if (!order || order.paymentStatus !== 'PAID') {
    return res.status(403).json({ valid: false, error: 'Invalid or unpaid download token' });
  }

  order.downloadsCount += 1;
  return res.json({
    valid: true,
    edition: order.edition,
    customerName: order.customerName,
    orderId: order.orderId,
    downloadsCount: order.downloadsCount,
  });
});

// 4. Admin API endpoints
app.get('/api/admin/stats', (_req: Request, res: Response) => {
  const totalOrders = ORDERS.length;
  const paidOrders = ORDERS.filter(o => o.paymentStatus === 'PAID');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const englishSales = paidOrders.filter(o => o.edition === 'english' || o.edition === 'both').length;
  const hindiSales = paidOrders.filter(o => o.edition === 'hindi' || o.edition === 'both').length;

  return res.json({
    totalOrders,
    paidOrdersCount: paidOrders.length,
    totalRevenue,
    englishSales,
    hindiSales,
    orders: ORDERS,
    prices: BOOK_PRICES,
  });
});

app.post('/api/admin/update-price', (req: Request, res: Response) => {
  const { english, hindi } = req.body;
  if (typeof english === 'number' && english > 0) BOOK_PRICES.english = english;
  if (typeof hindi === 'number' && hindi > 0) BOOK_PRICES.hindi = hindi;

  return res.json({ success: true, prices: BOOK_PRICES });
});

// Dynamic Store Catalog state managed by Admin
export interface StoreBook {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle: string;
  language: 'English' | 'Hindi' | 'Bilingual';
  languageNative?: string;
  price: number;
  originalPrice: number;
  currency: string;
  format: string;
  pages: number;
  fileSize: string;
  description: string;
  coverImage: string;
  badge: string;
  publishedYear: string;
  disclaimer: string;
  whatsappMessage: string;
  status: 'PUBLISHED' | 'DRAFT';
  createdAt: string;
  chapters: {
    number: number;
    title: string;
    previewExcerpt: string;
  }[];
}

const STORE_BOOKS: StoreBook[] = [
  {
    id: 'english',
    title: 'OSHO — Life and Philosophy',
    subtitle: 'An introduction to the mystic, his ideas, and his legacy',
    language: 'English',
    languageNative: 'English',
    price: 49,
    originalPrice: 199,
    currency: '₹',
    format: 'Digital PDF (Instant Download)',
    pages: 16,
    fileSize: '3.4 MB',
    description: 'An independent, balanced introduction to Osho\'s life, core ideas, meditation methods, and enduring cultural legacy.',
    coverImage: '/src/assets/images/book_mockup_english_1791959438857.jpg',
    badge: 'Bestseller · English Edition',
    publishedYear: '2026 Edition',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    disclaimer: 'An original, independent introduction written in plain language. Not affiliated with Osho International Foundation.',
    whatsappMessage: 'Hello! I want to purchase the OSHO Life and Philosophy English E-Book for ₹49. Please share the payment details.',
    chapters: [
      { number: 1, title: 'Who Was Osho?', previewExcerpt: 'Few spiritual teachers of the twentieth century provoked as much admiration and argument...' },
      { number: 2, title: 'From Jabalpur to Pune: Early Life', previewExcerpt: 'Chandra Mohan Jain was born on 11 December 1931 in Kuchwada...' },
      { number: 3, title: 'The Core Ideas', previewExcerpt: 'Awareness over belief, witnessing thoughts, and celebrating life...' },
      { number: 4, title: 'Meditation: The Heart of the Work', previewExcerpt: 'Dynamic Meditation and active cathartic methods for modern seekers...' }
    ]
  },
  {
    id: 'hindi',
    title: 'ओशो — जीवन और दर्शन',
    hindiTitle: 'ओशो — जीवन और दर्शन',
    subtitle: 'रहस्यदर्शी, उनके विचारों और उनकी विरासत का परिचय',
    language: 'Hindi',
    languageNative: 'हिंदी',
    price: 49,
    originalPrice: 199,
    currency: '₹',
    format: 'डिजिटल पीडीएफ (तुरंत डाउनलोड)',
    pages: 17,
    fileSize: '3.6 MB',
    description: 'ओशो के जीवन, विचारों, सक्रिय ध्यान पद्धतियों और वैश्विक दर्शन का निष्पक्ष, सरल और प्रामाणिक हिंदी परिचय।',
    coverImage: '/src/assets/images/book_mockup_hindi_1791959438631.jpg',
    badge: 'लोकप्रिय संस्करण · हिंदी एडिशन',
    publishedYear: '2026 संस्करण',
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    disclaimer: 'यह सरल भाषा में लिखा गया एक स्वतंत्र परिचय है। ओशो इंटरनेशनल से कोई प्रत्यक्ष संबद्धता नहीं है।',
    whatsappMessage: 'नमस्ते! मुझे ओशो जीवन और दर्शन की हिंदी ई-बुक ₹49 में खरीदनी है। कृपया भुगतान की जानकारी भेजें।',
    chapters: [
      { number: 1, title: 'ओशो कौन थे?', previewExcerpt: 'बीसवीं सदी के अत्यंत प्रभावशाली और विद्रोही रहस्यदर्शी का परिचय...' },
      { number: 2, title: 'जबलपुर से पुणे तक', previewExcerpt: '1931 से 1974 तक की प्रारंभिक दार्शनिक और जागरण यात्रा...' },
      { number: 3, title: 'मूल विचार', previewExcerpt: 'साक्षी-भाव, संस्कार मुक्ति और भीतरी स्वतंत्रता का विज्ञान...' },
      { number: 4, title: 'सक्रिय ध्यान विधियाँ', previewExcerpt: 'डायनामिक ध्यान, कुंडलिनी, नादब्रह्म और व्हर्लिंग...' }
    ]
  }
];

// Public Books Endpoint
app.get('/api/books', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    books: STORE_BOOKS.filter(b => b.status === 'PUBLISHED'),
  });
});

// Admin All Books Endpoint (including drafts)
app.get('/api/admin/books', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    books: STORE_BOOKS,
  });
});

// Admin Add Book Endpoint (ONLY FOR ADMIN)
app.post('/api/admin/books', (req: Request, res: Response) => {
  try {
    const {
      title,
      hindiTitle = '',
      subtitle = '',
      language = 'English',
      price = 49,
      originalPrice = 199,
      pages = 20,
      description = '',
      coverImage = '/src/assets/images/book_mockup_english_1791959438857.jpg',
      badge = 'New Release',
      status = 'PUBLISHED',
      chapters = [],
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Book title is required' });
    }

    const id = `book_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    const newBook: StoreBook = {
      id,
      title: title.trim(),
      hindiTitle: hindiTitle.trim(),
      subtitle: subtitle.trim(),
      language: language as any,
      languageNative: language === 'Hindi' ? 'हिंदी' : language,
      price: Number(price) || 49,
      originalPrice: Number(originalPrice) || 199,
      currency: '₹',
      format: 'Digital PDF (Instant Download)',
      pages: Number(pages) || 20,
      fileSize: '3.5 MB',
      description: description.trim(),
      coverImage: coverImage.trim() || '/src/assets/images/book_mockup_english_1791959438857.jpg',
      badge: badge.trim() || 'New Release',
      publishedYear: `${new Date().getFullYear()} Edition`,
      status: status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      createdAt: new Date().toISOString(),
      disclaimer: 'An independent digital publication. Not affiliated with Osho International Foundation.',
      whatsappMessage: `Hello! I want to purchase the e-book "${title}" for ₹${price}. Please share payment details.`,
      chapters: Array.isArray(chapters) && chapters.length > 0 ? chapters : [
        { number: 1, title: 'Introduction', previewExcerpt: `Opening exploration and foundational concepts of ${title}.` }
      ],
    };

    STORE_BOOKS.push(newBook);

    return res.status(201).json({
      success: true,
      message: 'New book created successfully!',
      book: newBook,
    });
  } catch (error: any) {
    console.error('Error adding book:', error);
    return res.status(500).json({ error: 'Failed to create book' });
  }
});

// Admin Delete Book Endpoint
app.delete('/api/admin/books/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = STORE_BOOKS.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Prevent deleting default books
  if (id === 'english' || id === 'hindi') {
    return res.status(400).json({ error: 'Cannot delete default flagship editions. You can update their price or details instead.' });
  }

  const deleted = STORE_BOOKS.splice(index, 1)[0];
  return res.json({ success: true, message: 'Book deleted successfully', deleted });
});

// Start Express server and connect Vite in development or static in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OSHO E-BOOKS Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
