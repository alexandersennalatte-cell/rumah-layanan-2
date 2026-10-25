import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeaderCard } from './components/LeaderCard';
import { LeaderModal } from './components/LeaderModal';
import { InteractiveMap } from './components/InteractiveMap';
import { LandmarkModal } from './components/LandmarkModal';
import { BottomNav } from './components/BottomNav';
import { ModuleModals } from './components/ModuleModals';
import { SitusWebPortal } from './components/SitusWebPortal';
import { AuthModal } from './components/AuthModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { 
  Language, 
  Theme, 
  LeaderInfo, 
  Landmark, 
  NavModuleId, 
  CitizenProfile, 
  AnalyticsStats 
} from './types';
import { leadersData, landmarksData, initialAnalytics } from './data/portalData';

export default function App() {
  const [currentView, setCurrentView] = useState<'map' | 'portal'>('map');
  const [lang, setLang] = useState<Language>('id');
  const [theme, setTheme] = useState<Theme>('light');
  
  // Modals state
  const [selectedLeader, setSelectedLeader] = useState<LeaderInfo | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [activeModule, setActiveModule] = useState<NavModuleId | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // User & Analytics state
  const [citizen, setCitizen] = useState<CitizenProfile | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsStats>(initialAnalytics);

  // Sync dark class and INA DDS data-theme on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Real-time visitor activity simulation ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics((prev) => {
        // Small organic fluctuation (+1, -1, or 0)
        const delta = Math.floor(Math.random() * 5) - 2;
        const newVisitors = Math.max(310, Math.min(390, prev.activeVisitors + delta));
        return {
          ...prev,
          activeVisitors: newVisitors,
          todayVisits: prev.todayVisits + (Math.random() > 0.4 ? 1 : 0),
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleView = () => {
    setCurrentView((prev) => (prev === 'map' ? 'portal' : 'map'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        currentView={currentView}
        onToggleView={handleToggleView}
        lang={lang}
        onLanguageChange={setLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        citizen={citizen}
        activeVisitors={analytics.activeVisitors}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {currentView === 'map' ? (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
            
            {/* Left Leader: Bupati Bojonegoro H. Setyo Wahono */}
            <div className="order-2 lg:order-1 w-full lg:w-1/5 flex justify-center lg:justify-start">
              <LeaderCard
                leader={leadersData.bupati}
                onClick={() => setSelectedLeader(leadersData.bupati)}
                lang={lang}
                position="left"
              />
            </div>

            {/* Center: Illustrated Map of Bojonegoro with Animated Landmarks */}
            <div className="order-1 lg:order-2 w-full lg:w-3/5 flex justify-center">
              <InteractiveMap
                landmarks={landmarksData}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={(lm) => setSelectedLandmark(lm)}
                lang={lang}
              />
            </div>

            {/* Right Leader: Wakil Bupati Bojonegoro Hj. Nurul Azizah */}
            <div className="order-3 lg:order-3 w-full lg:w-1/5 flex justify-center lg:justify-end">
              <LeaderCard
                leader={leadersData.wakil_bupati}
                onClick={() => setSelectedLeader(leadersData.wakil_bupati)}
                lang={lang}
                position="right"
              />
            </div>

          </div>
        ) : (
          /* Full Municipal Government Website View */
          <SitusWebPortal
            onBackToMap={() => setCurrentView('map')}
            lang={lang}
          />
        )}
      </main>

      {/* Bottom Navigation Ribbon (Shown on Map view, can also be accessed anytime) */}
      {currentView === 'map' && (
        <BottomNav
          activeModule={activeModule}
          onSelectModule={(mod) => setActiveModule(mod)}
          lang={lang}
          onLanguageChange={setLang}
        />
      )}

      {/* Dialog Modals */}
      <LeaderModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
        lang={lang}
      />

      <LandmarkModal
        landmark={selectedLandmark}
        onClose={() => setSelectedLandmark(null)}
        lang={lang}
      />

      <ModuleModals
        activeModule={activeModule}
        onClose={() => setActiveModule(null)}
        lang={lang}
        onOpenComplaintForm={() => {
          setActiveModule(null);
          setCurrentView('portal');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        citizen={citizen}
        onSaveProfile={setCitizen}
        lang={lang}
      />

      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        analytics={analytics}
        lang={lang}
      />

    </div>
  );
}
