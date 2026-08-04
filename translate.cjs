const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Documents/ship company/src/components/id';

const translations = {
  // Stats
  'Logistics by the Numbers': 'Logistik dalam Angka',
  'A global footprint built on decades of reliability and operational excellence.': 'Jejak global yang dibangun di atas keandalan dan keunggulan operasional selama puluhan tahun.',
  'Countries Served': 'Negara Terjangkau',
  'Shipments Annually': 'Pengiriman Tahunan',
  'Vessels & Vehicles': 'Kapal & Kendaraan',
  'Happy Clients': 'Klien Puas',

  // Process
  'Our Workflow': 'Alur Kerja Kami',
  'How we deliver success': 'Bagaimana kami memberikan kesuksesan',
  'Booking & Planning': 'Pemesanan & Perencanaan',
  'Get an instant quote and book your cargo space with optimized routing.': 'Dapatkan penawaran instan dan pesan ruang kargo Anda dengan rute optimal.',
  'Cargo Collection': 'Pengumpulan Kargo',
  'We pick up your freight and ensure secure packaging and compliance.': 'Kami mengambil kargo Anda dan memastikan pengemasan yang aman dan sesuai.',
  'Global Transit': 'Transit Global',
  'Real-time tracking as your cargo moves across oceans and continents.': 'Pelacakan waktu nyata saat kargo Anda melintasi laut dan benua.',
  'Final Delivery': 'Pengiriman Akhir',
  'Customs cleared and delivered straight to the destination facility.': 'Selesai proses bea cukai dan dikirim langsung ke fasilitas tujuan.',

  // Fleet
  'Our Global Fleet': 'Armada Global Kami',
  'State-of-the-art vessels and vehicles equipped for any cargo requirement.': 'Kapal dan kendaraan mutakhir yang dilengkapi untuk kebutuhan kargo apa pun.',
  'Explore Our Full Fleet': 'Jelajahi Seluruh Armada Kami',
  'Capacity': 'Kapasitas',
  'Speed': 'Kecepatan',
  'Emissions': 'Emisi',

  // Network
  'Our Global Network': 'Jaringan Global Kami',
  'Connecting major ports and commercial hubs across 6 continents.': 'Menghubungkan pelabuhan utama dan pusat komersial di 6 benua.',
  'Major Hubs': 'Pusat Utama',
  'Active Routes': 'Rute Aktif',
  'Port Partners': 'Mitra Pelabuhan',
  
  // Why Choose Us
  'The Seafarer Advantage': 'Keunggulan Seafarer',
  'Why industry leaders trust us': 'Mengapa pemimpin industri mempercayai kami',
  'Global Coverage': 'Cakupan Global',
  'Access to every major port and airport worldwide with localized expertise.': 'Akses ke setiap pelabuhan dan bandara utama di seluruh dunia dengan keahlian lokal.',
  'Advanced Security': 'Keamanan Tingkat Lanjut',
  '24/7 monitoring and enterprise-grade security protocols for all cargo.': 'Pemantauan 24/7 dan protokol keamanan tingkat perusahaan untuk semua kargo.',
  'Real-Time Analytics': 'Analitik Waktu Nyata',
  'Actionable insights and precise ETA tracking powered by our AI systems.': 'Wawasan yang dapat ditindaklanjuti dan pelacakan ETA yang akurat didukung oleh sistem AI kami.',

  // Sustainability
  'Green Logistics': 'Logistik Ramah Lingkungan',
  'Pioneering sustainable shipping': 'Merintis pengiriman berkelanjutan',
  'We are committed to achieving zero-emission logistics by 2040 through alternative fuels, route optimization, and modern fleet upgrades.': 'Kami berkomitmen untuk mencapai logistik nol-emisi pada tahun 2040 melalui bahan bakar alternatif, optimalisasi rute, dan peningkatan armada modern.',
  'CO2 Reduction': 'Pengurangan CO2',
  'Since 2020 through fleet modernization': 'Sejak 2020 melalui modernisasi armada',
  'Recyclable Materials': 'Bahan Dapat Didaur Ulang',
  'Used in our packaging and container lining': 'Digunakan dalam kemasan dan pelapis kontainer kami',
  'Read Our ESG Report': 'Baca Laporan ESG Kami',

  // Testimonials
  'Client Success Stories': 'Kisah Sukses Klien',
  'Trusted by industry leaders': 'Dipercaya oleh pemimpin industri',

  // News
  'Latest Insights': 'Wawasan Terbaru',
  'Company news and industry updates': 'Berita perusahaan dan pembaruan industri',
  'Global shipping rates expected to stabilize in Q4': 'Tarif pengiriman global diperkirakan stabil pada Kuartal 4',
  'Seafarer adds 5 new eco-friendly vessels to Pacific fleet': 'Seafarer menambahkan 5 kapal ramah lingkungan baru ke armada Pasifik',
  'Navigating new customs regulations in European ports': 'Menavigasi peraturan pabean baru di pelabuhan Eropa',
  'Read Article': 'Baca Artikel',
  'View All News': 'Lihat Semua Berita',

  // Quote Calculator
  'Instant Quote Calculator': 'Kalkulator Penawaran Instan',
  'Get an estimated cost for your shipment in seconds': 'Dapatkan perkiraan biaya untuk kiriman Anda dalam hitungan detik',
  
  // FAQ
  'Frequently Asked Questions': 'Pertanyaan yang Sering Diajukan',
  'Everything you need to know about our services.': 'Segala yang perlu Anda ketahui tentang layanan kami.',

  // Contact
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

  // Footer
  'SEAFARER LOGISTICS': 'LOGISTIK SEAFARER',
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
  'Stay updated with the latest logistics news and insights.': 'Tetap update dengan berita dan wawasan logistik terbaru.',
  'Enter your email': 'Masukkan email Anda',
  'Subscribe': 'Berlangganan',
  'All rights reserved.': 'Hak cipta dilindungi undang-undang.'
};

const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.astro')) {
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (const [eng, indo] of Object.entries(translations)) {
      // Use regex with global flag to replace all occurrences
      const regex = new RegExp(eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, indo);
    }
    
    fs.writeFileSync(filePath, content);
  }
});

console.log('Translations applied successfully!');
