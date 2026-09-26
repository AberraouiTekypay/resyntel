'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ConsumptionPoint } from '@/types';
import { formatMAD, formatNumber } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';

interface ActualVsExpectedChartProps {
  energyData: ConsumptionPoint[];
  waterData: ConsumptionPoint[];
}

export function ActualVsExpectedChart({ energyData, waterData }: ActualVsExpectedChartProps) {
  const [metric, setMetric] = useState<'energy' | 'water'>('energy');
  const { t, lang } = useLanguage();

  const data = metric === 'energy' ? energyData : waterData;
  const unit = metric === 'energy' ? 'kWh' : 'm³';

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Chart Header & Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-[#0B1F33] tracking-tight">
            {t.dashboard.chart_title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.dashboard.chart_subtitle}
          </p>
        </div>

        {/* Switcher Button Group */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200/80 text-xs">
          <button
            onClick={() => setMetric('energy')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              metric === 'energy'
                ? 'bg-[#087E8B] text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.dashboard.toggle_energy}
          </button>
          <button
            onClick={() => setMetric('water')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              metric === 'water'
                ? 'bg-[#087E8B] text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.dashboard.toggle_water}
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F4F8" vertical={false} />
            <XAxis
              dataKey="period"
              stroke="#52606D"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#52606D"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const actual = Number(payload[0]?.value || 0);
                  const expected = Number(payload[1]?.value || 0);
                  const variancePct = expected > 0 ? ((actual - expected) / expected) * 100 : 0;
                  const item = payload[0]?.payload as ConsumptionPoint;

                  return (
                    <div className="bg-[#0B1F33] text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-slate-700 min-w-44">
                      <div className="font-semibold text-slate-300 border-b border-slate-700 pb-1 flex justify-between">
                        <span>{label} 2026</span>
                        <span className="text-[#C58A20] font-mono">+{variancePct.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-slate-200">
                        <span>{lang === 'fr' ? 'Réel :' : 'Actual:'}</span>
                        <span className="font-mono font-bold">{formatNumber(actual)} {unit}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>{lang === 'fr' ? 'Prévisionnel :' : 'Expected:'}</span>
                        <span className="font-mono">{formatNumber(expected)} {unit}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 pt-1 border-t border-slate-800">
                        <span>{lang === 'fr' ? 'Coût :' : 'Cost:'}</span>
                        <span className="font-mono font-semibold">{formatMAD(item?.cost_mad || 0)}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
            />
            <Bar
              name={lang === 'fr' ? `Consommation Réelle (${unit})` : `Actual ${unit}`}
              dataKey="actual"
              fill={metric === 'energy' ? '#087E8B' : '#0284C7'}
              radius={[3, 3, 0, 0]}
              barSize={20}
            />
            <Line
              name={lang === 'fr' ? `Référence Prévisionnelle (${unit})` : `Expected Baseline (${unit})`}
              type="monotone"
              dataKey="expected"
              stroke="#52606D"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#52606D' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#087E8B]" />
            <span>{lang === 'fr' ? 'Consommation mensuelle réelle' : 'Monthly Actual Draw'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-500 border-t border-dashed" />
            <span>{lang === 'fr' ? 'Talon normalisé de référence' : 'Normalized Engineering Baseline'}</span>
          </span>
        </div>
        <div className="font-medium text-slate-600 font-mono">
          {metric === 'energy' 
            ? (lang === 'fr' ? 'Écart Électrique : +12,0%' : 'Electricity Variance: +12.0%')
            : (lang === 'fr' ? 'Écart Eau : +18,0%' : 'Water Variance: +18.0%')}
        </div>
      </div>
    </div>
  );
}
