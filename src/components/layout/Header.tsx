'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface NavItem {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
        name: 'Services',
        href: '/services',
        hasDropdown: true,
        dropdownItems: [
            {
                name: 'Corporate Training',
                href: '/services/corporate-training',
                description: 'Upskill your workforce',
            },
            {
                name: 'Student Workshops',
                href: '/services/student-workshops',
                description: 'Hands-on learning',
            },
            {
                name: 'AI & ML Solutions',
                href: '/services/ai-ml-solutions',
                description: 'Business intelligence',
            },
            {
                name: 'Software Development',
                href: '/services/software-development',
                description: 'Custom apps',
            },
        ],
    },
    { name: 'Team', href: '/team' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerVariants = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        scrolled: {
            backdropFilter: 'blur(20px)',
            // Using CSS variables via rgba isn't reliable if themes switch, use style prop instead
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
    };

    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0 },
        open: { opacity: 1, height: 'auto' },
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    // Safe color for background based on theme for scrolled state logic
    // However, simpler to rely on tailwind classes being toggled by parent or just use CSS vars
    // We'll trust the direct style prop with theme awareness or just standard classes

    return (
        <motion.header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-paper/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}
            initial="initial"
            animate="animate"
            variants={headerVariants}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between lg:h-20">
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="relative h-10 w-32 lg:h-12 lg:w-40">
                                <Image
                                    src="/IQMath.webp"
                                    alt="IQMath Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </motion.div>

                    <nav className="hidden items-center space-x-8 lg:flex">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() =>
                                    item.hasDropdown && setActiveDropdown(item.name)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-ink font-medium transition-colors duration-200 hover:text-accent flex items-center space-x-1"
                                >
                                    <span>{item.name}</span>
                                    {item.hasDropdown && (
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                                    )}
                                </Link>

                                {item.hasDropdown && (
                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                className="absolute top-full left-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-paper shadow-xl z-50 transform origin-top-left"
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.dropdownItems?.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="block px-4 py-3 hover:bg-paper-subtle transition-colors duration-200"
                                                    >
                                                        <div className="text-ink font-medium text-sm">
                                                            {dropdownItem.name}
                                                        </div>
                                                        {dropdownItem.description && (
                                                            <div className="text-ink-muted text-xs mt-0.5">
                                                                {dropdownItem.description}
                                                            </div>
                                                        )}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden items-center space-x-4 lg:flex">
                        <Link
                            href="/contact"
                            className="text-ink font-medium transition-colors duration-200 hover:text-accent"
                        >
                            Contact
                        </Link>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/book-appointment"
                                className="inline-flex items-center space-x-2 rounded-md bg-ink text-paper px-6 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:bg-ink-secondary"
                            >
                                <span>Book a Call</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.button
                        className="lg:hidden p-2 text-ink hover:bg-paper-subtle rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="lg:hidden overflow-hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className="mt-4 bg-paper/95 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden mb-4">
                                {navItems.map((item) => (
                                    <div key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-ink font-medium hover:bg-paper-subtle transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.hasDropdown && (
                                            <div className="pl-4 bg-paper-subtle/30">
                                                {item.dropdownItems?.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-ink-secondary hover:text-ink transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="p-4 space-y-3 border-t border-border mt-2">
                                    <Link
                                        href="/contact"
                                        className="block w-full text-center py-2.5 text-ink font-medium hover:bg-paper-subtle rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                    <Link
                                        href="/book-appointment"
                                        className="block w-full rounded-lg bg-ink text-paper py-3 text-center font-medium transition-all duration-200 hover:shadow-lg hover:bg-ink-secondary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Book a Call
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}

export default Header;