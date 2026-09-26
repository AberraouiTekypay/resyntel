'use client';

import React from 'react';

interface BreakdownProps {
  breakdown: Record<string, number>;
  title?: string;
}

export function BreakdownBarChart({ breakdown, title = "Energy Breakdown by Operational Domain" }: BreakdownProps) {
  const colors: Record<string, string> = {
    'HVAC': '#087E8B',
    'Kitchen': '#C58A20',
    'Laundry': '#2E7D5B',
    'Pool & Spa': '#0284C7',
    'Lighting': '#6366F1',
    'Common Areas': '#8B5CF6',
    'Baseload Technical': '#52606D'
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-[#0B1F33] tracking-tight">{title}</h3>
        <span className="text-[11px] text-slate-400 font-mono">100% Sub-metered</span>
      </div>

      {/* Stacked Bar Preview */}
      <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden my-4">
        {Object.entries(breakdown).map(([name, pct]) => (
          <div
            key={name}
            style={{ width: `${pct}%`, backgroundColor: colors[name] || '#52606D' }}
            title={`${name}: ${pct}%`}
            className="h-full transition-all hover:opacity-90 cursor-pointer"
          />
        ))}
      </div>

      {/* Breakdown Items List */}
      <div className="space-y-2.5">
        {Object.entries(breakdown).map(([name, pct]) => {
          const color = colors[name] || '#52606D';
          return (
            <div key={name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: color }} />
                <span className="font-medium text-slate-700">{name}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
                <span className="font-mono font-bold text-slate-900 w-8 text-right">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
