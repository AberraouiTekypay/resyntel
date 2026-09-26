'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiClient } from '@/lib/api-client';
import { formatMAD, formatNumber } from '@/lib/formatters';
import { Asset } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Layers, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiClient.getAssets();
        setAssets(data);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredAssets = filter === 'all'
    ? assets
    : assets.filter(a => a.category.toLowerCase() === filter.toLowerCase());

  const totalAssetSavings = assets.reduce((sum, a) => sum + a.potential_savings_mad, 0);

  return (
    <AppShell>
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
            {t.assets.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.assets.page_subtitle}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 text-xs overflow-x-auto">
          {['all', 'HVAC', 'Boiler', 'Pump', 'Pool', 'Refrigeration'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                filter === cat
                  ? 'bg-[#087E8B] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? t.assets.filter_all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Summary Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.assets.monitored_assets}</div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">{assets.length} {lang === 'fr' ? 'Installations' : 'Systems'}</div>
          <div className="text-[10px] text-slate-500 mt-1">{t.assets.monitored_sub}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.assets.health_index}</div>
          <div className="text-2xl font-bold text-amber-600 mt-0.5">76.2 <span className="text-xs font-normal text-slate-400">/ 100</span></div>
          <div className="text-[10px] text-slate-500 mt-1">{t.assets.health_sub}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.assets.detected_anomalies}</div>
          <div className="text-2xl font-bold text-[#C84C4C] mt-0.5">
            {assets.reduce((sum, a) => sum + a.detected_anomalies_count, 0)} {lang === 'fr' ? 'Défauts' : 'Faults'}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{t.assets.detected_sub}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.assets.asset_savings}</div>
          <div className="text-2xl font-bold text-[#2E7D5B] mt-0.5 font-mono">
            {formatMAD(totalAssetSavings, { perYear: true })}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{t.assets.asset_savings_sub}</div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {asset.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        asset.status === 'optimal'
                          ? 'bg-emerald-50 text-[#2E7D5B] border border-emerald-200/70'
                          : asset.status === 'warning'
                          ? 'bg-amber-50 text-[#C58A20] border border-amber-200/70'
                          : 'bg-red-50 text-[#C84C4C] border border-red-200/70'
                      }`}
                    >
                      {asset.status === 'optimal' && <CheckCircle2 className="w-3 h-3" />}
                      {asset.status === 'warning' && <AlertTriangle className="w-3 h-3" />}
                      {lang === 'fr' 
                        ? (asset.status === 'optimal' ? 'Optimal' : asset.status === 'warning' ? 'Attention' : 'Critique')
                        : asset.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 tracking-tight">
                    {asset.name}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Santé</div>
                  <div className="text-lg font-bold text-slate-800 font-mono">
                    {asset.health_score}%
                  </div>
                </div>
              </div>

              {/* Asset Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{t.assets.consumption}</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {formatNumber(asset.annual_consumption)} {asset.consumption_unit}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{t.assets.efficiency}</span>
                  <span className="font-mono font-semibold text-[#087E8B]">
                    {asset.efficiency_metric}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs flex items-center justify-between">
                <span className="text-slate-500">{t.assets.active_anomalies}</span>
                <span className={`font-semibold ${asset.detected_anomalies_count > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                  {asset.detected_anomalies_count} {lang === 'fr' ? 'détectée(s)' : 'detected'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">{t.assets.addressable_saving}</span>
                <span className="text-sm font-bold text-[#2E7D5B] font-mono">
                  {formatMAD(asset.potential_savings_mad, { perYear: true })}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#087E8B] hover:underline flex items-center gap-1 cursor-pointer">
                <span>{t.assets.diagnostics}</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
