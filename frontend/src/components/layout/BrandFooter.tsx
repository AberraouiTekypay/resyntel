'use client';

import React from 'react';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export function BrandFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-12 py-6 border-t border-slate-200/80 bg-white/60 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <LogoMark size={20} />
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 tracking-tight uppercase font-sans">
              {t.brand.name}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">
              {t.brand.descriptor}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">
              {t.brand.company}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>{t.common.location}</span>
          <span>·</span>
          <span>{t.footer.rights}</span>
          <span>·</span>
          <span>{t.footer.assumptions}</span>
        </div>
      </div>
    </footer>
  );
}
