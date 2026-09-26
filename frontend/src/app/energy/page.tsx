'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { KPICard } from '@/components/ui/KPICard';
import { ActualVsExpectedChart } from '@/components/charts/ActualVsExpectedChart';
import { BreakdownBarChart } from '@/components/charts/BreakdownBarChart';
import { OpportunityDrawer } from '@/components/opportunities/OpportunityDrawer';
import { apiClient } from '@/lib/api-client';
import { formatMAD, formatNumber, formatPayback } from '@/lib/formatters';
import { EnergyData, Opportunity } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Zap, AlertTriangle, ArrowRight, ChevronRight, Activity, ThermometerSun, Bed } from 'lucide-react';

export default function EnergyPage() {
  const [energy, setEnergy] = useState<EnergyData | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const [energyData, opps] = await Promise.all([
          apiClient.getEnergy(),
          apiClient.getOpportunities({ resource: 'Energy' })
        ]);
        setEnergy(energyData);
        setOpportunities(opps);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !energy) {
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
            {t.energy.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.energy.page_subtitle}
          </p>
        </div>
      </div>

      {/* Energy KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <KPICard
          title={t.energy.current_consumption}
          value={`${formatNumber(energy.current_consumption_kwh)} kWh`}
          subtitle={t.energy.current_sub}
        />

        <KPICard
          title={t.energy.expected_consumption}
          value={`${formatNumber(energy.expected_consumption_kwh)} kWh`}
          subtitle={t.energy.expected_sub}
        />

        <KPICard
          title={t.energy.variance_vs_expected}
          value={`+${energy.variance_pct.toFixed(1)}%`}
          variance="+12.0%"
          varianceType="warning-excess"
          subtitle={t.energy.variance_sub}
        />

        <KPICard
          title={t.energy.annual_cost}
          value={formatMAD(energy.cost_mad)}
          subtitle={t.energy.annual_cost_sub}
        />

        <KPICard
          title={t.energy.carbon_footprint}
          value={`${energy.co2_tonnes} tCO₂e`}
          subtitle={t.energy.carbon_sub}
        />
      </div>

      {/* Main Chart: Actual vs Expected Energy */}
      <div className="mb-8">
        <ActualVsExpectedChart
          energyData={energy.monthly_trend}
          waterData={[]}
        />
      </div>

      {/* Secondary Charts: Energy Intensity & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Intensity Metrics */}
        <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-[#0B1F33] tracking-tight">{t.energy.intensity_title}</h3>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{t.energy.intensity_sub}</span>
          </div>

          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#087E8B]" />
                  <span>{t.energy.kwh_per_room_title}</span>
                </span>
                <span className="text-slate-400">{t.energy.kwh_per_room_bench}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {energy.intensity_kwh_per_room} <span className="text-xs font-normal text-slate-500">{lang === 'fr' ? 'kWh / nuitée-chambre' : 'kWh / room-night'}</span>
              </div>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '82%' }} />
              </div>
              <div className="text-[10px] text-amber-700 font-medium mt-1.5">
                {t.energy.kwh_per_room_comment}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#087E8B]" />
                  <span>{t.energy.kwh_per_guest_title}</span>
                </span>
                <span className="text-slate-400">{t.energy.kwh_per_guest_bench}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {energy.intensity_kwh_per_guest_night} <span className="text-xs font-normal text-slate-500">{t.common.per_guest}</span>
              </div>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="text-[10px] text-amber-700 font-medium mt-1.5">
                {t.energy.kwh_per_guest_comment}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown by Sub-System */}
        <div className="lg:col-span-2">
          <BreakdownBarChart breakdown={energy.breakdown_pct} title={t.energy.breakdown_title} />
        </div>
      </div>

      {/* Energy Anomalies */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0B1F33] tracking-tight">
              {t.energy.anomalies_title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.energy.anomalies_sub}
            </p>
          </div>
          <span className="text-xs font-semibold text-[#2E7D5B] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
            {t.energy.total_opp_badge}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {energy.anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              onClick={() => {
                const matchedOpp = opportunities.find(o => o.id === anomaly.id) || {
                  id: anomaly.id,
                  title: anomaly.title,
                  resource_type: 'Energy' as const,
                  category: 'HVAC',
                  annual_saving_mad: anomaly.annual_saving_mad,
                  estimated_investment_mad: 6000,
                  payback_months: anomaly.payback_months,
                  confidence: anomaly.confidence,
                  severity: anomaly.severity,
                  status: 'Identified' as const,
                  problem_statement: anomaly.title,
                  analytical_evidence: anomaly.evidence,
                  recommended_actions: [
                    'Review operational setpoints and schedules.',
                    'Inspect equipment operational duty cycle.',
                    'Implement BMS automated setback.'
                  ]
                };
                setSelectedOpportunity(matchedOpp);
              }}
              className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 cursor-pointer transition-all hover:shadow-xs group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      anomaly.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{anomaly.equipment}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1.5 group-hover:text-[#087E8B] transition-colors">
                    {anomaly.title}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#2E7D5B] font-mono">
                    {formatMAD(anomaly.annual_saving_mad, { perYear: true })}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {t.common.payback}: <strong className="font-semibold text-slate-700">{formatPayback(anomaly.payback_months)}</strong>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-white p-2.5 rounded border border-slate-200/80">
                {anomaly.evidence}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-[#087E8B] font-semibold pt-2 border-t border-slate-200/60">
                <span>{t.energy.view_evidence}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
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
