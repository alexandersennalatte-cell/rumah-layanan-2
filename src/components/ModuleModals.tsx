import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Layers, 
  MapPin, 
  BarChart2, 
  Globe, 
  Users, 
  Video, 
  BarChart, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Eye, 
  ShieldCheck, 
  Wifi, 
  Car,
  TrendingUp,
  FileText,
  Building,
  Radio
} from 'lucide-react';
import { Modal, Badge, Button } from '@idds/react';
import { NavModuleId, Language, CCTVCamera, PublicServiceItem } from '../types';
import { translations } from '../data/translations';
import { cctvCamerasData, publicServicesData } from '../data/portalData';
import { filterServices, formatIDRCurrency } from '../utils/portalLogic';

interface ModuleModalsProps {
  activeModule: NavModuleId | null;
  onClose: () => void;
  lang: Language;
  onOpenComplaintForm?: () => void;
}

export const ModuleModals: React.FC<ModuleModalsProps> = ({
  activeModule,
  onClose,
  lang,
  onOpenComplaintForm,
}) => {
  if (!activeModule) return null;
  const isEn = lang === 'en';
  const t = translations[lang];

  return (
    <Modal
      open={!!activeModule}
      onClose={onClose}
      size="xl"
      title={
        <div className="flex items-center gap-3">
          <Badge variant="info" type="soft" className="text-xs font-bold">
            SPBE LAMONGAN
          </Badge>
          <span className="text-base sm:text-lg font-black tracking-wide uppercase text-slate-900 dark:text-white">
            {t[activeModule as keyof typeof t]}
          </span>
        </div>
      }
    >
      <div className="py-2 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        {activeModule === 'pemerintahan' && <PemerintahanView isEn={isEn} />}
        {activeModule === 'webgis' && <WebGISView isEn={isEn} />}
        {activeModule === 'satudata' && <SatuDataView isEn={isEn} />}
        {activeModule === 'smartcity' && <SmartCityView isEn={isEn} />}
        {activeModule === 'pelayanan' && (
          <PelayananPublikView
            isEn={isEn}
            onOpenComplaintForm={onOpenComplaintForm}
          />
        )}
        {activeModule === 'cctv' && <CCTVView isEn={isEn} />}
        {activeModule === 'transparansi' && <TransparansiView isEn={isEn} />}
      </div>
    </Modal>
  );
};

/* 1. PEMERINTAHAN VIEW */
const PemerintahanView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const opdList = [
    { name: 'Sekretariat Daerah (Setda Lamongan)', leader: 'Drs. Moh. Nalikan, M.M. (Sekda)', address: 'Jl. KH. Ahmad Dahlan No. 1' },
    { name: 'Dinas Komunikasi dan Informatika (Diskominfo)', leader: 'Sugeng Widodo, S.Sos., M.M.', address: 'Jl. Lamongrejo No. 20' },
    { name: 'Dinas Penanaman Modal & PTSP (DPMPTSP)', leader: 'Hamdani Azahari, S.Sos., M.M.', address: 'Gedung Mal Pelayanan Publik (MPP)' },
    { name: 'Dinas Kependudukan dan Catatan Sipil', leader: 'Drs. A. Edwyn Anedi, M.Si.', address: 'Jl. Veteran No. 34' },
    { name: 'Badan Pendapatan Daerah (Bapenda Lamongan)', leader: 'Puji Dariani, S.Sos., M.M.', address: 'Jl. Basuki Rahmat No. 1' },
    { name: 'Dinas PU Bina Marga (Program JAMULA)', leader: 'Sujarwo, S.T., M.M.', address: 'Jl. Jaksa Agung Suprapto No. 63' },
    { name: 'Dinas Kesehatan Kabupaten Lamongan', leader: 'dr. Taufik Hidayat', address: 'Jl. Dr. Wahidin Sudirohusodo No. 45' },
    { name: 'Dinas Perikanan & Kelautan Kabupaten Lamongan', leader: 'Yuli Wahyuono, S.Pi., M.M.', address: 'Jl. Kusuma Bangsa No. 10' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
        <h4 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200 uppercase mb-1">
          {isEn ? 'Territorial Administration of Lamongan' : 'Wilayah Administrasi Kabupaten Lamongan'}
        </h4>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          {isEn
            ? 'Lamongan spans 1,812.80 km² along the northern coast and Bengawan Solo basin, comprising 27 Districts (Kecamatan), 462 Rural Villages (Desa), and 12 Urban Sub-districts (Kelurahan).'
            : 'Kabupaten Lamongan memiliki luas wilayah 1.812,80 km² yang terbentang dari pesisir Laut Jawa hingga perbukitan selatan, terbagi dalam 27 Kecamatan, 462 Desa, dan 12 Kelurahan dengan pusat pemerintahan di Lamongan Kota.'}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          {isEn ? 'Key Regional Government Agencies (OPD)' : 'Daftar Perangkat Daerah (OPD) Utama'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {opdList.map((opd, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{opd.name}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{opd.leader}</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">{opd.address}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* 2. WEB GIS VIEW */
const WebGISView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const [activeLayer, setActiveLayer] = useState<'rtrw' | 'jamula' | 'pesisir' | 'irigasi'>('rtrw');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'rtrw', label: 'Zonasi RTRW Lamongan', labelEn: 'Spatial Zoning RTRW' },
          { id: 'jamula', label: 'Ruas Jalan Mantap (JAMULA)', labelEn: 'JAMULA Road Network' },
          { id: 'pesisir', label: 'Kawasan Pesisir & WBL', labelEn: 'Coastal & Marine Tourism' },
          { id: 'irigasi', label: 'Daerah Irigasi Gondang', labelEn: 'Gondang Irrigation Area' }
        ].map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeLayer === layer.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isEn ? layer.labelEn : layer.label}
          </button>
        ))}
      </div>

      {/* Simulated Interactive GIS Viewer */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Vector SVG GIS representation */}
        <svg className="w-full h-full p-4" viewBox="0 0 600 350">
          {/* North sea band */}
          <rect x="0" y="0" width="600" height="70" fill="#0284c7" fillOpacity="0.4" />
          <text x="300" y="35" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">LAUT JAWA (PESISIR PANTURA LAMONGAN)</text>

          {/* Base Lamongan shape */}
          <polygon
            points="140,70 380,65 520,120 480,260 380,320 220,310 140,240 120,160"
            fill="#14532d"
            stroke="#22c55e"
            strokeWidth="2"
            fillOpacity="0.6"
          />

          {/* Bengawan Solo river crossing */}
          <path
            d="M 140,200 Q 260,190 340,170 T 480,180"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="5"
          />

          {/* Active Layer Visualizations */}
          {activeLayer === 'rtrw' && (
            <>
              <circle cx="380" cy="180" r="40" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
              <text x="380" y="185" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">Pusat Kota Lamongan</text>
              <circle cx="280" cy="240" r="50" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
              <text x="280" y="245" fill="#a7f3d0" fontSize="9" textAnchor="middle">Lumbung Padi Utama</text>
            </>
          )}

          {activeLayer === 'jamula' && (
            <>
              <line x1="160" y1="200" x2="380" y2="180" stroke="#f97316" strokeWidth="4" />
              <line x1="380" y1="180" x2="480" y2="100" stroke="#f97316" strokeWidth="4" />
              <line x1="380" y1="180" x2="340" y2="280" stroke="#f97316" strokeWidth="4" />
              <text x="270" y="180" fill="#fed7aa" fontSize="9" textAnchor="middle" fontWeight="bold">Ruas JAMULA Mantap</text>
            </>
          )}

          {activeLayer === 'pesisir' && (
            <>
              <circle cx="220" cy="70" r="14" fill="#0284c7" />
              <text x="220" y="98" fill="#bae6fd" fontSize="9" textAnchor="middle" fontWeight="bold">PPN Brondong</text>
              <circle cx="340" cy="68" r="16" fill="#f59e0b" />
              <text x="340" y="98" fill="#fef08a" fontSize="9" textAnchor="middle" fontWeight="bold">WBL & Tanjung Kodok</text>
              <circle cx="420" cy="72" r="14" fill="#ca8a04" />
              <text x="420" y="98" fill="#fed7aa" fontSize="9" textAnchor="middle" fontWeight="bold">Sunan Drajat</text>
            </>
          )}

          {activeLayer === 'irigasi' && (
            <>
              <circle cx="320" cy="270" r="22" fill="#06b6d4" fillOpacity="0.7" />
              <text x="320" y="274" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">Waduk Gondang</text>
              <path d="M 320,270 L 260,240 M 320,270 L 380,240" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 3" />
            </>
          )}
        </svg>

        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs px-3 py-1.5 rounded-lg text-white text-[11px] font-medium border border-white/10">
          Koordinat: 6°51′S - 7°23′S | 112°04′E - 112°33′E | Zona 49S
        </div>
      </div>
    </div>
  );
};

/* 3. SATU DATA LAMONGAN VIEW */
const SatuDataView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const stats = [
    { label: 'Jumlah Penduduk (2026)', val: '1.356.400 Jiwa', sub: 'Pertumbuhan stabil & inklusif' },
    { label: 'Produksi Padi Tahunan', val: '1.150.000+ Ton', sub: 'Lumbung Beras #1 Jawa Timur' },
    { label: 'Produksi Perikanan Total', val: '145.200 Ton/Th', sub: 'Pusat Bandeng, Lele & Tangkap Laut' },
    { label: 'Pertumbuhan Ekonomi Daerah', val: '5,12%', sub: 'Ditopang UMKM & Sektor Pertanian' },
    { label: 'Indeks Pembangunan Manusia (IPM)', val: '74,02 (Tinggi)', sub: 'Terus meningkat melampaui rata-rata Jatim' },
    { label: 'Tingkat Kemiskinan', val: '11,8% (Turun)', sub: 'Didorong Program Yakin Semua Sejahtera' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          {isEn ? 'Lamongan Regency Macro Indicators & Open Data' : 'Indikator Makro & Data Statistik Terbuka Kabupaten Lamongan'}
        </h4>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span>{isEn ? 'Export CSV' : 'Unduh Data (CSV)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">{s.label}</span>
            <span className="text-lg font-black text-slate-900 dark:text-white block">{s.val}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 4. SMART CITY VIEW */
const SmartCityView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  const pillars = [
    { title: 'Smart Governance', desc: 'e-Planning, e-Budgeting, Mal Pelayanan Publik (MPP) digital, dan saluran aduan Lapor Pak YES!' },
    { title: 'Smart Branding', desc: 'Promosi brand resmi Lamongan Megilan, Wisata Bahari Lamongan (WBL), kuliner legendaris Soto & Nasi Boran.' },
    { title: 'Smart Economy', desc: 'Pasar Online Lamongan (POL), Young Entrepreneur Success (YES), dan inkubator bisnis UMKM Naik Kelas.' },
    { title: 'Smart Living', desc: '1 Desa 1 Mobil Sehat ambulans siaga 24 jam gratis, serta jaminan berobat gratis bagi warga prasejahtera.' },
    { title: 'Smart Society', desc: 'Program beasiswa pendidikan PERINTIS untuk ribuan siswa SD-SMP-SMA dan mahasiswa jenjang Sarjana (S1).' },
    { title: 'Smart Environment', desc: 'Gerakan Lamongan Green & Clean, EWS pemantauan banjir Bengawan Solo, dan bank sampah mandiri.' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600 dark:text-slate-300">
        {isEn
          ? 'Masterplan Lamongan Megilan Smart Regency integrates modern digital citizen services across 6 core pillars:'
          : 'Penerapan Masterplan Lamongan Megilan Smart Regency mengintegrasikan teknologi digital dalam 6 dimensi utama:'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {pillars.map((pil, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-emerald-100 dark:border-slate-700">
            <h5 className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
              {idx + 1}. {pil.title}
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{pil.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 5. PELAYANAN PUBLIK VIEW */
const PelayananPublikView: React.FC<{ isEn: boolean; onOpenComplaintForm?: () => void }> = ({
  isEn,
  onOpenComplaintForm,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = filterServices(publicServicesData, search, selectedCat);

  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEn ? 'Search Lamongan public services...' : 'Cari layanan publik (MPP, JAMULA, KTP, Izin...)'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {onOpenComplaintForm && (
          <Button
            hierarchy="primary"
            size="sm"
            onClick={onOpenComplaintForm}
            className="cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Lapor Pak YES! Desk' : 'Lapor Pak YES! (Aduan Cepat)'}
          </Button>
        )}
      </div>

      {/* Services List */}
      <div className="space-y-2.5">
        {filtered.map((srv) => (
          <div key={srv.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  {srv.category}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {srv.opd}
                </span>
              </div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                {isEn ? srv.nameEn : srv.name}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isEn ? srv.descriptionEn : srv.description}
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                {srv.cost}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Waktu: {srv.processingTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 6. CCTV VIEW */
const CCTVView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase">
            {isEn ? 'Live Traffic & River CCTV Monitoring' : 'Pemantauan CCTV Lalu Lintas & Sungai Real-Time'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEn ? 'Diskominfo Lamongan intelligent video surveillance network' : 'Jaringan CCTV Dinas Kominfo Pemkab Lamongan di titik strategis'}
          </p>
        </div>
        <Badge variant="success" type="soft" className="text-xs font-bold">
          LIVE STREAMING
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cctvCamerasData.map((cam) => (
          <div
            key={cam.id}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-md flex flex-col"
          >
            {/* Camera Screen Preview */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={cam.streamUrl}
                alt={cam.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>REC</span>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[9px] font-mono text-emerald-400">
                {cam.status} • 1080p
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-slate-800 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-bold text-white leading-tight">
                  {cam.name}
                </h5>
                <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{cam.location}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 7. TRANSPARANSI VIEW */
const TransparansiView: React.FC<{ isEn: boolean }> = ({ isEn }) => {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md">
        <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block mb-1">
          {isEn ? 'Lamongan Regency Budget APBD 2026' : 'Anggaran Pendapatan & Belanja Daerah (APBD) 2026'}
        </span>
        <div className="text-2xl sm:text-3xl font-black">
          Rp 3,65 Triliun
        </div>
        <p className="text-xs text-emerald-100 mt-1">
          {isEn
            ? 'Accountable, participatory, and focused on JAMULA road networks, free education PERINTIS, and health.'
            : 'Fokus pada peningkatan jalan mantap JAMULA, beasiswa pendidikan PERINTIS, dan penguatan lumbung pangan.'}
        </p>
      </div>

      {/* Allocation breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
            Program JAMULA (Jalan Mantap Lamongan)
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block">Rp 250 Miliar</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Rekonstruksi cor beton jalan poros desa</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
            Alokasi Pendidikan PERINTIS (25.8%)
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block">Rp 941,7 Miliar</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Melampaui mandatory spending 20%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
            Alokasi Kesehatan Lamongan Sehat (16.2%)
          </span>
          <span className="text-lg font-black text-slate-900 dark:text-white block">Rp 591,3 Miliar</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Operasional Mobil Sehat di 462 Desa</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
            Opini BPK RI atas Laporan Keuangan
          </span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 block">WTP 8x Berturut-turut</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Wajar Tanpa Pengecualian</span>
        </div>
      </div>
    </div>
  );
};
