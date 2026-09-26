'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { OpportunityDrawer } from '@/components/opportunities/OpportunityDrawer';
import { apiClient } from '@/lib/api-client';
import { formatMAD, formatPayback } from '@/lib/formatters';
import { Opportunity } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Filter, ArrowUpDown, ChevronRight, Zap, Droplets } from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('savings');
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    async function loadData() {
      try {
        const opps = await apiClient.getOpportunities({
          resource: resourceFilter,
          category: categoryFilter,
          sort_by: sortBy
        });
        setOpportunities(opps);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resourceFilter, categoryFilter, sortBy]);

  const categories = ['all', 'HVAC', 'Chiller', 'Water Distribution', 'Hot Water', 'Pool', 'Refrigeration', 'Lighting', 'Baseload'];

  return (
    <AppShell>
      {/* Header and Hero (Section 11 & 18) */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight">
          {t.opportunities.page_title}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {t.opportunities.page_subtitle}
        </p>
      </div>

      {/* Hero Savings Card */}
      <div className="mb-8 bg-white rounded-lg border border-slate-200/90 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.opportunities.hero_title}
          </div>
          <div className="text-4xl lg:text-5xl font-extrabold text-[#2E7D5B] tracking-tight mt-1 font-mono">
            {formatMAD(65200, { perYear: true })}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium">
            {t.opportunities.hero_sub}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 min-w-32">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.nav.energy}</span>
            <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">{formatMAD(43800)}</span>
            <span className="text-[10px] text-slate-500">{lang === 'fr' ? '9 actions' : '9 actions'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 min-w-32">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t.nav.water}</span>
            <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">{formatMAD(18700)}</span>
            <span className="text-[10px] text-slate-500">{lang === 'fr' ? '4 actions' : '4 actions'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 min-w-32">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">{lang === 'fr' ? 'Autres' : 'Other'}</span>
            <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">{formatMAD(2700)}</span>
            <span className="text-[10px] text-slate-500">{lang === 'fr' ? '4 actions' : '4 actions'}</span>
          </div>
        </div>
      </div>

      {/* Filter and Sorting Controls */}
      <div className="bg-white rounded-lg border border-slate-200/90 p-4 mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xs">
        {/* Resource Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.opportunities.filter_resource}</span>
          </span>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs">
            {['all', 'Energy', 'Water', 'Other'].map((res) => (
              <button
                key={res}
                onClick={() => setResourceFilter(res)}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  resourceFilter.toLowerCase() === res.toLowerCase()
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {res === 'all' 
                  ? t.common.all 
                  : (res === 'Energy' ? t.nav.energy : res === 'Water' ? t.nav.water : (lang === 'fr' ? 'Autres' : 'Other'))}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.opportunities.filter_category}
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? (lang === 'fr' ? 'Toutes les catégories' : 'All Categories') : c}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.opportunities.sort_by}</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#087E8B]"
          >
            <option value="savings">{t.opportunities.sort_savings}</option>
            <option value="payback">{t.opportunities.sort_payback}</option>
            <option value="confidence">{t.opportunities.sort_confidence}</option>
            <option value="severity">{t.opportunities.sort_severity}</option>
          </select>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-white rounded-lg border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">{t.opportunities.col_opp}</th>
                <th className="py-3.5 px-3">{t.opportunities.col_resource}</th>
                <th className="py-3.5 px-3">{t.opportunities.col_category}</th>
                <th className="py-3.5 px-3 text-right">{t.opportunities.col_annual}</th>
                <th className="py-3.5 px-3 text-right">{t.opportunities.col_invest}</th>
                <th className="py-3.5 px-3 text-right">{t.opportunities.col_payback}</th>
                <th className="py-3.5 px-3 text-center">{t.opportunities.col_confidence}</th>
                <th className="py-3.5 px-4 text-right">{t.opportunities.col_action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {opportunities.map((opp) => (
                <tr
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#087E8B]">
                    <div className="flex items-center gap-2">
                      <span>{opp.title}</span>
                      {opp.severity === 'Critical' && (
                        <span className="text-[9px] font-bold uppercase bg-red-100 text-red-800 px-1.5 py-0.2 rounded">
                          {t.common.critical}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
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
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {opp.category}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-[#2E7D5B]">
                    {formatMAD(opp.annual_saving_mad, { perYear: true })}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-600">
                    {opp.estimated_investment_mad === 0 ? '0 MAD' : formatMAD(opp.estimated_investment_mad)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-semibold text-slate-800">
                    {formatPayback(opp.payback_months)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      opp.confidence === 'High' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lang === 'fr' ? (opp.confidence === 'High' ? 'Élevé' : opp.confidence === 'Medium' ? 'Moyen' : 'Faible') : opp.confidence}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#087E8B] group-hover:underline">
                      <span>{t.common.analyze}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
