import React from 'react';
import { MapPin, Sparkles, BookOpen, Navigation } from 'lucide-react';
import { Modal, Badge, Button } from '@idds/react';
import { Landmark, Language } from '../types';

interface LandmarkModalProps {
  landmark: Landmark | null;
  onClose: () => void;
  lang: Language;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({ landmark, onClose, lang }) => {
  if (!landmark) return null;
  const isEn = lang === 'en';

  const categoryVariants: Record<string, { labelId: string; labelEn: string; variant: 'success' | 'info' | 'warning' | 'neutral' }> = {
    heritage: { labelId: 'Cagar Budaya & Sejarah', labelEn: 'Heritage & History', variant: 'warning' },
    nature: { labelId: 'Wisata Bahari & Alam', labelEn: 'Marine & Nature', variant: 'success' },
    infrastructure: { labelId: 'Infrastruktur Publik', labelEn: 'Public Infrastructure', variant: 'info' },
    culture: { labelId: 'Seni & Tradisi', labelEn: 'Arts & Culture', variant: 'neutral' },
    civic: { labelId: 'Pusat Pemerintahan', labelEn: 'Civic Center', variant: 'info' }
  };

  const cat = categoryVariants[landmark.category] || categoryVariants.nature;

  return (
    <Modal
      open={!!landmark}
      onClose={onClose}
      title={
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge
              variant={cat.variant}
              type="soft"
              className="text-xs font-bold"
            >
              {isEn ? cat.labelEn : cat.labelId}
            </Badge>
          </div>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            {isEn ? landmark.nameEn : landmark.name}
          </span>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{landmark.location}</span>
          </div>
        </div>
      }
      size="md"
    >
      <div className="space-y-4 pt-2">
        {/* Highlight Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-850 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {isEn ? landmark.highlightEn : landmark.highlight}
          </span>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            {isEn ? 'Overview' : 'Deskripsi Wilayah'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {isEn ? landmark.descriptionEn : landmark.description}
          </p>
        </div>

        {/* Historical Fact */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>{isEn ? 'Historical & Geo Heritage' : 'Nilai Sejarah & Warisan Daerah'}</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
            "{isEn ? landmark.historicalFactEn : landmark.historicalFact}"
          </p>
        </div>

        {/* Action buttons with INA DDS Button */}
        <div className="pt-3 flex flex-wrap items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
          <Button
            hierarchy="secondary"
            size="md"
            onClick={onClose}
            className="cursor-pointer"
          >
            {isEn ? 'Close' : 'Tutup'}
          </Button>

          <Button
            hierarchy="primary"
            size="md"
            prefixIcon={<Navigation className="w-4 h-4" />}
            onClick={() => {
              window.open(`https://maps.google.com/?q=${encodeURIComponent(`${landmark.name} Lamongan`)}`, '_blank');
            }}
            className="cursor-pointer"
          >
            {isEn ? 'Open in Google Maps' : 'Petunjuk Arah'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
