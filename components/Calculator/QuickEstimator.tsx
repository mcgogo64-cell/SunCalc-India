"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IndianRupee, Sun, Info } from "lucide-react";
import { cn } from "@/lib/utils";
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
    const [netCost, setNetCost] = useState(0);
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

        setSubsidy(calculatedSubsidy);
        setNetCost(marketPrice - calculatedSubsidy);

    }, [bill]);

    return (
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
                        {/* Glow effect behind slider thumb could be added with custom CSS, keeping simple for now */}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹500</span>
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
                        <div className="flex justify-between items-end pt-2">
                            <span className="text-sm font-medium">{t.quick.netCost}</span>
                            <span className="text-2xl font-bold text-secondary">
                                ₹{netCost.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button className="w-full py-3 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                        {t.quick.cta}
                    </button>
                </div>

                {/* Background decorative elements */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
