const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Documents/ship company/src/components/id';

function replaceText(content, search, replace) {
  // Create a regex that allows variable whitespace (including newlines) between words
  const searchPattern = search
    .trim()
    .split(/\s+/)
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s+');
  
  const regex = new RegExp(searchPattern, 'g');
  return content.replace(regex, replace);
}

const translations = {
  'A seamless shipping experience': 'Pengalaman pengiriman tanpa hambatan',
  'Our streamlined 4-step process ensures maximum efficiency and transparency from the moment you request a quote to final delivery.': 'Proses 4 langkah kami yang efisien memastikan efisiensi dan transparansi maksimal sejak Anda meminta penawaran hingga pengiriman akhir.',
  'Request & Planning': 'Permintaan & Perencanaan',
  'Submit your requirements and our experts will design an optimized logistics plan tailored to your cargo.': 'Kirimkan kebutuhan Anda dan pakar kami akan merancang rencana logistik yang dioptimalkan khusus untuk kargo Anda.',
  'Packaging & Pickup': 'Pengemasan & Penjemputan',
  'We handle secure packaging and pick up your cargo directly from your facility or warehouse.': 'Kami menangani pengemasan yang aman dan menjemput kargo Anda langsung dari fasilitas atau gudang Anda.',
  'Transit & Pelacakan': 'Transit & Pelacakan',
  'Your cargo is dispatched via optimal routes while you monitor progress with real-time tracking.': 'Kargo Anda dikirim melalui rute optimal sementara Anda memantau perkembangannya dengan pelacakan waktu nyata.',
  'Safe Delivery': 'Pengiriman Aman',
  'Cargo is cleared through customs and delivered safely to its final destination on schedule.': 'Kargo melewati bea cukai dan dikirim dengan aman ke tujuan akhir sesuai jadwal.',
  'Our Global Fleet': 'Armada Global Kami',
  'State-of-the-art vessels and vehicles equipped for any cargo requirement.': 'Kapal dan kendaraan mutakhir yang dilengkapi untuk setiap kebutuhan kargo.',
  'Explore Our Full Fleet': 'Jelajahi Seluruh Armada Kami',
  'Capacity': 'Kapasitas',
  'Speed': 'Kecepatan',
  'Emissions': 'Emisi',
  'Our Global Network': 'Jaringan Global Kami',
  'Connecting major ports and commercial hubs across 6 continents.': 'Menghubungkan pelabuhan utama dan pusat komersial di 6 benua.',
  'Major Hubs': 'Pusat Utama',
  'Active Routes': 'Rute Aktif',
  'Port Partners': 'Mitra Pelabuhan',
  'The Seafarer Advantage': 'Keunggulan Seafarer',
  'Why industry leaders trust us': 'Mengapa pemimpin industri mempercayai kami',
  'Global Coverage': 'Cakupan Global',
  'Access to every major port and airport worldwide with localized expertise.': 'Akses ke setiap pelabuhan dan bandara utama di seluruh dunia dengan keahlian lokal.',
  'Advanced Security': 'Keamanan Tingkat Lanjut',
  '24/7 monitoring and enterprise-grade security protocols for all cargo.': 'Pemantauan 24/7 dan protokol keamanan tingkat perusahaan untuk semua kargo.',
  'Real-Time Analytics': 'Analitik Waktu Nyata',
  'Actionable insights and precise ETA tracking powered by our AI systems.': 'Wawasan yang dapat ditindaklanjuti dan pelacakan ETA yang presisi yang didukung oleh sistem AI kami.',
  'Green Logistics': 'Logistik Ramah Lingkungan',
  'Pioneering sustainable shipping': 'Merintis pengiriman berkelanjutan',
  'We are committed to achieving zero-emission logistics by 2040 through alternative fuels, route optimization, and modern fleet upgrades.': 'Kami berkomitmen untuk mencapai logistik tanpa emisi pada tahun 2040 melalui bahan bakar alternatif, optimalisasi rute, dan modernisasi armada.',
  'CO2 Reduction': 'Pengurangan CO2',
  'Since 2020 through fleet modernization': 'Sejak 2020 melalui modernisasi armada',
  'Recyclable Materials': 'Bahan Didaur Ulang',
  'Used in our packaging and container lining': 'Digunakan dalam kemasan dan pelapis kontainer kami',
  'Read Our ESG Report': 'Baca Laporan ESG Kami',
  'Client Success Stories': 'Kisah Sukses Klien',
  'Trusted by industry leaders': 'Dipercaya oleh pemimpin industri',
  'Seafarer has completely transformed our supply chain efficiency. Their real-time tracking and dedicated account management have reduced our delays by over 40%.': 'Seafarer telah sepenuhnya mengubah efisiensi rantai pasokan kami. Pelacakan waktu nyata dan manajemen akun khusus mereka telah mengurangi penundaan kami hingga lebih dari 40%.',
  'When we needed to move sensitive electronic equipment across the globe, Seafarer\'s secure cargo solutions provided exactly the reliability and peace of mind we needed.': 'Ketika kami perlu memindahkan peralatan elektronik sensitif melintasi dunia, solusi kargo aman Seafarer memberikan keandalan dan ketenangan pikiran yang tepat.',
  'Their temperature-controlled logistics are unmatched. Our produce always arrives fresh and on schedule, which is critical for our business reputation.': 'Logistik pengontrol suhu mereka tak tertandingi. Produk kami selalu tiba segar dan tepat waktu, yang sangat penting untuk reputasi bisnis kami.',
  'Latest Insights': 'Wawasan Terbaru',
  'Company news and industry updates': 'Berita perusahaan dan pembaruan industri',
  'Global shipping rates expected to stabilize in Q4': 'Tarif pengiriman global diperkirakan stabil di Kuartal 4',
  'Seafarer adds 5 new eco-friendly vessels to Pacific fleet': 'Seafarer menambahkan 5 kapal ramah lingkungan baru ke armada Pasifik',
  'Navigating new customs regulations in European ports': 'Menavigasi peraturan pabean baru di pelabuhan Eropa',
  'Read Article': 'Baca Artikel',
  'View All News': 'Lihat Semua Berita',
  'Frequently Asked Questions': 'Pertanyaan yang Sering Diajukan',
  'Everything you need to know about our services.': 'Segala yang perlu Anda ketahui tentang layanan kami.',
  'Get in Touch': 'Hubungi Kami',
  'Ready to optimize your supply chain?': 'Siap mengoptimalkan rantai pasokan Anda?',
  'Our logistics experts are ready to build a customized shipping solution for your business.': 'Pakar logistik kami siap membangun solusi pengiriman khusus untuk bisnis Anda.',
  'Global Headquarters': 'Kantor Pusat Global',
  'Support Center': 'Pusat Dukungan',
  'Request Callback': 'Minta Panggilan Balik',
  'Your Name': 'Nama Anda',
  'Email Address': 'Alamat Email',
  'Phone Number': 'Nomor Telepon',
  'Send Message': 'Kirim Pesan',
  'Redefining the standard of global supply chain management with reliable, smart, and sustainable shipping solutions.': 'Mendefinisikan ulang standar manajemen rantai pasokan global dengan solusi pengiriman yang andal, cerdas, dan berkelanjutan.',
  'Quick Links': 'Tautan Cepat',
  'Home': 'Beranda',
  'About Us': 'Tentang Kami',
  'Services': 'Layanan',
  'Our Fleet': 'Armada Kami',
  'Tracking': 'Pelacakan',
  'Legal': 'Hukum',
  'Privacy Policy': 'Kebijakan Privasi',
  'Terms of Service': 'Syarat Layanan',
  'Cookie Policy': 'Kebijakan Cookie',
  'Newsletter': 'Buletin',
  'Stay updated with the latest logistics news and insights.': 'Dapatkan informasi terbaru tentang logistik.',
  'Enter your email': 'Masukkan email Anda',
  'Subscribe': 'Berlangganan',
  'All rights reserved.': 'Hak cipta dilindungi.'
};

const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.astro')) {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (const [eng, indo] of Object.entries(translations)) {
      content = replaceText(content, eng, indo);
    }
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Translations applied accurately!');
