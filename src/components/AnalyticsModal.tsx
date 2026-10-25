import React from 'react';
import { 
  Activity, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Radio 
} from 'lucide-react';
import { Modal, Badge, Button } from '@idds/react';
import { AnalyticsStats, Language } from '../types';
import { translations } from '../data/translations';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: AnalyticsStats;
  lang: Language;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  isOpen,
  onClose,
  analytics,
  lang,
}) => {
  const isEn = lang === 'en';
  const t = translations[lang];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      title={
        <div className="flex items-center gap-2.5">
          <Badge variant="success" type="soft" className="text-xs font-bold">
            TELEMETRI REAL-TIME
          </Badge>
          <span className="text-base sm:text-lg font-black tracking-wide uppercase text-slate-900 dark:text-white">
            {t.analytics}
          </span>
        </div>
      }
    >
      <div className="p-1 space-y-5 overflow-y-auto max-h-[75vh]">
        {/* Live Indicator Hero Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                {t.liveVisitors}
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
              {analytics.activeVisitors}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Aktif detik ini</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-blue-300 block mb-1">
              {t.todayViews}
            </span>
            <div className="text-2xl font-black text-blue-900 dark:text-blue-100">
              {analytics.todayVisits.toLocaleString()}
            </div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400">+14.2% vs kemarin</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-300 block mb-1">
              {t.cctvStreamCount}
            </span>
            <div className="text-2xl font-black text-purple-900 dark:text-purple-100">
              {analytics.cctvViewsToday.toLocaleString()}
            </div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">6 titik pantau</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
            <span className="text-[10px] font-bold uppercase text-orange-700 dark:text-orange-300 block mb-1">
              {t.complaintsSubmitted}
            </span>
            <div className="text-2xl font-black text-orange-900 dark:text-orange-100">
              {analytics.totalComplaints}
            </div>
            <span className="text-[10px] text-orange-600 dark:text-orange-400">94.8% tuntas</span>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {t.deviceBreakdown}
            </span>
            <Badge variant="neutral" type="soft" className="text-[10px] py-0 px-2">
              Resolusi Responsif
            </Badge>
          </div>

          {/* Progress bar visual */}
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
            <div style={{ width: `${analytics.deviceShare.mobile}%` }} className="bg-emerald-500 h-full" />
            <div style={{ width: `${analytics.deviceShare.desktop}%` }} className="bg-blue-500 h-full" />
            <div style={{ width: `${analytics.deviceShare.tablet}%` }} className="bg-amber-500 h-full" />
          </div>

          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mobile ({analytics.deviceShare.mobile}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-blue-500" />
              <span>Desktop ({analytics.deviceShare.desktop}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tablet className="w-3.5 h-3.5 text-amber-500" />
              <span>Tablet ({analytics.deviceShare.tablet}%)</span>
            </div>
          </div>
        </div>

        {/* Top Accessed Services */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
            {t.topServiceMetrics}
          </h4>
          <div className="space-y-2">
            {analytics.topServices.map((srv, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-black flex items-center justify-center text-slate-700 dark:text-slate-300">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {srv.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  {srv.count.toLocaleString()} aksi
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activities Feed */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>{t.recentActivityFeed}</span>
          </h4>
          <div className="space-y-2">
            {analytics.liveActivities.map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-slate-800/40 border border-emerald-100 dark:border-slate-700 text-xs flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  {isEn ? act.textEn : act.text}
                </span>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-3">
                  {act.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with INA DDS Button */}
        <div className="pt-3 flex justify-end border-t border-slate-100 dark:border-slate-800">
          <Button
            hierarchy="primary"
            size="md"
            onClick={onClose}
            className="cursor-pointer font-bold"
          >
            {isEn ? 'Close' : 'Tutup'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
