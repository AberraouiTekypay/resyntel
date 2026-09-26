'use client';

import React from 'react';
import { ArrowRight, ChevronRight, Activity, Cpu, Search, AlertCircle, DollarSign, Wrench, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function IntelligenceFlow() {
  const { lang, t } = useLanguage();

  const stages = [
    {
      num: '01',
      title: lang === 'fr' ? 'MESURER' : 'MEASURE',
      icon: Activity,
      summary: lang === 'fr' ? 'Télémétrie brute continue' : 'Continuous raw telemetry',
      items: [
        lang === 'fr' ? 'Électricité' : 'Electricity',
        lang === 'fr' ? 'Eau' : 'Water',
        lang === 'fr' ? 'Occupation' : 'Occupancy',
        lang === 'fr' ? 'Météo (CDD)' : 'Weather (CDD)',
        lang === 'fr' ? 'Équipements' : 'Assets',
      ],
      metric: '15-min intervals',
      color: 'border-cyan-500/50 text-cyan-400',
    },
    {
      num: '02',
      title: lang === 'fr' ? 'NORMALISER' : 'NORMALIZE',
      icon: Cpu,
      summary: lang === 'fr' ? 'Modèle thermodynamique' : 'Thermodynamic model',
      items: [
        lang === 'fr' ? 'Consommation attendue' : 'Expected baselines',
        lang === 'fr' ? 'Régression multivariée' : 'Multivariate regression',
        lang === 'fr' ? 'Degrés-jours Marrakech' : 'Marrakech CDD balance',
        lang === 'fr' ? 'Courbe d’occupation' : 'Occupancy weighting',
      ],
      metric: 'R² > 0.91 Fit',
      color: 'border-teal-500/50 text-teal-300',
    },
    {
      num: '03',
      title: lang === 'fr' ? 'DÉTECTER' : 'DETECT',
      icon: Search,
      summary: lang === 'fr' ? 'Résidus statistiques' : 'Statistical residuals',
      items: [
        lang === 'fr' ? 'Écarts anormaux' : 'Anomalies',
        lang === 'fr' ? 'Dérives persistantes' : 'Persistent deviations',
        lang === 'fr' ? 'Fuites nocturnes' : 'Nocturnal leaks',
        lang === 'fr' ? 'Chevauchement CVC' : 'HVAC schedule overrun',
      ],
      metric: '+18% Variance',
      color: 'border-amber-500/50 text-amber-300',
    },
    {
      num: '04',
      title: lang === 'fr' ? 'DIAGNOSTIQUER' : 'DIAGNOSE',
      icon: AlertCircle,
      summary: lang === 'fr' ? 'Isolement de la cause' : 'Root cause isolation',
      items: [
        lang === 'fr' ? 'Boucle d’eau sanitaire' : 'Domestic hot water loop',
        lang === 'fr' ? 'Vanne bloquée' : 'Stuck solenoid valve',
        lang === 'fr' ? 'Talon froid 02h-05h' : '02h-05h Chiller baseload',
        lang === 'fr' ? 'Rendement échangeur' : 'Heat exchanger fouling',
      ],
      metric: 'Confidence 92%',
      color: 'border-rose-500/50 text-rose-300',
    },
    {
      num: '05',
      title: lang === 'fr' ? 'QUANTIFIER' : 'QUANTIFY',
      icon: DollarSign,
      summary: lang === 'fr' ? 'Chiffrage financier MAD' : 'Financial MAD impact',
      items: [
        '65,200 MAD / yr',
        '18,700 MAD leak cost',
        '41.4 tCO2e reduction',
        'ONEE / RADEEMA tariffs',
      ],
      metric: 'Strictly in MAD',
      color: 'border-emerald-500/50 text-emerald-400',
    },
    {
      num: '06',
      title: lang === 'fr' ? 'AGIR' : 'ACT',
      icon: Wrench,
      summary: lang === 'fr' ? 'Ordre de travail ciblé' : 'Prioritized work orders',
      items: [
        lang === 'fr' ? 'Intervention prioritaire' : 'Priority dispatch',
        lang === 'fr' ? 'Consigne froid +1°C' : 'Chiller setpoint +1°C',
        lang === 'fr' ? 'Réparation vanne' : 'Valve seal replacement',
        lang === 'fr' ? 'Planification technique' : 'Engineering schedule',
      ],
      metric: '3.9 mo payback',
      color: 'border-cyan-400/50 text-cyan-300',
    },
    {
      num: '07',
      title: lang === 'fr' ? 'VÉRIFIER' : 'VERIFY',
      icon: ShieldCheck,
      summary: lang === 'fr' ? 'Gains réels certifiés' : 'Permanent baseline lock',
      items: [
        lang === 'fr' ? 'Économies réelles mesurées' : 'Actual savings verified',
        lang === 'fr' ? 'Nouveau talon stabilisé' : 'Lower baseline locked',
        lang === 'fr' ? 'Rapport direction / RBE' : 'Executive GOP report',
        lang === 'fr' ? 'Audit ESG certifié' : 'Audit-grade trail',
      ],
      metric: 'GOP Protected',
      color: 'border-emerald-400/60 text-emerald-300',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0B1F33] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.process_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.landing.process_title}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {t.landing.process_subtitle}
          </p>
        </div>

        {/* 7-Stage Process: Horizontal on large screens, vertical sequence on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="relative bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 flex flex-col justify-between group hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <span className="font-mono text-xs font-black text-slate-400">
                    {stage.num}
                  </span>
                  <Icon className={`w-4 h-4 ${stage.color.split(' ')[1]}`} />
                </div>

                {/* Stage Title */}
                <div className="mb-3">
                  <h3 className="font-mono text-sm font-bold tracking-wider text-white uppercase mb-1">
                    {stage.title}
                  </h3>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {stage.summary}
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1 mb-4 text-[11px] text-slate-300 font-mono">
                  {stage.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-slate-300/90 truncate">
                      <span className="text-cyan-400/70 text-[9px]">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Metric pill */}
                <div className="pt-2 border-t border-white/10 text-right">
                  <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10">
                    {stage.metric}
                  </span>
                </div>

                {/* Horizontal flow arrow on large screens */}
                {idx < stages.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-500 font-mono text-[10px]">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Process Guarantee Callout Strip */}
        <div className="mt-12 p-4 rounded-lg bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-bold tracking-wide">
              {lang === 'fr' ? 'BOUCLE FERMÉE D’EFFICACITÉ' : 'CLOSED-LOOP INTELLIGENCE'}:
            </span>
            <span className="text-slate-400">
              {lang === 'fr'
                ? 'Chaque intervention mécanique est suivie d’une vérification télémétrique jusqu’à confirmation des gains en MAD.'
                : 'Every engineering work order is continuously verified against billing meters to confirm financial recovery.'}
            </span>
          </div>
          <div className="text-emerald-400 font-bold whitespace-nowrap">
            100% RECONCILED WITH BILLING
          </div>
        </div>
      </div>
    </section>
  );
}
