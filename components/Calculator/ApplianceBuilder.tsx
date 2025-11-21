"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fan, Lightbulb, Refrigerator, Wind, Droplets, Plus, Minus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export default function ApplianceBuilder() {
    const { t } = useLanguage();

    const APPLIANCES = [
        { id: "fan", name: t.appliance.items.fan, watts: 75, icon: Fan },
        { id: "light", name: t.appliance.items.light, watts: 20, icon: Lightbulb },
        { id: "fridge", name: t.appliance.items.fridge, watts: 200, icon: Refrigerator },
        { id: "ac", name: t.appliance.items.ac, watts: 1500, icon: Wind },
        { id: "pump", name: t.appliance.items.pump, watts: 750, icon: Droplets },
    ];

    const [counts, setCounts] = useState<Record<string, number>>({
        fan: 2,
        light: 4,
        fridge: 1,
        ac: 0,
        pump: 0
    });
    const [totalLoad, setTotalLoad] = useState(0);
    const [recommendedKw, setRecommendedKw] = useState(0);

    useEffect(() => {
        let load = 0;
        Object.entries(counts).forEach(([id, count]) => {
            const app = APPLIANCES.find(a => a.id === id);
            if (app) {
                load += app.watts * count;
            }
        });
        setTotalLoad(load);

        // Logic: Total Load / 1000 = kW.
        // Usually for running load, we might need slightly more or less depending on concurrency.
        // Let's assume 80% concurrency factor for peak load calculation or just direct mapping for simplicity.
        // Prompt says: "Power Meter bar... dynamically showing required solar capacity".
        // Let's use a simple formula: Load (Watts) / 1000 = kW needed (approx).
        // Round up to nearest 0.5 or 1.

        const rawKw = load / 1000;
        const rec = Math.ceil(rawKw * 2) / 2; // Round to nearest 0.5
        setRecommendedKw(rec < 1 ? 1 : rec); // Minimum 1kW

    }, [counts]);

    const updateCount = (id: string, delta: number) => {
        setCounts(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Appliance List */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground mb-4">{t.appliance.add}</h3>
                <div className="grid gap-3">
                    {APPLIANCES.map((app) => (
                        <motion.div
                            key={app.id}
                            layout
                            className="bg-card/50 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-card/80 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-muted rounded-lg text-primary">
                                    <app.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{app.name}</p>
                                    <p className="text-xs text-muted-foreground">{app.watts}W</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-background/50 rounded-lg p-1">
                                <button
                                    onClick={() => updateCount(app.id, -1)}
                                    className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                                    disabled={!counts[app.id]}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center font-mono font-bold">{counts[app.id] || 0}</span>
                                <button
                                    onClick={() => updateCount(app.id, 1)}
                                    className="p-1 hover:text-primary transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Power Meter & Result */}
            <div className="flex flex-col justify-center space-y-8">
                <div className="glass-card rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Zap className="w-5 h-5 text-secondary" />
                            {t.appliance.powerLoad}
                        </h3>
                        <span className="text-2xl font-bold font-mono">{totalLoad} W</span>
                    </div>

                    {/* Meter Bar */}
                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((totalLoad / 5000) * 100, 100)}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                        {/* Ticks */}
                        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-full w-[1px] bg-black/20" style={{ left: `${i * 20}%` }} />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0W</span>
                        <span>5000W+</span>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-center">
                        <p className="text-muted-foreground mb-2">{t.appliance.approximate}</p>
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {recommendedKw} kW
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{t.appliance.capacity}</p>
                    </div>

                    <button className="w-full py-3 mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                        {t.appliance.cta}
                    </button>
                </div>
            </div>
        </div>
    );
}
