"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Sun, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
];

export default function QuickEstimator() {
    const [bill, setBill] = useState(2500);
    const [state, setState] = useState("Maharashtra");
    const [systemSize, setSystemSize] = useState(0);
    const [subsidy, setSubsidy] = useState(0);
    const [stateSubsidy, setStateSubsidy] = useState(0);
    const [stateSubsidyLabel, setStateSubsidyLabel] = useState("");
    const [netCost, setNetCost] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const { t } = useLanguage();

    // Calculation Logic
    useEffect(() => {
        // Approx ₹8 per unit average
        const units = bill / 8;
        // 1kW generates ~120 units/month
        const requiredKw = Math.ceil((units / 120) * 2) / 2; // Round to nearest 0.5

        setSystemSize(requiredKw);

        // Market Price approx ₹50,000 per kW
        const marketPrice = requiredKw * 50000;

        // PM Surya Ghar Subsidy (Approx)
        // ₹30k for 1kW, ₹60k for 2kW, ₹78k for 3kW+
        let calculatedSubsidy = 0;
        if (requiredKw <= 1) calculatedSubsidy = 30000;
        else if (requiredKw <= 2) calculatedSubsidy = 60000;
        else calculatedSubsidy = 78000;

        // Cap subsidy at market price (unlikely but safe)
        if (calculatedSubsidy > marketPrice) calculatedSubsidy = marketPrice;

        // State-specific subsidy/bonus logic
        let bonus = 0;
        let bonusLabel = "";

        if (state === "Maharashtra" && units < 100 && requiredKw >= 1 && requiredKw <= 2) {
            bonus = 45000;
            bonusLabel = "Maharashtra Govt Bonus";
        } else if (state === "Uttar Pradesh") {
            bonus = Math.min(requiredKw * 15000, 30000);
            if (bonus > 0) bonusLabel = "UP State Bonus";
        } else if (state === "Delhi") {
            bonus = requiredKw * 2000;
            if (bonus > 0) bonusLabel = "Delhi State Bonus";
        }

        // Avoid negative values if bonus exceeds remaining cost
        const cappedBonus = Math.min(bonus, Math.max(marketPrice - calculatedSubsidy, 0));

        setSubsidy(calculatedSubsidy);
        setStateSubsidy(cappedBonus);
        setStateSubsidyLabel(bonusLabel);
        setNetCost(Math.max(marketPrice - calculatedSubsidy - cappedBonus, 0));

    }, [bill, state]);

    return (
        <>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-muted-foreground">{t.quick.state}</label>
                        <select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full bg-card border border-white/10 rounded-xl p-3 text-foreground focus:ring-2 focus:ring-primary outline-none appearance-none"
                        >
                            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-medium text-muted-foreground">{t.quick.bill}</label>
                            <span className="text-2xl font-bold text-primary flex items-center">
                                <IndianRupee className="w-5 h-5" />
                                {bill.toLocaleString()}
                            </span>
                        </div>

                        <div className="relative h-12 flex items-center">
                            <input
                                type="range"
                                min="500"
                                max="15000"
                                step="100"
                                value={bill}
                                onChange={(e) => setBill(Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>₹1,500</span>
                            <span>₹15,000+</span>
                        </div>
                    </div>
                </div>

                {/* Results Card */}
                <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

                    <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <Sun className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold">{t.quick.recommendation}</h3>
                        </div>

                        <div className="text-center py-4">
                            <div className="text-5xl font-bold text-foreground mb-1">
                                {systemSize} <span className="text-2xl text-muted-foreground">kW</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Rooftop Solar Plant</p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t.quick.marketPrice}</span>
                                <span>₹{(systemSize * 50000).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-green-400 font-medium">
                                <span className="flex items-center gap-1">
                                    {t.quick.subsidy}
                                    <Info className="w-3 h-3" />
                                </span>
                                <span>- ₹{subsidy.toLocaleString()}</span>
                            </div>
                            {stateSubsidy > 0 && (
                                <div className="flex justify-between text-sm text-green-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        राज्य सब्सिडी (State Subsidy){stateSubsidyLabel ? ` • ${stateSubsidyLabel}` : ""}
                                    </span>
                                    <span>- ₹{stateSubsidy.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-end pt-2">
                                <span className="text-sm font-medium">{t.quick.netCost}</span>
                                <span className="text-2xl font-bold text-secondary">
                                    ₹{netCost.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            className="w-full py-3 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                            onClick={() => setShowQuote(true)}
                        >
                            {t.quick.pricingCta || t.quick.cta}
                        </button>

                        <div className="mt-6 space-y-3">
                            <h4 className="text-sm font-semibold text-muted-foreground">Recommended Articles</h4>
                            <div id="container-f90c4e368f493b06f5c3392c4b6097ed" className="overflow-hidden rounded-xl border border-white/10 bg-card/40" />
                        </div>
                    </div>

                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                </div>
            </div>

            {showQuote && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-card/90 border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-50 duration-200">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-foreground">{t.pricingModal?.title}</h4>
                            <button
                                onClick={() => setShowQuote(false)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {t.pricingModal?.close}
                            </button>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-background/60 p-4 space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{t.pricingModal?.systemSize}</span>
                                <span className="font-semibold text-foreground">{systemSize} kW</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{t.pricingModal?.approxCost}</span>
                                <span className="font-semibold text-secondary">
                                    ₹{netCost.toLocaleString()}
                                </span>
                            </div>
                            {stateSubsidy > 0 && (
                                <div className="flex justify-between text-xs text-green-400">
                                    <span>राज्य सब्सिडी • {stateSubsidyLabel || "State Bonus"}</span>
                                    <span>- ₹{stateSubsidy.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {t.pricingModal?.note}
                        </p>
                        <button
                            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all"
                            onClick={() => setShowQuote(false)}
                        >
                            {t.pricingModal?.gotIt}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
