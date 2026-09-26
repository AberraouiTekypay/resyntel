'use client';

import React from 'react';
import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function MarketingFooter() {
  const { lang, t } = useLanguage();

  return (
    <footer className="py-12 px-6 bg-[#071524] text-slate-400 text-xs border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-white/10">
        {/* Left Column: Brand & Descriptor */}
        <div className="md:col-span-5 space-y-3">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark size={32} />
            <div>
              <span className="font-black text-lg text-white tracking-wider uppercase font-sans">
                RESYNTEL
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                {t.brand.descriptor}
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
            {t.brand.tagline}
          </p>
          <div className="pt-1 text-[11px] text-slate-500 font-mono">
            {t.brand.company} · resyntel.com
          </div>
        </div>

        {/* Center: Platform Navigation */}
        <div className="md:col-span-4 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold mb-2">
            {lang === 'fr' ? 'PLATEFORME ANALYTIQUE' : 'INTELLIGENCE SUITE'}
          </div>
          <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
            <li>
              <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? 'Vue d’Ensemble Zephyr Marrakech' : 'Zephyr Marrakech Overview'}
              </Link>
            </li>
            <li>
              <Link href="/energy" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? 'Intelligence Énergie & ONEE' : 'Energy Intelligence & ONEE Tariffs'}
              </Link>
            </li>
            <li>
              <Link href="/water" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? 'Intelligence Eau & Fuites Nocturnes' : 'Water Intelligence & Leak Isolation'}
              </Link>
            </li>
            <li>
              <Link href="/opportunities" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? '17 Opportunités Priorisées' : '17 Prioritized Opportunities'}
              </Link>
            </li>
            <li>
              <Link href="/ask" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? 'Copilote Ask Resyntel' : 'Ask Resyntel AI Copilot'}
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-cyan-400 transition-colors">
                › {lang === 'fr' ? 'Gouvernance Portefeuille Multi-Hôtels' : 'Multi-Property Portfolio'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Operational Governance & Compliance */}
        <div className="md:col-span-3 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold mb-2">
            {lang === 'fr' ? 'CONFORMITÉ & DÉPLOIEMENT' : 'GOVERNANCE & AUDIT'}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            {lang === 'fr'
              ? 'Conforme aux réglementations CNDP (Loi marocaine 09-08). Données de référence basées sur les grilles ONEE & RADEEMA.'
              : 'CNDP Data Privacy Compliant (Moroccan Law 09-08). Utility assumptions aligned with ONEE & RADEEMA published tariffs.'}
          </p>
          <div className="pt-2">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
              CURRENCY STANDARD: MAD EXCLUSIVELY
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} Resyntel (resyntel.com). {t.footer.rights}
        </div>
        <div className="flex items-center gap-4">
          <span>{lang === 'fr' ? 'Marrakech · Maroc' : 'Marrakech · Morocco'}</span>
          <span>·</span>
          <span>{t.footer.assumptions}</span>
          <span>·</span>
          <span className="text-slate-400">{t.brand.company}</span>
        </div>
      </div>
    </footer>
  );
}
