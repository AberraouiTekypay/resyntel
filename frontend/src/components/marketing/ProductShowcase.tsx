'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Zap, Droplets, TrendingDown, Layers, Building2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductShowcase() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'energy' | 'water' | 'opportunities' | 'portfolio'>('overview');

  const screens = [
    {
      id: 'overview' as const,
      num: '01',
      title: lang === 'fr' ? 'VUE D’ENSEMBLE DIRIGEANT' : 'EXECUTIVE OVERVIEW',
      desc: lang === 'fr'
        ? 'Indicateur d’efficacité unifié, talon de consommation et synthèse financière en 30 secondes.'
        : 'Unified efficiency score, baseload tracking, and financial summary in 30 seconds.',
      icon: LayoutDashboard,
      route: '/dashboard',
    },
    {
      id: 'energy' as const,
      num: '02',
      title: lang === 'fr' ? 'INTELLIGENCE ÉNERGIE' : 'ENERGY INTELLIGENCE',
      desc: lang === 'fr'
        ? 'Profil de charge horaire, séparation du talon nocturne et modélisation météo CDD/HDD.'
        : 'Hourly load profiles, nocturnal baseload separation, and CDD/HDD weather regression.',
      icon: Zap,
      route: '/energy',
    },
    {
      id: 'water' as const,
      num: '03',
      title: lang === 'fr' ? 'INTELLIGENCE EAU' : 'WATER INTELLIGENCE',
      desc: lang === 'fr'
        ? 'Détection des fuites invisibles et analyse des débits de nuit (5,4 m³/h vs 1,8 attendu).'
        : 'Silent leak detection and overnight flow rate isolation (5.4 m³/h vs 1.8 baseline).',
      icon: Droplets,
      route: '/water',
    },
    {
      id: 'opportunities' as const,
      num: '04',
      title: lang === 'fr' ? 'OPPORTUNITÉS DE GAINS' : 'SAVINGS OPPORTUNITIES',
      desc: lang === 'fr'
        ? '17 actions classées par retour sur investissement rapide (< 4 mois) et impact annuel en MAD.'
        : '17 actions ranked by rapid payback (< 4 months) and verified annual MAD impact.',
      icon: TrendingDown,
      route: '/opportunities',
    },
    {
      id: 'portfolio' as const,
      num: '05',
      title: lang === 'fr' ? 'PORTEFEUILLE MULTI-HÔTELS' : 'PORTFOLIO GOVERNANCE',
      desc: lang === 'fr'
        ? 'Benchmark comparatif entre établissements pour groupes hôteliers et investisseurs.'
        : 'Cross-property benchmarking for hotel ownership groups and management companies.',
      icon: Building2,
      route: '/portfolio',
    },
  ];

  return (
    <section id="platform-showcase" className="py-24 px-6 bg-[#071524] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.product_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.product_title}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-normal max-w-2xl">
            {t.landing.product_subtitle}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10 mb-8">
          {screens.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-md text-xs font-mono tracking-wider uppercase flex items-center gap-2.5 transition-all ${
                  isCurrent
                    ? 'bg-cyan-500 text-[#0B1F33] font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Device / Browser Container */}
        <div className="rounded-xl bg-[#0B1F33] border border-white/15 shadow-2xl overflow-hidden">
          {/* Mock Browser Header Bar */}
          <div className="bg-[#071524] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <div className="ml-4 px-3 py-1 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span className="text-cyan-400">https://</span>
                <span className="text-slate-200">resyntel.com{screens.find((s) => s.id === activeTab)?.route}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                LIVE DEMO ENVIRONMENT
              </span>
              <Link
                href={screens.find((s) => s.id === activeTab)?.route || '/dashboard'}
                className="text-[11px] font-mono font-semibold text-cyan-300 hover:text-white inline-flex items-center gap-1"
              >
                <span>{lang === 'fr' ? 'Ouvrir en direct' : 'Open live screen'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* High-Fidelity Rendered Screen Content */}
          <div className="p-6 sm:p-8 bg-[#0B1F33] min-h-[460px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      ZEPHYR MARRAKECH · EXECUTIVE DASHBOARD
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {lang === 'fr' ? 'Vue d’Ensemble Resyntel' : 'Resyntel Overview'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      DEMO DATA — LIVE HOTEL INTEGRATION PENDING
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Efficiency Score</div>
                    <div className="text-3xl font-black font-mono text-white mt-1">78 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
                    <div className="text-[10px] text-slate-400 mt-1">Moroccan Benchmark: 88</div>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                    <div className="text-[10px] font-mono uppercase text-emerald-300">Annual Savings Opportunity</div>
                    <div className="text-3xl font-black font-mono text-emerald-400 mt-1">65,200 MAD</div>
                    <div className="text-[10px] text-emerald-300/80 mt-1">Across 17 Opportunities</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-amber-300">Energy Variance</div>
                    <div className="text-3xl font-black font-mono text-amber-300 mt-1">+12.0%</div>
                    <div className="text-[10px] text-slate-400 mt-1">43,800 MAD / yr potential</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-rose-300">Water Variance</div>
                    <div className="text-3xl font-black font-mono text-rose-300 mt-1">+18.0%</div>
                    <div className="text-[10px] text-slate-400 mt-1">18,700 MAD / yr potential</div>
                  </div>
                </div>

                {/* Simulated Chart Container */}
                <div className="p-5 rounded-lg bg-slate-900/80 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-4">
                    <span>MONTHLY CONSUMPTION VS NORMALIZED BASELINE (kWh)</span>
                    <span className="text-cyan-400">ACTUAL (BLUE) VS EXPECTED (CYAN)</span>
                  </div>
                  <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-white/10">
                    {[
                      { m: 'Jan', act: 45, exp: 40 },
                      { m: 'Feb', act: 48, exp: 42 },
                      { m: 'Mar', act: 54, exp: 47 },
                      { m: 'Apr', act: 65, exp: 56 },
                      { m: 'May', act: 78, exp: 68 },
                      { m: 'Jun', act: 92, exp: 80 },
                      { m: 'Jul', act: 108, exp: 95 },
                      { m: 'Aug', act: 115, exp: 100 },
                      { m: 'Sep', act: 90, exp: 79 },
                      { m: 'Oct', act: 70, exp: 62 },
                      { m: 'Nov', act: 52, exp: 46 },
                      { m: 'Dec', act: 48, exp: 41 },
                    ].map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full flex items-end justify-center gap-1 h-36">
                          <div style={{ height: `${d.exp}%` }} className="w-2 sm:w-3 bg-cyan-500/40 rounded-t" />
                          <div style={{ height: `${d.act}%` }} className="w-2 sm:w-3 bg-amber-400 rounded-t" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'water' && (
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      CRITICAL ANOMALY: NOCTURNAL WATER BASELOAD LEAK
                    </div>
                    <div className="text-sm text-slate-200 mt-1">
                      Continuous nocturnal flow of 5.4 m³/h detected between 02:00 and 05:00. Expected baseline is 1.8 m³/h.
                    </div>
                  </div>
                  <div className="font-mono text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Annual Avoidable Cost</div>
                    <div className="text-2xl font-black text-rose-400">18,700 MAD</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">CURRENT FLOW RATE</div>
                    <div className="text-xl font-bold text-white mt-1">5.4 m³ / h</div>
                    <div className="text-rose-400 text-[10px] mt-1">+200% above normal</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">ESTIMATED WATER LOSS</div>
                    <div className="text-xl font-bold text-white mt-1">4,500 m³ / yr</div>
                    <div className="text-slate-400 text-[10px] mt-1">Equivalent to 3.2 Olympic pools</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">RADEEMA WATER TARIFF</div>
                    <div className="text-xl font-bold text-white mt-1">12.50 MAD / m³</div>
                    <div className="text-slate-400 text-[10px] mt-1">Tier 3 commercial hospitality</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'opportunities' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
                  <span>RANKED INTERVENTIONS (17 OPPORTUNITIES)</span>
                  <span className="text-emerald-400 font-bold">TOTAL: 65,200 MAD / YR</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { title: 'Chiller Discharge Setpoint Optimization (+1.5°C)', cat: 'HVAC', save: '18,400 MAD', inv: '6,000 MAD', pay: '3.9 mo', conf: '94%' },
                    { title: 'Nocturnal Water Leak Isolation (Guest Risers B)', cat: 'WATER', save: '18,700 MAD', inv: '2,500 MAD', pay: '1.6 mo', conf: '92%' },
                    { title: 'Pool Filtration Pump Operational Scheduling', cat: 'POOL', save: '9,800 MAD', inv: '1,200 MAD', pay: '1.5 mo', conf: '88%' },
                    { title: 'Kitchen Exhaust Hood Variable Speed Drive', cat: 'KITCHEN', save: '7,200 MAD', inv: '4,500 MAD', pay: '7.5 mo', conf: '85%' },
                  ].map((opp, idx) => (
                    <div key={idx} className="p-3.5 rounded bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-cyan-400/50 transition-all">
                      <div>
                        <div className="font-semibold text-white">{opp.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">CATEGORY: {opp.cat} · CONFIDENCE: {opp.conf}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400">SAVINGS</div>
                          <div className="text-sm font-bold text-emerald-400">{opp.save}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400">PAYBACK</div>
                          <div className="text-sm font-bold text-cyan-300">{opp.pay}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'energy' && (
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-300">
                  ONEE TARIFF OPTIMIZATION & LOAD MANAGEMENT
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">PEAK TIME-OF-USE (18h-22h)</div>
                    <div className="text-xl font-bold text-amber-300 mt-1">1.80 MAD / kWh</div>
                    <div className="text-slate-400 text-[10px] mt-1">High tariff penalty zone</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">OFF-PEAK (23h-07h)</div>
                    <div className="text-xl font-bold text-cyan-300 mt-1">0.95 MAD / kWh</div>
                    <div className="text-slate-400 text-[10px] mt-1">Ideal baseload charging</div>
                  </div>
                  <div className="p-4 rounded bg-white/5 border border-white/10">
                    <div className="text-slate-400 text-[10px]">ADDRESSABLE SAVINGS</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">43,800 MAD / yr</div>
                    <div className="text-slate-400 text-[10px] mt-1">Peak shaving & chiller staging</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400">
                  <span>ZEPHYR HOTELS GROUP · MOROCCAN PIPELINE</span>
                  <span className="text-cyan-400">3 PROPERTIES</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Zephyr Marrakech', loc: 'Marrakech · 180 Keys', score: '78', save: '65,200 MAD', status: 'ACTIVE PILOT' },
                    { name: 'Zephyr Casablanca', loc: 'Casablanca · 210 Keys', score: '82', save: '84,100 MAD', status: 'ONBOARDING' },
                    { name: 'Zephyr Taghazout', loc: 'Agadir / Taghazout · 150 Keys', score: '85', save: '49,300 MAD', status: 'ONBOARDING' },
                  ].map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.loc}</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400">SCORE</div>
                          <div className="font-bold text-white">{p.score}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] text-slate-400">OPPORTUNITY</div>
                          <div className="font-bold text-emerald-400">{p.save}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
