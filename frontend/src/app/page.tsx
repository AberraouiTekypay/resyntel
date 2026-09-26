'use client';

import React from 'react';
import MarketingNav from '@/components/marketing/MarketingNav';
import Hero from '@/components/marketing/Hero';
import ProblemSection from '@/components/marketing/ProblemSection';
import IntelligenceFlow from '@/components/marketing/IntelligenceFlow';
import HotelIntelligenceVisual from '@/components/marketing/HotelIntelligenceVisual';
import FinancialImpact from '@/components/marketing/FinancialImpact';
import ProductShowcase from '@/components/marketing/ProductShowcase';
import AskResyntelSection from '@/components/marketing/AskResyntelSection';
import HospitalitySystems from '@/components/marketing/HospitalitySystems';
import DataArchitecture from '@/components/marketing/DataArchitecture';
import FinalCTA from '@/components/marketing/FinalCTA';
import MarketingFooter from '@/components/marketing/MarketingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1F33] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-[#0B1F33]">
      {/* Top Sticky Minimalist Translucent Navigation */}
      <MarketingNav />

      {/* Main Content Flow */}
      <main className="flex-1 w-full">
        {/* 01. Hero Section with Architectural Hotel Photography & Floating Telemetry Panel */}
        <Hero />

        {/* 02. The Reality: Hotels have data, not intelligence */}
        <ProblemSection />

        {/* 03. Closed-Loop Process Pipeline: From Raw Ingestion to Verified Savings */}
        <IntelligenceFlow />

        {/* 04. Spatial Hotel Telemetry: Seeing the Hotel as an Intelligent Operating System */}
        <HotelIntelligenceVisual />

        {/* 05. Financial Quantification: Resource Efficiency is a Financial Problem */}
        <FinancialImpact />

        {/* 06. Enterprise Software Showcase: Real Application Previews & Work Orders */}
        <ProductShowcase />

        {/* 07. Ask Resyntel: Deterministic Conversational Telemetry Copilot */}
        <AskResyntelSection />

        {/* 08. Hospitality Infrastructure: 10 Core Physical Hotel Systems */}
        <HospitalitySystems />

        {/* 09. Hardware-Agnostic Ingestion Architecture: Use the Data You Already Have */}
        <DataArchitecture />

        {/* 10. Final Call to Action: See What Your Hotel is Wasting */}
        <FinalCTA />
      </main>

      {/* Enterprise Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
