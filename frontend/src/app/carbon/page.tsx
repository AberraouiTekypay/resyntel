'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { KPICard } from '@/components/ui/KPICard';
import { apiClient } from '@/lib/api-client';
import { CarbonData } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Info } from 'lucide-react';

export default function CarbonPage() {
  const [carbon, setCarbon] = useState<CarbonData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiClient.getCarbon();
        setCarbon(data);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !carbon) {
    return (
      <AppShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/4" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-200 rounded-lg" />
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
            {t.carbon.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.carbon.page_subtitle}
          </p>
        </div>
      </div>

      {/* Mandatory Regulatory / Certification Disclaimer */}
      <div className="mb-8 p-3.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">{t.carbon.disclaimer}</span>
          <span className="text-slate-500 ml-1">
            {t.carbon.disclaimer_sub}
          </span>
        </div>
      </div>

      {/* Carbon KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <KPICard
          title={t.carbon.scope_1}
          value={`${carbon.scope_1_tco2e} tCO₂e`}
          subtitle={t.carbon.scope_1_sub}
        />

        <KPICard
          title={t.carbon.scope_2}
          value={`${carbon.scope_2_tco2e} tCO₂e`}
          subtitle={t.carbon.scope_2_sub}
        />

        <KPICard
          title={t.carbon.total_ghg}
          value={`${carbon.total_tco2e} tCO₂e`}
          subtitle={t.carbon.total_ghg_sub}
          variance="+11.0%"
          varianceType="warning-excess"
        />

        <KPICard
          title={t.carbon.co2_guest}
          value={`${carbon.co2e_per_guest_night_kg} kg`}
          subtitle={t.carbon.co2_guest_sub}
          variance="+16.7%"
          varianceType="warning-excess"
        />

        <KPICard
          title={t.carbon.potential_reduction}
          value={`−${carbon.potential_annual_reduction_tco2e} tCO₂e`}
          subtitle={t.carbon.potential_reduction_sub}
          varianceType="positive-saving"
          indicatorColor="green"
        />
      </div>

      {/* Scope Breakdown & Configured Emission Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Scope breakdown list */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h3 className="text-sm font-bold text-[#0B1F33] tracking-tight pb-3 border-b border-slate-100">
            {t.carbon.inventory_title}
          </h3>

          <div className="mt-4 space-y-4">
            {carbon.scope_breakdown.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">
                    {lang === 'fr' 
                      ? item.source.replace('Scope 2: Grid Electricity (ONEE)', 'Scope 2 : Électricité Réseau (ONEE)')
                                   .replace('Scope 1: LPG Boilers (Domestic Hot Water)', 'Scope 1 : Chaudières GPL (Eau Chaude Sanitaire)')
                                   .replace('Scope 1: Kitchen Gas Cooking', 'Scope 1 : Gaz Cuisine')
                                   .replace('Scope 1: Backup Generator Testing', 'Scope 1 : Essais Groupe Électrogène')
                      : item.source}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{item.emissions_tco2e} tCO₂e ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-[#087E8B] rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configured Emission Factors */}
        <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h3 className="text-sm font-bold text-[#0B1F33] tracking-tight pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>{t.carbon.factors_title}</span>
            <span className="text-[10px] text-slate-400 font-mono">{t.carbon.factors_sub}</span>
          </h3>

          <div className="mt-4 space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[10px] font-semibold uppercase text-slate-400">
                {lang === 'fr' ? 'Électricité (Réseau ONEE)' : 'Electricity (ONEE Grid)'}
              </div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {carbon.emission_factors.grid_electricity}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[10px] font-semibold uppercase text-slate-400">
                {lang === 'fr' ? 'Gaz Propane / GPL' : 'Propane / LPG Gas'}
              </div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {carbon.emission_factors.lpg_propane}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[10px] font-semibold uppercase text-slate-400">
                {lang === 'fr' ? 'Gasoil (Groupe Électrogène)' : 'Diesel (Backup Gen)'}
              </div>
              <div className="font-mono font-bold text-slate-900 mt-0.5">
                {carbon.emission_factors.diesel_generator}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
