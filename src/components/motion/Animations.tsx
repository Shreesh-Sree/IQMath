"use client";

import React, { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

// Reveal on scroll - subtle upward movement
interface RevealProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function Reveal({
    children,
    delay = 0,
    duration = 0.6,
    className = "",
    once = true
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration, delay, ease: [0.25, 0.4, 0.25, 1] }
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered children reveal
interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = ""
}: StaggerContainerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.1,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = ""
}: { children: ReactNode; className?: string }) {
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
        },
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

// Text reveal with mask effect
interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.25, 0.4, 0.25, 1]
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}

// Line draw animation (for decorative lines)
interface LineDrawProps {
    direction?: "horizontal" | "vertical";
    className?: string;
    style?: CSSProperties;
}

export function LineDraw({
    direction = "horizontal",
    className = "",
    style = {}
}: LineDrawProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            initial={{
                scaleX: direction === "horizontal" ? 0 : 1,
                scaleY: direction === "vertical" ? 0 : 1,
            }}
            animate={isInView ? { scaleX: 1, scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        />
    );
}

// Subtle parallax effect
interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.scrollY;
            const rate = scrolled * speed * 0.1;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.transform = `translateY(${rate}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Number counter animation using useState
interface CounterProps {
    target: number;
    suffix?: string;
    duration?: number;
    className?: string;
}

export function Counter({
    target,
    suffix = "",
    duration = 2000,
    className = ""
}: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * target));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, target, duration]);

    return (
        <span ref={ref} className={className}>
            {count}{suffix}
        </span>
    );
}
