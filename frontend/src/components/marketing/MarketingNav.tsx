'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Menu, X } from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';

export default function MarketingNav() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1F33]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-[#0B1F33]/90 via-[#0B1F33]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <LogoMark size={34} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg md:text-xl text-white tracking-wider uppercase font-sans group-hover:text-cyan-400 transition-colors">
                RESYNTEL
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono border border-white/15">
                v2.4
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 font-medium tracking-tight">
              {t.brand.descriptor} · {t.brand.company}
            </span>
          </div>
        </Link>

        {/* Center Minimal Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-slate-300">
          <a
            href="#problem"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-cyan-400"
          >
            {lang === 'fr' ? 'Problème' : 'The Reality'}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-cyan-400"
          >
            {lang === 'fr' ? 'Fonctionnement' : 'How It Works'}
          </a>
          <a
            href="#physical-systems"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-cyan-400"
          >
            {lang === 'fr' ? 'Systèmes Hôteliers' : 'Hospitality Systems'}
          </a>
          <a
            href="#financial-impact"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-cyan-400"
          >
            {lang === 'fr' ? 'Impact Financier' : 'Financial Impact'}
          </a>
          <a
            href="#platform-showcase"
            className="hover:text-white transition-colors py-1 hover:border-b hover:border-cyan-400"
          >
            {lang === 'fr' ? 'Plateforme' : 'Platform'}
          </a>
          <Link
            href="/portfolio"
            className="text-cyan-400 hover:text-cyan-300 transition-colors py-1"
          >
            {lang === 'fr' ? 'Groupes Hôteliers' : 'For Hotel Groups'}
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/10 p-0.5 rounded border border-white/15 text-xs text-white">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                lang === 'en'
                  ? 'bg-cyan-500 text-[#0B1F33]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                lang === 'fr'
                  ? 'bg-cyan-500 text-[#0B1F33]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          <Link
            href="/connect"
            className="text-xs font-semibold text-slate-200 hover:text-white transition-colors px-3 py-2 border border-white/20 hover:border-white/40 rounded bg-white/5"
          >
            {t.landing.btn_pilot}
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-gradient-to-r from-[#087E8B] to-[#18A7A8] hover:from-[#0a8c9b] hover:to-[#1bb8b9] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span>{t.landing.btn_explore}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1F33]/98 border-b border-white/15 px-6 py-5 text-sm space-y-4">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-300 uppercase tracking-wide text-xs">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {lang === 'fr' ? 'Problème' : 'The Reality'}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {lang === 'fr' ? 'Fonctionnement' : 'How It Works'}
            </a>
            <a
              href="#physical-systems"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {lang === 'fr' ? 'Systèmes Hôteliers' : 'Hospitality Systems'}
            </a>
            <a
              href="#financial-impact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {lang === 'fr' ? 'Impact Financier' : 'Financial Impact'}
            </a>
            <a
              href="#platform-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white"
            >
              {lang === 'fr' ? 'Plateforme' : 'Platform'}
            </a>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-cyan-400"
            >
              {lang === 'fr' ? 'Groupes Hôteliers' : 'For Hotel Groups'}
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center bg-white/10 p-0.5 rounded text-xs text-white">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  lang === 'en' ? 'bg-cyan-500 text-[#0B1F33]' : 'text-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded text-xs font-bold ${
                  lang === 'fr' ? 'bg-cyan-500 text-[#0B1F33]' : 'text-slate-300'
                }`}
              >
                FR
              </button>
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded bg-cyan-600 text-white font-semibold text-xs inline-flex items-center gap-1.5"
            >
              <span>{t.landing.btn_explore}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
