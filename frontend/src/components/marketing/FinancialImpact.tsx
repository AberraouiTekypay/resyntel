'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingDown, DollarSign, ShieldAlert, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FinancialImpact() {
  const { lang, t } = useLanguage();

  return (
    <section id="financial-impact" className="py-24 px-6 bg-[#0B1F33] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Eyebrow & Headline */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{t.landing.financial_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.financial_h1}
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t.landing.financial_sub}
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
            {t.landing.financial_desc}
          </p>
        </div>

        {/* Massive Financial Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {/* Card 1: Annual Savings Hero */}
          <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-500/40 relative group hover:border-emerald-400 transition-all">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-1">
              {lang === 'fr' ? 'ÉCONOMIES ANNUELLES TOTALES' : 'ANNUAL SAVINGS OPPORTUNITY'}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight my-2">
              65,200 <span className="text-xl sm:text-2xl font-normal text-emerald-300">MAD</span>
            </div>
            <div className="text-xs text-slate-300 font-mono flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'fr' ? 'Récupération directe sur marge' : 'Direct bottom-line recovery'}</span>
            </div>
          </div>

          {/* Card 2: Identified Opportunities */}
          <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
              {lang === 'fr' ? 'OPPORTUNITÉS IDENTIFIÉES' : 'IDENTIFIED OPPORTUNITIES'}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight my-2">
              17
            </div>
            <div className="text-xs text-slate-300 font-mono">
              {lang === 'fr' ? 'Sur 4 vecteurs d’exploitation' : 'Across 4 operational vectors'}
            </div>
          </div>

          {/* Card 3: Energy Opportunity */}
          <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 mb-1">
              {lang === 'fr' ? 'GAINS POTENTIELS ÉNERGIE' : 'ENERGY OPPORTUNITY'}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-amber-300 tracking-tight my-2">
              43,800 <span className="text-xl sm:text-2xl font-normal text-slate-400">MAD</span>
            </div>
            <div className="text-xs text-slate-300 font-mono">
              {lang === 'fr' ? '67,2% du gisement total' : '67.2% of total savings opportunity'}
            </div>
          </div>

          {/* Card 4: Water Opportunity */}
          <div className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-rose-400/50 transition-all">
            <div className="text-[10px] font-mono uppercase tracking-widest text-rose-300 mb-1">
              {lang === 'fr' ? 'GAINS POTENTIELS EAU' : 'WATER OPPORTUNITY'}
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-rose-300 tracking-tight my-2">
              18,700 <span className="text-xl sm:text-2xl font-normal text-slate-400">MAD</span>
            </div>
            <div className="text-xs text-slate-300 font-mono">
              {lang === 'fr' ? 'Inclut la fuite nocturne isolée' : 'Includes isolated nocturnal leak'}
            </div>
          </div>
        </div>

        {/* Comparison: Traditional Reactive Utility Bills vs Resyntel Intelligence */}
        <div className="rounded-xl bg-slate-900/90 border border-white/15 p-6 sm:p-8">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
            {lang === 'fr' ? 'ANALYSE COMPARATIVE DE GOUVERNANCE' : 'GOVERNANCE COMPARATIVE ANALYSIS'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="space-y-3 p-5 rounded-lg bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase">
                <ShieldAlert className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Facturation Traditionnelle (Réactive)' : 'Traditional Utility Management (Reactive)'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>{lang === 'fr' ? 'Factures mensuelles ONEE / RADEEMA reçues 30 jours après consommation.' : 'Monthly utility bills received 30 days post-consumption.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>{lang === 'fr' ? 'Incapacité d’isoler si la hausse provient de la météo, de l’occupation ou d’un gaspillage.' : 'Zero attribution: weather, occupancy, or mechanical fault.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✕</span>
                  <span>{lang === 'fr' ? 'Fuites silencieuses et talons nocturnes payés sans recours possible.' : 'Silent leaks and continuous baseloads accepted as overhead.'}</span>
                </li>
              </ul>
            </div>

            {/* The Resyntel Way */}
            <div className="space-y-3 p-5 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase">
                <BarChart3 className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Intelligence Resyntel (Proactive)' : 'Resyntel Intelligence (Proactive)'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200 font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>{lang === 'fr' ? 'Détection en 15 minutes des fuites et dérives de consignes horaires.' : '15-minute anomaly detection isolating leaks and baseload drift.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>{lang === 'fr' ? 'Consommation normalisée selon les degrés-jours et les nuitées réelles.' : 'Regression models normalizing consumption by degree-days & room nights.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>{lang === 'fr' ? 'Pertes traduites immédiatement en MAD avec temps de retour sur investissement.' : 'Inefficiencies quantified in MAD with ranked payback work orders.'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-mono">
              {lang === 'fr'
                ? 'Cas Zephyr Marrakech : 65 200 MAD / an de résultat opérationnel additionnel sans investissement lourd.'
                : 'Zephyr Marrakech Benchmark: 65,200 MAD / year operating profit recovery with minimal capex.'}
            </span>
            <Link
              href="/opportunities"
              className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
            >
              <span>{lang === 'fr' ? 'Voir les 17 opportunités' : 'Explore the 17 opportunities'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
