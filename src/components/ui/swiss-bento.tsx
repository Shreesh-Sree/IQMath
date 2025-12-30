"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Box, Code, Cpu, GraduationCap } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: GraduationCap,
        title: "DATA SCIENCE",
        subtitle: "CORE_ANALYTICS",
        description: "Master Python, SQL, and Machine Learning. Build predictive models and derive actionable insights from complex datasets.",
        link: "/services/data-science",
        colSpan: "lg:col-span-2",
        bgClass: "bg-paper",
    },
    {
        icon: Box,
        title: "BUSINESS INTEL",
        subtitle: "STRATEGIC_GROWTH",
        description: "Transform raw data into business intelligence. Learn PowerBI, Tableau, and strategic decision-making frameworks.",
        link: "/services/business",
        colSpan: "lg:col-span-1",
        bgClass: "bg-paper-subtle",
    },
    {
        icon: Code,
        title: "WEB & DESIGN",
        subtitle: "CREATIVE_TECH",
        description: "Full-stack development and UI/UX design principles. Build modern, responsive applications from scratch.",
        link: "/services/design",
        colSpan: "lg:col-span-1",
        bgClass: "bg-paper-subtle",
    },
    {
        icon: Cpu,
        title: "CORPORATE TRAINING",
        subtitle: "ENTERPRISE_SOLUTIONS",
        description: "Customized upskilling programs for engineering teams. Elevate your workforce's technical capabilities.",
        link: "/services/corporate",
        colSpan: "lg:col-span-2",
        bgClass: "bg-paper",
    }
];

export const SwissBento = () => {
    return (
        <section className="py-24 bg-paper text-ink border-t border-ink-muted/10">
            <div className="container px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-[var(--brand-green)]"></div>
                            <span className="text-xs font-mono tracking-widest uppercase text-[var(--brand-green)]">01. CAPABILITIES</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">TECHNICAL<br />SPECIFICATIONS</h2>
                    </div>
                    <p className="max-w-md text-ink-secondary text-sm md:text-base text-right md:text-left leading-relaxed">
                        Deployment-ready educational modules and engineering deliverables designed for maximum impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-ink-muted/20">
                    {services.map((item, i) => (
                        <Link
                            href={item.link}
                            key={i}
                            className={cn(
                                "group relative p-8 md:p-12 border border-ink-muted/10 hover:z-10 transition-all duration-300 hover:bg-paper hover:shadow-2xl flex flex-col justify-between h-[300px] md:h-[400px]",
                                item.colSpan,
                                item.bgClass
                            )}
                        >
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[var(--brand-blue)] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                            <div className="relative z-10 w-full flex justify-between items-start">
                                <item.icon className="w-10 h-10 text-ink-muted group-hover:text-[var(--brand-blue)] transition-colors duration-300 stroke-1" />
                                <span className="text-xs font-mono text-ink-muted/50">0{i + 1}</span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-sm font-mono tracking-widest text-[var(--brand-blue)] mb-2 group-hover:text-[var(--brand-green)] transition-colors">
                                    {item.subtitle}
                                </h3>
                                <h4 className="text-2xl md:text-3xl font-bold text-ink mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                    {item.title}
                                </h4>
                                <p className="text-ink-secondary text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-12 md:static md:opacity-100">
                                    {item.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-6 h-6 -rotate-45 text-ink group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
