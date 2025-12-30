"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { value: "500+", label: "LEARNERS_ENROLLED", detail: "GLOBALLY" },
    { value: "10+", label: "HIRING_PARTNERS", detail: "MNC_COMPANIES" },
    { value: "97%", label: "SATISFACTION_RATE", detail: "VERIFIED_FEEDBACK" },
    { value: "100%", label: "PRACTICAL_FOCUS", detail: "HANDS_ON_LABS" },
];

export const SwissStats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="bg-ink text-paper py-24 border-y border-ink-muted/20">
            <div className="container px-6 md:px-12">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-[2px] bg-[var(--brand-blue)]"></div>
                    <span className="text-xs font-mono tracking-widest uppercase text-[var(--brand-blue)]">02. METRICS</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-muted/20 border border-ink-muted/20">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-ink p-8 lg:p-12 flex flex-col justify-between group h-64 relative overflow-hidden text-center lg:text-left hover:bg-ink-secondary/5 transition-colors duration-300">
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-ink-muted opacity-50">MACRO_0{i + 1}</span>

                            <div className="mt-auto">
                                <motion.h3
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="text-4xl md:text-6xl font-black tracking-tighter text-paper mb-2 group-hover:text-[var(--brand-green)] transition-colors duration-300"
                                >
                                    {stat.value}
                                </motion.h3>
                                <p className="text-xs font-mono tracking-widest text-paper-muted uppercase mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-[10px] text-ink-muted tracking-widest uppercase">
                                    {stat.detail}
                                </p>
                            </div>

                            {/* Decorative Scanline */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10px] w-full -translate-y-[100%] group-hover:translate-y-[500%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
