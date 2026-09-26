'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { KPICard } from '@/components/ui/KPICard';
import { ActualVsExpectedChart } from '@/components/charts/ActualVsExpectedChart';
import { OpportunityDrawer } from '@/components/opportunities/OpportunityDrawer';
import { apiClient } from '@/lib/api-client';
import { formatMAD, formatNumber } from '@/lib/formatters';
import { WaterData, Opportunity } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Droplets, AlertTriangle, ArrowRight, ChevronRight, Search } from 'lucide-react';

export default function WaterPage() {
  const [water, setWater] = useState<WaterData | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const [waterData, opp] = await Promise.all([
          apiClient.getWater(),
          apiClient.getOpportunityDetail(2)
        ]);
        setWater(waterData);
        if (opp) setOpportunity(opp);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !water) {
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

  const anomaly = water.prominent_anomaly;

  return (
    <AppShell>
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
            {t.water.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.water.page_subtitle}
          </p>
        </div>
      </div>

      {/* Water KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <KPICard
          title={t.water.current_consumption}
          value={`${formatNumber(water.current_consumption_m3)} m³`}
          subtitle={t.water.current_sub}
        />

        <KPICard
          title={t.water.expected_consumption}
          value={`${formatNumber(water.expected_consumption_m3)} m³`}
          subtitle={t.water.expected_sub}
        />

        <KPICard
          title={t.water.variance_vs_expected}
          value={`+${water.variance_pct.toFixed(1)}%`}
          variance="+18.0%"
          varianceType="warning-excess"
          subtitle={t.water.variance_sub}
        />

        <KPICard
          title={t.water.annual_cost}
          value={formatMAD(water.cost_mad)}
          subtitle={t.water.annual_cost_sub}
        />

        <KPICard
          title={t.water.litres_per_guest}
          value={`${water.litres_per_guest_night} L`}
          subtitle={t.water.litres_bench}
          variance="+27.6%"
          varianceType="warning-excess"
        />
      </div>

      {/* Prominent Water Anomaly Card (Section 15) */}
      <div className="mb-8 rounded-xl border border-red-300 bg-red-50/50 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-red-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#C84C4C] flex-shrink-0 border border-red-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-red-950 tracking-tight">
                  {t.water.anomaly_title}
                </h2>
                <span className="text-[10px] font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded uppercase">
                  {t.common.critical}
                </span>
                <span className="text-[10px] font-semibold bg-white border border-red-300 text-red-800 px-2 py-0.5 rounded">
                  {lang === 'fr' ? 'Confiance Élevée' : 'High Confidence'}
                </span>
              </div>
              <p className="text-xs text-red-800 mt-0.5">
                {t.water.anomaly_sub}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (opportunity) setSelectedOpportunity(opportunity);
            }}
            className="px-4 py-2 rounded-lg bg-[#C84C4C] hover:bg-[#b03f3f] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <span>{t.water.btn_view_opp}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Anomaly Metrics Table */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
          <div className="bg-white p-3.5 rounded-lg border border-red-200">
            <div className="text-[11px] font-medium text-slate-500 uppercase">{t.water.observed_flow}</div>
            <div className="text-xl font-bold text-red-600 font-mono mt-1">
              5.9 m³ / hour
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t.water.observed_window}</div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-red-200">
            <div className="text-[11px] font-medium text-slate-500 uppercase">{t.water.expected_flow}</div>
            <div className="text-xl font-bold text-slate-700 font-mono mt-1">
              1.8 m³ / hour
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t.water.expected_window}</div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-red-200">
            <div className="text-[11px] font-medium text-slate-500 uppercase">{t.water.annual_excess}</div>
            <div className="text-xl font-bold text-red-700 font-mono mt-1">
              4,500 m³
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t.water.annual_excess_desc}</div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-red-200">
            <div className="text-[11px] font-medium text-slate-500 uppercase">{t.water.annual_cost_metric}</div>
            <div className="text-xl font-bold text-[#2E7D5B] font-mono mt-1">
              {formatMAD(9800)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{t.water.annual_cost_desc}</div>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="bg-white p-4 rounded-lg border border-red-200 text-xs text-slate-700">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-[#087E8B]" />
            <span>{t.water.rec_title}</span>
          </div>
          <p className="leading-relaxed text-slate-600">
            {t.water.rec_text}
          </p>
        </div>
      </div>

      {/* Actual vs Expected Water Chart */}
      <div className="mb-8">
        <ActualVsExpectedChart
          energyData={[]}
          waterData={water.monthly_trend}
        />
      </div>

      {/* Opportunity Detail Drawer */}
      <OpportunityDrawer
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </AppShell>
  );
}
