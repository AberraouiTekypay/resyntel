'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, Globe } from 'lucide-react';
import { LogoCompact } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
  currentPeriod?: string;
  onPeriodChange?: (period: string) => void;
}

export function Header({ currentPeriod = '12m', onPeriodChange }: HeaderProps) {
  const [period, setPeriod] = useState(currentPeriod);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const handlePeriodClick = (p: string) => {
    setPeriod(p);
    if (onPeriodChange) onPeriodChange(p);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {/* Left side: Property Selector & Resyntel Descriptor */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setPropertyOpen(!propertyOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-slate-50 border border-slate-200/80 text-left transition-colors"
          >
            <div className="w-6 h-6 rounded bg-[#0B1F33] flex items-center justify-center text-white">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 leading-tight flex items-center gap-1.5">
                {t.common.property_name}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-500">{t.common.location}</div>
            </div>
          </button>

          {propertyOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-40 text-xs">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {t.common.switch_property}
              </div>
              <button
                onClick={() => setPropertyOpen(false)}
                className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-800">Zephyr Marrakech</div>
                  <div className="text-[11px] text-slate-500">180 Keys · Marrakech</div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                  {t.common.active}
                </span>
              </button>
              <button
                onClick={() => setPropertyOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-600"
              >
                <div>
                  <div className="font-medium">Zephyr Agadir</div>
                  <div className="text-[11px] text-slate-400">220 Keys · Agadir</div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  {t.common.pending}
                </span>
              </button>
              <button
                onClick={() => setPropertyOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-slate-600"
              >
                <div>
                  <div className="font-medium">Zephyr Fès</div>
                  <div className="text-[11px] text-slate-400">140 Keys · Fès</div>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  {t.common.pending}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Global Demo Status Banner */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200/90 text-amber-900 text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>{t.common.demo_badge}</span>
        </div>
      </div>

      {/* Right side: Language Switcher, Period Selector, Currency Badge, User Profile */}
      <div className="flex items-center gap-3">
        {/* Language Switcher: EN | FR */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200/80 text-xs">
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

        {/* Period Selector: 30 days, 90 days, 12 months */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200/80 text-xs">
          <button
            onClick={() => handlePeriodClick('30d')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              period === '30d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.common.period_30d}
          </button>
          <button
            onClick={() => handlePeriodClick('90d')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              period === '90d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.common.period_90d}
          </button>
          <button
            onClick={() => handlePeriodClick('12m')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              period === '12m' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.common.period_12m}
          </button>
        </div>

        {/* Currency badge: Strictly MAD */}
        <div className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-semibold border border-slate-200">
          MAD
        </div>

        {/* Executive Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-xs">
          <div className="w-7 h-7 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold text-xs">
            CEO
          </div>
          <div className="hidden lg:block text-left">
            <div className="font-semibold text-slate-900 leading-tight">Zephyr Executive</div>
            <div className="text-[10px] text-slate-500">Live Pilot Session</div>
          </div>
        </div>
      </div>
    </header>
  );
}
