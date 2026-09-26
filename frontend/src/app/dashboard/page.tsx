'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { KPICard } from '@/components/ui/KPICard';
import { ActualVsExpectedChart } from '@/components/charts/ActualVsExpectedChart';
import { OpportunityDrawer } from '@/components/opportunities/OpportunityDrawer';
import { apiClient } from '@/lib/api-client';
import { formatMAD, formatPayback } from '@/lib/formatters';
import { HeroKPIs, EnergyData, WaterData, Opportunity } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ChevronRight, Zap, Droplets, Sparkles, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const [kpis, setKpis] = useState<HeroKPIs | null>(null);
  const [energy, setEnergy] = useState<EnergyData | null>(null);
  const [water, setWater] = useState<WaterData | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const [kpiData, energyData, waterData, oppsData] = await Promise.all([
          apiClient.getKPIs(),
          apiClient.getEnergy(),
          apiClient.getWater(),
          apiClient.getOpportunities({ sort_by: 'savings' })
        ]);
        setKpis(kpiData);
        setEnergy(energyData);
        setWater(waterData);
        setOpportunities(oppsData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !kpis || !energy || !water) {
    return (
      <AppShell>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/4" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-200 rounded-lg" />
            ))}
          </div>
          <div className="h-72 bg-slate-200 rounded-lg" />
        </div>
      </AppShell>
    );
  }

  const priorityOpportunities = opportunities.slice(0, 5);

  return (
    <AppShell>
      {/* Page Header (Section 8: Resyntel Overview) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
            {t.dashboard.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.dashboard.page_subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#087E8B]" />
            <span>{t.dashboard.btn_ask}</span>
          </Link>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#087E8B] hover:bg-[#076a75] text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            <span>{t.dashboard.btn_all_opps}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero KPIs (Section 8) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <KPICard
          title={t.dashboard.kpi_efficiency}
          value={`${kpis.resource_efficiency_score} / 100`}
          subtitle={t.dashboard.kpi_efficiency_sub}
          benchmark={t.dashboard.kpi_efficiency_target}
          indicatorColor="teal"
        />

        <KPICard
          title={t.dashboard.kpi_savings}
          value={formatMAD(kpis.annual_savings_opportunity_mad)}
          subtitle={t.dashboard.kpi_savings_sub}
          varianceType="positive-saving"
          indicatorColor="green"
        />

        <KPICard
          title={t.dashboard.kpi_energy}
          value={`+${kpis.energy_variance_pct}%`}
          subtitle={t.dashboard.kpi_energy_sub}
          variance="+12%"
          varianceType="warning-excess"
          indicatorColor="amber"
        />

        <KPICard
          title={t.dashboard.kpi_water}
          value={`+${kpis.water_variance_pct}%`}
          subtitle={t.dashboard.kpi_water_sub}
          variance="+18%"
          varianceType="warning-excess"
          indicatorColor="red"
        />

        <KPICard
          title={t.dashboard.kpi_carbon}
          value={`+${kpis.carbon_variance_pct}%`}
          subtitle={t.dashboard.kpi_carbon_sub}
          variance="+11%"
          varianceType="warning-excess"
          indicatorColor="amber"
        />
      </div>

      {/* Prominent Overnight Water Leak Alert */}
      <div className="mb-8 bg-red-50/70 border border-red-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#C84C4C] flex-shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-red-950 flex items-center gap-2">
              <span>{t.dashboard.leak_alert_badge}</span>
              <span className="text-[10px] bg-red-200/80 text-red-900 px-1.5 py-0.2 rounded font-semibold uppercase">
                {t.common.critical}
              </span>
            </div>
            <p className="text-xs text-red-800 mt-0.5">
              {t.dashboard.leak_alert_text}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const waterOpp = opportunities.find(o => o.id === 2);
            if (waterOpp) setSelectedOpportunity(waterOpp);
          }}
          className="whitespace-nowrap px-3.5 py-1.5 rounded bg-[#C84C4C] hover:bg-[#b03f3f] text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <span>{t.common.view_opp}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Chart Section */}
      <div className="mb-8">
        <ActualVsExpectedChart
          energyData={energy.monthly_trend}
          waterData={water.monthly_trend}
        />
      </div>

      {/* Savings Hero */}
      <div className="mb-8 bg-white rounded-lg border border-slate-200/90 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.dashboard.savings_hero_title}
            </div>
            <div className="text-3xl lg:text-4xl font-extrabold text-[#2E7D5B] tracking-tight mt-1 font-mono">
              {formatMAD(kpis.annual_savings_opportunity_mad, { perYear: true })}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {t.dashboard.savings_hero_sub}
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 min-w-36">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.nav.energy}</span>
              </div>
              <div className="text-base font-bold text-slate-900 mt-1 font-mono">
                {formatMAD(kpis.savings_breakdown.energy_mad)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t.dashboard.energy_share}</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 min-w-36">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t.nav.water}</span>
              </div>
              <div className="text-base font-bold text-slate-900 mt-1 font-mono">
                {formatMAD(kpis.savings_breakdown.water_mad)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t.dashboard.water_share}</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 min-w-36">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-3.5 h-3.5 rounded-full bg-slate-400 text-white flex items-center justify-center text-[9px] font-bold">O</span>
                <span>{lang === 'fr' ? 'Autres' : 'Other'}</span>
              </div>
              <div className="text-base font-bold text-slate-900 mt-1 font-mono">
                {formatMAD(kpis.savings_breakdown.other_mad)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{t.dashboard.other_share}</div>
            </div>
          </div>
        </div>

        {/* Priority Opportunities Table */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0B1F33] tracking-tight">
              {t.dashboard.priority_title}
            </h2>
            <span className="text-xs text-slate-400">{t.dashboard.priority_subtitle}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold">{t.dashboard.col_opp}</th>
                  <th className="pb-3 font-semibold">{t.dashboard.col_resource}</th>
                  <th className="pb-3 font-semibold text-right">{t.dashboard.col_annual}</th>
                  <th className="pb-3 font-semibold text-right">{t.dashboard.col_payback}</th>
                  <th className="pb-3 font-semibold text-center">{t.dashboard.col_confidence}</th>
                  <th className="pb-3 font-semibold text-right">{t.dashboard.col_action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {priorityOpportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    onClick={() => setSelectedOpportunity(opp)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 pr-4 font-semibold text-slate-900 group-hover:text-[#087E8B]">
                      {opp.title}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        opp.resource_type === 'Energy'
                          ? 'bg-amber-50 text-amber-800'
                          : opp.resource_type === 'Water'
                          ? 'bg-cyan-50 text-cyan-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {opp.resource_type === 'Energy' && <Zap className="w-3 h-3 text-amber-600" />}
                        {opp.resource_type === 'Water' && <Droplets className="w-3 h-3 text-cyan-600" />}
                        {opp.resource_type === 'Energy' ? t.nav.energy : opp.resource_type === 'Water' ? t.nav.water : opp.resource_type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right font-mono font-bold text-[#2E7D5B]">
                      {formatMAD(opp.annual_saving_mad, { perYear: true })}
                    </td>
                    <td className="py-3.5 pr-4 text-right font-mono text-slate-700">
                      {formatPayback(opp.payback_months)}
                    </td>
                    <td className="py-3.5 pr-4 text-center">
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        {lang === 'fr' ? (opp.confidence === 'High' ? 'Élevé' : opp.confidence === 'Medium' ? 'Moyen' : 'Faible') : opp.confidence}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#087E8B] group-hover:underline">
                        <span>{t.common.details}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Opportunity Detail Drawer */}
      <OpportunityDrawer
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </AppShell>
  );
}
