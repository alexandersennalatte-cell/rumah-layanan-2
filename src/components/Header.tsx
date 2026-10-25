import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Moon, 
  Sun, 
  User, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import { Button, Badge } from '@idds/react';
import { Language, Theme, CitizenProfile } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentView: 'map' | 'portal';
  onToggleView: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenAnalytics: () => void;
  onOpenAuth: () => void;
  citizen: CitizenProfile | null;
  activeVisitors: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onToggleView,
  lang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenAnalytics,
  onOpenAuth,
  citizen,
  activeVisitors,
}) => {
  const t = translations[lang];

  return (
    <header className="relative z-30 w-full px-3 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      {/* Left: Official Emblem & Identity */}
      <div className="flex items-center gap-3">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); if (currentView !== 'map') onToggleView(); }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-0.5"
          aria-label="Pemkab Lamongan Beranda"
        >
          <img
            src="/assets/logo-lamongan.svg"
            alt="Lambang Pemerintah Kabupaten Lamongan"
            className="w-8 h-10 sm:w-10 sm:h-12 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/logo-lamongan.svg';
            }}
          />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                {t.officialPortal}
              </span>
              <span className="hidden lg:inline-block">
                <Badge variant="info" type="soft" className="text-[9px] py-0 px-1.5 font-bold">
                  INA DDS
                </Badge>
              </span>
            </div>
            <span className="text-sm sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t.regencyName}
            </span>
          </div>
        </a>
      </div>

      {/* Center: The Signature "SITUS WEB ->" INA DDS Primary Button */}
      <div className="order-last sm:order-none w-full sm:w-auto flex items-center justify-center pt-1 sm:pt-0">
        <Button
          hierarchy="primary"
          size="md"
          onClick={onToggleView}
          prefixIcon={currentView === 'portal' ? <ArrowLeft className="w-4 h-4" /> : undefined}
          suffixIcon={currentView === 'map' ? <ArrowRight className="w-4 h-4" /> : undefined}
          className="font-bold tracking-wide uppercase shadow-md transition-all duration-300 w-full sm:w-auto cursor-pointer"
          aria-label={currentView === 'map' ? 'Kunjungi Situs Web Lengkap' : 'Kembali ke Peta Interaktif'}
        >
          {currentView === 'map' ? t.goToWeb : t.backToMap}
        </Button>
      </div>

      {/* Right: Quick Tools (INA DDS Buttons & Badges) */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Live Analytics Badge Button */}
        <button
          onClick={onOpenAnalytics}
          className="hidden md:inline-flex items-center gap-1.5 p-1 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
          title="Lihat Data Kunjungan Real-Time"
          aria-label="Buka Statistik Analitik Real-time"
        >
          <Badge 
            variant="success" 
            type="soft" 
            prefixIcon={<Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />} 
            className="text-xs font-bold py-1 px-2.5 cursor-pointer"
          >
            {activeVisitors} Online
          </Badge>
        </button>

        {/* Citizen Profile / Sign In with INA DDS Button */}
        <Button
          hierarchy="secondary"
          size="sm"
          onClick={onOpenAuth}
          prefixIcon={<User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          className="cursor-pointer text-xs font-semibold"
          aria-label={citizen ? `Profil: ${citizen.fullName}` : 'Masuk Portal Warga'}
        >
          {citizen ? citizen.fullName.split(' ')[0] : t.login}
        </Button>

        {/* Dark / Light Mode Toggle */}
        <Button
          hierarchy="tertiary"
          size="sm"
          onClick={onToggleTheme}
          className="cursor-pointer p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
          aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          title={theme === 'dark' ? t.lightMode : t.darkMode}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </Button>

        {/* Language Switcher */}
        <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-bold border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onLanguageChange('id')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              lang === 'id'
                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
            aria-label="Pilih Bahasa Indonesia"
          >
            ID
          </button>
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
            aria-label="Switch to English language"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};
