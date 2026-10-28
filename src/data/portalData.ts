import { Landmark, LeaderInfo, NavModule, CCTVCamera, PublicServiceItem, ComplaintTicket, AnalyticsStats } from '../types';

export const leadersData: Record<'bupati' | 'wakil_bupati', LeaderInfo> = {
  bupati: {
    id: 'bupati',
    role: 'BUPATI LAMONGAN',
    roleEn: 'REGENT OF LAMONGAN',
    name: 'Dr. H. YUHRONUR EFENDI, MBA',
    fullTitle: 'Dr. H. Yuhronur Efendi, M.B.A. (Pak Yes)',
    image: '/assets/yes1.webp',
    quote: 'Mewujudkan Kejayaan Lamongan yang Berkelanjutan: Masyarakat yang berdaya saing tinggi, adil, sejahtera, dan bangga akan jati diri Lamongan Megilan.',
    quoteEn: 'Realizing the Sustainable Glory of Lamongan: Competitive, equitable, prosperous citizens proud of the Lamongan Megilan identity.',
    bio: 'Birokrat senior dan visioner kelahiran Karangbinangun, Lamongan. Meniti karir panjang sebagai Sekretaris Daerah (Sekda) Kabupaten Lamongan sebelum terpilih memimpin daerah. Dikenal lewat terobosan Program JAMULA (Jalan Mantap Lamongan), penguatan lumbung pangan padi dan ikan nasional, serta digitalisasi birokrasi yang melayani dengan hati.',
    bioEn: 'Senior statesman and visionary born in Karangbinangun, Lamongan. Served for decades as Regional Secretary (Sekda) of Lamongan before being elected Regent. Renowned for the flagship JAMULA infrastructure program, boosting agricultural and marine food sovereignty, and citizen-first digital governance.',
    focusAreas: [
      'JAMULA (Jalan Mantap Lamongan) & Konektivitas Wilayah',
      'Lumbung Pangan: Produsen Padi & Ikan Nomor 1 di Jawa Timur',
      'PERINTIS (Pendidikan Gratis, Berkualitas, & Beasiswa Sarjana)',
      'Lamongan Sehat: Mobil Sehat di Seluruh 462 Desa se-Kabupaten',
      'Young Entrepreneur Success (YES) & UMKM Naik Kelas'
    ],
    focusAreasEn: [
      'JAMULA (Steady Road Infrastructure) & Regional Connectivity',
      'National Food Reservoir: #1 Rice and Fishery Producer in East Java',
      'PERINTIS (Free, High-Quality Education & Higher Ed Scholarships)',
      'Healthy Lamongan: Dedicated Health Ambulances in all 462 Villages',
      'Young Entrepreneur Success (YES) & SME Acceleration'
    ],
    education: [
      'S1 Ilmu Ekonomi Manajemen - Universitas Gadjah Mada',
      'S2 Magister Business Administration (MBA)',
      'S3 Doktor Ilmu Ekonomi Pembangunan - Universitas Brawijaya'
    ]
  },
  wakil_bupati: {
    id: 'wakil_bupati',
    role: 'WAKIL BUPATI LAMONGAN',
    roleEn: 'VICE REGENT OF LAMONGAN',
    name: 'DIRHAM AKSARA',
    fullTitle: 'Dirham Aksara, S.T., M.Sc.',
    image: '/assets/dirham1.jpg',
    quote: 'Kolaborasi generasi muda yang adaptif dengan kearifan lokal adalah pendorong utama transformasi Lamongan masa depan.',
    quoteEn: 'Adaptive youth collaboration paired with time-honored local wisdom is the prime catalyst of Lamongan future transformation.',
    bio: 'Tokoh muda energik dengan latar belakang pendidikan teknik dan manajemen sains internasional. Berkomitmen mengakselerasi hilirisasi perikanan Pantura, ekosistem ekonomi kreatif pemuda, serta pengembangan destinasi pariwisata bahari kelas dunia di pesisir utara Lamongan.',
    bioEn: 'Dynamic young leader with global background in engineering and science management. Dedicated to accelerating northern coastal fishery industrialization, youth creative digital ecosystems, and world-class marine tourism.',
    focusAreas: [
      'Digitalisasi Desa Pintar & Koneksi Internet Warga',
      'Hilirisasi Industri Perikanan Tangkap & Budidaya Tambak',
      'Pemberdayaan Pemuda & Pusat Inovasi Startup Daerah',
      'Pengembangan Wisata Bahari & Pelestarian Cagar Budaya'
    ],
    focusAreasEn: [
      'Smart Village Digitalization & Community Internet Access',
      'Downstreaming of Marine Catch & Aquaculture Production',
      'Youth Empowerment & Regional Startup Innovation Centers',
      'Marine Tourism Expansion & Historical Heritage Conservation'
    ],
    education: [
      'S1 Teknik Lingkungan & Sipil - Institut Teknologi Sepuluh Nopember (ITS)',
      'S2 Master of Science (M.Sc) in Urban Infrastructure Planning'
    ]
  }
};

export const landmarksData: Landmark[] = [
  {
    id: 'wbl-paciran',
    name: 'Wisata Bahari Lamongan (WBL)',
    nameEn: 'Wisata Bahari Lamongan (WBL Marine Park)',
    category: 'nature',
    description: 'Destinasi taman rekreasi bahari terpadu terbesar di Jawa Timur yang memadukan keindahan pantai Tanjung Kodok dengan wahana modern seperti Drop Zone, Paus Dangdut, dan Rumah Kucing.',
    descriptionEn: 'The largest integrated marine amusement park in East Java combining scenic coastal cliffs of Tanjung Kodok with thrilling modern rollercoasters, water recreation, and attractions.',
    location: 'Jl. Raya Paciran, Kec. Paciran',
    x: 49,
    y: 18,
    iconType: 'water',
    highlight: 'Ikon Wisata Bahari & Pesisir Pantura',
    highlightEn: 'Premier Marine Coastal Destination',
    historicalFact: 'Tanjung Kodok telah tercatat sejak zaman kolonial Belanda sebagai lokasi pengamatan hilal dan gerhana matahari total internasional pada tahun 1983.',
    historicalFactEn: 'Tanjung Kodok has been historically noted since Dutch colonial eras and hosted international astronomers for the 1983 total solar eclipse observation.'
  },
  {
    id: 'sunan-drajat',
    name: 'Makam Sunan Drajat & Museum',
    nameEn: 'Sunan Drajat Shrine & Museum',
    category: 'heritage',
    description: 'Situs cagar budaya dan makam Raden Qasim (Sunan Drajat), salah satu Wali Songo penyebar Islam di tanah Jawa yang masyhur dengan ajaran sosial Catur Piwulang.',
    descriptionEn: 'Sacred historical shrine and museum of Raden Qasim (Sunan Drajat), one of the revered nine Wali Songo saints in Java, celebrated for compassionate social teachings.',
    location: 'Desa Drajat, Kec. Paciran',
    x: 57.5,
    y: 20,
    iconType: 'culture',
    highlight: 'Warisan Wali Songo & Catur Piwulang',
    highlightEn: 'Venerated Wali Songo Sacred Heritage',
    historicalFact: 'Dikenal dengan filosofi: Wenehana teken marang wong kang wuta, wenehana pangan marang wong kang luwe (Berilah tongkat pada orang buta, berilah makan orang lapar).',
    historicalFactEn: 'Famed for his humanitarian motto: "Give walking sticks to the blind, food to the hungry, clothes to the naked, and shelter to the drenched."'
  },
  {
    id: 'maharani-zoo',
    name: 'Goa Maharani & Zoo',
    nameEn: 'Maharani Cave & Exotic Zoo',
    category: 'nature',
    description: 'Gua kapur alam dengan stalaktit dan stalagmit kristal eksotis yang masih bertumbuh, dipadukan dengan kebun binatang modern dan museum satwa purba.',
    descriptionEn: 'A natural limestone cavern with glowing crystal stalactites and stalagmites combined with an exotic wildlife conservation zoo and paleontology museum.',
    location: 'Kec. Paciran (Depan WBL)',
    x: 48.5,
    y: 23.5,
    iconType: 'park',
    highlight: 'Gua Kristal Eksotis & Konservasi Satwa',
    highlightEn: 'Exotic Crystal Cavern & Wildlife Reserve',
    historicalFact: 'Ditemukan secara tidak sengaja oleh para penambang batu kapur pada tahun 1992 dan menjadi salah satu gua terindah di Indonesia.',
    historicalFactEn: 'Accidentally discovered by local limestone miners in 1992 and acknowledged as one of the most mesmerizing crystal caves in Indonesia.'
  },
  {
    id: 'pelabuhan-brondong',
    name: 'PPN Brondong & Monumen Van der Wijck',
    nameEn: 'Brondong Fishery Port & Van der Wijck Monument',
    category: 'infrastructure',
    description: 'Pelabuhan Perikanan Nusantara terbesar di pesisir utara Jawa Timur tempat pendaratan ribuan ton ikan laut segar, serta monumen bersejarah tenggelamnya kapal Van der Wijck tahun 1936.',
    descriptionEn: 'The largest national marine fishing harbor on the northern coast of East Java, and the historic memorial obelisk marking the 1936 shipwreck of the Van der Wijck.',
    location: 'Sedayulawas, Kec. Brondong',
    x: 35,
    y: 17,
    iconType: 'oil',
    highlight: 'Pusat Perikanan Tangkap & Monumen Sejarah',
    highlightEn: 'Largest Marine Fishery Harbor & Historic Obelisk',
    historicalFact: 'Monumen dibangun pemerintah Hindia Belanda sebagai ucapan terima kasih atas kepahlawanan nelayan Brondong yang menyelamatkan para korban kapal karam.',
    historicalFactEn: 'Built by the Dutch East Indies government to honor the immense bravery of local Brondong fishermen who rescued survivors from the sinking steamship.'
  },
  {
    id: 'sunan-sendang',
    name: 'Makam Sunan Sendang Duwur',
    nameEn: 'Sunan Sendang Duwur Heritage Mosque',
    category: 'heritage',
    description: 'Kompleks masjid kuno abad ke-16 berarsitektur perpaduan Hindu-Islam dengan gapura bersayap paduraksa unik peninggalan Raden Noer Rahmad.',
    descriptionEn: 'A 16th-century sacred complex featuring majestic winged Paduraksa stone gates reflecting harmonious syncretism between Hindu and Islamic art.',
    location: 'Desa Sendang Duwur, Kec. Paciran',
    x: 60.5,
    y: 25.5,
    iconType: 'culture',
    highlight: 'Gapura Paduraksa Bersayap Abad XVI',
    highlightEn: '16th Century Majestic Winged Stone Gates',
    historicalFact: 'Masjid ini diyakini dipindahkan secara gaib dalam satu malam dari Mantingan Jepara oleh Sunan Sendang Duwur pada tahun 1561 M.',
    historicalFactEn: 'Tradition narrates the historic wooden mosque was relocated in a single night from Mantingan in 1561 CE through saintly spiritual devotion.'
  },
  {
    id: 'alun-alun-bianglala',
    name: 'Alun-Alun & Bianglala Lamongan',
    nameEn: 'Lamongan Town Square & Ferris Wheel',
    category: 'civic',
    description: 'Ruang publik hijau ikonik di jantung kota dengan wahana Bianglala (Ferris Wheel) raksasa yang menyala indah saat malam, taman bermain, dan sentra UMKM.',
    descriptionEn: 'The vibrant town square at the city center featuring the illuminated giant Ferris Wheel, botanical promenades, and bustling local culinary night markets.',
    location: 'Pusat Kota Lamongan',
    x: 69,
    y: 51.5,
    iconType: 'park',
    highlight: 'Bianglala Raksasa & Pusat Rekreasi Warga',
    highlightEn: 'Giant Illuminated Ferris Wheel & Civic Park',
    historicalFact: 'Satu-satunya alun-alun kabupaten di Jawa Timur yang memiliki wahana bianglala permanen gratis bagi rekreasi seluruh keluarga.',
    historicalFactEn: 'Unique among regional squares in East Java for hosting a permanent civic Ferris wheel providing panoramic town skyline views.'
  },
  {
    id: 'masjid-agung-lamongan',
    name: 'Masjid Agung Lamongan',
    nameEn: 'Great Mosque of Lamongan',
    category: 'civic',
    description: 'Masjid kebanggaan masyarakat Lamongan berarsitektur megah dengan kubah hijau dan menara kembar menjulang tinggi di sisi barat Alun-Alun.',
    descriptionEn: 'The architectural centerpiece of civic devotion in Lamongan with majestic emerald domes, twin minarets, and serene spacious prayer halls.',
    location: 'Jl. Kiai H. Hasyim Asyari No. 16',
    x: 65.5,
    y: 50.5,
    iconType: 'building',
    highlight: 'Menara Kembar Megah di Sisi Alun-Alun',
    highlightEn: 'Majestic Twin Minarets & Spiritual Center',
    historicalFact: 'Menyimpan dua buah gentong batu kuno peninggalan Sunan Giri dan Kerajaan Majapahit yang menjadi cagar budaya bernilai sejarah tinggi.',
    historicalFactEn: 'Houses ancient stone water vessels gifted by Sunan Giri dating back to the late Majapahit period.'
  },
  {
    id: 'pemkab-lamongan',
    name: 'Gedung Pemkab Lamongan',
    nameEn: 'Lamongan Regency Civic Headquarters',
    category: 'civic',
    description: 'Pusat komando dan administrasi pemerintahan Kabupaten Lamongan yang modern, ramah publik, dan dilengkapi Command Center Terpadu.',
    descriptionEn: 'The modern administrative headquarters of Lamongan Regency housing the executive leadership offices and centralized Integrated Command Center.',
    location: 'Jl. KH. Ahmad Dahlan No. 1, Lamongan',
    x: 69.5,
    y: 47,
    iconType: 'building',
    highlight: 'Pusat Tata Kelola & Digital Command Center',
    highlightEn: 'Integrated Command Center & Civic Bureaucracy',
    historicalFact: 'Menjadi episentrum perumusan program-program unggulan seperti JAMULA dan reformasi birokrasi berpredikat WTP.',
    historicalFactEn: 'The administrative engine behind historic infrastructure drives including JAMULA and transparent public financial governance.'
  },
  {
    id: 'stadion-surajaya',
    name: 'Stadion Surajaya Lamongan',
    nameEn: 'Surajaya Stadium (Home of Persela)',
    category: 'infrastructure',
    description: 'Stadion kebanggaan warga Lamongan bertaraf internasional standar FIFA, markas kebanggaan klub sepak bola Persela Lamongan (Laskar Joko Tingkir).',
    descriptionEn: 'Modern FIFA-standard football arena and civic athletic complex, home stadium of Persela Lamongan ("Laskar Joko Tingkir") and Curva Boys supporters.',
    location: 'Jl. Panglima Sudirman, Kec. Deket',
    x: 76.5,
    y: 52.5,
    iconType: 'trophy',
    highlight: 'Kandang Laskar Joko Tingkir Persela',
    highlightEn: 'Home Arena of Persela Football Club',
    historicalFact: 'Dinamai Surajaya untuk mengenang adipati pertama Lamongan, Tumenggung Surajaya (Rangganata) yang dilantik pada 26 Mei 1569.',
    historicalFactEn: 'Named in honor of Lamongan first historical regent Tumenggung Surajaya (Rangganata), consecrated on May 26, 1569.'
  },
  {
    id: 'soto-nasi-boran',
    name: 'Sentra Kuliner Soto Lamongan & Nasi Boran',
    nameEn: 'Soto Lamongan & Nasi Boran Culinary Heritage',
    category: 'culture',
    description: 'Ibu kota kuliner dengan sajian Soto Ayam Lamongan berkuah kuning gurih bertabur koya renyah serta Nasi Boran khas lauk ikan sili dan empuk.',
    descriptionEn: 'World-renowned culinary heritage showcasing aromatic Soto Ayam Lamongan with golden broth and savory koya, and authentic Nasi Boran served from woven bamboo baskets.',
    location: 'Pusat Kuliner Kota Lamongan',
    x: 67.5,
    y: 57,
    iconType: 'fruit',
    highlight: 'Warisan Kuliner Nusantara Mendunia',
    highlightEn: 'Internationally Celebrated Culinary Heritage',
    historicalFact: 'Soto Lamongan telah didaftarkan sebagai Warisan Budaya Takbenda Indonesia, sementara Nasi Boran hanya dapat dijumpai asli di Lamongan.',
    historicalFactEn: 'Certified as National Intangible Heritage, Soto Lamongan and indigenous Nasi Boran embody generations of culinary mastery.'
  },
  {
    id: 'jembatan-babat',
    name: 'Jembatan Cincin Babat & Bengawan Solo',
    nameEn: 'Babat River Bridge & Bengawan Solo',
    category: 'infrastructure',
    description: 'Jembatan strategis arteri nasional di atas Sungai Bengawan Solo yang menghubungkan Lamongan, Tuban, dan Bojonegoro, serta pusat oleh-oleh Wingko Babat.',
    descriptionEn: 'Crucial arterial transport bridge crossing the Bengawan Solo River connecting Lamongan, Tuban, and Bojonegoro, renowned for authentic Wingko Babat sweets.',
    location: 'Kecamatan Babat',
    x: 26.5,
    y: 50,
    iconType: 'bridge',
    highlight: 'Jalur Arteri Strategis & Kota Wingko Babat',
    highlightEn: 'Strategic Arterial Hub & Home of Wingko',
    historicalFact: 'Babat sejak abad ke-19 merupakan bandar sungai dan simpul transportasi utama di tepi Sungai Bengawan Solo.',
    historicalFactEn: 'Babat has served as a bustling river port and premier inland trade crossroads on the Bengawan Solo since the 19th century.'
  },
  {
    id: 'waduk-gondang',
    name: 'Waduk Gondang Sugio',
    nameEn: 'Gondang Reservoir & Recreational Park',
    category: 'nature',
    description: 'Danau buatan seluas 6,6 hektare yang dikelilingi hutan jati asri di perbukitan selatan, berfungsi mengairi persawahan ribuan hektare dan wisata perahu.',
    descriptionEn: 'A sprawling 6.6-hectare scenic reservoir surrounded by teak forests in southern Lamongan, irrigating vast paddy fields and offering eco-boat tourism.',
    location: 'Desa Gondang Lor, Kec. Sugio',
    x: 47.5,
    y: 68.5,
    iconType: 'dam',
    highlight: 'Irigasi Lumbung Pangan & Danau Asri',
    highlightEn: 'Vast Irrigation Reservoir & Nature Lake',
    historicalFact: 'Diresmikan oleh Presiden Soeharto pada tahun 1987 dan menjadi tumpuan ketahanan air pertanian di Lamongan tengah dan selatan.',
    historicalFactEn: 'Inaugurated in 1987 to guarantee perennial water security for agricultural food sovereignty across southern Lamongan.'
  },
  {
    id: 'candi-patakan',
    name: 'Situs Candi Patakan (Abad XI)',
    nameEn: 'Ancient Patakan Temple Site (11th Century)',
    category: 'heritage',
    description: 'Candi batu bata kuno peninggalan era Raja Airlangga dari Kerajaan Kahuripan abad ke-11 yang memiliki stupa Buddha dan prasasti bersejarah.',
    descriptionEn: 'An 11th-century royal brick sanctuary from the reign of King Airlangga (Kahuripan Kingdom), housing Buddhist stupa remains and royal stone inscriptions.',
    location: 'Desa Patakan, Kec. Sambeng',
    x: 53,
    y: 80,
    iconType: 'culture',
    highlight: 'Peninggalan Megah Era Raja Airlangga',
    highlightEn: '11th Century Sanctuary of King Airlangga',
    historicalFact: 'Disebutkan dalam Prasasti Terep tahun 1032 M sebagai asrama suci karesian yang dilindungi langsung oleh Raja Airlangga.',
    historicalFactEn: 'Referenced in the Terep Stone Inscription of 1032 CE as an esteemed sacred monastery shielded by royal charter.'
  },
  {
    id: 'pohon-trinil',
    name: 'Pohon Trinil (Akar Langit)',
    nameEn: 'Trinil "Sky Roots" Mystical Tree',
    category: 'nature',
    description: 'Pohon unik dengan lilitan akar raksasa membentuk formasi artistik mirip pohon purba dalam film fantasi di kawasan hutan Brondong.',
    descriptionEn: 'A striking natural tree featuring immense entwined root formations resembling a fantastical mythical tree inside the protected forest of Brondong.',
    location: 'Desa Sendangharjo, Kec. Brondong',
    x: 32,
    y: 28.5,
    iconType: 'park',
    highlight: 'Formasi Akar Raksasa Alami Mirip Fantasi',
    highlightEn: 'Spectacular Fantasy-Like Giant Root Formations',
    historicalFact: 'Menjadi daya tarik fotografi alam unik yang memikat wisatawan dari berbagai provinsi di Indonesia.',
    historicalFactEn: 'A viral botanical wonder and eco-photography landmark celebrated for its majestic natural architecture.'
  }
];

export const navModulesData: NavModule[] = [
  {
    id: 'pemerintahan',
    name: 'PEMERINTAHAN',
    nameEn: 'GOVERNANCE',
    description: 'Struktur Organisasi Perangkat Daerah (OPD), Bupati & Wabup, 27 Kecamatan & 474 Desa/Kelurahan',
    descriptionEn: 'Regional Apparatus Organization (OPD), Executive Leadership, 27 Districts & 474 Villages',
    iconName: 'Layers'
  },
  {
    id: 'webgis',
    name: 'WEB GIS',
    nameEn: 'WEB GIS',
    description: 'Peta Spasial Geografis, Zonasi RTRW, Pesisir Pantura, Jaringan Jalan JAMULA & Irigasi',
    descriptionEn: 'Spatial GIS, Zoning Plans, Northern Coastline, JAMULA Roads & Irrigation Channels',
    iconName: 'MapPin'
  },
  {
    id: 'satudata',
    name: 'SATU DATA LAMONGAN',
    nameEn: 'ONE DATA LAMONGAN',
    description: 'Portal Data Terbuka: Lumbung Padi 1,1 Juta Ton, Perikanan Tambak & Laut, Ekonomi & Demografi',
    descriptionEn: 'Open Data: 1.1M Ton Rice Output, Marine & Aquaculture Fisheries, Demographics & Economy',
    iconName: 'BarChart2'
  },
  {
    id: 'smartcity',
    name: 'SMART CITY',
    nameEn: 'SMART CITY',
    description: 'Implementasi 6 Pilar Lamongan Megilan Menuju Kabupaten Digital yang Cerdas & Inklusif',
    descriptionEn: '6 Smart City Pillars: Smart Governance, Smart Economy, Smart Living, Smart Branding & Society',
    iconName: 'Globe'
  },
  {
    id: 'pelayanan',
    name: 'PELAYANAN PUBLIK',
    nameEn: 'PUBLIC SERVICES',
    description: 'Mal Pelayanan Publik (MPP), Program JAMULA, Lamongan Sehat, & Kanal Lapor Pak YES!',
    descriptionEn: 'Public Service Mall (MPP), JAMULA Roads, Healthy Lamongan, & Lapor Pak YES! Hotline',
    iconName: 'Users'
  },
  {
    id: 'cctv',
    name: 'CCTV',
    nameEn: 'LIVE CCTV',
    description: 'Pantauan Kamera Lalu Lintas & Titik Publik Real-Time 24 Jam di Seluruh Kabupaten Lamongan',
    descriptionEn: '24/7 Real-Time Traffic & Public Landmark Streaming Feeds across Lamongan Regency',
    iconName: 'Video'
  },
  {
    id: 'transparansi',
    name: 'TRANSPARANSI',
    nameEn: 'TRANSPARENCY',
    description: 'Keterbukaan APBD 2026 Rp 3,65 Triliun, Alokasi JAMULA, LPSE Pengadaan & Opini BPK WTP',
    descriptionEn: 'Budget Transparency: 2026 APBD Rp 3.65 Trillion, JAMULA Infrastructure & Unqualified Audit',
    iconName: 'BarChart'
  }
];

export const cctvCamerasData: CCTVCamera[] = [
  {
    id: 'cctv-1',
    name: 'Simpang Tiga Adipura & Tugu Bandeng Lele',
    location: 'Pintu Masuk Kota Lamongan',
    kecamatan: 'Lamongan Kota',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Ramai Lancar',
    viewers: 284
  },
  {
    id: 'cctv-2',
    name: 'Alun-Alun Lamongan & Bianglala Raksasa',
    location: 'Jl. Lamongrejo, Pusat Kota',
    kecamatan: 'Lamongan Kota',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Lancar',
    viewers: 320
  },
  {
    id: 'cctv-3',
    name: 'Pintu Gerbang Wisata Bahari Lamongan (WBL)',
    location: 'Jl. Raya Deandels, Paciran',
    kecamatan: 'Paciran',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Ramai Lancar',
    viewers: 410
  },
  {
    id: 'cctv-4',
    name: 'Simpang Lima Babat (Pusat Kuliner Wingko)',
    location: 'Persimpangan Arteri Babat',
    kecamatan: 'Babat',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Padat',
    viewers: 195
  },
  {
    id: 'cctv-5',
    name: 'Pelabuhan Perikanan Nusantara (PPN) Brondong',
    location: 'Dermaga Pendaratan Ikan Sedayulawas',
    kecamatan: 'Brondong',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Lancar',
    viewers: 148
  },
  {
    id: 'cctv-6',
    name: 'Jembatan Babat - Widang (Bengawan Solo)',
    location: 'Perbatasan Lamongan - Tuban',
    kecamatan: 'Babat',
    status: 'ONLINE',
    streamUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    trafficStatus: 'Ramai Lancar',
    viewers: 167
  }
];

export const publicServicesData: PublicServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Mal Pelayanan Publik (MPP) Lamongan Terpadu',
    nameEn: 'Integrated Public Service Mall (MPP) Lamongan',
    category: 'Perizinan',
    opd: 'Dinas Penanaman Modal & PTSP (DPMPTSP Lamongan)',
    description: 'Integrasi 225 jenis layanan perizinan, imigrasi paspor, SIM, dan kependudukan dalam satu atap yang nyaman dan transparan.',
    descriptionEn: 'Single-roof integration of over 225 licensing services, passport processing, driver licensing, and civil registrations.',
    processingTime: '1 Hari Kerja',
    cost: 'Gratis (Rp 0)',
    onlineAvailable: true
  },
  {
    id: 'srv-2',
    name: 'Program JAMULA (Jalan Mantap Lamongan)',
    nameEn: 'JAMULA (Steady Road Infrastructure Program)',
    category: 'Infrastruktur' as any,
    opd: 'Dinas PU Bina Marga Kabupaten Lamongan',
    description: 'Pengaduan dan pemantauan perbaikan ruas jalan kabupaten dengan struktur rabat beton kokoh guna mendukung kelancaran distribusi logistik desa.',
    descriptionEn: 'Monitoring and grievance reporting for regional road concrete paving connecting rural production centers.',
    processingTime: 'Respon 24 Jam',
    cost: 'Didanai APBD',
    onlineAvailable: true
  },
  {
    id: 'srv-3',
    name: 'Lamongan Sehat (1 Desa 1 Mobil Sehat Terpadu)',
    nameEn: 'Healthy Lamongan (1 Village 1 Health Ambulance)',
    category: 'Kesehatan',
    opd: 'Dinas Kesehatan Kabupaten Lamongan',
    description: 'Layanan mobil ambulans siaga 24 jam gratis di tiap balai desa untuk antar jemput pasien darurat serta pengobatan gratis warga.',
    descriptionEn: '24/7 dedicated free village ambulance service stationed at every rural hall for rapid emergency patient transport.',
    processingTime: 'Siaga 24 Jam',
    cost: 'Gratis (Rp 0)',
    onlineAvailable: true
  },
  {
    id: 'srv-4',
    name: 'Beasiswa PERINTIS & Bantuan Pendidikan',
    nameEn: 'PERINTIS Education Scholarship Program',
    category: 'Pendidikan' as any,
    opd: 'Dinas Pendidikan Kabupaten Lamongan',
    description: 'Pemberian beasiswa penuh bagi pelajar berprestasi dan kurang mampu dari jenjang SD, SMP, SMA, hingga kuliah Sarjana (S1).',
    descriptionEn: 'Comprehensive educational scholarships covering elementary through bachelor degrees for accomplished and underprivileged students.',
    processingTime: 'Siklus Akademik',
    cost: 'Bantuan Biaya Penuh',
    onlineAvailable: true
  },
  {
    id: 'srv-5',
    name: 'e-SPPT PBB-P2 & Pajak Daerah Online Bapenda',
    nameEn: 'Digital Property Tax & Municipal Revenue Portal',
    category: 'Pajak',
    opd: 'Badan Pendapatan Daerah (Bapenda Lamongan)',
    description: 'Layanan cek SPPT Pajak Bumi & Bangunan, cetak digital mandiri, dan pembayaran instan via QRIS serta bank daerah.',
    descriptionEn: 'Check land property tax bills, self-download e-SPPT receipts, and pay instantly through QRIS or online banking.',
    processingTime: 'Instan Real-time',
    cost: 'Sesuai Ketetapan',
    onlineAvailable: true
  },
  {
    id: 'srv-6',
    name: 'Perekaman KTP-el & Identitas Kependudukan Digital (IKD)',
    nameEn: 'Digital Citizen Identity & e-KTP Issuance',
    category: 'Adminduk',
    opd: 'Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil)',
    description: 'Perekaman biometrik e-KTP, Kartu Identitas Anak (KIA), akta kelahiran, dan aktivasi aplikasi IKD dalam genggaman ponsel pintar.',
    descriptionEn: 'Biometric civil registration, child identity cards, birth records, and digital citizen ID activation.',
    processingTime: '15 Menit di MPP',
    cost: 'Gratis (Rp 0)',
    onlineAvailable: true
  }
];

export const sampleComplaints: ComplaintTicket[] = [
  {
    id: 'cmp-1',
    trackingCode: 'LMG-202610-1092',
    authorName: 'Ahmad Fauzi',
    kecamatan: 'Kec. Paciran',
    category: 'Infrastruktur Jalan',
    title: 'Pengaspalan dan pelebaran akses jalan menuju TPI Brondong',
    description: 'Arus truk pengangkut ikan laut sangat padat pada pagi hari, mohon pelebaran bahu jalan poros Sedayulawas menuju pelabuhan.',
    status: 'Selesai Ditindaklanjuti',
    createdAt: '2026-10-23 08:30',
    updatedAt: '2026-10-24 14:15',
    adminResponse: 'Tim Dinas PU Bina Marga telah memasukkan ruas ini ke dalam paket JAMULA tahap 2 dan perbaikan tambal darurat telah dituntaskan.'
  },
  {
    id: 'cmp-2',
    trackingCode: 'LMG-202610-3419',
    authorName: 'Nur Hasanah',
    kecamatan: 'Kec. Sugio',
    category: 'Kesehatan',
    title: 'Pemeriksaan berkala ibu hamil dengan Mobil Sehat Desa Gondang',
    description: 'Mengajukan jadwal kunjungan bidan dan operasional Mobil Sehat untuk posyandu lansia dan ibu hamil di dusun pedalaman.',
    status: 'Diproses OPD',
    createdAt: '2026-10-24 09:12',
    updatedAt: '2026-10-24 10:45',
    adminResponse: 'Puskesmas Sugio telah mengonfirmasi jadwal Mobil Sehat akan beroperasi setiap Selasa dan Kamis untuk posyandu keliling.'
  }
];

export const initialAnalytics: AnalyticsStats = {
  activeVisitors: 412,
  todayVisits: 34250,
  totalComplaints: 1890,
  cctvViewsToday: 12480,
  serviceClicksToday: 19820,
  deviceShare: {
    mobile: 71,
    desktop: 25,
    tablet: 4
  },
  topServices: [
    { name: 'CCTV Live Streaming Alun-Alun & WBL', count: 12480 },
    { name: 'Program JAMULA Pantauan Jalan Mantap', count: 8940 },
    { name: 'Lapor Pak YES! (Aduan Cepat Warga)', count: 6810 },
    { name: 'Layanan Adminduk IKD Disdukcapil', count: 5420 },
    { name: 'Transparansi APBD Lamongan 2026', count: 3890 },
    { name: 'Pajak PBB-P2 Online Bapenda', count: 3120 }
  ],
  liveActivities: [
    {
      id: 'act-1',
      text: 'Warga mengakses live stream CCTV Alun-Alun & Bianglala',
      textEn: 'Citizen watching live CCTV of Lamongan Town Square & Ferris Wheel',
      timeAgo: '4 detik lalu',
      icon: 'Video'
    },
    {
      id: 'act-2',
      text: 'Aduan Lapor Pak YES! diteruskan ke Dinas PU Bina Marga',
      textEn: 'Lapor Pak YES! ticket dispatched to Public Works Department',
      timeAgo: '16 detik lalu',
      icon: 'CheckCircle'
    },
    {
      id: 'act-3',
      text: 'Unduhan Ringkasan APBD Lamongan 2026 dari Kec. Babat',
      textEn: 'Lamongan 2026 APBD summary downloaded from Babat district',
      timeAgo: '35 detik lalu',
      icon: 'FileText'
    },
    {
      id: 'act-4',
      text: 'Permohonan Beasiswa PERINTIS diverifikasi Dinas Pendidikan',
      textEn: 'PERINTIS Scholarship application verified by Education Agency',
      timeAgo: '1 menit lalu',
      icon: 'UserCheck'
    }
  ]
};
