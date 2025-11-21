"use client";

import { useState } from "react";
import Calculator from "@/components/Calculator/Calculator";
import HouseModel from "@/components/Visualization/HouseModel";
import Checklist from "@/components/Content/Checklist";
import FAQ from "@/components/Content/FAQ";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import LanguageToggle from "@/components/ui/LanguageToggle";

function MainContent() {
  const { t } = useLanguage();
  const [demoKw, setDemoKw] = useState(3);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <LanguageToggle />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative z-10 container mx-auto">
          <Calculator />
        </div>
      </section>

      {/* Visualization Section */}
      <section className="py-16 px-4 bg-black/20 relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.visualization.title} <span className="text-primary">Solar Power</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.visualization.subtitle}
            </p>

            {/* Demo Slider for Visualization */}
            <div className="p-6 glass-card rounded-xl space-y-4">
              <label className="text-sm font-medium">सिस्टम का साइज़ (System Size): {demoKw} kW</label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={demoKw}
                onChange={(e) => setDemoKw(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>{t.visualization.green}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>{t.visualization.warranty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <HouseModel kw={demoKw} />
          </div>
        </div>
      </section>

      {/* Content & Widgets */}
      <section className="py-16 px-4 container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Adsterra Banner Placeholder */}
          <div className="w-full h-[250px] bg-card/30 border border-white/5 rounded-xl flex items-center justify-center text-muted-foreground animate-pulse">
            Ad Banner Space
          </div>

          <Checklist />
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <FAQ />

          {/* Another Ad Banner */}
          <div className="w-full h-[400px] bg-card/30 border border-white/5 rounded-xl flex items-center justify-center text-muted-foreground animate-pulse">
            Vertical Ad Banner Space
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5">
        <p>© 2024 SolarBharat Next. {t.footer.rights}</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
