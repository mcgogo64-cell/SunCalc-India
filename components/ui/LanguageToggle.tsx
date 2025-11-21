"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed top-4 right-4 z-50 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 flex">
            <button
                onClick={() => setLanguage("hi")}
                className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
                    language === "hi" ? "bg-secondary text-secondary-foreground shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "text-muted-foreground hover:text-white"
                )}
            >
                हिंदी
            </button>
            <button
                onClick={() => setLanguage("en")}
                className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300",
                    language === "en" ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "text-muted-foreground hover:text-white"
                )}
            >
                ENG
            </button>
        </div>
    );
}
