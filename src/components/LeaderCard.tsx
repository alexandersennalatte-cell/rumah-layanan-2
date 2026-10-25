import React from 'react';
import { motion } from 'motion/react';
import { LeaderInfo, Language } from '../types';

interface LeaderCardProps {
  leader: LeaderInfo;
  onClick: () => void;
  lang: Language;
  position: 'left' | 'right';
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ leader, onClick, lang, position }) => {
  const isEn = lang === 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: position === 'left' ? 0.2 : 0.3 }}
      className={`flex flex-col items-center select-none ${
        position === 'left' ? 'lg:items-start' : 'lg:items-end'
      }`}
    >
      <button
        onClick={onClick}
        className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl p-1 transition-transform"
        aria-label={`Lihat Profil ${leader.name} (${leader.role})`}
      >
        {/* Circular Portrait with soft background ring */}
        <div className="relative mb-2">
          {/* Subtle glow / shadow */}
          <div className="absolute inset-0 rounded-full bg-slate-300 dark:bg-slate-700 blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden p-1 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-600">
              <img
                src={leader.image}
                alt={`${leader.role} - ${leader.name}`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = leader.image;
                }}
              />
            </div>
          </div>
        </div>

        {/* Role Pill */}
        <div className="mb-1.5 px-4 py-1 rounded-full bg-slate-200/90 dark:bg-slate-800/90 text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase shadow-xs">
          {isEn ? leader.roleEn : leader.role}
        </div>

        {/* Name Gradient Badge */}
        <div className="px-5 sm:px-7 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-all duration-300 group-hover:-translate-y-0.5">
          {leader.name}
        </div>
      </button>
    </motion.div>
  );
};
