'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative py-28 px-6 bg-[#0B1F33] text-white overflow-hidden border-t border-white/10">
      {/* Background Architectural Hotel Photography at Night */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2200&q=85"
          alt="Luxury hotel architecture at dusk"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.15]"
        />
        {/* Dark Navy Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/85 to-[#0B1F33]/70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-6">
        {/* Subtle Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/15 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>PILOT AUDIT PROGRAM · ZERO HARDWARE COST</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight font-sans">
          {t.landing.final_h1}
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.landing.final_sub}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/connect"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded bg-gradient-to-r from-[#087E8B] to-[#18A7A8] hover:from-[#0a8c9b] hover:to-[#1bb8b9] text-white text-sm font-semibold tracking-wide shadow-xl transition-all"
          >
            <span>{t.landing.btn_pilot}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-semibold tracking-wide transition-all"
          >
            <span>{t.landing.btn_explore}</span>
            <Compass className="w-4 h-4 text-cyan-300" />
          </Link>
        </div>

        {/* Bottom Corporate Credential */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-400">
          <LogoMark size={24} />
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-white uppercase tracking-wider">RESYNTEL</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">{t.brand.descriptor}</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-400 font-medium">{t.brand.company}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
