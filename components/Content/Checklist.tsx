"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export default function Checklist() {
    const { t } = useLanguage();

    const ITEMS = [
        { id: 1, label: t.checklist.items.aadhaar },
        { id: 2, label: t.checklist.items.bill },
        { id: 3, label: t.checklist.items.roof },
        { id: 4, label: t.checklist.items.bank },
    ];

    const [checked, setChecked] = useState<number[]>([]);

    const toggle = (id: number) => {
        if (checked.includes(id)) {
            setChecked(checked.filter(c => c !== id));
        } else {
            setChecked([...checked, id]);
        }
    };

    const progress = (checked.length / ITEMS.length) * 100;

    return (
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{t.checklist.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {t.checklist.subtitle}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                    <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <div className="space-y-3">
                    {ITEMS.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => toggle(item.id)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border",
                                checked.includes(item.id)
                                    ? "bg-green-500/10 border-green-500/50"
                                    : "bg-card/30 border-white/5 hover:bg-card/50"
                            )}
                        >
                            {checked.includes(item.id) ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                                <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                checked.includes(item.id) ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {progress === 100 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
                    >
                        <p className="text-green-400 font-bold text-sm">{t.checklist.ready}</p>
                        <p className="text-xs text-green-300/80 mt-1">{t.checklist.chance}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
