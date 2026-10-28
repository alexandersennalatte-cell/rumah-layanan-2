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
  Anchor,
  Navigation
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

  // Accurate Lamongan geographic paths (matching real-world GIS boundary from reference map)
  const lamonganMainLandPath = `
    M 240,105 
    C 285,108 340,111 400,113 
    C 455,115 510,120 560,122 
    C 620,123 680,118 735,112 
    C 745,135 732,165 715,205 
    C 740,222 790,237 845,250 
    C 885,260 918,272 918,288 
    C 918,304 885,327 850,350 
    C 815,372 800,402 790,440 
    C 780,472 755,502 730,530 
    C 700,562 660,592 620,612 
    C 570,632 500,635 440,630 
    C 380,625 330,630 290,635 
    C 255,640 230,630 220,610 
    C 210,590 225,560 230,540 
    C 238,510 250,480 262,450 
    C 268,430 275,410 275,390 
    C 275,370 255,352 238,345 
    C 245,335 270,330 285,327 
    C 310,322 338,292 348,270 
    C 358,242 358,210 340,180 
    C 320,150 270,130 240,105 Z
  `;

  const lamonganExtrusionPath = `
    M 240,114 
    C 285,117 340,120 400,122 
    C 455,124 510,129 560,131 
    C 620,132 680,127 735,121 
    C 745,144 732,174 715,214 
    C 740,231 790,246 845,259 
    C 885,269 918,281 918,297 
    C 918,313 885,336 850,359 
    C 815,381 800,411 790,449 
    C 780,481 755,511 730,539 
    C 700,571 660,601 620,621 
    C 570,641 500,644 440,639 
    C 380,634 330,639 290,644 
    C 255,649 230,639 220,619 
    C 210,599 225,569 230,549 
    C 238,519 250,489 262,459 
    C 268,439 275,419 275,399 
    C 275,379 255,361 238,354 
    C 245,344 270,339 285,336 
    C 310,331 338,301 348,279 
    C 358,251 358,219 340,189 
    C 320,159 270,139 240,114 Z
  `;

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
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] max-h-[600px] flex items-center justify-center select-none overflow-hidden rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-sky-100/50 via-emerald-50/20 to-slate-100/40 dark:from-slate-900/70 dark:via-slate-950 dark:to-slate-900/90 shadow-inner">
        
        {/* Bespoke Illustrated Lamongan SVG Map Art with Plastic Style & Geographic Realism */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          <svg
            className="w-full h-full object-contain filter drop-shadow-2xl"
            viewBox="0 0 1000 680"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Sea Water Gradient */}
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.35" />
              </linearGradient>

              {/* Plastic 3D Extrusion Edge Gradient */}
              <linearGradient id="extrusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="100%" stopColor="#0f3e21" />
              </linearGradient>

              {/* Main Plastic Land Gradient (Vibrant Injection-Molded Sheen) */}
              <linearGradient id="plasticLandGrad" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#bbf7d0" />
                <stop offset="25%" stopColor="#4ade80" />
                <stop offset="65%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              {/* Specular Plastic Gloss Reflection */}
              <radialGradient id="plasticGloss" cx="35%" cy="25%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>

              {/* Bengawan Solo River Gradient */}
              <linearGradient id="bengawanSoloGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </linearGradient>

              {/* Waduk Gondang & Prijetan Reservoir Lake Gradient */}
              <radialGradient id="reservoirGrad" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#a5f3fc" />
                <stop offset="55%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0e7490" />
              </radialGradient>

              {/* Fish Aquaculture Tambak Pattern (Karangbinangun, Glagah, Deket) */}
              <pattern id="fishTambakPattern" width="24" height="16" patternUnits="userSpaceOnUse">
                <rect x="1.5" y="1.5" width="21" height="13" rx="2.5" fill="#38bdf8" fillOpacity="0.22" stroke="#0284c7" strokeWidth="0.8" />
              </pattern>

              {/* Rice Paddy Agriculture Pattern */}
              <pattern id="paddyPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 4,13 L 7,6 L 10,13 M 7,6 L 7,16" stroke="#166534" strokeWidth="1" strokeLinecap="round" opacity="0.32" />
              </pattern>

              {/* Road Casing Filters */}
              <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Northern Sea (Laut Jawa / Pesisir Pantura Lamongan) */}
            <path
              d="M 0,0 L 1000,0 L 1000,130 C 880,110 790,135 660,118 C 530,100 430,125 310,110 C 180,95 80,120 0,125 Z"
              fill="url(#seaGrad)"
            />

            {/* Sea Label */}
            <text x="500" y="42" fill="#0369a1" fontSize="13" fontWeight="900" letterSpacing="3" textAnchor="middle" opacity="0.75" className="dark:fill-sky-300">
              LAUT JAWA (JAVA SEA)
            </text>

            {/* Animated Coastal Sea Waves */}
            <path
              d="M 60,65 Q 160,55 260,65 T 460,65 T 660,65 T 860,65"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="16 12"
              className="animate-sea-wave opacity-60"
            />
            <path
              d="M 100,90 Q 220,80 340,90 T 580,90 T 820,90"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="1.6"
              strokeDasharray="22 14"
              className="animate-sea-wave opacity-55"
            />

            {/* Traditional Fishing Boats near Brondong and Paciran */}
            <g transform="translate(290, 68)">
              <path d="M 0,8 L 22,8 L 17,14 L 5,14 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
              <polygon points="11,1 11,8 18,8" fill="#f97316" />
            </g>
            <g transform="translate(420, 52)">
              <path d="M 0,7 L 18,7 L 14,12 L 4,12 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
              <polygon points="9,2 9,7 15,7" fill="#ef4444" />
            </g>
            <g transform="translate(640, 72)">
              <path d="M 0,7 L 19,7 L 15,12 L 4,12 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
              <polygon points="9,2 9,7 15,7" fill="#0284c7" />
            </g>

            {/* Surrounding Regency Labels with Directional Hints */}
            <g opacity="0.65" className="dark:opacity-80 font-bold text-[11px] fill-slate-500 dark:fill-slate-400 select-none">
              <text x="80" y="240" textAnchor="middle" letterSpacing="1.5">TUBAN REGENCY</text>
              <text x="80" y="258" textAnchor="middle" fontSize="9" opacity="0.75">← To Tuban</text>

              <text x="90" y="440" textAnchor="middle" letterSpacing="1.5">BOJONEGORO REGENCY</text>
              <text x="90" y="458" textAnchor="middle" fontSize="9" opacity="0.75">← To Bojonegoro</text>

              <text x="280" y="665" textAnchor="middle" letterSpacing="1.5">JOMBANG REGENCY</text>
              <text x="280" y="677" textAnchor="middle" fontSize="9" opacity="0.75">↓ To Jombang</text>

              <text x="660" y="665" textAnchor="middle" letterSpacing="1.5">MOJOKERTO REGENCY</text>
              <text x="660" y="677" textAnchor="middle" fontSize="9" opacity="0.75">↘ To Mojokerto</text>

              <text x="920" y="200" textAnchor="middle" letterSpacing="1.5">GRESIK REGENCY</text>
              <text x="920" y="218" textAnchor="middle" fontSize="9" opacity="0.75">To Gresik &amp; SBY →</text>
            </g>

            {/* 1. LAYER 3D PLASTIC EXTRUSION (Base Slab Depth +8px) */}
            <path
              d={lamonganExtrusionPath}
              fill="url(#extrusionGrad)"
              stroke="#0f3e21"
              strokeWidth="2"
              filter="drop-shadow(0 18px 25px rgba(15, 62, 33, 0.4))"
            />

            {/* 2. MAIN LAND MASS (Injection-Molded Plastic Gloss Finish) */}
            <path
              d={lamonganMainLandPath}
              fill="url(#plasticLandGrad)"
              stroke="#15803d"
              strokeWidth="3.5"
            />

            {/* 3. PLASTIC SPECULAR REFLECTION / GLOSS OVERLAY */}
            <path
              d={lamonganMainLandPath}
              fill="url(#plasticGloss)"
              pointerEvents="none"
            />

            {/* 4. INSET GLOSSY BEVEL HIGHLIGHT RIM (Simulating Beveled Mold Edge) */}
            <path
              d="M 245,110 
                 C 290,113 345,116 405,118 
                 C 460,120 515,124 565,126 
                 C 625,127 685,122 730,117"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 245,110 
                 C 275,135 325,155 345,185 
                 C 362,215 362,245 352,275 
                 C 342,298 315,326 290,332"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* 5. COASTAL BEACH FRINGE (Pantura Golden Sandy Shoreline) */}
            <path
              d="M 240,105 
                 C 285,108 340,111 400,113 
                 C 455,115 510,120 560,122 
                 C 620,123 680,118 735,112 
                 C 730,117 675,127 560,127 
                 C 505,125 450,120 395,118 
                 C 335,116 280,113 240,105 Z"
              fill="#fef08a"
              opacity="0.5"
            />

            {/* 6. TAMBAK AQUACULTURE ZONE in Glagah, Karangbinangun & Deket Lowlands */}
            <path
              d="M 720,225 
                 C 775,235 845,255 895,275 
                 C 890,310 850,335 810,350 
                 C 775,340 735,320 710,280 
                 C 700,250 710,230 720,225 Z"
              fill="url(#fishTambakPattern)"
            />

            {/* 7. FERTILE RICE PADDY AGRICULTURE in Central Plains (Babat, Sukodadi, Pucuk, Sugio) */}
            <path
              d="M 330,360 
                 C 400,350 510,355 580,380 
                 C 595,430 550,510 450,530 
                 C 370,520 330,450 330,360 Z"
              fill="url(#paddyPattern)"
            />

            {/* 8. SOUTHERN ROLLING HILLS (Pegunungan Kapur Selatan in Sambeng, Ngimbang, Mantup, Modo) */}
            <g opacity="0.45">
              <path d="M 390,560 Q 435,510 480,560 Z" fill="#14532d" />
              <path d="M 450,575 Q 495,520 540,575 Z" fill="#166534" />
              <path d="M 520,565 Q 565,515 610,565 Z" fill="#14532d" />
              <path d="M 330,570 Q 370,525 410,570 Z" fill="#15803d" />
            </g>

            {/* 9. WADUK GONDANG (Gondang Dam Reservoir in Sugio) */}
            <g transform="translate(0, 0)">
              {/* Reservoir Lake Body */}
              <path
                d="M 445,465 
                   C 455,445 480,448 495,455 
                   C 515,445 530,455 525,475 
                   C 520,490 495,495 475,488 
                   C 455,492 440,480 445,465 Z"
                fill="url(#reservoirGrad)"
                stroke="#0891b2"
                strokeWidth="2"
                filter="url(#roadShadow)"
              />
              {/* Dam Wall Structure */}
              <line x1="492" y1="486" x2="520" y2="480" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
              <line x1="492" y1="486" x2="520" y2="480" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
              {/* Tiny Sailboat on Reservoir */}
              <g transform="translate(480, 465) scale(0.7)">
                <path d="M -5,4 L 5,4 L 3,7 L -3,7 Z" fill="#ffffff" />
                <polygon points="0,-4 0,3 4,3" fill="#f97316" />
              </g>
              <text x="480" y="503" fill="#0f172a" fontSize="9" fontWeight="800" textAnchor="middle" className="dark:fill-slate-100">
                Waduk Gondang
              </text>
            </g>

            {/* 10. WADUK PRIJETAN in Kedungpring */}
            <g transform="translate(0, 0)">
              <path
                d="M 345,452 
                   C 355,440 375,442 385,450 
                   C 390,465 375,475 360,470 
                   C 348,468 340,460 345,452 Z"
                fill="url(#reservoirGrad)"
                stroke="#0891b2"
                strokeWidth="1.5"
              />
              <text x="365" y="482" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" className="dark:fill-slate-200">
                Waduk Prijetan
              </text>
            </g>

            {/* 11. BENGAWAN SOLO RIVER (Meandering through Babat, Laren, Karanggeneng to Glagah Estuary) */}
            {/* River Bed Shadow Groove */}
            <path
              d="M 235,346 
                 C 265,340 295,335 320,320 
                 C 345,305 365,285 410,285 
                 C 455,285 490,270 540,265 
                 C 590,260 635,268 685,265 
                 C 735,262 795,278 845,275 
                 C 870,274 895,270 918,272"
              fill="none"
              stroke="#0f3e21"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Glistening Water Ribbon */}
            <path
              d="M 235,346 
                 C 265,340 295,335 320,320 
                 C 345,305 365,285 410,285 
                 C 455,285 490,270 540,265 
                 C 590,260 635,268 685,265 
                 C 735,262 795,278 845,275 
                 C 870,274 895,270 918,272"
              fill="none"
              stroke="url(#bengawanSoloGrad)"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            {/* Animated River Current Flow Ripple */}
            <path
              d="M 235,346 
                 C 265,340 295,335 320,320 
                 C 345,305 365,285 410,285 
                 C 455,285 490,270 540,265 
                 C 590,260 635,268 685,265 
                 C 735,262 795,278 845,275 
                 C 870,274 895,270 918,272"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="14 10"
              className="animate-river opacity-80"
            />
            {/* River Label */}
            <text x="475" y="260" fill="#0369a1" fontSize="9" fontWeight="800" fontStyle="italic" opacity="0.9" className="dark:fill-sky-200">
              Sungai Bengawan Solo
            </text>

            {/* 12. ROAD & INFRASTRUCTURE NETWORK */}
            {/* Pantura Coastal Arterial Highway (Tuban - Brondong - Paciran - Sedayu/Gresik) */}
            <path
              d="M 180,118 L 240,112 C 300,114 360,116 420,118 C 480,120 540,123 600,124 C 660,122 720,117 760,120 L 820,126"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#roadShadow)"
            />
            <path
              d="M 180,118 L 240,112 C 300,114 360,116 420,118 C 480,120 540,123 600,124 C 660,122 720,117 760,120 L 820,126"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeDasharray="8 6"
            />

            {/* Regional Connector: Paciran -> Solokuro -> Karanggeneng -> Sukodadi -> Sugio */}
            <path
              d="M 490,125 C 510,160 535,190 540,220 C 545,245 540,270 515,300 C 495,325 490,340 480,380 C 475,410 475,445 475,465"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />

            {/* Regional Connector: Babat -> Kedungpring -> Ngimbang -> Jombang */}
            <path
              d="M 265,340 C 275,370 285,410 295,445 C 310,480 325,520 335,560 C 340,585 340,615 340,645"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 265,340 C 275,370 285,410 295,445 C 310,480 325,520 335,560 C 340,585 340,615 340,645"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray="6 4"
            />

            {/* Regional Connector: Lamongan Kota -> Tikung -> Kembangbahu -> Mantup -> Mojokerto */}
            <path
              d="M 690,355 C 705,385 715,415 705,445 C 695,475 680,505 670,535 C 655,565 640,600 625,640"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* MAIN TRANS-JAVA NATIONAL ARTERIAL TRUNK ROAD & RAILWAY */}
            {/* Railroad Track (Daendels Arteri Babat - Pucuk - Sukodadi - Turi - Lamongan - Deket - Gresik) */}
            <path
              d="M 170,355 L 265,340 C 320,342 380,343 440,343 C 510,344 580,346 650,348 C 710,350 765,358 810,366 L 860,375"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 170,355 L 265,340 C 320,342 380,343 440,343 C 510,344 580,346 650,348 C 710,350 765,358 810,366 L 860,375"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
            {/* Primary National Highway Red Casing */}
            <path
              d="M 175,348 L 265,335 C 320,337 380,338 440,338 C 510,339 580,341 650,343 C 710,345 765,353 810,361 L 860,370"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#roadShadow)"
            />
            <path
              d="M 175,348 L 265,335 C 320,337 380,338 440,338 C 510,339 580,341 650,343 C 710,345 765,353 810,361 L 860,370"
              fill="none"
              stroke="#fef08a"
              strokeWidth="1.2"
            />

            {/* Jembatan Cincin Babat over Bengawan Solo */}
            <g transform="translate(265, 340)">
              <rect x="-14" y="-4" width="28" height="8" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
              <path d="M -12,-4 Q 0,-16 12,-4" fill="none" stroke="#f97316" strokeWidth="2.2" />
            </g>

            {/* 13. DISTRICT & SUB-DISTRICT LABELS WITH REALISTIC NODES */}
            <g className="text-[8.5px] font-bold fill-slate-800 dark:fill-slate-100 select-none">
              {/* Pantura Districts */}
              <circle cx="350" cy="115" r="2.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              <text x="350" y="106" textAnchor="middle">Brondong</text>

              <circle cx="490" cy="122" r="2.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              <text x="490" y="112" textAnchor="middle">Paciran</text>

              <circle cx="560" cy="175" r="2" fill="#0284c7" />
              <text x="560" y="170" textAnchor="middle" opacity="0.8">Solokuro</text>

              <circle cx="430" cy="235" r="2" fill="#0284c7" />
              <text x="430" y="230" textAnchor="middle" opacity="0.8">Laren</text>

              <circle cx="490" cy="275" r="2" fill="#0284c7" />
              <text x="490" y="270" textAnchor="middle" opacity="0.8">Karanggeneng</text>

              <circle cx="400" cy="305" r="2" fill="#0284c7" />
              <text x="400" y="300" textAnchor="middle" opacity="0.8">Sekaran</text>

              {/* Central Arterial Highway Towns */}
              <circle cx="265" cy="336" r="3.2" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" />
              <text x="265" y="325" textAnchor="middle" fontSize="10" fontWeight="900" fill="#dc2626" className="dark:fill-rose-400">BABAT</text>

              <circle cx="390" cy="338" r="2.5" fill="#475569" />
              <text x="390" y="331" textAnchor="middle" opacity="0.85">Pucuk</text>

              <circle cx="490" cy="339" r="2.5" fill="#475569" />
              <text x="490" y="331" textAnchor="middle" opacity="0.85">Sukodadi</text>

              <circle cx="585" cy="341" r="2" fill="#475569" />
              <text x="585" y="333" textAnchor="middle" opacity="0.8">Turi</text>

              <circle cx="765" cy="358" r="2.5" fill="#475569" />
              <text x="765" y="350" textAnchor="middle" opacity="0.85">Deket</text>

              {/* Eastern Delta Districts */}
              <circle cx="830" cy="285" r="2" fill="#0284c7" />
              <text x="830" y="280" textAnchor="middle" opacity="0.8">Glagah</text>

              <circle cx="800" cy="235" r="2" fill="#0284c7" />
              <text x="800" y="230" textAnchor="middle" opacity="0.8">Karangbinangun</text>

              {/* Central-Southern Districts */}
              <circle cx="480" cy="425" r="2.5" fill="#475569" />
              <text x="480" y="420" textAnchor="middle" opacity="0.85">Sugio</text>

              <circle cx="335" cy="425" r="2" fill="#475569" />
              <text x="335" y="420" textAnchor="middle" opacity="0.8">Kedungpring</text>

              <circle cx="270" cy="465" r="2" fill="#475569" />
              <text x="270" y="460" textAnchor="middle" opacity="0.8">Modo</text>

              <circle cx="245" cy="535" r="2" fill="#475569" />
              <text x="245" y="530" textAnchor="middle" opacity="0.8">Bluluk</text>

              <circle cx="225" cy="595" r="2" fill="#475569" />
              <text x="225" y="590" textAnchor="middle" opacity="0.8">Sukorame</text>

              <circle cx="335" cy="535" r="2.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              <text x="335" y="527" textAnchor="middle">Ngimbang</text>

              <circle cx="510" cy="545" r="2" fill="#475569" />
              <text x="510" y="540" textAnchor="middle" opacity="0.8">Sambeng</text>

              <circle cx="670" cy="530" r="2" fill="#475569" />
              <text x="670" y="525" textAnchor="middle" opacity="0.8">Mantup</text>

              <circle cx="690" cy="460" r="2" fill="#475569" />
              <text x="690" y="455" textAnchor="middle" opacity="0.8">Kembangbahu</text>

              <circle cx="725" cy="415" r="2" fill="#475569" />
              <text x="725" y="410" textAnchor="middle" opacity="0.8">Tikung</text>
            </g>

            {/* 14. BESPOKE ANIMATED MICRO-LANDMARK ARTWORKS */}

            {/* A. LAMONGAN KOTA (Alun-Alun, Great Mosque, and Animated Bianglala Ferris Wheel) */}
            <g transform="translate(690, 350)">
              {/* Town Square Civic Plaza Background */}
              <rect x="-38" y="-38" width="76" height="76" rx="16" fill="#15803d" stroke="#facc15" strokeWidth="2.5" opacity="0.95" filter="url(#roadShadow)" />
              
              {/* Grand Mosque Dome */}
              <circle cx="-16" cy="-14" r="9" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
              <polygon points="-16,-26 -14,-22 -18,-22" fill="#facc15" />

              {/* The Iconic Animated Ferris Wheel (Bianglala Alun-Alun Lamongan) */}
              <g transform="translate(15, -12)">
                {/* Support Stanchions */}
                <line x1="0" y1="0" x2="-10" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="0" y1="0" x2="10" y2="20" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="-12" y1="20" x2="12" y2="20" stroke="#94a3b8" strokeWidth="2.5" />
                
                {/* Rotating Ferris Wheel */}
                <g className="animate-wheel">
                  <circle cx="0" cy="0" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="1" />
                  {/* Spokes */}
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="-11" y1="-11" x2="11" y2="11" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="-11" y1="11" x2="11" y2="-11" stroke="#fde047" strokeWidth="1.2" />
                  {/* Colorful Gondolas */}
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

              {/* Prominent Capital Label */}
              <text x="0" y="26" fill="#ffffff" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
                LAMONGAN
              </text>
            </g>

            {/* B. WBL & TANJUNG KODOK (Paciran Coastal Theme Park) */}
            <g transform="translate(490, 122)">
              {/* Coaster Track Arc */}
              <path d="M -22,12 Q 0,-14 22,12" fill="none" stroke="#ea580c" strokeWidth="3" />
              <rect x="-14" y="8" width="28" height="6" rx="2" fill="#3b82f6" />
              <text x="0" y="22" fill="#0c4a6e" fontSize="7.5" fontWeight="800" textAnchor="middle" className="dark:fill-sky-200">
                WBL &amp; Tanjung Kodok
              </text>
            </g>

            {/* C. SUNAN DRAJAT & SUNAN SENDANG DUWUR (Majapahit Paduraksa Winged Gateway) */}
            <g transform="translate(575, 135)">
              <polygon points="0,-12 10,-2 -10,-2" fill="#ca8a04" />
              <polygon points="0,-6 14,4 -14,4" fill="#ca8a04" />
              <rect x="-8" y="4" width="16" height="8" fill="#78350f" />
            </g>

            {/* D. BRONDONG HARBOR & VAN DER WIJCK MONUMENT */}
            <g transform="translate(350, 115)">
              <polygon points="0,-16 4,4 -4,4" fill="#ffffff" stroke="#475569" strokeWidth="1" />
              <rect x="-6" y="4" width="12" height="3" fill="#94a3b8" />
            </g>

            {/* E. CANDI PATAKAN (Ancient 11th Century Brick Sanctuary in Sambeng) */}
            <g transform="translate(530, 545)">
              <rect x="-8" y="-4" width="16" height="4" fill="#b45309" />
              <rect x="-6" y="-8" width="12" height="4" fill="#d97706" />
              <polygon points="0,-14 4,-8 -4,-8" fill="#f59e0b" />
            </g>

            {/* F. POHON TRINIL (Akar Langit in Brondong Hills) */}
            <g transform="translate(320, 195)">
              <circle cx="0" cy="-6" r="7" fill="#15803d" />
              <path d="M -4,1 L -8,6 M 4,1 L 8,6 M 0,1 L 0,6" stroke="#78350f" strokeWidth="1.5" />
            </g>

            {/* G. STADION SURAJAYA (Persela Football Stadium in Deket) */}
            <g transform="translate(765, 358)">
              <ellipse cx="0" cy="0" rx="14" ry="9" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="9" ry="5" fill="#16a34a" />
            </g>

            {/* 15. AUTHENTIC MAP COMPASS ROSE & SCALE BAR (As featured in the reference map!) */}
            <g transform="translate(850, 550)">
              {/* Outer compass ring */}
              <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#0f172a" strokeWidth="2" opacity="0.9" />
              <circle cx="0" cy="0" r="24" fill="#fed7aa" opacity="0.6" />
              {/* 8-point compass star */}
              <polygon points="0,-22 5,-5 22,0 5,5 0,22 -5,5 -22,0 -5,-5" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="0,-22 0,0 5,-5" fill="#c2410c" />
              <polygon points="22,0 0,0 5,5" fill="#c2410c" />
              <polygon points="0,22 0,0 -5,5" fill="#c2410c" />
              <polygon points="-22,0 0,0 -5,-5" fill="#c2410c" />
              <circle cx="0" cy="0" r="5" fill="#0f172a" />
              {/* North Pointer Badge */}
              <text x="0" y="-25" fill="#dc2626" fontSize="12" fontWeight="900" textAnchor="middle">
                N / U
              </text>
              {/* Graphic Scale Bar */}
              <g transform="translate(-40, 42)">
                <rect x="0" y="0" width="80" height="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
                <rect x="0" y="0" width="40" height="4" fill="#0f172a" />
                <text x="0" y="14" fill="#475569" fontSize="7" fontWeight="bold">0</text>
                <text x="40" y="14" fill="#475569" fontSize="7" fontWeight="bold">10</text>
                <text x="80" y="14" fill="#475569" fontSize="7" fontWeight="bold">25 km</text>
              </g>
            </g>

            {/* Map Title Plaque in bottom left */}
            <g transform="translate(60, 615)">
              <rect x="0" y="0" width="180" height="42" rx="8" fill="#ffffff" opacity="0.85" stroke="#cbd5e1" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-800" />
              <text x="12" y="18" fill="#0f172a" fontSize="11" fontWeight="900" letterSpacing="0.8" className="dark:fill-white">
                KABUPATEN LAMONGAN
              </text>
              <text x="12" y="32" fill="#059669" fontSize="9" fontWeight="700" letterSpacing="0.5">
                LAMONGAN MEGILAN • SPBE
              </text>
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
                    <div className="absolute -inset-2.5 rounded-full bg-emerald-400/40 animate-pulse-ring pointer-events-none" />
                  )}

                  {/* Marker Pin Button with 3D Glossy Finish */}
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
                    ) : lm.id === 'waduk-gondang' ? (
                      <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200" />
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
