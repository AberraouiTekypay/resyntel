'use client';

import React from 'react';
import { ArrowDown, Cpu, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DataArchitecture() {
  const { lang, t } = useLanguage();

  const inputs = [
    { name: 'PMS', sub: 'Opera / Mews / Protel', desc: 'Occupancy, guest check-ins & check-outs' },
    { name: 'BMS / GTC', sub: 'Siemens / Schneider / Johnson', desc: 'HVAC setpoints, valve status, plant schedules' },
    { name: 'SMART METERS', sub: 'Modbus / BACnet / LoRaWAN', desc: '15-minute sub-meter electrical & water pulses' },
    { name: 'UTILITY INVOICES', sub: 'ONEE & RADEEMA', desc: 'Historical tariffs, reactive penalties & peak kW' },
    { name: 'IOT SENSORS', sub: 'Metrikus / Ambient / Flow', desc: 'Targeted wireless temperature & flow monitoring' },
    { name: 'WEATHER APIS', sub: 'Marrakech OpenMeteo', desc: 'Cooling Degree Days (CDD) & solar irradiance' },
    { name: 'HOTEL ERP', sub: 'SAP / Oracle / SunSystems', desc: 'Operational capex & utility ledger budgets' },
  ];

  const outputs = [
    { title: lang === 'fr' ? 'ANOMALIES' : 'ANOMALIES', desc: lang === 'fr' ? 'Écarts résiduels > 10% isolés en temps réel' : 'Real-time residual deviations > 10%' },
    { title: lang === 'fr' ? 'BENCHMARKS' : 'BENCHMARKS', desc: lang === 'fr' ? 'Comparatifs hôtels marocains & normes internationales' : 'Moroccan resort indices & international targets' },
    { title: lang === 'fr' ? 'ÉCONOMIES MAD' : 'MAD SAVINGS', desc: lang === 'fr' ? 'Gains financiers chiffrés en Dirhams' : 'Strictly quantified Dirham impact' },
    { title: lang === 'fr' ? 'ACTIONS' : 'ACTIONS', desc: lang === 'fr' ? 'Ordres de travail techniques prioritaires' : 'Ranked engineering work orders' },
    { title: lang === 'fr' ? 'VÉRIFICATION' : 'VERIFICATION', desc: lang === 'fr' ? 'Audit continu du talon de consommation abaissé' : 'Continuous audit locking lowered baselines' },
  ];

  return (
    <section id="data-flow" className="py-24 px-6 bg-[#071524] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.connect_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.connect_h1}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
            {t.landing.connect_sub}
          </p>
        </div>

        {/* Clean Architecture Diagram Container */}
        <div className="rounded-xl bg-[#0B1F33] border border-white/15 p-6 sm:p-10 shadow-2xl relative">
          {/* Top Layer: Existing Systems Ingestion */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase tracking-wider">
                01 · {lang === 'fr' ? 'SOURCES EXISTANTES DANS L’HÔTEL' : 'EXISTING HOTEL DATA SOURCES'}
              </span>
              <span className="text-cyan-400">HARDWARE-AGNOSTIC ADAPTERS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {inputs.map((src, i) => (
                <div
                  key={i}
                  className="p-3 rounded bg-white/5 border border-white/10 text-left hover:border-cyan-400/50 hover:bg-white/10 transition-all font-mono"
                >
                  <div className="text-xs font-bold text-white uppercase tracking-wide truncate">
                    {src.name}
                  </div>
                  <div className="text-[9px] text-cyan-300 font-medium truncate mt-0.5">
                    {src.sub}
                  </div>
                  <div className="text-[9px] text-slate-400 line-clamp-2 mt-1">
                    {src.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Central Downward Telemetry Flow Lines */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="h-6 w-px bg-gradient-to-b from-cyan-400 to-teal-400" />
            <div className="my-1 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
              <ArrowDown className="w-3 h-3 text-cyan-400 animate-bounce" />
              <span>SECURE TLS INGESTION & DATA NORMALIZATION</span>
            </div>
            <div className="h-6 w-px bg-gradient-to-b from-teal-400 to-emerald-400" />
          </div>

          {/* Core Processing Engine: RESYNTEL */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-slate-900 via-[#07243b] to-slate-900 border border-cyan-400/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-2 left-2 text-cyan-400/30 text-[9px] font-mono">+</div>
            <div className="absolute top-2 right-2 text-cyan-400/30 text-[9px] font-mono">+</div>
            <div className="absolute bottom-2 left-2 text-cyan-400/30 text-[9px] font-mono">+</div>
            <div className="absolute bottom-2 right-2 text-cyan-400/30 text-[9px] font-mono">+</div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-sm font-black tracking-widest text-white uppercase">
                    RESYNTEL INTELLIGENCE ENGINE
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    CORE ANALYTICS
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans max-w-xl">
                  {lang === 'fr'
                    ? 'Régressions multivariées thermodynamiques, filtrage des talons nocturnes et algorithmes d’attribution d’anomalies calibrés pour l’hôtellerie.'
                    : 'Thermodynamic multivariate regression, baseload residual separation, and hospitality-specialized anomaly attribution.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
                <span className="px-2 py-1 rounded bg-black/40 border border-white/10">CDD REGRESSION</span>
                <span className="px-2 py-1 rounded bg-black/40 border border-white/10">ONEE TOU TARIFFS</span>
                <span className="px-2 py-1 rounded bg-black/40 border border-white/10">RADEEMA WATER MATRIX</span>
              </div>
            </div>
          </div>

          {/* Downward Flow to Outputs */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="h-6 w-px bg-gradient-to-b from-emerald-400 to-cyan-400" />
            <div className="my-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
              <ArrowDown className="w-3 h-3 text-emerald-400" />
              <span>ACTIONABLE DECISION OUTPUTS</span>
            </div>
            <div className="h-6 w-px bg-gradient-to-b from-cyan-400 to-emerald-400" />
          </div>

          {/* Bottom Layer: 5 Decisive Outputs */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase tracking-wider">
                02 · {lang === 'fr' ? 'RÉSULTATS OPÉRATIONNELS & FINANCIERS' : 'OPERATIONAL & FINANCIAL DELIVERABLES'}
              </span>
              <span className="text-emerald-400">EXECUTIVE GOVERNANCE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {outputs.map((out, i) => (
                <div
                  key={i}
                  className="p-4 rounded bg-white/5 border border-white/10 text-left font-mono hover:border-emerald-400/60 hover:bg-white/10 transition-all"
                >
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    {out.title}
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans mt-1">
                    {out.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
