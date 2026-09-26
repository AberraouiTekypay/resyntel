'use client';

import React from 'react';
import Image from 'next/image';
import { Layers, Activity, TrendingDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProblemSection() {
  const { lang, t } = useLanguage();

  return (
    <section id="problem" className="py-24 px-6 bg-[#0B1F33] text-white relative border-t border-white/10 overflow-hidden">
      {/* Subtle fine technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.problem_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.problem_h1}
          </h2>
          <p className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-400 tracking-tight">
            {t.landing.problem_h2}
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.landing.problem_desc}
          </p>
        </div>

        {/* Split Architectural View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Hotel Architectural Photograph with Telemetry Grid */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/15 shadow-2xl bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
                alt="Modern luxury hotel architectural infrastructure"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/40 to-transparent" />

              {/* Technical Telemetry Coordinate Annotations */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-300/80 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                LAT: 31.6295° N · LON: 7.9811° W [MARRAKECH]
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] text-emerald-400/90 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                TELEMETRY: ACTIVE (99.8%)
              </div>

              {/* Integrated Lower Telemetry Strip */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-[#0B1F33]/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                    Infrastructure Model
                  </div>
                  <div className="font-semibold text-white">Central Mechanical Plant & Guest Wings</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[9px] text-cyan-400">NORMALIZED VARIANCE</div>
                  <div className="font-bold text-amber-400">+14.2% Residual</div>
                </div>
              </div>
            </div>

            {/* Subtle Crosshairs */}
            <div className="absolute -top-2 -left-2 text-cyan-400/30 text-xs font-mono select-none">+</div>
            <div className="absolute -bottom-2 -right-2 text-cyan-400/30 text-xs font-mono select-none">+</div>
          </div>

          {/* Right: The Three Concise Operational Principles with Technical Lines */}
          <div className="lg:col-span-6 space-y-8 relative">
            {/* Connecting Vertical Technical Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-500/50 via-teal-400/40 to-emerald-500/50 hidden sm:block" />

            {/* Principle 1: MEASURE */}
            <div className="relative flex items-start gap-5">
              <div className="w-10 h-10 rounded bg-[#0B1F33] border border-cyan-400/60 flex items-center justify-center text-cyan-400 flex-shrink-0 z-10 shadow-lg">
                <span className="font-mono text-xs font-black">01</span>
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-mono text-sm font-bold tracking-widest text-cyan-300 uppercase">
                    {t.landing.problem_measure_title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">[RAW INGESTION]</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {t.landing.problem_measure_desc}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">ELECTRICITY METERS</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">RADEEMA PULSE</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">OPERA / PMS</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">BMS MODBUS</span>
                </div>
              </div>
            </div>

            {/* Principle 2: UNDERSTAND */}
            <div className="relative flex items-start gap-5">
              <div className="w-10 h-10 rounded bg-[#0B1F33] border border-teal-400/60 flex items-center justify-center text-teal-300 flex-shrink-0 z-10 shadow-lg">
                <span className="font-mono text-xs font-black">02</span>
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-mono text-sm font-bold tracking-widest text-teal-300 uppercase">
                    {t.landing.problem_understand_title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">[REGRESSION ENGINE]</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {t.landing.problem_understand_desc}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">WEATHER DEGREE DAYS (CDD)</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">ROOM OCCUPANCY %</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">BASELOAD ISOLATION</span>
                </div>
              </div>
            </div>

            {/* Principle 3: ACT */}
            <div className="relative flex items-start gap-5">
              <div className="w-10 h-10 rounded bg-[#0B1F33] border border-emerald-400/60 flex items-center justify-center text-emerald-300 flex-shrink-0 z-10 shadow-lg">
                <span className="font-mono text-xs font-black">03</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-mono text-sm font-bold tracking-widest text-emerald-300 uppercase">
                    {t.landing.problem_act_title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">[FINANCIAL PAYBACK]</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {t.landing.problem_act_desc}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold">
                    65,200 MAD / YR RECOVERY
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">WORK ORDERS</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">3.9 MO PAYBACK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
