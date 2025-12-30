"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950/[0.96] overflow-hidden", // Using neutral-950 for deep contrast but respecting theme in page
                className
            )}
        >
            <div className="absolute h-full w-full bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                <div className="absolute left-0 top-[20%] h-[100%] w-[200%] -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 blur-3xl" />
                <div className="absolute left-0 top-[30%] h-[100%] w-[200%] -translate-x-1/2 -rotate-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20 blur-3xl" />
                <div className="absolute left-0 top-[40%] h-[100%] w-[200%] -translate-x-1/2 rotate-45 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-10 blur-3xl" />
            </div>
            {/** SVG Beams */}
            <svg
                className="absolute left-0 top-0 h-full w-full pointer-events-none opacity-40 z-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M-100 0 L500 1000"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    strokeDasharray="1000 1000"
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M0 0 L600 1000"
                    stroke="url(#grad2)"
                    strokeWidth="2"
                    strokeDasharray="1000 1000"
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
                />
                <motion.path
                    d="M100 0 L700 1000"
                    stroke="url(#grad3)"
                    strokeWidth="2"
                    strokeDasharray="1000 1000"
                    initial={{ strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 4 }}
                />

                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--brand-blue)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--brand-green)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--brand-green)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0" />
                        <stop offset="50%" stopColor="var(--brand-blue)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
