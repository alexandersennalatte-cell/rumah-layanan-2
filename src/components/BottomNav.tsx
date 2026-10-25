import React from 'react';
import { 
  Layers, 
  MapPin, 
  BarChart2, 
  Globe, 
  Users, 
  Video, 
  BarChart,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { Button } from '@idds/react';
import { NavModuleId, Language } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  activeModule: NavModuleId | null;
  onSelectModule: (module: NavModuleId) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  onSelectModule,
  lang,
  onLanguageChange,
}) => {
  const t = translations[lang];

  const navItems: { id: NavModuleId; labelKey: keyof typeof t; icon: React.ReactNode }[] = [
    { id: 'pemerintahan', labelKey: 'pemerintahan', icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'webgis', labelKey: 'webgis', icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'satudata', labelKey: 'satudata', icon: <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'smartcity', labelKey: 'smartcity', icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'pelayanan', labelKey: 'pelayanan', icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'cctv', labelKey: 'cctv', icon: <Video className="w-5 h-5 sm:w-6 sm:h-6" /> },
    { id: 'transparansi', labelKey: 'transparansi', icon: <BarChart className="w-5 h-5 sm:w-6 sm:h-6" /> },
  ];

  return (
    <footer className="relative z-30 w-full px-4 sm:px-8 py-3 mt-auto">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Social Links Bottom Left */}
        <div className="flex items-center gap-1.5 order-2 md:order-1 text-slate-700 dark:text-slate-300">
          <Button
            hierarchy="tertiary"
            size="sm"
            onClick={() => window.open('https://facebook.com/pemkablamongan', '_blank', 'noopener,noreferrer')}
            className="!p-2 !rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Facebook Resmi Pemkab Lamongan"
          >
            <Facebook className="w-4 h-4" />
          </Button>
          <Button
            hierarchy="tertiary"
            size="sm"
            onClick={() => window.open('https://instagram.com/lamongankab', '_blank', 'noopener,noreferrer')}
            className="!p-2 !rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Instagram Resmi Pemkab Lamongan"
          >
            <Instagram className="w-4 h-4" />
          </Button>
          <Button
            hierarchy="tertiary"
            size="sm"
            onClick={() => window.open('https://twitter.com/lamongankab', '_blank', 'noopener,noreferrer')}
            className="!p-2 !rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="Twitter X Resmi Pemkab Lamongan"
          >
            <Twitter className="w-4 h-4" />
          </Button>
          <Button
            hierarchy="tertiary"
            size="sm"
            onClick={() => window.open('https://youtube.com/@pemkablamongan', '_blank', 'noopener,noreferrer')}
            className="!p-2 !rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            aria-label="YouTube Resmi Pemkab Lamongan"
          >
            <Youtube className="w-4 h-4" />
          </Button>
        </div>

        {/* Center: The 7 Signature Navigation Icons with Labels */}
        <div className="order-1 md:order-2 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-2 md:pb-0 px-2 no-scrollbar">
          {navItems.map((item) => {
            const isSelected = activeModule === item.id;
            return (
              <div key={item.id} className="flex flex-col items-center">
                <Button
                  hierarchy={isSelected ? 'primary' : 'secondary'}
                  size="lg"
                  onClick={() => onSelectModule(item.id)}
                  className={`!w-12 !h-12 sm:!w-14 sm:!h-14 !p-0 !rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? '!bg-blue-600 hover:!bg-blue-700 !text-white shadow-lg ring-4 ring-blue-400/50'
                      : 'hover:-translate-y-1 hover:shadow-md'
                  }`}
                  aria-label={`Buka modul ${t[item.labelKey]}`}
                >
                  {item.icon}
                </Button>
                <span className="mt-1.5 text-[9px] sm:text-[10px] font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider text-center max-w-[72px] sm:max-w-[80px] leading-tight">
                  {t[item.labelKey]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Language Switcher with IDDS Buttons */}
        <div className="flex items-center gap-1.5 order-3 bg-white/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {/* Indonesian Flag & ID */}
          <Button
            hierarchy={lang === 'id' ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => onLanguageChange('id')}
            className="!px-2.5 !py-1 !text-xs font-bold cursor-pointer"
            aria-label="Pilih Bahasa Indonesia"
            prefixIcon={
              <span className="inline-block w-4 h-3 rounded-xs overflow-hidden border border-slate-300 shadow-2xs">
                <span className="block h-1.5 bg-red-600"></span>
                <span className="block h-1.5 bg-white"></span>
              </span>
            }
          >
            ID
          </Button>

          {/* UK Flag & EN */}
          <Button
            hierarchy={lang === 'en' ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => onLanguageChange('en')}
            className="!px-2.5 !py-1 !text-xs font-bold cursor-pointer"
            aria-label="Select English Language"
            prefixIcon={
              <span className="inline-block w-4 h-3 rounded-xs overflow-hidden border border-slate-300 bg-blue-800 relative shadow-2xs">
                <span className="absolute inset-0 flex items-center justify-center text-[7px] text-red-500 font-black">
                  🇬🇧
                </span>
              </span>
            }
          >
            EN
          </Button>
        </div>

      </div>
    </footer>
  );
};
