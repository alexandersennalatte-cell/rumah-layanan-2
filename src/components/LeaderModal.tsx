import React from 'react';
import { Award, CheckCircle, GraduationCap, Quote, Shield } from 'lucide-react';
import { Modal, Badge, Button } from '@idds/react';
import { LeaderInfo, Language } from '../types';

interface LeaderModalProps {
  leader: LeaderInfo | null;
  onClose: () => void;
  lang: Language;
}

export const LeaderModal: React.FC<LeaderModalProps> = ({ leader, onClose, lang }) => {
  if (!leader) return null;
  const isEn = lang === 'en';

  return (
    <Modal
      open={!!leader}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Badge
            variant="info"
            type="soft"
            className="text-xs font-bold"
          >
            {isEn ? leader.roleEn : leader.role}
          </Badge>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Pemerintah Kabupaten Lamongan
          </span>
        </div>
      }
      size="lg"
    >
      <div className="space-y-5 pt-1">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700">
          <div className="relative w-20 h-20 rounded-full border-2 border-blue-400 overflow-hidden shadow-md bg-white dark:bg-slate-900 shrink-0">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {leader.fullTitle}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              {isEn ? leader.roleEn : leader.role}
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-start gap-3">
          <Quote className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            "{isEn ? leader.quoteEn : leader.quote}"
          </p>
        </div>

        {/* Biography */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            {isEn ? 'Biography & Profile' : 'Profil & Riwayat Singkat'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn ? leader.bioEn : leader.bio}
          </p>
        </div>

        {/* Focus Areas */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{isEn ? 'Key Priority Programs' : 'Program Prioritas Utama'}</span>
          </h4>
          <div className="space-y-1.5">
            {(isEn ? leader.focusAreasEn : leader.focusAreas).map((area, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>{isEn ? 'Academic Background' : 'Latar Belakang Pendidikan'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {leader.education.map((edu, idx) => (
              <Badge
                key={idx}
                variant="neutral"
                type="soft"
                className="text-xs font-medium py-1 px-2.5"
              >
                {edu}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 flex justify-end border-t border-slate-100 dark:border-slate-800">
          <Button
            hierarchy="primary"
            size="md"
            onClick={onClose}
            className="cursor-pointer"
          >
            {isEn ? 'Close' : 'Tutup'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
