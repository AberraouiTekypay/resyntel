'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AskResyntelSection() {
  const { lang, t } = useLanguage();

  const conversationPresets = {
    fix_first: {
      question: lang === 'fr' ? 'Que devrions-nous corriger en priorité ?' : 'What should we fix first?',
      response: lang === 'fr'
        ? 'Trois opportunités représentent environ 72% du gisement annuel identifié (65 200 MAD) :\n\n1. Débit d’eau nocturne — 18 700 MAD (Retour : 1,6 mois)\n2. Dérive de consigne CVC — 18 400 MAD (Retour : 3,9 mois)\n3. Horaires de filtration piscine — 9 800 MAD (Retour : 1,5 mois)\n\nL’intervention au retour sur investissement le plus rapide est l’isolement de la fuite d’eau nocturne dans la colonne montante B.'
        : 'Three opportunities account for approximately 72% of the identified annual savings opportunity (65,200 MAD):\n\n1. Overnight water flow — 18,700 MAD (Payback: 1.6 months)\n2. HVAC setpoint deviation — 18,400 MAD (Payback: 3.9 months)\n3. Pool pump operating schedule — 9,800 MAD (Payback: 1.5 months)\n\nThe fastest capital recovery intervention is isolating the overnight water leak in Guest Riser B.',
      actionLink: '/opportunities',
      actionText: lang === 'fr' ? 'Voir l’opportunité →' : 'View opportunity →',
    },
    energy_high: {
      question: lang === 'fr' ? 'Pourquoi la consommation d’énergie est-elle élevée ?' : 'Why is energy consumption high?',
      response: lang === 'fr'
        ? 'L’électricité est supérieure de +12.0% au modèle thermodynamique attendu. Deux facteurs principaux ont été isolés :\n\n• Talon nocturne des groupes froids : Le refroidisseur principal fonctionne à 42% de charge entre 02h00 et 05h00 alors que l’occupation nocturne ne requiert que 18%.\n• Heures de pointe ONEE : Pas d’effacement tarifaire entre 18h00 et 22h00 (tarif à 1,80 MAD/kWh).\n\nImpact financier annuel estimé : 43 800 MAD / an.'
        : 'Electricity consumption is +12.0% above the thermodynamic regression model. Two primary drivers were isolated:\n\n• Chiller nocturnal baseload: The primary chiller continues drawing 42% load between 02:00 and 05:00 when room occupancy only demands 18%.\n• ONEE peak tariff penalty: Zero load-shifting applied between 18:00 and 22:00 (peak tariff: 1.80 MAD/kWh).\n\nEstimated annual financial impact: 43,800 MAD / year.',
      actionLink: '/energy',
      actionText: lang === 'fr' ? 'Voir l’analyse énergie →' : 'View energy breakdown →',
    },
    water_leak: {
      question: lang === 'fr' ? 'Que s’est-il passé avec la consommation d’eau ?' : 'What happened to water consumption?',
      response: lang === 'fr'
        ? 'Un signal critique a été détecté : le débit nocturne en heures creuses (02h-05h) s’élève à 5,4 m³/h contre une consigne normale de 1,8 m³/h.\n\nCe résidu continu indique une rupture ou électrovanne fuyante dans la boucle de distribution secondaire. Volume excédentaire estimé à 4 500 m³ / an, facturé au tarif RADEEMA à 12,50 MAD/m³.\n\nCoût annuel direct évitable : 18 700 MAD.'
        : 'A critical anomaly was detected: off-peak nocturnal flow rate (02:00–05:00) is running at 5.4 m³/h against an expected baseline of 1.8 m³/h.\n\nThis continuous residual indicates pipe fracture or stuck solenoid valves in the secondary distribution loop. Estimated annual water loss is 4,500 m³, billed at RADEEMA 12.50 MAD/m³.\n\nAvoidable annual cost: 18,700 MAD.',
      actionLink: '/water',
      actionText: lang === 'fr' ? 'Diagnostiquer la fuite d’eau →' : 'Diagnose water leak →',
    },
  };

  const [currentKey, setCurrentKey] = useState<keyof typeof conversationPresets>('fix_first');
  const activeConversation = conversationPresets[currentKey];

  return (
    <section className="py-24 px-6 bg-[#0B1F33] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Editorial */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.landing.ask_tag}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {t.landing.ask_h1}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {t.landing.ask_sub}
            </p>

            {/* Credibility Box */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>DETERMINISTIC GROUNDING</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Toutes les réponses sont calculées sur la base de la télémétrie réelle, des formules de régression thermique et des grilles tarifaires ONEE/RADEEMA en MAD.'
                  : 'All responses are deterministically anchored in real utility meters, thermodynamic regression models, and ONEE/RADEEMA MAD tariffs.'}
              </p>
            </div>

            {/* Sample Query Selectors */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Questions fréquentes des dirigeants :' : 'Frequent executive questions:'}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setCurrentKey('fix_first')}
                  className={`text-left p-2.5 rounded text-xs font-mono transition-all border ${
                    currentKey === 'fix_first'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  › {conversationPresets.fix_first.question}
                </button>
                <button
                  onClick={() => setCurrentKey('energy_high')}
                  className={`text-left p-2.5 rounded text-xs font-mono transition-all border ${
                    currentKey === 'energy_high'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  › {conversationPresets.energy_high.question}
                </button>
                <button
                  onClick={() => setCurrentKey('water_leak')}
                  className={`text-left p-2.5 rounded text-xs font-mono transition-all border ${
                    currentKey === 'water_leak'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  › {conversationPresets.water_leak.question}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Live Dialogue Container */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#071524] border border-white/15 p-6 shadow-2xl space-y-5 font-mono text-xs">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wider">ASK RESYNTEL ENGINE</span>
                </div>
                <span className="text-[10px] text-slate-400">ZEPHYR MARRAKECH TELEMETRY</span>
              </div>

              {/* User Prompt Bubble */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-cyan-600/30 border border-cyan-500/40 text-cyan-100 rounded-lg p-3.5 max-w-md">
                  <div className="text-[9px] uppercase tracking-wider text-cyan-300/80 mb-1">
                    {lang === 'fr' ? 'DIRIGEANT HÔTELIER' : 'HOTEL EXECUTIVE'}
                  </div>
                  <div className="text-sm font-semibold">{activeConversation.question}</div>
                </div>
                <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[10px] flex-shrink-0">
                  CEO
                </div>
              </div>

              {/* Resyntel Response Bubble */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-cyan-500 to-teal-700 flex items-center justify-center text-white flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-200 space-y-3 flex-1">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-white/10 pb-1.5">
                    <span className="font-bold text-cyan-400">RESYNTEL INTELLIGENCE</span>
                    <span>CONFIDENCE: 94% · 0.4s</span>
                  </div>
                  <div className="text-xs leading-relaxed whitespace-pre-line font-sans">
                    {activeConversation.response}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={activeConversation.actionLink}
                      className="text-cyan-400 hover:text-cyan-300 font-bold font-mono text-[11px] inline-flex items-center gap-1.5"
                    >
                      <span>{activeConversation.actionText}</span>
                    </Link>
                    <span className="text-[10px] text-slate-500">TARIFF: 1.40 MAD/kWh · 12.50 MAD/m³</span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Terminal Input Link */}
              <div className="pt-2">
                <Link
                  href="/ask"
                  className="w-full py-3 px-4 rounded bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs flex items-center justify-between transition-colors"
                >
                  <span className="text-slate-400">
                    {lang === 'fr' ? 'Poser une question sur l’hôtel...' : 'Ask a custom question about hotel telemetry...'}
                  </span>
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <span>{lang === 'fr' ? 'Ouvrir le copilote' : 'Open Copilot'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
