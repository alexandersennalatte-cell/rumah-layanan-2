import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Droplet, 
  Building2, 
  Trophy, 
  Trees, 
  Sparkles, 
  Search,
  Filter,
  Info,
  Waves,
  Ship,
  Landmark as LandmarkIcon,
  Tent,
  Anchor
} from 'lucide-react';
import { Chip } from '@idds/react';
import { Landmark, Language } from '../types';
import { filterLandmarks } from '../utils/portalLogic';

interface InteractiveMapProps {
  landmarks: Landmark[];
  selectedLandmark: Landmark | null;
  onSelectLandmark: (landmark: Landmark) => void;
  lang: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  landmarks,
  selectedLandmark,
  onSelectLandmark,
  lang,
}) => {
  const isEn = lang === 'en';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredLandmark, setHoveredLandmark] = useState<Landmark | null>(null);

  const filteredLandmarks = filterLandmarks(landmarks, searchQuery, activeCategory);

  const categories: { id: string; label: string; labelEn: string }[] = [
    { id: 'all', label: 'Semua Landmark', labelEn: 'All Landmarks' },
    { id: 'nature', label: 'Wisata Bahari & Alam', labelEn: 'Marine & Nature' },
    { id: 'heritage', label: 'Cagar Budaya & Religi', labelEn: 'Religious Heritage' },
    { id: 'civic', label: 'Pusat Kota Lamongan', labelEn: 'Lamongan Civic' },
    { id: 'infrastructure', label: 'Infrastruktur & Port', labelEn: 'Infrastructure' },
    { id: 'culture', label: 'Kuliner & Seni', labelEn: 'Culinary & Arts' }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Search and Category Filter Ribbon */}
      <div className="w-full px-4 mb-2.5 flex flex-wrap items-center justify-between gap-2.5 z-20">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? 'Search Lamongan landmarks...' : 'Cari landmark (WBL, Sunan Drajat, Bianglala...)'}
            className="w-full pl-9 pr-3 py-1.5 rounded-full text-xs bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-xs"
            aria-label="Cari Landmark Lamongan"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ×
            </button>
          )}
        </div>

        {/* INA DDS Chip Category Filters */}
        <div className="flex items-center overflow-x-auto py-1 max-w-full no-scrollbar">
          <Chip
            options={categories.map((cat) => ({
              label: isEn ? cat.labelEn : cat.label,
              value: cat.id
            }))}
            selected={activeCategory}
            onSelect={(val) => setActiveCategory(val as string)}
            size="small"
            variant="filled"
          />
        </div>
      </div>

      {/* Main Lamongan Map Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] flex items-center justify-center select-none overflow-hidden rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-sky-100/40 via-emerald-50/20 to-slate-100/30 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-900/80 shadow-inner">
        
        {/* Bespoke Illustrated Lamongan SVG Map Art */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          <svg
            className="w-full h-full object-contain filter drop-shadow-xl"
            viewBox="0 0 1000 620"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Sea Water Gradient */}
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.3" />
              </linearGradient>

              {/* Coastal Land Gradient */}
              <linearGradient id="lamonganLand" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="35%" stopColor="#4ade80" />
                <stop offset="70%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>

              {/* Bengawan Solo River Gradient */}
              <linearGradient id="bengawanSoloGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
              </linearGradient>

              {/* Waduk Gondang Lake Gradient */}
              <radialGradient id="lakeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </radialGradient>

              <pattern id="paddyPattern" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 4,14 L 8,6 L 12,14 M 8,6 L 8,18" stroke="#15803d" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
              </pattern>

              <pattern id="fishTambakPattern" width="30" height="20" patternUnits="userSpaceOnUse">
                <rect x="2" y="2" width="26" height="16" rx="3" fill="#38bdf8" fillOpacity="0.2" stroke="#0284c7" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Northern Sea (Laut Jawa / Pesisir Pantura) */}
            <path
              d="M 50,0 L 950,0 L 950,110 C 850,90 780,115 650,95 C 520,75 420,110 300,90 C 180,70 100,105 50,110 Z"
              fill="url(#seaGrad)"
            />
            {/* Animated Sea Wave Ripples */}
            <path
              d="M 80,45 Q 160,35 240,45 T 400,45 T 560,45 T 720,45 T 880,45"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="16 10"
              className="animate-sea-wave opacity-60"
            />
            <path
              d="M 120,75 Q 220,65 320,75 T 520,75 T 720,75"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="1.5"
              strokeDasharray="20 12"
              className="animate-sea-wave opacity-50"
            />

            {/* Small Fishing Boats at Brondong / Paciran Sea */}
            <g transform="translate(240, 48)">
              <path d="M 0,8 L 24,8 L 18,14 L 6,14 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
              <polygon points="12,1 12,8 19,8" fill="#f97316" />
            </g>
            <g transform="translate(370, 35)">
              <path d="M 0,7 L 20,7 L 15,12 L 5,12 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
              <polygon points="10,2 10,7 16,7" fill="#ef4444" />
            </g>

            {/* Geographical Boundary of Kabupaten Lamongan */}
            <path
              d="M 240,95 
                 C 320,80 430,90 560,85 
                 C 640,82 720,110 770,140 
                 C 820,170 850,220 840,290 
                 C 830,360 810,410 760,460 
                 C 710,510 660,540 600,560 
                 C 530,580 470,575 420,550 
                 C 370,525 340,480 320,440 
                 C 300,400 270,360 250,300 
                 C 230,240 210,180 220,130 
                 Z"
              fill="url(#lamonganLand)"
              stroke="#15803d"
              strokeWidth="4"
              filter="drop-shadow(0 12px 20px rgba(22, 101, 52, 0.25))"
            />

            {/* Fish Aquaculture Tambak Zone in Northern Lamongan (Glagah, Karangbinangun, Deket) */}
            <path
              d="M 620,160 C 690,170 760,210 780,260 C 730,280 670,270 610,230 Z"
              fill="url(#fishTambakPattern)"
            />

            {/* Lush Agricultural Rice Paddy Fields in Central & Southern Lamongan */}
            <path
              d="M 340,320 C 420,310 500,320 560,350 C 580,420 540,490 440,510 C 370,500 330,420 340,320 Z"
              fill="url(#paddyPattern)"
            />

            {/* Southern Rolling Hills (Pegunungan Kapur Selatan di Sambeng, Ngimbang, Modo) */}
            <g opacity="0.6">
              <path d="M 400,530 Q 450,480 500,530 Z" fill="#15803d" />
              <path d="M 470,540 Q 520,490 570,540 Z" fill="#166534" />
              <path d="M 350,510 Q 400,460 450,510 Z" fill="#14532d" />
            </g>

            {/* Bengawan Solo River Flowing through Babat, Laren, Maduran, Karanggeneng */}
            <path
              d="M 260,300 
                 C 310,315 360,270 430,280 
                 C 500,290 560,260 630,250 
                 C 700,240 760,280 820,290"
              fill="none"
              stroke="url(#bengawanSoloGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Animated Current Waves along Bengawan Solo */}
            <path
              d="M 260,300 
                 C 310,315 360,270 430,280 
                 C 500,290 560,260 630,250 
                 C 700,240 760,280 820,290"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="12 10"
              className="animate-river opacity-90"
            />

            {/* Waduk Gondang (Reservoir Lake in Sugio) */}
            <path
              d="M 470,420 C 490,400 525,405 540,425 C 550,445 520,465 490,460 C 470,455 460,435 470,420 Z"
              fill="url(#lakeGrad)"
              stroke="#0891b2"
              strokeWidth="2"
            />
            <text x="505" y="440" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Waduk Gondang</text>

            {/* Waduk Prijetan in Kedungpring */}
            <path
              d="M 370,410 C 385,395 405,400 410,415 C 412,430 395,438 380,435 Z"
              fill="url(#lakeGrad)"
              stroke="#0891b2"
              strokeWidth="1.5"
            />

            {/* Jembatan Cincin Babat over Bengawan Solo */}
            <g transform="translate(325, 290)">
              <rect x="-14" y="-3" width="28" height="6" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
              <path d="M -12,-3 Q 0,-14 12,-3" fill="none" stroke="#f97316" strokeWidth="2" />
            </g>

            {/* Central City Hub: Lamongan Kota with Alun-Alun & BIANGLALA */}
            <g transform="translate(635, 280)">
              {/* Town Square Lawn */}
              <rect x="-35" y="-35" width="70" height="70" rx="14" fill="#15803d" stroke="#facc15" strokeWidth="2" opacity="0.9" />
              
              {/* Grand Mosque Dome */}
              <circle cx="-16" cy="-14" r="9" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
              <polygon points="-16,-26 -14,-22 -18,-22" fill="#facc15" />
              
              {/* The Iconic Animated Ferris Wheel (Bianglala Alun-Alun) */}
              <g transform="translate(15, -12)">
                {/* Wheel Support Legs */}
                <line x1="0" y1="0" x2="-10" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="0" y1="0" x2="10" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="-12" y1="20" x2="12" y2="20" stroke="#94a3b8" strokeWidth="2.5" />
                
                {/* Rotating Wheel Group */}
                <g className="animate-wheel">
                  <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  {/* Wheel Spokes */}
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="-11" y1="-11" x2="11" y2="11" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="-11" y1="11" x2="11" y2="-11" stroke="#fde047" strokeWidth="1.2" />
                  {/* Passenger Gondolas */}
                  <circle cx="0" cy="-16" r="2.8" fill="#ef4444" />
                  <circle cx="16" cy="0" r="2.8" fill="#3b82f6" />
                  <circle cx="0" cy="16" r="2.8" fill="#10b981" />
                  <circle cx="-16" cy="0" r="2.8" fill="#f59e0b" />
                  <circle cx="11" cy="11" r="2.8" fill="#ec4899" />
                  <circle cx="-11" cy="-11" r="2.8" fill="#8b5cf6" />
                  <circle cx="-11" cy="11" r="2.8" fill="#06b6d4" />
                  <circle cx="11" cy="-11" r="2.8" fill="#84cc16" />
                </g>
              </g>

              {/* City Label */}
              <text x="0" y="24" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
                LAMONGAN KOTA
              </text>
            </g>

            {/* WBL Coastal Landmark Art in Paciran */}
            <g transform="translate(420, 115)">
              {/* Coaster track arc */}
              <path d="M -20,15 Q 0,-15 20,15" fill="none" stroke="#ea580c" strokeWidth="3" />
              <rect x="-14" y="10" width="28" height="6" rx="2" fill="#3b82f6" />
              <text x="0" y="24" fill="#0c4a6e" fontSize="8" fontWeight="bold" textAnchor="middle">WBL & Tanjung Kodok</text>
            </g>

            {/* Sunan Drajat & Sunan Sendang Duwur Cultural Gateway */}
            <g transform="translate(485, 125)">
              <polygon points="0,-12 10,-2 -10,-2" fill="#ca8a04" />
              <polygon points="0,-6 14,4 -14,4" fill="#ca8a04" />
              <rect x="-8" y="4" width="16" height="8" fill="#78350f" />
            </g>

            {/* Brondong Harbor & Van der Wijck Obelisk */}
            <g transform="translate(320, 115)">
              <polygon points="0,-16 4,4 -4,4" fill="#ffffff" stroke="#475569" strokeWidth="1" />
              <rect x="-6" y="4" width="12" height="3" fill="#94a3b8" />
            </g>
          </svg>

          {/* Interactive Landmark Marker Pins Overlay */}
          {filteredLandmarks.map((lm) => {
            const isSelected = selectedLandmark?.id === lm.id;
            const isHovered = hoveredLandmark?.id === lm.id;

            return (
              <div
                key={lm.id}
                style={{
                  position: 'absolute',
                  left: `${lm.x}%`,
                  top: `${lm.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-20 cursor-pointer"
                onMouseEnter={() => setHoveredLandmark(lm)}
                onMouseLeave={() => setHoveredLandmark(null)}
                onClick={() => onSelectLandmark(lm)}
              >
                <div className="relative group flex flex-col items-center">
                  
                  {/* Subtle Pulse Halo for Key Highlights */}
                  {(lm.id === 'wbl-paciran' || lm.id === 'sunan-drajat' || lm.id === 'alun-alun-bianglala') && (
                    <div className="absolute -inset-2 rounded-full bg-emerald-400/35 animate-pulse-ring pointer-events-none" />
                  )}

                  {/* Marker Pin Button */}
                  <motion.button
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative flex items-center justify-center p-1.5 sm:p-2 rounded-full shadow-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-900 border-white ring-4 ring-amber-400/50 scale-110 z-30'
                        : lm.category === 'nature'
                        ? 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white border-white/90 shadow-blue-500/30'
                        : lm.category === 'heritage'
                        ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 text-white border-white/90 shadow-amber-500/30'
                        : lm.category === 'infrastructure'
                        ? 'bg-gradient-to-tr from-indigo-600 to-purple-500 text-white border-white/90 shadow-indigo-500/30'
                        : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white border-white/90 shadow-emerald-500/30'
                    }`}
                    aria-label={`Buka ${lm.name}`}
                  >
                    {lm.id === 'wbl-paciran' ? (
                      <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    ) : lm.id === 'sunan-drajat' || lm.id === 'sunan-sendang' ? (
                      <LandmarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-100" />
                    ) : lm.id === 'alun-alun-bianglala' ? (
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 animate-spin" style={{ animationDuration: '8s' }} />
                    ) : lm.id === 'pelabuhan-brondong' ? (
                      <Anchor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    ) : lm.id === 'masjid-agung-lamongan' || lm.id === 'pemkab-lamongan' ? (
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    ) : lm.id === 'stadion-surajaya' ? (
                      <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                    ) : (
                      <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    )}
                  </motion.button>

                  {/* Clean Tooltip on Hover or Selection */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute bottom-full mb-2 w-56 p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl border border-slate-200 dark:border-slate-800 text-left pointer-events-none z-50"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5">
                          {isEn ? lm.highlightEn : lm.highlight}
                        </div>
                        <div className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-1">
                          {isEn ? lm.nameEn : lm.name}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                          {isEn ? lm.descriptionEn : lm.description}
                        </p>
                        <div className="mt-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <span>{isEn ? 'Click to inspect landmark' : 'Klik untuk info lengkap →'}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide info under map */}
      <div className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
        <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>
          {isEn 
            ? 'Interactive Map: Explore Lamongan Megilan marine tourism, Wali Songo heritage, and economic potential' 
            : 'Peta Interaktif: Jelajahi destinasi Wisata Bahari Lamongan (WBL), cagar budaya Sunan Drajat, dan pesona Lamongan Megilan'}
        </span>
      </div>
    </div>
  );
};
