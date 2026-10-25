import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Search, 
  CheckCircle, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  ExternalLink,
  PhoneCall,
  Shield,
  HelpCircle,
  Waves
} from 'lucide-react';
import { Button, Badge, TextField, TextArea, Alert, Card } from '@idds/react';
import { Language, ComplaintTicket } from '../types';
import { translations } from '../data/translations';
import { sampleComplaints } from '../data/portalData';
import { generateComplaintTrackingCode, validateCitizenNIK } from '../utils/portalLogic';

interface SitusWebPortalProps {
  onBackToMap: () => void;
  lang: Language;
}

export const SitusWebPortal: React.FC<SitusWebPortalProps> = ({ onBackToMap, lang }) => {
  const isEn = lang === 'en';
  const t = translations[lang];

  // Complaint form state
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(sampleComplaints);
  const [authorName, setAuthorName] = useState('');
  const [authorNIK, setAuthorNIK] = useState('');
  const [kecamatan, setKecamatan] = useState('Kec. Lamongan Kota');
  const [category, setCategory] = useState('Infrastruktur JAMULA');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  // Tracking state
  const [searchCode, setSearchCode] = useState('');
  const [searchedTicket, setSearchedTicket] = useState<ComplaintTicket | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = complaints.find(
      (c) => c.trackingCode.toLowerCase() === searchCode.trim().toLowerCase()
    );
    if (found) {
      setSearchedTicket(found);
      setSearchNotFound(false);
    } else {
      setSearchedTicket(null);
      setSearchNotFound(true);
    }
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!authorName.trim() || !title.trim() || !description.trim()) {
      setFormError(isEn ? 'Please fill in all required fields.' : 'Semua kolom wajib diisi.');
      return;
    }

    if (authorNIK) {
      const nikCheck = validateCitizenNIK(authorNIK);
      if (!nikCheck.isValid) {
        setFormError(nikCheck.message);
        return;
      }
    }

    const newCode = generateComplaintTrackingCode();
    const newTicket: ComplaintTicket = {
      id: `cmp-${Date.now()}`,
      trackingCode: newCode,
      authorName: authorName.trim(),
      kecamatan,
      category,
      title: title.trim(),
      description: description.trim(),
      status: 'Diterima',
      createdAt: 'Baru saja',
      updatedAt: 'Baru saja',
      adminResponse: isEn
        ? 'Your grievance has been logged into Lapor Pak YES! and routed to the relevant Lamongan department.'
        : 'Aduan telah dicatat pada sistem Lapor Pak YES! dan diteruskan ke Dinas terkait untuk penanganan lapangan.'
    };

    setComplaints([newTicket, ...complaints]);
    setSuccessTicket(newCode);
    setAuthorName('');
    setAuthorNIK('');
    setTitle('');
    setDescription('');
  };

  const newsItems = [
    {
      id: 1,
      title: 'Bupati Pak Yes Tinjau Realisasi JAMULA Ruas Sukodadi-Sumberwudi Tuntas Lebih Cepat',
      titleEn: 'Regent Pak Yes Inspects JAMULA Concrete Road Progress Completed Ahead of Schedule',
      date: '24 Oktober 2026',
      category: 'JAMULA Mantap',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      summary: 'Pemerintah Kabupaten Lamongan terus mengebut pembangunan jalan rabat beton berstandar tinggi guna memperlancar arus komoditas pertanian dan perikanan tambak.'
    },
    {
      id: 2,
      title: 'Lamongan Pertahankan Predikat Lumbung Pangan Padi #1 Jawa Timur dengan Produksi 1,15 Juta Ton',
      titleEn: 'Lamongan Maintains #1 Rice Food Reservoir Status in East Java with 1.15 Million Tons',
      date: '23 Oktober 2026',
      category: 'Pertanian & Pangan',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      summary: 'Dukungan modernisasi irigasi Waduk Gondang dan pompa air Bengawan Solo memastikan panen padi melimpah sepanjang tahun di 27 kecamatan.'
    },
    {
      id: 3,
      title: 'Wisata Bahari Lamongan (WBL) & Makam Sunan Drajat Catat Rekor Wisatawan Libur Panjang',
      titleEn: 'Lamongan Marine Tourism (WBL) & Sunan Drajat Shrine Log Record Tourist Turnout',
      date: '22 Oktober 2026',
      category: 'Pariwisata Bahari',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      summary: 'Kombinasi wisata rekreasi pesisir Tanjung Kodok dan wisata religi sejarah Wali Songo mendongkrak perputaran ekonomi UMKM Lamongan.'
    }
  ];

  const lamonganDistricts = [
    'Kec. Lamongan Kota',
    'Kec. Babat',
    'Kec. Paciran',
    'Kec. Brondong',
    'Kec. Sekaran',
    'Kec. Maduran',
    'Kec. Laren',
    'Kec. Karanggeneng',
    'Kec. Kalitengah',
    'Kec. Turi',
    'Kec. Deket',
    'Kec. Glagah',
    'Kec. Karangbinangun',
    'Kec. Tikung',
    'Kec. Kembangbahu',
    'Kec. Sugio',
    'Kec. Kedungpring',
    'Kec. Modo',
    'Kec. Bluluk',
    'Kec. Sukorame',
    'Kec. Sambeng',
    'Kec. Ngimbang',
    'Kec. Mantup',
    'Kec. Sarirejo',
    'Kec. Pucuk',
    'Kec. Sukodadi',
    'Kec. Solokuro'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10 animate-fade-in">
      
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <Button
          hierarchy="secondary"
          size="sm"
          prefixIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBackToMap}
          className="cursor-pointer font-bold"
        >
          {t.backToMap}
        </Button>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Portal Pelayanan Publik
            </span>
            <Badge variant="info" type="soft" className="text-[10px] py-0 px-1.5 font-bold">
              INA DDS
            </Badge>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            Pemerintah Kabupaten Lamongan - Jawa Timur
          </span>
        </div>
      </div>

      {/* Hero Welcome Announcement */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lamongan Megilan - Kejayaan Lamongan yang Berkelanjutan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {isEn 
              ? 'Integrated Civic Services & Regional Information Portal' 
              : 'Pusat Informasi & Pelayanan Publik Pemerintah Kabupaten Lamongan'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {isEn
              ? 'Serving more than 1.35 million citizens across 27 districts with JAMULA connectivity, agricultural excellence, and responsive governance.'
              : 'Melayani lebih dari 1,35 juta warga di 27 kecamatan dengan konektivitas jalan JAMULA mantap, lumbung pangan padi dan ikan terdepan, serta birokrasi digital responsif.'}
          </p>
        </div>
      </div>

      {/* Lapor Pak YES! Section (Integrated Grievance Desk) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {t.sambatTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.sambatSubtitle}
            </p>
          </div>

          {/* Quick Track Bar with INA DDS Button */}
          <form onSubmit={handleTrackSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Cari Tiket (LMG-...)"
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button
              hierarchy="primary"
              size="sm"
              type="submit"
              className="cursor-pointer shrink-0"
            >
              {t.trackComplaint}
            </Button>
          </form>
        </div>

        {/* Track Result Display with INA DDS Badge */}
        {searchedTicket && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Tiket: {searchedTicket.trackingCode}
              </span>
              <Badge variant="success" type="fill" className="text-xs font-bold">
                {searchedTicket.status}
              </Badge>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{searchedTicket.title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">{searchedTicket.description}</p>
            {searchedTicket.adminResponse && (
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 border border-emerald-100 dark:border-slate-700">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">Tanggapan Resmi Pemkab:</span>
                {searchedTicket.adminResponse}
              </div>
            )}
          </div>
        )}

        {searchNotFound && (
          <Alert
            variant="caution"
            title="Nomor Tiket Tidak Ditemukan"
            message="Mohon periksa kembali kode tiket Anda (format: LMG-XXXXXX)."
          />
        )}

        {/* Success Alert with INA DDS Alert */}
        {successTicket && (
          <Alert
            variant="success"
            title="Aduan Berhasil Tercatat di Lapor Pak YES!"
            message={`Nomor Tiket Anda: ${successTicket}. Simpan kode ini untuk memantau proses tindak lanjut.`}
            dismissible
            onDismiss={() => setSuccessTicket(null)}
          />
        )}

        {/* Complaint Form with INA DDS Inputs */}
        <form onSubmit={handleCreateComplaint} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-1">
            <TextField
              label="Nama Lengkap Warga *"
              value={authorName}
              onChange={(val) => setAuthorName(val)}
              placeholder="Contoh: Mochamad Ilham"
              status={formError && !authorName ? 'error' : 'neutral'}
            />
          </div>

          <div className="sm:col-span-1">
            <TextField
              label="Nomor Induk Kependudukan (NIK 16 Digit)"
              value={authorNIK}
              onChange={(val) => setAuthorNIK(val)}
              placeholder="Contoh: 352401..."
              maxLength={16}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Kecamatan Lokasi Aduan
            </label>
            <select
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {lamonganDistricts.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Kategori Aspirasi / Aduan
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Infrastruktur JAMULA">Infrastruktur Jalan (JAMULA Mantap)</option>
              <option value="Pelayanan Publik MPP">Pelayanan Publik & Mal Pelayanan Publik</option>
              <option value="Kesehatan Mobil Sehat">Kesehatan & Mobil Sehat Desa</option>
              <option value="Pendidikan PERINTIS">Pendidikan & Beasiswa PERINTIS</option>
              <option value="Perikanan Pertanian">Lumbung Pangan & Perikanan Tambak</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <TextField
              label="Judul Aduan *"
              value={title}
              onChange={(val) => setTitle(val)}
              placeholder="Contoh: Perbaikan saluran irigasi tambak di Kec. Glagah"
              status={formError && !title ? 'error' : 'neutral'}
            />
          </div>

          <div className="sm:col-span-2">
            <TextArea
              label="Uraian Aduan & Lokasi Spesifik *"
              value={description}
              onChange={(val) => setDescription(val)}
              placeholder="Jelaskan detail kronologi, ruas jalan/dusun, dan harapan tindak lanjut..."
              minRows={3}
              status={formError && !description ? 'error' : 'neutral'}
            />
          </div>

          {formError && (
            <div className="sm:col-span-2 text-xs text-red-500 font-semibold">
              {formError}
            </div>
          )}

          <div className="sm:col-span-2 flex justify-end">
            <Button
              hierarchy="primary"
              size="md"
              type="submit"
              prefixIcon={<Send className="w-4 h-4" />}
              className="cursor-pointer font-bold"
            >
              {t.submitComplaint}
            </Button>
          </div>
        </form>
      </section>

      {/* Latest News & Announcements */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isEn ? 'Latest Lamongan News & Developments' : 'Kabar Terkini Lamongan Megilan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEn ? 'Official press releases from Lamongan Regency Government' : 'Informasi program pembangunan dan siaran pers resmi Pemkab Lamongan'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {newsItems.map((news) => (
            <article
              key={news.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/60 text-white backdrop-blur-xs">
                  {news.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                    {news.date}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">
                    {isEn ? news.titleEn : news.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                    {news.summary}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <span>{isEn ? 'Read More' : 'Baca Selengkapnya'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Emergency Center Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 to-rose-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl">
            <PhoneCall className="w-8 h-8 text-white animate-bounce" />
          </div>
          <div>
            <h4 className="text-lg font-black">{t.emergencyContact}</h4>
            <p className="text-xs text-red-100">
              Layanan darurat terpadu 24 Jam bebas pulsa: Ambulans Mobil Sehat Desa, Pemadam Kebakaran (Damkar), BPBD Tanggap Banjir Bengawan Solo, & Polisi.
            </p>
          </div>
        </div>
        <a
          href="tel:112"
          className="px-6 py-2.5 rounded-xl bg-white text-red-600 font-extrabold text-sm shadow-md hover:bg-red-50 transition-colors shrink-0"
        >
          Hubungi 112 (Bebas Pulsa)
        </a>
      </div>

    </div>
  );
};
