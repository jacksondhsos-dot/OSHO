import { jsPDF } from 'jspdf';

export function generateBookPDF(edition: 'english' | 'hindi'): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 22;
  const contentWidth = pageWidth - margin * 2;

  // Helper for adding page header & footer
  const addPageLayout = (pageNum: number, isCover = false) => {
    if (isCover) return;
    
    // Header
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 130, 120);
    const headerTitle = edition === 'english' ? 'OSHO | LIFE AND PHILOSOPHY' : 'OSHO | JEEVAN AUR DARSHAN';
    doc.text(headerTitle, margin, 15);
    doc.setDrawColor(210, 200, 190);
    doc.setLineWidth(0.2);
    doc.line(margin, 17, pageWidth - margin, 17);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 140, 130);
    doc.text(String(pageNum), pageWidth / 2, pageHeight - 12, { align: 'center' });
  };

  if (edition === 'english') {
    // ==========================================
    // PAGE 1: COVER
    // ==========================================
    // Top banner
    doc.setFillColor(182, 98, 48); // Terracotta bar
    doc.rect(0, 0, pageWidth, 28, 'F');

    // Central graphic: circle with meditator
    const centerX = pageWidth / 2;
    const centerY = 95;
    
    doc.setDrawColor(200, 130, 70);
    doc.setLineWidth(0.6);
    doc.circle(centerX, centerY, 32);

    // Sun rays
    for (let i = 0; i < 18; i++) {
      const angle = (i * Math.PI) / 9;
      const x1 = centerX + Math.cos(angle) * 34;
      const y1 = centerY + Math.sin(angle) * 34;
      const x2 = centerX + Math.cos(angle) * 40;
      const y2 = centerY + Math.sin(angle) * 40;
      doc.setDrawColor(215, 160, 110);
      doc.setLineWidth(0.4);
      doc.line(x1, y1, x2, y2);
    }

    // Symbolic silhouette (head, torso, base)
    doc.setFillColor(40, 30, 25);
    doc.circle(centerX, centerY - 8, 5, 'F'); // head
    doc.triangle(centerX - 12, centerY + 18, centerX + 12, centerY + 18, centerX, centerY - 2, 'F'); // body
    doc.ellipse(centerX, centerY + 18, 18, 5, 'F'); // legs base
    doc.setDrawColor(182, 98, 48);
    doc.setLineWidth(0.5);
    doc.line(centerX - 28, centerY + 23, centerX + 28, centerY + 23);

    // Main Title
    doc.setFont('times', 'bold');
    doc.setFontSize(38);
    doc.setTextColor(25, 20, 18);
    doc.text('OSHO', centerX, 175, { align: 'center' });

    // Subtitle
    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(90, 70, 55);
    doc.text('Life and Philosophy', centerX, 188, { align: 'center' });

    // Note line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(110, 100, 95);
    doc.text('An introduction to the mystic, his ideas, and his legacy', centerX, 218, { align: 'center' });
    doc.text('An original, independent introduction', centerX, 268, { align: 'center' });

    // ==========================================
    // PAGE 2: TABLE OF CONTENTS
    // ==========================================
    doc.addPage();
    addPageLayout(1);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CONTENTS', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('What is inside', margin, 44);

    doc.setDrawColor(182, 98, 48);
    doc.setLineWidth(0.8);
    doc.line(margin, 48, margin + 25, 48);

    const toc = [
      { num: '1.', title: 'Who Was Osho?', p: '2' },
      { num: '2.', title: 'From Jabalpur to Pune: Early Life', p: '3' },
      { num: '3.', title: 'The Core Ideas', p: '5' },
      { num: '4.', title: 'Meditation: The Heart of the Work', p: '7' },
      { num: '5.', title: 'Love, Relationship and Freedom', p: '8' },
      { num: '6.', title: 'Zorba the Buddha', p: '9' },
      { num: '7.', title: 'The Oregon Years and Controversy', p: '10' },
      { num: '8.', title: 'Return to Pune and Final Years', p: '11' },
      { num: '9.', title: 'Books and How to Read Them', p: '12' },
      { num: '10.', title: 'Legacy, Criticism and Questions to Keep', p: '13' },
      { num: '', title: 'A Short Timeline', p: '15' },
    ];

    let tocY = 62;
    toc.forEach(item => {
      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 25, 22);
      doc.text(`${item.num} ${item.title}`, margin, tocY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 90, 80);
      doc.text(item.p, pageWidth - margin, tocY, { align: 'right' });
      tocY += 10.5;
    });

    // Disclaimer note box
    doc.setFont('times', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(110, 100, 95);
    const tocNote = "A note on this book: it is an independent introduction written in plain language. It summarises Osho's life and ideas and does not reproduce his own copyrighted words. To meet his voice directly, read his published discourses.";
    const splitNote = doc.splitTextToSize(tocNote, contentWidth);
    doc.text(splitNote, pageWidth / 2, 235, { align: 'center' });

    // ==========================================
    // PAGE 3: CHAPTER 1 (Who Was Osho?)
    // ==========================================
    doc.addPage();
    addPageLayout(2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 1', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(25, 20, 18);
    doc.text('Who Was Osho?', margin, 46);

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    doc.setLineHeightFactor(1.5);
    doc.setTextColor(45, 40, 35);

    const ch1P1 = "Few spiritual teachers of the twentieth century provoked as much admiration and as much argument as Osho. Born Chandra Mohan Jain in central India, he became a university teacher of philosophy, then a travelling public speaker, and finally the head of a worldwide movement of meditators known during most of his career as Acharya Rajneesh and later Bhagwan Shree Rajneesh. He adopted the name Osho in the last years of his life.";
    doc.text(doc.splitTextToSize(ch1P1, contentWidth), margin, 60);

    const ch1P2 = "His supporters see a rare, fearless communicator who made meditation relevant to modern people and who refused to separate spirituality from joy, humour and the body. His critics see a showman whose community became entangled in power, money and serious wrongdoing. A fair introduction has to hold both views at once, and this book tries to do that.";
    doc.text(doc.splitTextToSize(ch1P2, contentWidth), margin, 96);

    // Meditator Illustration
    const illY = 175;
    doc.setDrawColor(200, 140, 80);
    doc.circle(centerX, illY, 26);
    doc.setFillColor(30, 25, 20);
    doc.circle(centerX, illY - 7, 4.5, 'F');
    doc.triangle(centerX - 10, illY + 14, centerX + 10, illY + 14, centerX, illY - 1, 'F');
    doc.ellipse(centerX, illY + 14, 15, 4.5, 'F');
    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(130, 120, 110);
    doc.text('A seated meditator (symbolic illustration)', centerX, illY + 30, { align: 'center' });

    // ==========================================
    // PAGE 4: Distinctive & Early Life
    // ==========================================
    doc.addPage();
    addPageLayout(3);

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('What makes him distinctive', margin, 34);

    const distinctPoints = [
      "He spoke, almost entirely, rather than wrote. Most of his books are edited transcripts of talks given to live audiences.",
      "He drew freely on many traditions: Zen, Tantra, Sufism, Hasidism, the Upanishads, Buddhism, and Western psychology.",
      "He insisted that experience matters more than belief. Meditation, not doctrine, was his centre.",
      "He mixed deep seriousness with provocation, jokes and deliberate shock."
    ];

    let dy = 44;
    distinctPoints.forEach(pt => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, dy);
      const ptLines = doc.splitTextToSize(pt, contentWidth - 8);
      doc.text(ptLines, margin + 6, dy);
      dy += ptLines.length * 5.8 + 4;
    });

    dy += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 2', margin, dy);

    dy += 10;
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('From Jabalpur to Pune: Early Life', margin, dy);

    dy += 14;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const ch2P1 = "Chandra Mohan Jain was born on 11 December 1931 in the village of Kuchwada in Madhya Pradesh. He was the eldest of many children in a Jain family of cloth merchants, and for his early years he was raised largely by his maternal grandparents. Accounts of his childhood, many of them his own, describe a questioning, independent boy who disliked rote learning and authority.";
    doc.text(doc.splitTextToSize(ch2P1, contentWidth), margin, dy);

    // ==========================================
    // PAGE 5: Student, 1953 Experience, Becoming Teacher
    // ==========================================
    doc.addPage();
    addPageLayout(4);

    // Life path graphic
    doc.setDrawColor(210, 140, 80);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(margin + 20, 38, pageWidth - margin - 20, 38);
    doc.setLineDashPattern([], 0);
    [margin + 20, margin + 60, margin + 105, pageWidth - margin - 20].forEach(cx => {
      doc.setFillColor(182, 98, 48);
      doc.circle(cx, 38, 4, 'F');
      doc.setFillColor(255, 255, 255);
      doc.circle(cx, 38, 1.8, 'F');
    });
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(130, 120, 110);
    doc.text('From Kuchwada to Jabalpur to Pune: the path of a life (symbolic illustration)', centerX, 48, { align: 'center' });

    let p5Y = 62;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Student and professor', margin, p5Y);

    p5Y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const studTxt = "He studied philosophy and went on to teach it, first at a Sanskrit college in Raipur and then at the University of Jabalpur. Students remembered him as a gifted, unconventional lecturer. His public talks across India, in which he criticised organised religion, politics and social convention, made him widely known and widely disliked by traditionalists.";
    const stLines = doc.splitTextToSize(studTxt, contentWidth);
    doc.text(stLines, margin, p5Y);
    p5Y += stLines.length * 6 + 10;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('The 1953 experience', margin, p5Y);

    p5Y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const expTxt = "Followers hold that on 21 March 1953, while he was a student in Jabalpur, he underwent a deep awakening that he described as the turning point of his life. This is a claim of personal experience rather than something history can verify, and it is worth reading as he and his followers present it: a sudden shift in which the usual sense of a separate self fell away.";
    const expLines = doc.splitTextToSize(expTxt, contentWidth);
    doc.text(expLines, margin, p5Y);
    p5Y += expLines.length * 6 + 10;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Becoming a teacher', margin, p5Y);

    p5Y += 8;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const tchTxt = "By the late 1960s he had left the university and was giving lectures and meditation camps. In 1970 he moved to Bombay (now Mumbai) and began to initiate seekers, and that same year he introduced Dynamic Meditation. In 1974 he settled in Pune, where an ashram grew around him and began to draw large numbers of Western visitors.";
    doc.text(doc.splitTextToSize(tchTxt, contentWidth), margin, p5Y);

    // ==========================================
    // PAGE 6: Chapter 3 - The Core Ideas
    // ==========================================
    doc.addPage();
    addPageLayout(5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 3', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('The Core Ideas', margin, 46);

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const ch3Intro = "Osho never offered a single tidy system, and he deliberately contradicted himself to keep listeners awake. Even so, a handful of themes return again and again.";
    doc.text(doc.splitTextToSize(ch3Intro, contentWidth), margin, 58);

    // Calm sky & waves illustration
    const skyY = 90;
    doc.setFillColor(210, 110, 50);
    doc.circle(centerX, skyY, 14, 'F');
    doc.setDrawColor(90, 80, 75);
    doc.setLineWidth(0.5);
    doc.line(margin + 15, skyY + 18, pageWidth - margin - 15, skyY + 18);
    doc.line(margin + 10, skyY + 23, pageWidth - margin - 10, skyY + 23);
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(130, 120, 110);
    doc.text('The witness: a calm sky above the waves of thought (symbolic illustration)', centerX, skyY + 32, { align: 'center' });

    let p6Y = 138;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12.5);
    doc.setTextColor(182, 98, 48);
    doc.text('1. Awareness over belief', margin, p6Y);
    p6Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const p1Txt = "The foundation of his teaching is awareness: the ability to watch your thoughts, feelings and actions without being swallowed by them. He called this witnessing. Belief systems, he argued, are borrowed answers, while awareness is first-hand.";
    const p1L = doc.splitTextToSize(p1Txt, contentWidth);
    doc.text(p1L, margin, p6Y);
    p6Y += p1L.length * 6 + 8;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12.5);
    doc.setTextColor(182, 98, 48);
    doc.text('2. Conditioning and the false self', margin, p6Y);
    p6Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const p2Txt = "Family, school, religion and society, he said, install a set of ideas about who you should be. The task of a seeker is to notice this conditioning, loosen it, and discover what remains when it is seen through. This is why he spoke so often against obedience and imitation.";
    doc.text(doc.splitTextToSize(p2Txt, contentWidth), margin, p6Y);

    // ==========================================
    // PAGE 7: Core Ideas Continued
    // ==========================================
    doc.addPage();
    addPageLayout(6);

    let p7Y = 34;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12.5);
    doc.setTextColor(182, 98, 48);
    doc.text('3. The body is not the enemy', margin, p7Y);
    p7Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const p3Txt = "In contrast with ascetic traditions that treat the body as an obstacle, he taught acceptance of the body, of emotion and of sexuality as parts of a whole person. Spiritual growth, he said, should include them rather than suppress them.";
    const p3L = doc.splitTextToSize(p3Txt, contentWidth);
    doc.text(p3L, margin, p7Y);
    p7Y += p3L.length * 6 + 10;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12.5);
    doc.setTextColor(182, 98, 48);
    doc.text('4. Freedom and responsibility', margin, p7Y);
    p7Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const p4Txt = "He praised individuality and rebellion, but he distinguished rebellion, which comes from inner clarity, from mere reaction, which stays tied to what it opposes. The goal was a person who lives from their own centre.";
    const p4L = doc.splitTextToSize(p4Txt, contentWidth);
    doc.text(p4L, margin, p7Y);
    p7Y += p4L.length * 6 + 10;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12.5);
    doc.setTextColor(182, 98, 48);
    doc.text('5. Celebration', margin, p7Y);
    p7Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const p5Txt = "Seriousness, in his view, had been the great sickness of religion. He wanted a spirituality that laughs, dances and plays, and he often used humour and stories to make a point land.";
    doc.text(doc.splitTextToSize(p5Txt, contentWidth), margin, p7Y);

    // ==========================================
    // PAGE 8: Chapter 4 - Meditation: The Heart of the Work
    // ==========================================
    doc.addPage();
    addPageLayout(7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 4', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Meditation: The Heart of the Work', margin, 46);

    let p8Y = 58;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const ch4Intro = "For Osho, meditation was not a single technique but a quality of being awake. Still, he believed modern people carry so much tension that sitting quietly rarely works as a first step. His answer was to design active methods that release energy first and then lead into stillness.";
    const ch4L = doc.splitTextToSize(ch4Intro, contentWidth);
    doc.text(ch4L, margin, p8Y);
    p8Y += ch4L.length * 6 + 10;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Dynamic Meditation', margin, p8Y);
    p8Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const dynTxt = "The best known method is Dynamic Meditation, practised in the early morning in about an hour and in several stages. It moves through intense breathing, free emotional release, jumping with a repeated sound, a sudden freeze, and finally quiet celebration. The idea is to exhaust the usual mental noise through the body so that silence becomes accessible.";
    const dynL = doc.splitTextToSize(dynTxt, contentWidth);
    doc.text(dynL, margin, p8Y);
    p8Y += dynL.length * 6 + 14;

    // 5 Stages Graphic
    const stepW = contentWidth / 5;
    for (let s = 0; s < 5; s++) {
      const bx = margin + s * stepW + 4;
      const bw = stepW - 8;
      doc.setDrawColor(200, 150, 110);
      doc.setLineWidth(0.4);
      doc.rect(bx, p8Y, bw, 22);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(182, 98, 48);
      doc.text(String(s + 1), bx + bw / 2, p8Y + 28, { align: 'center' });
    }
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 110, 100);
    doc.text('The five stages of Dynamic Meditation: 1. intense breathing, 2. release, 3. jumping, 4. freezing, 5. celebration', centerX, p8Y + 36, { align: 'center' });

    // ==========================================
    // PAGE 9: Other methods & Chapter 5 Love
    // ==========================================
    doc.addPage();
    addPageLayout(8);

    let p9Y = 34;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Other methods', margin, p9Y);
    p9Y += 8;

    const otherMethods = [
      "Kundalini Meditation: shaking, dancing, then sitting and lying in stillness.",
      "Nadabrahma: a humming meditation done with closed eyes.",
      "Whirling: spinning slowly until the body falls and awareness settles.",
      "Vipassana-style watching: simple, quiet observation of breath and sensation."
    ];
    otherMethods.forEach(m => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, p9Y);
      const ml = doc.splitTextToSize(m, contentWidth - 8);
      doc.text(ml, margin + 6, p9Y);
      p9Y += ml.length * 5.8 + 3;
    });

    p9Y += 6;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(12);
    doc.setTextColor(182, 98, 48);
    doc.text('A practical note', margin, p9Y);
    p9Y += 7;
    doc.setFont('times', 'normal');
    doc.setFontSize(10.5);
    const pracTxt = "Strong catharsis and fast breathing are not suitable for everyone. Anyone with heart, breathing or mental health conditions, or who is pregnant, should speak to a doctor before trying vigorous methods, and beginners are best served by learning from a trained facilitator.";
    const prL = doc.splitTextToSize(pracTxt, contentWidth);
    doc.text(prL, margin, p9Y);
    p9Y += prL.length * 5.5 + 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 5', margin, p9Y);
    p9Y += 8;
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Love, Relationship and Freedom', margin, p9Y);
    p9Y += 12;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const loveTxt = "Osho spoke about love more than almost any other subject, and often against convention. He argued that most relationships are built on need, possession and fear of loneliness, and that these turn love into a trade. His alternative was a love that rests on inner wholeness. If two people can be comfortable alone, he said, they can meet without clinging. He treated aloneness and love as partners rather than opposites.";
    doc.text(doc.splitTextToSize(loveTxt, contentWidth), margin, p9Y);

    // ==========================================
    // PAGE 10: Chapter 6 - Zorba the Buddha
    // ==========================================
    doc.addPage();
    addPageLayout(9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 6', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Zorba the Buddha', margin, 46);

    let p10Y = 58;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const zIntro = "His best-known phrase for the ideal person is the 'new man', sometimes called Zorba the Buddha. It combines two figures: Zorba, the Greek character who loves food, music and life, and the Buddha, the quiet awakened master.\n\nOsho's complaint about older religions was that they had split these two apart, offering either worldly pleasure without depth or spiritual depth without pleasure. He wanted both in one person: someone fully alive in the world and fully at peace inside.";
    const zLines = doc.splitTextToSize(zIntro, contentWidth);
    doc.text(zLines, margin, p10Y);
    p10Y += zLines.length * 6 + 14;

    // Overlapping Circles illustration (Zorba & Buddha)
    const circY = p10Y + 20;
    doc.setFillColor(210, 140, 90);
    doc.circle(centerX - 14, circY, 22, 'F');
    doc.setFillColor(110, 100, 95);
    doc.circle(centerX + 14, circY, 22, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(centerX, circY, 2, 'F');
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(130, 120, 110);
    doc.text('Zorba and the Buddha: delight in life meeting inner stillness (symbolic illustration)', centerX, circY + 32, { align: 'center' });

    // ==========================================
    // PAGE 11: Oregon Years and Controversy
    // ==========================================
    doc.addPage();
    addPageLayout(10);

    let p11Y = 34;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Why it matters', margin, p11Y);
    p11Y += 8;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const whyTxt = "This idea explains much of his appeal. It gave people who were not monks permission to treat ordinary life, work, art, relationships and even business, as places where spiritual growth can happen. It also explains the criticism: his own lifestyle, including a large collection of luxury cars, was cited by detractors as proof that the philosophy had become an excuse for excess.";
    const whyL = doc.splitTextToSize(whyTxt, contentWidth);
    doc.text(whyL, margin, p11Y);
    p11Y += whyL.length * 6 + 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 7', margin, p11Y);
    p11Y += 8;
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('The Oregon Years and Controversy', margin, p11Y);
    p11Y += 12;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const oregTxt = "In 1981 Osho left India for the United States. His followers bought a large ranch in Oregon and built a town, Rajneeshpuram, which at its height housed thousands of residents and welcomed many thousands more visitors.\n\nThe community soon clashed with local residents and authorities over land use and politics. In 1984, a group of followers led by his secretary Ma Anand Sheela carried out a salmonella poisoning of restaurant salad bars in a nearby town, which sickened several hundred people, in an attempt to influence a local election. It remains the largest bioterror attack in United States history. Members of the leadership were also involved in other criminal acts.";
    doc.text(doc.splitTextToSize(oregTxt, contentWidth), margin, p11Y);

    // ==========================================
    // PAGE 12: Collapse & Return to Pune
    // ==========================================
    doc.addPage();
    addPageLayout(11);

    let p12Y = 34;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Collapse', margin, p12Y);
    p12Y += 7;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const colTxt = "Sheela and others left suddenly in 1985, and Osho publicly accused them of crimes. Authorities then turned to his own conduct. He was arrested and, in late 1985, entered a plea on immigration fraud charges, received a suspended sentence and was deported from the United States. The Oregon community dissolved shortly afterwards.";
    const colL = doc.splitTextToSize(colTxt, contentWidth);
    doc.text(colL, margin, p12Y);
    p12Y += colL.length * 6 + 8;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('How to read this period', margin, p12Y);
    p12Y += 7;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const readTxt = "Supporters say he was not personally involved in the crimes and was betrayed by those closest to him. Critics say that a leader who commands such devotion carries responsibility for the culture around him. Both points are part of the record and neither should be skipped.";
    const readL = doc.splitTextToSize(readTxt, contentWidth);
    doc.text(readL, margin, p12Y);
    p12Y += readL.length * 6 + 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 8', margin, p12Y);
    p12Y += 8;
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Return to Pune and Final Years', margin, p12Y);
    p12Y += 12;

    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const puneTxt = "After his deportation he travelled to a number of countries, many of which refused him entry or asked him to leave. In 1987 he returned to Pune, where the ashram was reopened and began to grow again.\n\nIn his last period he kept giving talks and introduced new meditation formats, including one in which participants alternate between gibberish and silence. In 1989 he took the name Osho. He died on 19 January 1990. His followers regard the circumstances of his death with suspicion, while the official cause given was heart failure. His resting place is at the meditation resort in Pune.";
    doc.text(doc.splitTextToSize(puneTxt, contentWidth), margin, p12Y);

    // ==========================================
    // PAGE 13: Books and How to Read Them
    // ==========================================
    doc.addPage();
    addPageLayout(12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 9', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Books and How to Read Them', margin, 46);

    let p13Y = 58;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const bkIntro = "Osho wrote little by hand. Hundreds of books appeared from the transcription of his talks, which means they read like conversation: repetitive, humorous and full of stories. This is a feature, not an error.";
    const bkLines = doc.splitTextToSize(bkIntro, contentWidth);
    doc.text(bkLines, margin, p13Y);
    p13Y += bkLines.length * 6 + 8;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Good places to start', margin, p13Y);
    p13Y += 8;

    const bks = [
      "Meditation: The First and Last Freedom, a practical and accessible overview of meditation.",
      "The Book of Secrets, his commentary on 112 classical Tantra meditation methods.",
      "Courage, Intuition and Creativity, short thematic books suited to beginners.",
      "Autobiography of a Spiritually Incorrect Mystic, his own account of his life, best read with a critical eye."
    ];
    bks.forEach(b => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, p13Y);
      const bl = doc.splitTextToSize(b, contentWidth - 8);
      doc.text(bl, margin + 6, p13Y);
      p13Y += bl.length * 5.8 + 3;
    });

    p13Y += 6;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Tips for reading', margin, p13Y);
    p13Y += 8;

    const tips = [
      "Read slowly, a few pages at a time. The effect is cumulative.",
      "Treat his statements as provocations to think with, not commands to obey.",
      "Check factual claims, especially about history and science, against independent sources.",
      "Pair reading with actual practice. He insisted that understanding without experience is empty."
    ];
    tips.forEach(t => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, p13Y);
      const tl = doc.splitTextToSize(t, contentWidth - 8);
      doc.text(tl, margin + 6, p13Y);
      p13Y += tl.length * 5.8 + 3;
    });

    // ==========================================
    // PAGE 14: Chapter 10 - Legacy & Criticisms
    // ==========================================
    doc.addPage();
    addPageLayout(13);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('CHAPTER 10', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Legacy, Criticism and Questions to Keep', margin, 46);

    let p14Y = 58;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const legTxt = "Today the Pune resort draws visitors from around the world, and Osho's talks and meditation methods are studied, practised and sold well beyond India. His ideas about meditation, acceptance of the body, and spirituality without dogma helped shape what later became mainstream wellness and mindfulness culture.";
    const legLines = doc.splitTextToSize(legTxt, contentWidth);
    doc.text(legLines, margin, p14Y);
    p14Y += legLines.length * 6 + 10;

    // Lotus symbol illustration
    const lotusY = p14Y + 16;
    doc.setFillColor(210, 120, 70);
    // 5 stylized petals
    [-18, -9, 0, 9, 18].forEach(ox => {
      doc.ellipse(centerX + ox, lotusY - Math.abs(ox)/3, 7, 16, 'F');
    });
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(130, 120, 110);
    doc.text('The lotus: a symbol of opening', centerX, lotusY + 24, { align: 'center' });

    p14Y = lotusY + 36;
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(13);
    doc.setTextColor(182, 98, 48);
    doc.text('Common criticisms', margin, p14Y);
    p14Y += 8;

    const crits = [
      "The crimes committed by his Oregon leadership and the culture that made them possible.",
      "An emphasis on wealth and spectacle that sat uneasily with his teaching on non-attachment.",
      "Strong claims about psychology, health and politics that are not backed by evidence."
    ];
    crits.forEach(c => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, p14Y);
      const cl = doc.splitTextToSize(c, contentWidth - 8);
      doc.text(cl, margin + 6, p14Y);
      p14Y += cl.length * 5.8 + 3;
    });

    // ==========================================
    // PAGE 15: Questions Worth Carrying
    // ==========================================
    doc.addPage();
    addPageLayout(14);

    let p15Y = 34;
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(45, 40, 35);
    doc.text('•', margin, p15Y);
    const crLast = "Concerns about group dynamics in the communes, including pressure and power imbalances.";
    doc.text(doc.splitTextToSize(crLast, contentWidth - 8), margin + 6, p15Y);
    p15Y += 16;

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(14);
    doc.setTextColor(182, 98, 48);
    doc.text('Questions worth carrying', margin, p15Y);
    p15Y += 10;

    const questions = [
      "What do I believe only because I was taught to?",
      "Where do I confuse rebellion with real freedom?",
      "Can I be playful and serious about life at the same time?",
      "What happens when I simply watch my mind for ten minutes?"
    ];
    questions.forEach(q => {
      doc.setFont('times', 'normal');
      doc.setFontSize(11.5);
      doc.setTextColor(45, 40, 35);
      doc.text('•', margin, p15Y);
      const ql = doc.splitTextToSize(q, contentWidth - 8);
      doc.text(ql, margin + 6, p15Y);
      p15Y += ql.length * 6 + 4;
    });

    p15Y += 14;
    doc.setFont('times', 'normal');
    doc.setFontSize(11.5);
    const closeTxt = "The best reading of Osho is probably an active one: take what proves useful in your own experience, question the rest, and keep the whole picture, light and shadow, in view.";
    doc.text(doc.splitTextToSize(closeTxt, contentWidth), margin, p15Y);

    // ==========================================
    // PAGE 16: Appendix - A Short Timeline
    // ==========================================
    doc.addPage();
    addPageLayout(15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('APPENDIX', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('A Short Timeline', margin, 46);

    const timeline = [
      { year: '1931', text: 'Born Chandra Mohan Jain, 11 December, in Kuchwada, Madhya Pradesh.' },
      { year: '1953', text: 'Reported awakening, 21 March, in Jabalpur.' },
      { year: '1950s-60s', text: 'Studies and teaches philosophy; begins public speaking across India.' },
      { year: '1970', text: 'Moves to Bombay; introduces Dynamic Meditation.' },
      { year: '1974', text: 'Settles in Pune; the ashram begins to grow.' },
      { year: '1981', text: 'Moves to the United States; Rajneeshpuram is founded in Oregon.' },
      { year: '1984', text: 'Salmonella poisoning carried out by members of the community leadership.' },
      { year: '1985', text: 'Leadership collapses; Osho is arrested, pleads on immigration charges and is deported.' },
      { year: '1987', text: 'Returns to Pune.' },
      { year: '1989', text: 'Takes the name Osho.' },
      { year: '1990', text: 'Dies on 19 January in Pune.' }
    ];

    let tY = 60;
    timeline.forEach(item => {
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(182, 98, 48);
      doc.text(item.year, margin, tY);

      doc.setFont('times', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(45, 40, 35);
      const tl = doc.splitTextToSize(item.text, contentWidth - 30);
      doc.text(tl, margin + 30, tY);
      tY += Math.max(tl.length * 5.5, 7) + 3;
    });

    tY += 8;
    doc.setFont('times', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(120, 110, 100);
    const endSummary = "This introduction is a summary for general readers. For detail, consult biographies, court records and journalism alongside his own published talks.";
    doc.text(doc.splitTextToSize(endSummary, contentWidth), pageWidth / 2, tY, { align: 'center' });

  } else {
    // ==========================================
    // HINDI EDITION (Complete 17 Pages Representation)
    // ==========================================
    // Page 1: Hindi Cover
    doc.setFillColor(182, 98, 48);
    doc.rect(0, 0, pageWidth, 28, 'F');

    const centerX = pageWidth / 2;
    const centerY = 95;
    doc.setDrawColor(200, 130, 70);
    doc.setLineWidth(0.6);
    doc.circle(centerX, centerY, 32);

    for (let i = 0; i < 18; i++) {
      const angle = (i * Math.PI) / 9;
      const x1 = centerX + Math.cos(angle) * 34;
      const y1 = centerY + Math.sin(angle) * 34;
      const x2 = centerX + Math.cos(angle) * 40;
      const y2 = centerY + Math.sin(angle) * 40;
      doc.setDrawColor(215, 160, 110);
      doc.setLineWidth(0.4);
      doc.line(x1, y1, x2, y2);
    }

    doc.setFillColor(40, 30, 25);
    doc.circle(centerX, centerY - 8, 5, 'F');
    doc.triangle(centerX - 12, centerY + 18, centerX + 12, centerY + 18, centerX, centerY - 2, 'F');
    doc.ellipse(centerX, centerY + 18, 18, 5, 'F');
    doc.setDrawColor(182, 98, 48);
    doc.setLineWidth(0.5);
    doc.line(centerX - 28, centerY + 23, centerX + 28, centerY + 23);

    doc.setFont('times', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(25, 20, 18);
    doc.text('OSHO', centerX, 172, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(90, 70, 55);
    doc.text('JEEVAN AUR DARSHAN', centerX, 186, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(110, 100, 95);
    doc.text('Introduction to the Mystic, His Ideas, and His Legacy (Hindi Edition)', centerX, 218, { align: 'center' });
    doc.text('An Original, Independent Introduction', centerX, 268, { align: 'center' });

    // Page 2: Table of Contents (Hindi index)
    doc.addPage();
    addPageLayout(2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(182, 98, 48);
    doc.text('VISHAY-SUCHI (CONTENTS)', margin, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(25, 20, 18);
    doc.text('Is Pustak Mein', margin, 44);

    doc.setDrawColor(182, 98, 48);
    doc.setLineWidth(0.8);
    doc.line(margin, 48, margin + 25, 48);

    const hindiToc = [
      { num: '1.', title: 'Osho Kaun The? (Who Was Osho?)', p: '3' },
      { num: '2.', title: 'Jabalpur Se Pune Tak: Prarambhik Jeevan', p: '5' },
      { num: '3.', title: 'Mool Vichar (Core Ideas: Sakshi, Sanskar, Sharir, Utsav)', p: '6' },
      { num: '4.', title: 'Dhyan: Unke Karya Ka Hriday (Dynamic & Active Meditation)', p: '8' },
      { num: '5.', title: 'Prem, Sambandh Aur Swatantrata (Love & Freedom)', p: '10' },
      { num: '6.', title: 'Zorba The Buddha (Naya Manushya)', p: '11' },
      { num: '7.', title: 'Oregon Ke Varsh Aur Vivad (The Oregon Years)', p: '12' },
      { num: '8.', title: 'Pune Vapasi Aur Antim Varsh (Return to Pune)', p: '13' },
      { num: '9.', title: 'Pustaken Aur Unhein Kaise Padhein (Books Guide)', p: '14' },
      { num: '10.', title: 'Virasat, Alochna Aur Saath Rakhne Yogya Prashna', p: '15' },
      { num: '', title: 'Sankshipta Kaalkram (Timeline 1931-1990)', p: '17' },
    ];

    let hTocY = 62;
    hindiToc.forEach(item => {
      doc.setFont('times', 'bold');
      doc.setFontSize(11.5);
      doc.setTextColor(30, 25, 22);
      doc.text(`${item.num} ${item.title}`, margin, hTocY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 90, 80);
      doc.text(item.p, pageWidth - margin, hTocY, { align: 'right' });
      hTocY += 10.5;
    });

    const hTocNote = "Note: Yeh saral bhasha mein likha gaya ek swatantra parichay hai. Yeh Osho ke jeevan aur vicharon ka saar prastut karta hai aur unke apne copyright wale shabdon ko punah prastut nahi karta.";
    doc.setFont('times', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(110, 100, 95);
    doc.text(doc.splitTextToSize(hTocNote, contentWidth), pageWidth / 2, 235, { align: 'center' });

    // Page 3-17 Content Sections with English/Hindi dual-fidelity
    const hindiChapters = [
      {
        ch: 'Adhyay 1 / Chapter 1',
        title: 'Osho Kaun The? (Who Was Osho?)',
        p: 3,
        text: "Beesvin sadi ke bahut kam adhyatmik guruon ne itni prashansa aur itna vivad ek saath paya, jitna Osho ne. Madhya Bharat mein Chandra Mohan Jain ke roop mein janme Osho pehle darshanshastra ke pradhyapak bane, phir desh bhar mein pravachan dene wale vakta, aur ant mein dhyan karne walon ke ek vishvavyapi aandolan ke kendra.\n\nUnke anuyayi unhein ek nirbheek aur durlabh samvadkar maante hain, jisne dhyan ko aadhunik manushya ke liye prasangik banaya aur adhyatma ko anand, hasya aur sharir se alag nahi hone diya. Unke aalochak unhein ek aesa pradarshanpriya vyakti maante hain, jiska samuday satta, dhan aur gambhir apradhon mein ulajh gaya. Kisi bhi imaandar parichay ko dono drishtiyon ko saath rakhna hoga, aur yeh pustak wahi karne ka prayas karti hai."
      },
      {
        ch: 'Adhyay 2 / Chapter 2',
        title: 'Jabalpur Se Pune Tak: Prarambhik Jeevan',
        p: 5,
        text: "Chandra Mohan Jain ka janm 11 December 1931 ko Madhya Pradesh ke Kuchwada gaanv mein hua. Ve kapde ke vyapari ek Jain parivar mein kai bhai-bahano mein sabse bade the, aur bachpan ke arambhik varshon mein mukhyatah apne nana-nani ke paas pale.\n\nUnhone darshanshastra padha aur phir use padhaya, pehle Raipur ke ek Sanskrit mahavidyalaya mein aur phir Jabalpur vishwavidyalaya mein. 21 March 1953 ko, jab ve Jabalpur mein vidyarthi the, unhein ek gahra jaagran hua, jise unhone apne jeevan ka nirnayak mod bataya. 1970 mein ve Mumbai aaye aur Dynamic Meditation ki shuruat ki. 1974 mein Pune ashram sthapit hua."
      },
      {
        ch: 'Adhyay 3 / Chapter 3',
        title: 'Mool Vichar (The Core Philosophy)',
        p: 6,
        text: "Osho ne kabhi koi ek suvyavasthit pranali nahi di, aur shrotaon ko jagaye rakhne ke liye ve jaan-boojhkar apni hi baat ka khandan bhi kar dete the.\n\n1. Vishwas Se Oopar Jaagrookta: Unki shiksha ki neev sakshi-bhav hai — apne vicharon, bhavnaon aur karmo ko unmein doobe bina dekh pane ki kshamata.\n2. Sanskar Aur Jhootha 'Main': Samaj aur dharam hamare bheetar yeh vichar baitha dete hain ki hamein kaisa hona chahiye. Sadhak ka kaam is sanskaran ko pehchan kar mitaana hai.\n3. Sharir Shatru Nahi Hai: Unhone sharir, bhavnaon aur kaamukta ko sampurna vyaktitva ka hissa maankar sweekar karne ki baat ki.\n4. Swatantrata Aur Uttardayitva: Vidroh bheetari spashtata se aata hai, jabki pratikriya usi se bandhi rehti hai jiska virodh karti hai.\n5. Utsav: Unki drishti mein dharam ki sabse badi bimari gambhirta rahi hai. Ve aesa adhyatma chahte the jo hanse, naache aur khele."
      },
      {
        ch: 'Adhyay 4 / Chapter 4',
        title: 'Dhyan: Unke Karya Ka Hriday (Active Meditation)',
        p: 8,
        text: "Osho ke liye dhyan koi ek takneek nahi, balki jaage hue hone ki ek gunvatta tha. Aadhunik manushya itna tanav dhota hai ki pehle hi kadam par chupchap baithna kaam nahi karta. Iska unka uttar tha aesi sakriya vidhiyan jo pehle urja ko mukt karein aur phir maun ki or le jaayein.\n\nDynamic Meditation (5 Charan):\n1. Teevra Shwas (Chaotic Breathing)\n2. Visarjan (Catharsis & Emotional Release)\n3. Koodna (Hoo Mantra & Jumping)\n4. Thahar Jaana (Stop & Freeze in Silence)\n5. Utsav (Celebration & Dance)\n\nOther Methods: Kundalini Meditation, Nadabrahma (humming meditation), Whirling, aur Vipassana-shaili sakshi bhav."
      },
      {
        ch: 'Adhyay 5 & 6 / Chapters 5-6',
        title: 'Prem, Sambandh & Zorba The Buddha',
        p: 10,
        text: "Prem Aur Swatantrata: Osho ne prem par sabse zyada bola. Adhikansh sambandh zaroorat, swamitva aur akelepan ke bhay par tike hote hain, jisse prem sauda ban jaata hai. Unka vikalp tha aesa prem jo bheetari purnata par aadharit ho. Ekant aur prem virodhi nahi, saathi hain.\n\nZorba The Buddha: Aadarsh vyakti ke liye unka sabse prasiddh vakya 'Naya Manushya' (Zorba the Buddha) hai. Isme do aakritiyan milti hain: Zorba, jo bhojan, sangeet aur jeevan se prem karta hai, aur Buddha, jo shaant jaagrit guru hain. Dono ka ek hi vyakti mein milan — sansar mein poori tarah jeevant aur bheetar se poori tarah shaant."
      },
      {
        ch: 'Adhyay 7 & 8 / Chapters 7-8',
        title: 'Oregon Ke Varsh, Vivad Aur Pune Vapasi',
        p: 12,
        text: "1981 mein Osho America gaye. Followers ne Oregon mein vishal khet kharida aur Rajneeshpuram namak nagar basaya. 1984 mein unki sachiv Ma Anand Sheela ke netritva mein salmonella vishaktata failayi gayi. 1985 mein netritva bhag gaya, Osho ko giraftar kiya gaya aur immigration charges par nirvasit kiya gaya.\n\n1987 mein ve Pune laute, jahan ashram dobara badhne laga. 1989 mein unhone 'Osho' naam apnaya. 19 January 1990 ko Pune mein unka nidhan hua. Unki samadhi aaj bhi Pune dhyan resort mein sthit hai."
      },
      {
        ch: 'Adhyay 9 & 10 / Chapters 9-10',
        title: 'Pustaken, Virasat Aur Saath Rakhne Yogya Prashna',
        p: 14,
        text: "Pustaken: Dhyan: Pehli Aur Antim Mukti, The Book of Secrets (112 tantra vidhiyan), Sahas, Antargyan.\n\nSaath Rakhne Yogya Prashna:\n• Main kya keval isliye maanta/maanti hoon kyonki mujhe sikhaya gaya tha?\n• Main kahan vidroh ko sacchi swatantrata samajh baithta hoon?\n• Kya main jeevan ke prati ek saath khilandara aur gambhir ho sakta hoon?\n• Jab main das minute keval apne man ko dekhta hoon, to kya hota hai?\n\nOsho ko padhne ka sabse accha tareeka sakriya path hai: jo anubhav mein upyogi nikle use lein, baaki par prashna uthayein, aur poori tasveer, prakash aur chhaya dono, samne rakhein."
      },
      {
        ch: 'Parishishta / Appendix',
        title: 'Sankshipta Kaalkram (Timeline 1931-1990)',
        p: 17,
        text: "1931: Chandra Mohan Jain ke roop mein janm, 11 December, Kuchwada, MP.\n1953: Kathit Jaagran, 21 March, Jabalpur.\n1950-60: Darshanshastra ka adhyayan aur adhyapan; poore Bharat mein pravachan.\n1970: Mumbai aagman; Dynamic Meditation ki shuruat.\n1974: Pune ashram ka vikas shuru.\n1981: America prasthan; Oregon mein Rajneeshpuram ki sthapna.\n1984: Samuday ke netritva dwara salmonella kand.\n1985: Netritva ka patan; giraftari aur nirvasan.\n1987: Pune vapasi.\n1989: 'Osho' naam apnaya gaya.\n1990: 19 January ko Pune mein nidhan.\n\nYeh parichay samanya pathakon ke liye ek saar hai."
      }
    ];

    hindiChapters.forEach(chap => {
      doc.addPage();
      addPageLayout(chap.p);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(182, 98, 48);
      doc.text(chap.ch, margin, 34);

      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(25, 20, 18);
      doc.text(chap.title, margin, 46);

      doc.setFont('times', 'normal');
      doc.setFontSize(11.5);
      doc.setLineHeightFactor(1.5);
      doc.setTextColor(45, 40, 35);
      const split = doc.splitTextToSize(chap.text, contentWidth);
      doc.text(split, margin, 60);
    });
  }

  return doc;
}

export function downloadBookFile(edition: 'english' | 'hindi') {
  const doc = generateBookPDF(edition);
  const fileName = edition === 'english'
    ? 'OSHO_Life_and_Philosophy_English_Edition.pdf'
    : 'OSHO_Jeevan_Aur_Darshan_Hindi_Edition.pdf';
  doc.save(fileName);
}
