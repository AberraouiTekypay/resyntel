'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import HeroIntelligencePanel from './HeroIntelligencePanel';

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 px-6 overflow-hidden bg-[#0B1F33]">
      {/* Background Architectural Photography with Dark Navy Grade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85"
          alt="Contemporary luxury hotel architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-layer Dark Navy Vignette and Technical Tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/95 via-[#0B1F33]/85 to-[#0B1F33]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-transparent to-[#0B1F33]/70" />

        {/* Fine Architectural Grid & Coordinate Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Headline & Value Proposition */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{t.landing.hero_eyebrow}</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
            {t.landing.hero_headline_1}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {t.landing.hero_headline_2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            {t.landing.hero_supporting}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded bg-gradient-to-r from-[#087E8B] to-[#18A7A8] hover:from-[#0a8c9b] hover:to-[#1bb8b9] text-white text-sm font-semibold tracking-wide shadow-lg hover:shadow-cyan-900/30 transition-all"
            >
              <span>{t.landing.btn_pilot}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 text-white text-sm font-semibold tracking-wide transition-all"
            >
              <span>{t.landing.btn_explore}</span>
              <Compass className="w-4 h-4 text-cyan-300" />
            </Link>
          </div>

          {/* Credibility Footer Note */}
          <div className="pt-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{t.landing.hero_credibility}</span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-slate-400 text-[11px]">ONEE & RADEEMA MODELING</span>
          </div>
        </div>

        {/* Right Column: Anchored Telemetry Instrument Panel */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <HeroIntelligencePanel />
        </div>
      </div>
    </section>
  );
}
