'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Zap, Droplets, Leaf, Layers, BarChart3, ChevronRight, Globe } from 'lucide-react';
import { formatMAD } from '@/lib/formatters';
import { LogoFull, LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark size={36} />
            <div>
              <span className="font-black text-xl text-[#0B1F33] tracking-wider uppercase font-sans">
                RESYNTEL
              </span>
              <span className="block text-[10px] text-slate-500 font-medium">
                {t.brand.descriptor} · {t.brand.company}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200/80 text-xs mr-2">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#0B1F33] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  lang === 'fr'
                    ? 'bg-white text-[#0B1F33] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                FR
              </button>
            </div>

            <Link
              href="/connect"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
            >
              {t.landing.btn_pilot}
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0B1F33] hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{t.landing.btn_explore}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-24 px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>{t.landing.hero_badge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-[#0B1F33] tracking-wider uppercase font-sans max-w-4xl mx-auto leading-none">
          RESYNTEL
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-[#087E8B] tracking-tight mt-3">
          {t.landing.hero_title}
        </h2>

        <p className="mt-5 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto font-normal">
          <strong className="text-[#0B1F33] font-semibold">{t.landing.hero_sub}</strong>
        </p>

        <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          {t.landing.hero_desc}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#087E8B] hover:bg-[#076a75] text-white text-sm font-semibold shadow-sm transition-all"
          >
            <span>{t.landing.btn_demo}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/connect"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-xs transition-all"
          >
            <span>{t.landing.btn_pilot}</span>
          </Link>
        </div>

        {/* Hero KPI Preview Banner */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="p-3 border-r border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {t.dashboard.kpi_efficiency}
            </div>
            <div className="text-2xl font-bold text-[#0B1F33] mt-0.5">
              78 <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Zephyr Marrakech Benchmark</div>
          </div>
          <div className="p-3 border-r border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {t.dashboard.kpi_savings}
            </div>
            <div className="text-2xl font-bold text-[#2E7D5B] mt-0.5 font-mono">
              {formatMAD(65200)}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{t.dashboard.kpi_savings_sub}</div>
          </div>
          <div className="p-3 border-r border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {t.dashboard.kpi_energy}
            </div>
            <div className="text-2xl font-bold text-[#C58A20] mt-0.5">+12.0%</div>
            <div className="text-[10px] text-slate-500 mt-1">43,800 MAD Opportunity</div>
          </div>
          <div className="p-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              {t.dashboard.kpi_water}
            </div>
            <div className="text-2xl font-bold text-[#C84C4C] mt-0.5">+18.0%</div>
            <div className="text-[10px] text-slate-500 mt-1">18,700 MAD Opportunity</div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-xs font-bold text-[#087E8B] uppercase tracking-wider">{t.landing.problem_tag}</h2>
            <p className="mt-2 text-3xl font-extrabold text-[#0B1F33] tracking-tight">
              {t.landing.problem_title}
            </p>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              {t.landing.problem_desc}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-2">{t.landing.prob_1_title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.landing.prob_1_desc}</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-2">{t.landing.prob_2_title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.landing.prob_2_desc}</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-sm font-bold text-slate-900 mb-2">{t.landing.prob_3_title}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t.landing.prob_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Platform Modules */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-[#087E8B] uppercase tracking-wider">{t.landing.platform_tag}</h2>
          <p className="mt-2 text-3xl font-bold text-[#0B1F33] tracking-tight">
            {t.landing.platform_title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0B1F33]">{t.nav.energy}</h3>
            <p className="text-xs text-slate-500 mt-1">Electricity, sub-meters, HVAC, chillers, lighting, and baseload draws.</p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <Droplets className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0B1F33]">{t.nav.water}</h3>
            <p className="text-xs text-slate-500 mt-1">Distribution lines, guest-room aerators, swimming pool filtration, irrigation.</p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Leaf className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0B1F33]">{t.nav.carbon}</h3>
            <p className="text-xs text-slate-500 mt-1">Scope 1 direct fuels, Scope 2 ONEE grid emissions, and guest-night intensity.</p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0B1F33]">{t.nav.assets}</h3>
            <p className="text-xs text-slate-500 mt-1">Continuous health index for chillers, condensing boilers, pumps, and freezers.</p>
          </div>

          <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#0B1F33]">{lang === 'fr' ? 'Opérations' : 'Operations'}</h3>
            <p className="text-xs text-slate-500 mt-1">Occupancy normalization, weather regressions, and payback prioritization.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#0B1F33] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{t.landing.how_tag}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight">
              {t.landing.how_title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-2">{t.landing.step_1}</div>
              <p className="text-xs text-slate-300">{t.landing.step_1_desc}</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-2">{t.landing.step_2}</div>
              <p className="text-xs text-slate-300">{t.landing.step_2_desc}</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-2">{t.landing.step_3}</div>
              <p className="text-xs text-slate-300">{t.landing.step_3_desc}</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-2">{t.landing.step_4}</div>
              <p className="text-xs text-slate-300">{t.landing.step_4_desc}</p>
            </div>
            <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-mono text-sm font-bold mb-2">{t.landing.step_5}</div>
              <p className="text-xs text-slate-300">{t.landing.step_5_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-3xl font-extrabold text-[#0B1F33] tracking-tight">
          {t.landing.cta_title}
        </h2>
        <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto">
          {t.landing.cta_desc}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/connect"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B1F33] hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all"
          >
            <span>{t.landing.cta_btn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
          >
            <span>{t.landing.btn_demo}</span>
          </Link>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <LogoMark size={24} />
            <span className="font-bold text-slate-900 uppercase tracking-wider font-sans">
              {t.brand.name}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">{t.brand.descriptor}</span>
            <span className="text-slate-300">·</span>
            <span>{t.brand.company}</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            © {new Date().getFullYear()} Resyntel (resyntel.com). {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
