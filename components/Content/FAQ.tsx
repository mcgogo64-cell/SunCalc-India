"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const FAQS = [
        { question: t.faq.items.q1, answer: t.faq.items.a1 },
        { question: t.faq.items.q2, answer: t.faq.items.a2 },
        { question: t.faq.items.q3, answer: t.faq.items.a3 },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">{t.faq.title}</h3>

            {FAQS.map((faq, index) => (
                <div
                    key={index}
                    className="glass-card rounded-xl overflow-hidden border border-white/5"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                        <span className="font-medium text-sm md:text-base pr-4">{faq.question}</span>
                        <ChevronDown className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform duration-300",
                            openIndex === index ? "rotate-180" : ""
                        )} />
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
