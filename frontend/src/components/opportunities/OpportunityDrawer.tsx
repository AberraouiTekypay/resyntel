'use client';

import React from 'react';
import { Opportunity } from '@/types';
import { formatMAD, formatPayback } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';
import { X, ArrowRight } from 'lucide-react';

interface OpportunityDrawerProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export function OpportunityDrawer({ opportunity, onClose }: OpportunityDrawerProps) {
  const { t, lang } = useLanguage();
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose} 
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-xl bg-white shadow-2xl h-full flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 bg-[#0B1F33] text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                opportunity.resource_type === 'Energy' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : opportunity.resource_type === 'Water'
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                  : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
              }`}>
                {opportunity.resource_type === 'Energy' ? t.nav.energy : opportunity.resource_type === 'Water' ? t.nav.water : opportunity.resource_type} {t.drawer.efficiency_prefix}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                {opportunity.category}
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded font-semibold">
                {lang === 'fr' ? (opportunity.confidence === 'High' ? 'Confiance Élevée' : opportunity.confidence === 'Medium' ? 'Confiance Moyenne' : 'Confiance Faible') : `${opportunity.confidence} Confidence`}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {opportunity.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Zephyr Marrakech · Property Code ZEPHYR-RAK-01
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-slate-800">
          {/* Key Financial KPIs Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{t.drawer.annual_saving}</div>
              <div className="text-lg font-bold text-[#2E7D5B] mt-0.5 font-mono">
                {formatMAD(opportunity.annual_saving_mad, { perYear: true })}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{t.drawer.est_investment}</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5 font-mono">
                {opportunity.estimated_investment_mad === 0 ? '0 MAD' : formatMAD(opportunity.estimated_investment_mad)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{t.drawer.payback}</div>
              <div className="text-lg font-bold text-[#087E8B] mt-0.5 font-mono">
                {formatPayback(opportunity.payback_months)}
              </div>
            </div>
          </div>

          {/* Section: Why was this detected? */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#087E8B]" />
              {t.drawer.why_title}
            </h3>
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2.5 text-xs leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                {opportunity.problem_statement}
              </p>
              <p className="text-slate-600 bg-slate-50 p-3 rounded border-l-2 border-[#087E8B]">
                {opportunity.analytical_evidence}
              </p>
            </div>
          </section>

          {/* Section: Recommended Actions */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
              {t.drawer.rec_title}
            </h3>
            <div className="space-y-2">
              {opportunity.recommended_actions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-lg text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2E7D5B] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Potential Impact */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              {t.drawer.impact_title}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium uppercase">{t.drawer.resource_impact}</div>
                <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                  {opportunity.energy_reduction_mwh && opportunity.energy_reduction_mwh > 0 
                    ? `−${opportunity.energy_reduction_mwh} MWh`
                    : opportunity.water_reduction_m3 && opportunity.water_reduction_m3 > 0
                    ? `−${opportunity.water_reduction_m3.toLocaleString()} m³`
                    : '−Operational'}
                </div>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/80">
                <div className="text-[10px] text-emerald-800 font-medium uppercase">{t.drawer.cost_reduction}</div>
                <div className="text-sm font-bold text-[#2E7D5B] mt-1 font-mono">
                  −{formatMAD(opportunity.annual_saving_mad, { perYear: true })}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium uppercase">{t.drawer.carbon_reduction}</div>
                <div className="text-sm font-bold text-slate-800 mt-1 font-mono">
                  {opportunity.carbon_reduction_tco2e ? `−${opportunity.carbon_reduction_tco2e} tCO₂e` : '−0.1 tCO₂e'}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {t.common.status}: <span className="font-semibold text-slate-800">{opportunity.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {t.drawer.btn_close}
            </button>
            <button
              onClick={() => {
                alert(lang === 'fr' 
                  ? `Action validée pour mise en œuvre sur Zephyr Marrakech : "${opportunity.title}"`
                  : `Action logged for implementation on Zephyr Marrakech: "${opportunity.title}"`);
                onClose();
              }}
              className="px-4 py-1.5 bg-[#087E8B] hover:bg-[#076a75] text-white rounded text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{t.drawer.btn_approve}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
