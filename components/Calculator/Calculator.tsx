"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import QuickEstimator from "./QuickEstimator";
import ApplianceBuilder from "./ApplianceBuilder";

export default function SolarCalculator() {
    const [mode, setMode] = useState<"quick" | "appliance">("quick");
    const { t } = useLanguage();

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Header & Toggle */}
            <div className="flex flex-col items-center mb-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground">
                        {t.subtitle}
                    </p>
                </div>

                <div className="bg-card/50 p-1 rounded-full border border-white/10 backdrop-blur-sm relative flex">
                    <button
                        onClick={() => setMode("quick")}
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 flex items-center gap-2",
                            mode === "quick" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Zap className="w-4 h-4" />
                        {t.toggle.quick}
                    </button>
                    <button
                        onClick={() => setMode("appliance")}
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 flex items-center gap-2",
                            mode === "appliance" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Calculator className="w-4 h-4" />
                        {t.toggle.appliance}
                    </button>

                    {/* Sliding Background */}
                    <motion.div
                        layout
                        className="absolute top-1 bottom-1 rounded-full bg-primary shadow-[0_0_20px_rgba(14,165,233,0.5)]"
                        initial={false}
                        animate={{
                            left: mode === "quick" ? "4px" : "50%",
                            width: "calc(50% - 4px)",
                            x: mode === "quick" ? 0 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    {mode === "quick" ? (
                        <motion.div
                            key="quick"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <QuickEstimator />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="appliance"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ApplianceBuilder />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
