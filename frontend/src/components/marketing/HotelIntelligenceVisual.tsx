'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Zap, Droplets, Flame, Waves, Utensils, Shirt, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Annotation {
  id: string;
  label: string;
  sub: string;
  metric: string;
  impact: string;
  severity: 'critical' | 'warning' | 'info';
  top: string;
  left: string;
  icon: React.ElementType;
}

export default function HotelIntelligenceVisual() {
  const { lang, t } = useLanguage();
  const [activePin, setActivePin] = useState<string | null>('water');

  const annotations: Annotation[] = [
    {
      id: 'hvac',
      label: 'HVAC & CHILLERS',
      sub: lang === 'fr' ? 'Étage technique toiture' : 'Rooftop chiller plant',
      metric: '+14% vs expected',
      impact: '18,400 MAD / yr',
      severity: 'warning',
      top: '18%',
      left: '28%',
      icon: Zap,
    },
    {
      id: 'pool',
      label: 'POOLS & AMENITIES',
      sub: lang === 'fr' ? 'Pompes de filtration' : 'Filtration & recirculation',
      metric: lang === 'fr' ? '+3.2h / jour au-dessus du repère' : 'Operating 3.2h above benchmark',
      impact: '9,800 MAD / yr',
      severity: 'warning',
      top: '64%',
      left: '46%',
      icon: Waves,
    },
    {
      id: 'water',
      label: 'WATER MAINS & RISERS',
      sub: lang === 'fr' ? 'Boucle sanitaire ailes chambres' : 'Guest wing distribution risers',
      metric: lang === 'fr' ? 'Fuite nocturne : 5.4 m³/h' : 'Night flow anomaly: 5.4 m³/h',
      impact: '18,700 MAD / yr',
      severity: 'critical',
      top: '42%',
      left: '68%',
      icon: Droplets,
    },
    {
      id: 'kitchen',
      label: 'CULINARY & REFRIGERATION',
      sub: lang === 'fr' ? 'Hottes & chambres froides' : 'Exhaust ventilation & walk-ins',
      metric: lang === 'fr' ? 'Pointe en période creuse' : 'Off-peak extraction overrun',
      impact: '7,200 MAD / yr',
      severity: 'info',
      top: '72%',
      left: '18%',
      icon: Utensils,
    },
    {
      id: 'laundry',
      label: 'COMMERCIAL LAUNDRY',
      sub: lang === 'fr' ? 'Vapeur et eau chaude' : 'Boiler heat loss & wash cycles',
      metric: lang === 'fr' ? 'Talon thermique élevé' : 'Condensate recovery drift',
      impact: '6,100 MAD / yr',
      severity: 'info',
      top: '52%',
      left: '82%',
      icon: Shirt,
    },
  ];

  return (
    <section id="physical-systems" className="py-24 px-6 bg-[#071524] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.systems_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.systems_title}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {t.landing.systems_subtitle}
          </p>
        </div>

        {/* Full-Width Panoramic Architectural Image with Interactive Restrained Pins */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=85"
            alt="Resort architectural structure with mechanical systems"
            fill
            sizes="100vw"
            className="object-cover object-center scale-[1.02] filter brightness-[0.7] contrast-[1.1] transition-transform duration-1000 ease-out"
          />
          {/* Subtle Dark Navy Gradient Tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071524] via-transparent to-[#071524]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[#0B1F33]/30 pointer-events-none" />

          {/* Telemetry Coordinate Header Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300 pointer-events-none">
            <div className="bg-[#0B1F33]/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SPATIAL ASSET MAPPING · ZEPHYR MARRAKECH</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 bg-[#0B1F33]/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px]">
              <span className="text-slate-400">STATUS:</span>
              <span className="text-emerald-400 font-bold">5 ACTIVE TELEMETRY CLUSTERS</span>
            </div>
          </div>

          {/* Precision Pins & Telemetry Callouts */}
          {annotations.map((ann) => {
            const Icon = ann.icon;
            const isSelected = activePin === ann.id;
            return (
              <div
                key={ann.id}
                style={{ top: ann.top, left: ann.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActivePin(isSelected ? null : ann.id)}
              >
                {/* Thin Target Ring */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      ann.severity === 'critical'
                        ? 'bg-rose-900/80 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(200,76,76,0.6)]'
                        : ann.severity === 'warning'
                        ? 'bg-amber-900/80 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(197,138,32,0.6)]'
                        : 'bg-cyan-900/80 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(8,126,139,0.6)]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>

                  {/* Pulsing beacon for critical items */}
                  {ann.severity === 'critical' && (
                    <span className="absolute -inset-1 rounded-full border border-rose-500 animate-ping opacity-60 pointer-events-none" />
                  )}
                </div>

                {/* Restrained Technical Callout Card */}
                <div
                  className={`mt-2 -translate-x-1/2 left-1/2 absolute w-52 sm:w-56 rounded bg-[#0B1F33]/95 backdrop-blur-md border p-2.5 text-left shadow-2xl transition-all duration-200 pointer-events-none sm:pointer-events-auto ${
                    isSelected
                      ? 'opacity-100 scale-100 border-cyan-400/80'
                      : 'opacity-85 hover:opacity-100 scale-95 border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-white/10 pb-1 mb-1">
                    <span className="font-bold text-white tracking-wider">{ann.label}</span>
                    <span
                      className={`font-bold ${
                        ann.severity === 'critical'
                          ? 'text-rose-400'
                          : ann.severity === 'warning'
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {ann.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-medium mb-1 truncate">
                    {ann.sub}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-300 font-semibold">{ann.metric}</span>
                    <span className="text-emerald-400 font-bold">{ann.impact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / Quick Selector Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {annotations.map((ann) => {
            const Icon = ann.icon;
            const isSelected = activePin === ann.id;
            return (
              <button
                key={ann.id}
                onClick={() => setActivePin(ann.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase flex items-center gap-2 border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{ann.label}</span>
                <span className="text-emerald-400 font-bold">{ann.impact}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
