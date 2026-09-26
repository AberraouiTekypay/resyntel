'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { apiClient } from '@/lib/api-client';
import { formatMAD } from '@/lib/formatters';
import { PortfolioProperty } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, ArrowRight, MapPin, ChevronRight } from 'lucide-react';

export default function PortfolioPage() {
  const [properties, setProperties] = useState<PortfolioProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiClient.getPortfolio();
        setProperties(data);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalKeys = properties.reduce((sum, p) => sum + p.rooms, 0);
  const totalSavings = properties.reduce((sum, p) => sum + p.annual_savings_mad, 0);

  return (
    <AppShell>
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
            {t.portfolio.page_title}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t.portfolio.page_subtitle}
          </p>
        </div>

        <Link
          href="/connect"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#087E8B] hover:bg-[#076a75] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <span>{t.portfolio.btn_connect}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Group KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.portfolio.group_props}</div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">{properties.length} {lang === 'fr' ? 'Hôtels' : 'Hotels'}</div>
          <div className="text-[10px] text-slate-500 mt-1">{totalKeys} {lang === 'fr' ? 'Chambres au total' : 'Total Guest Rooms'}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.portfolio.group_savings}</div>
          <div className="text-2xl font-bold text-[#2E7D5B] mt-0.5 font-mono">
            {formatMAD(totalSavings, { perYear: true })}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{lang === 'fr' ? 'Sur 3 établissements au Maroc' : 'Across 3 Moroccan Assets'}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.portfolio.active_pilot}</div>
          <div className="text-2xl font-bold text-[#087E8B] mt-0.5">1 / 3 Live</div>
          <div className="text-[10px] text-slate-500 mt-1">{lang === 'fr' ? 'Télémétrie Zephyr Marrakech active' : 'Zephyr Marrakech Telemetry Active'}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.portfolio.group_score}</div>
          <div className="text-2xl font-bold text-slate-900 mt-0.5">78.0 <span className="text-xs font-normal text-slate-400">/ 100</span></div>
          <div className="text-[10px] text-slate-500 mt-1">{lang === 'fr' ? 'Cible de référence : 85.0' : 'Group Benchmark Target: 85.0'}</div>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-lg border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0B1F33]">{t.portfolio.table_title}</h2>
          <span className="text-xs text-slate-400 font-mono">Currency: MAD</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">{t.portfolio.col_property}</th>
                <th className="py-3 px-3">{t.portfolio.col_location}</th>
                <th className="py-3 px-3 text-right">{t.portfolio.col_keys}</th>
                <th className="py-3 px-3 text-right">{t.portfolio.col_score}</th>
                <th className="py-3 px-3 text-right">{t.portfolio.col_savings}</th>
                <th className="py-3 px-3 text-center">{t.portfolio.col_status}</th>
                <th className="py-3 px-4 text-right">{t.portfolio.col_action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-[#0B1F33]">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="group-hover:text-[#087E8B] transition-colors">{prop.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {lang === 'fr' 
                            ? (prop.status === 'Review' ? 'Pilote en cours' : 'Intégration en attente') 
                            : prop.integration}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{prop.city}, {prop.country}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                    {prop.rooms}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">
                    {prop.score} <span className="text-[10px] font-normal text-slate-400">/ 100</span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-[#2E7D5B]">
                    {formatMAD(prop.annual_savings_mad, { perYear: true })}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      prop.status === 'Review'
                        ? 'bg-emerald-100 text-emerald-900 font-bold'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {lang === 'fr' ? (prop.status === 'Review' ? 'En Revue' : 'En Attente') : prop.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {prop.status === 'Review' ? (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#087E8B] hover:underline"
                      >
                        <span>{t.portfolio.btn_open_dash}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/connect"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                      >
                        <span>{t.portfolio.btn_initiate_pilot}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
