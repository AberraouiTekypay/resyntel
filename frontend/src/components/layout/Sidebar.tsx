'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Zap,
  Droplets,
  Leaf,
  Layers,
  Sparkles,
  TrendingDown,
  Building2,
  UploadCloud,
  Home
} from 'lucide-react';
import { clsx } from 'clsx';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/dashboard', label: t.nav.overview, icon: LayoutDashboard },
    { href: '/energy', label: t.nav.energy, icon: Zap },
    { href: '/water', label: t.nav.water, icon: Droplets },
    { href: '/carbon', label: t.nav.carbon, icon: Leaf },
    { href: '/assets', label: t.nav.assets, icon: Layers },
    { href: '/opportunities', label: t.nav.opportunities, icon: TrendingDown },
    { href: '/ask', label: t.nav.ask, icon: Sparkles },
    { href: '/portfolio', label: t.nav.portfolio, icon: Building2 },
    { href: '/connect', label: t.nav.connect, icon: UploadCloud },
  ];

  return (
    <aside className="w-64 bg-[#0B1F33] text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-[#071524]">
      {/* Resyntel Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <Link href="/" className="group block">
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <div>
              <div className="font-black text-white tracking-wider text-base uppercase font-sans group-hover:text-cyan-400 transition-colors">
                RESYNTEL
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                {t.brand.descriptor}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {t.nav.intelligence_platform}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-[#087E8B] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              )}
            >
              <Icon className={clsx('w-4 h-4 flex-shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
              <span>{item.label}</span>
              {item.href === '/opportunities' && (
                <span className="ml-auto text-[10px] font-semibold bg-[#2E7D5B] text-white px-1.5 py-0.5 rounded">
                  17
                </span>
              )}
              {item.href === '/water' && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#C84C4C] animate-pulse" title="Water Anomaly Detected" />
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {t.nav.public_overview}
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-colors"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>{t.nav.landing}</span>
        </Link>
      </nav>

      {/* Bottom Context Badge */}
      <div className="p-4 m-3 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-slate-300 text-[10px] uppercase tracking-wider">
            {t.common.active_property}
          </span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.2 rounded font-mono">
            {t.common.live_demo}
          </span>
        </div>
        <div className="text-white font-bold text-sm tracking-tight">{t.common.property_name}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">180 Keys · {t.common.location}</div>
        <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-medium">
          {t.brand.company}
        </div>
      </div>
    </aside>
  );
}
