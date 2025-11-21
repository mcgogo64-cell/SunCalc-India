"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

interface HouseModelProps {
    kw: number;
}

export default function HouseModel({ kw }: HouseModelProps) {
    const { t } = useLanguage();
    const activeLevel = kw < 1 ? 1 : kw <= 3 ? 2 : 3;

    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
            {/* Image Container */}
            <div className="relative w-full max-w-lg aspect-square">
                <Image
                    src="/house-model.png"
                    alt="Futuristic Solar House"
                    fill
                    className="object-contain"
                    priority
                />

                {/* Overlay Zones - Positioned relative to the image */}
                {/* Note: These positions are approximate based on the prompt description. 
            In a real scenario, we'd fine-tune these coordinates. */}

                {/* Living Room (Bottom Right approx) */}
                <motion.div
                    className={cn(
                        "absolute bottom-[20%] right-[25%] w-[20%] h-[20%] rounded-full blur-xl transition-all duration-700",
                        activeLevel >= 1 ? "bg-yellow-500/40 opacity-100" : "opacity-0"
                    )}
                />

                {/* Bedroom (Bottom Left approx) */}
                <motion.div
                    className={cn(
                        "absolute bottom-[25%] left-[25%] w-[25%] h-[20%] rounded-full blur-xl transition-all duration-700",
                        activeLevel >= 2 ? "bg-cyan-500/40 opacity-100" : "opacity-0"
                    )}
                />

                {/* Kitchen/AC (Top Right approx) */}
                <motion.div
                    className={cn(
                        "absolute top-[30%] right-[30%] w-[20%] h-[25%] rounded-full blur-xl transition-all duration-700",
                        activeLevel >= 3 ? "bg-blue-500/40 opacity-100" : "opacity-0"
                    )}
                />
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                <p className="text-sm text-muted-foreground bg-black/50 backdrop-blur-md py-2 px-4 rounded-full inline-block border border-white/10">
                    {t.visualization.caption.replace("{kw}", kw.toString())}
                </p>
            </div>
        </div>
    );
}
