'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, AlertTriangle, Activity, Zap, Droplets } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroIntelligencePanel() {
  const { lang, t } = useLanguage();

  return (
    <div className="w-full max-w-sm rounded-lg bg-[#0B1F33]/85 backdrop-blur-xl border border-white/15 p-5 shadow-2xl text-left text-white relative group overflow-hidden font-sans">
      {/* Precision Corner Crosshair Accent */}
      <div className="absolute top-2 left-2 text-cyan-400/40 text-[9px] font-mono select-none">+</div>
      <div className="absolute top-2 right-2 text-cyan-400/40 text-[9px] font-mono select-none">+</div>
      <div className="absolute bottom-2 left-2 text-cyan-400/40 text-[9px] font-mono select-none">+</div>
      <div className="absolute bottom-2 right-2 text-cyan-400/40 text-[9px] font-mono select-none">+</div>

      {/* Subtle Scanline / Grid line */}
      <div className="absolute inset-0 bg-[radial-gradient(#18A7A8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            {t.landing.panel_header}
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
          {t.landing.panel_demo_badge}
        </span>
      </div>

      {/* Property Meta */}
      <div className="mb-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {t.landing.panel_hotel}
        </div>
        <div className="text-sm font-semibold text-white tracking-tight flex items-center justify-between">
          <span>{t.landing.panel_property}</span>
          <span className="text-[10px] font-mono text-slate-400">180 KEYS</span>
        </div>
      </div>

      {/* Telemetry Variance Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2.5 rounded bg-white/5 border border-white/10">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{t.landing.panel_energy_label}</span>
          </div>
          <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
            {t.landing.panel_energy_val}
          </div>
        </div>

        <div className="p-2.5 rounded bg-white/5 border border-white/10">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
            <Droplets className="w-3 h-3 text-rose-400" />
            <span>{t.landing.panel_water_label}</span>
          </div>
          <div className="text-base font-bold font-mono text-rose-300 mt-0.5">
            {t.landing.panel_water_val}
          </div>
        </div>
      </div>

      {/* Avoidable Cost Highlight */}
      <div className="p-3 rounded bg-emerald-950/60 border border-emerald-500/40 mb-3.5">
        <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-300/80">
          {t.landing.panel_cost_label}
        </div>
        <div className="text-2xl font-black font-mono text-emerald-400 tracking-tight mt-0.5">
          {t.landing.panel_cost_val}
        </div>
      </div>

      {/* Top Signal Callout */}
      <div className="border border-rose-500/30 bg-rose-950/30 rounded p-2.5 mb-3.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-rose-300 mb-1">
          <span className="flex items-center gap-1 font-bold">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            {t.landing.panel_signal_title}
          </span>
          <span className="text-[9px] text-slate-400">02:00–05:00 UTC</span>
        </div>
        <div className="text-xs font-semibold text-white mb-1.5">
          {t.landing.panel_signal_name}
        </div>

        <div className="grid grid-cols-2 text-[10px] font-mono text-slate-300 border-t border-rose-500/20 pt-1.5 gap-1">
          <div>
            <span className="text-slate-400 block text-[9px]">EXPECTED</span>
            <span>1.8 m³/h</span>
          </div>
          <div>
            <span className="text-rose-400 block text-[9px]">OBSERVED</span>
            <span className="text-rose-300 font-bold">5.4 m³/h</span>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-300 flex items-center justify-between border-t border-rose-500/20 pt-1.5">
          <span>{lang === 'fr' ? 'Impact annuel' : 'Potential annual impact'}:</span>
          <span className="font-mono font-bold text-amber-300">18,700 MAD</span>
        </div>
      </div>

      {/* Action CTA */}
      <Link
        href="/water"
        className="w-full py-2 px-3 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-between transition-colors group-hover:border-cyan-400/50"
      >
        <span className="text-cyan-300 font-mono text-[11px] tracking-wide">
          [{t.landing.panel_investigate} →]
        </span>
        <span className="text-[10px] text-slate-400 font-mono">CODE: ANOM-W04</span>
      </Link>
    </div>
  );
}
