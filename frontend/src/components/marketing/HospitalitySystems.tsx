'use client';

import React from 'react';
import Image from 'next/image';
import { BedDouble, Wind, Flame, Waves, UtensilsCrossed, Shirt, Building, Sprout, Snowflake, Wrench } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HospitalitySystems() {
  const { lang, t } = useLanguage();

  const systems = [
    {
      id: 'rooms',
      name: lang === 'fr' ? 'CHAMBRES' : 'GUEST ROOMS',
      sub: lang === 'fr' ? '180 Clés · Confort & Économie' : '180 Keys · Comfort & Setback',
      metric: '32 kWh / guest-night',
      action: lang === 'fr' ? 'Consignes automatiques PMS' : 'Dynamic PMS setback',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80',
      icon: BedDouble,
    },
    {
      id: 'hvac',
      name: 'HVAC & CHILLERS',
      sub: lang === 'fr' ? 'Groupes froid & centrales de traitement' : 'Chiller sequencing & AHU supply',
      metric: '18,400 MAD / yr saving',
      action: lang === 'fr' ? 'Optimisation débit d’eau glacée' : 'Chilled water temp reset',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      icon: Wind,
    },
    {
      id: 'hot_water',
      name: lang === 'fr' ? 'EAU CHAUDE SANITAIRE' : 'DOMESTIC HOT WATER',
      sub: lang === 'fr' ? 'Boucles de circulation & chaudières' : 'Circulation loops & condensing boilers',
      metric: '60°C target · Zero Legionella',
      action: lang === 'fr' ? 'Régulation pompe bouclage' : 'Pump scheduling & insulation',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      icon: Flame,
    },
    {
      id: 'pool',
      name: lang === 'fr' ? 'PISCINES & SPAS' : 'POOLS & WELLNESS',
      sub: lang === 'fr' ? 'Filtration & compensation' : 'Filtration cycles & thermal covers',
      metric: '9,800 MAD / yr saving',
      action: lang === 'fr' ? 'Effacement heures de pointe' : 'Off-peak pump staggering',
      img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
      icon: Waves,
    },
    {
      id: 'kitchen',
      name: lang === 'fr' ? 'RESTAURATION' : 'CULINARY OPERATIONS',
      sub: lang === 'fr' ? 'Extraction hottes & pianos de cuisson' : 'Demand-controlled hood exhaust',
      metric: '7,200 MAD / yr saving',
      action: lang === 'fr' ? 'Variateur de vitesse VFD' : 'Ventilation interlock sensors',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
      icon: UtensilsCrossed,
    },
    {
      id: 'laundry',
      name: lang === 'fr' ? 'BLANCHISSERIE' : 'COMMERCIAL LAUNDRY',
      sub: lang === 'fr' ? 'Générateurs de vapeur & laveuses' : 'Steam generators & wash tunnels',
      metric: '14.2 L / kg textile',
      action: lang === 'fr' ? 'Récupération de condensat' : 'Heat recovery exchanger',
      img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
      icon: Shirt,
    },
    {
      id: 'common_areas',
      name: lang === 'fr' ? 'ESPACES PUBLICS' : 'COMMON AREAS & LOBBY',
      sub: lang === 'fr' ? 'Atrium, galeries & éclairage' : 'Atrium, ballrooms & architectural light',
      metric: 'Lux / solar daylighting',
      action: lang === 'fr' ? 'Séquençage crépusculaire' : 'Astronomical daylight curves',
      img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
      icon: Building,
    },
    {
      id: 'irrigation',
      name: lang === 'fr' ? 'ESPACES VERTS' : 'IRRIGATION & GROUNDS',
      sub: lang === 'fr' ? 'Jardins marocains & arrosage' : 'Moroccan gardens & soil moisture',
      metric: '18% water conservation',
      action: lang === 'fr' ? 'Sonde hygrométrique sol' : 'Evapotranspiration timing',
      img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      icon: Sprout,
    },
    {
      id: 'refrigeration',
      name: lang === 'fr' ? 'FROID ALIMENTAIRE' : 'REFRIGERATION & WALK-INS',
      sub: lang === 'fr' ? 'Chambres froides positives/négatives' : 'Positive & negative cold rooms',
      metric: '-18°C & +3°C compliance',
      action: lang === 'fr' ? 'Détection joints et givre' : 'Defrost schedule optimization',
      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      icon: Snowflake,
    },
    {
      id: 'back_of_house',
      name: lang === 'fr' ? 'LOCAUX TECHNIQUES' : 'BACK-OF-HOUSE & PUMPS',
      sub: lang === 'fr' ? 'Surpresseurs & sous-stations' : 'Pressure booster skids & sub-stations',
      metric: '99.4% uptime stability',
      action: lang === 'fr' ? 'Indice de santé continu' : 'Vibration & cavitation alerts',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      icon: Wrench,
    },
  ];

  return (
    <section id="systems" className="py-24 px-6 bg-[#0B1F33] text-white relative border-t border-white/10 overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{t.landing.hotel_ops_tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.landing.hotel_ops_h1}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-normal max-w-2xl">
            {t.landing.hotel_ops_sub}
          </p>
        </div>

        {/* 10 Operational Domains Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {systems.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.id}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-white/15 bg-slate-900 shadow-lg flex flex-col justify-end p-4 transition-all duration-300 hover:border-cyan-400/80 hover:shadow-cyan-900/30"
              >
                {/* Background Photographic Crop */}
                <Image
                  src={sys.img}
                  alt={sys.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center filter brightness-[0.55] contrast-[1.1] group-hover:scale-110 group-hover:brightness-[0.4] transition-all duration-700 ease-out"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/70 to-transparent pointer-events-none" />

                {/* Top System Icon & Code */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-slate-400 font-mono text-[10px]">
                  <div className="w-7 h-7 rounded bg-[#0B1F33]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-cyan-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[9px] uppercase">
                    SYS-{sys.id.substring(0, 3).toUpperCase()}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-1 text-left">
                  <h3 className="font-mono text-xs font-bold tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                    {sys.name}
                  </h3>
                  <div className="text-[10px] text-slate-300 line-clamp-1">
                    {sys.sub}
                  </div>
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-400 font-bold">{sys.metric}</span>
                    <span className="text-[9px] text-cyan-300/80 uppercase">
                      {sys.action}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
