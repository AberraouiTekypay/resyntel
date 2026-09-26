import React from 'react';
import { clsx } from 'clsx';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  variance?: string;
  varianceType?: 'positive-saving' | 'warning-excess' | 'neutral';
  benchmark?: string;
  indicatorColor?: 'navy' | 'teal' | 'green' | 'amber' | 'red';
  className?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  variance,
  varianceType = 'neutral',
  benchmark,
  indicatorColor,
  className,
}: KPICardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {variance && (
          <span
            className={clsx(
              'inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded',
              varianceType === 'warning-excess' && 'bg-amber-50 text-[#C58A20] border border-amber-200/70',
              varianceType === 'positive-saving' && 'bg-emerald-50 text-[#2E7D5B] border border-emerald-200/70',
              varianceType === 'neutral' && 'bg-slate-100 text-slate-700'
            )}
          >
            {varianceType === 'warning-excess' && <ArrowUpRight className="w-3 h-3" />}
            {varianceType === 'positive-saving' && <ArrowDownRight className="w-3 h-3" />}
            {varianceType === 'neutral' && <Minus className="w-3 h-3" />}
            {variance}
          </span>
        )}
      </div>

      <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0B1F33]">
        {value}
      </div>

      {(subtitle || benchmark) && (
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          {subtitle && <span>{subtitle}</span>}
          {benchmark && <span className="text-slate-400 font-mono text-[11px]">{benchmark}</span>}
        </div>
      )}
    </div>
  );
}
