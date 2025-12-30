"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const SwissHero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-paper text-ink">
            {/* 1. Architectural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div
                    className="absolute inset-0 h-full w-full bg-[radial-gradient(#a3a3a3_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
                />
            </div>

            <div className="container relative z-10 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* 2. Typographic Composition (Left/Center) */}
                <div className="lg:col-span-8 flex flex-col items-start">

                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[2px] w-12 bg-ink-muted"></div>
                        <span className="text-sm font-mono tracking-widest uppercase text-ink-muted">
                            EST. 2016 — PUNE, INDIA
                        </span>
                    </motion.div>

                    {/* Main Headline - Broken Grid Layout */}
                    <div className="relative">
                        {/* "DATA" - Brand Blue */}
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-[var(--brand-blue)]"
                        >
                            DATA
                        </motion.h1>

                        {/* "SCIENCE" - Brand Green */}
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-[var(--brand-green)] ml-12 md:ml-24"
                        >
                            SCIENCE
                        </motion.h1>

                        {/* "MASTERY" - Ink/Black */}
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-ink"
                        >
                            MASTERY
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-12 text-lg md:text-xl text-ink-secondary max-w-xl leading-relaxed border-l-2 border-[var(--brand-blue)] pl-6"
                    >
                        We don't just teach syntax. We engineer <span className="text-ink font-semibold">technical capability</span>.
                        Join the elite community of data professionals building the future.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/services"
                            className="group relative px-8 py-4 bg-ink text-paper font-medium overflow-hidden rounded-none"
                        >
                            <div className="absolute inset-0 w-full h-full bg-[var(--brand-blue)] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                                Explore Courses <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                        <Link
                            href="/book-appointment"
                            className="px-8 py-4 border border-ink text-ink font-medium hover:bg-ink hover:text-paper transition-colors rounded-none"
                        >
                            Book a Strategy Call
                        </Link>
                    </motion.div>
                </div>

                {/* 3. Abstract Geometry (Right) - CSS only, no heavy 3D */}
                <div className="hidden lg:col-span-4 lg:flex justify-center items-center h-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
                        className="relative w-80 h-96 border-4 border-ink p-4"
                    >
                        <div className="absolute -top-6 -left-6 w-full h-full border-4 border-[var(--brand-green)] z-0" />
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-[var(--brand-blue)] z-0" />

                        {/* Inner Stat Card */}
                        <div className="relative z-10 w-full h-full bg-paper flex flex-col justify-between p-6">
                            <div className="text-6xl font-black text-ink-muted/20">01</div>
                            <div>
                                <div className="text-4xl font-bold text-ink mb-1">500+</div>
                                <div className="text-sm font-mono text-ink-secondary uppercase tracking-wider">Engineers Trained</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Decorative vertical line */}
            <div className="absolute left-10 md:left-20 top-0 bottom-0 w-[1px] bg-ink-muted/20 hidden md:block" />
        </section>
    );
};
