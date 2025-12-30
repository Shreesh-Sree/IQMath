'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/Input';
import {
    Linkedin,
    Twitter,
    Moon,
    Sun,
    ArrowDownLeft,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';

const data = () => ({
    navigation: {
        Services: [
            { name: 'Corporate Training', href: '/services/corporate-training' },
            { name: 'Student Workshops', href: '/services/student-workshops' },
            { name: 'AI & ML Solutions', href: '/services/ai-ml-solutions' },
            { name: 'Software Development', href: '/services/software-development' },
        ],
        Company: [
            { name: 'About Us', href: '/about' },
            { name: 'Team', href: '/team' },
            { name: 'Events', href: '/events' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Contact', href: '/contact' },
        ],
        Resources: [
            { name: 'Book Appointment', href: '/book-appointment' },
            { name: 'Documentation', href: '/docs' }, // Keeping standard link
            { name: 'Community', href: '/community' }, // Keeping standard link
        ],
        Legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
        ],
    },
    socialLinks: [
        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/iqmathtech' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/iqmath' },
        { icon: Mail, label: 'Email', href: 'mailto:iqmathindia@gmail.com' },
    ],
    bottomLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/cookies', label: 'Cookie Policy' },
    ],
});

export function Footer() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentYear = new Date().getFullYear();

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <footer className="mt-20 w-full opacity-0">
                <div className="container m-auto py-12">Loading...</div>
            </footer>
        );
    }

    return (
        <footer className="mt-20 w-full bg-paper text-ink transition-colors duration-300">
            <div className="animate-energy-flow via-accent h-px w-full bg-gradient-to-r from-transparent to-transparent" />
            <div className="relative w-full px-5">
                {/* Top Section */}
                <div className="container m-auto grid grid-cols-1 gap-12 py-12 md:grid-cols-2 lg:grid-cols-5">
                    {/* Company Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image
                                src="/IQMath.webp"
                                alt="IQMath Logo"
                                width={200}
                                height={200}
                                className="size-10 object-contain"
                            />
                            <span className="text-xl font-semibold">IQMath Technologies</span>
                        </Link>
                        <p className="text-ink-secondary max-w-md text-sm leading-relaxed">
                            Data Science training and AI consulting since 2016.
                            Helping engineering teams build real technical capabilities.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-2 text-sm text-ink-muted">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> <span>iqmathindia@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" /> <span>+91 93609 60219</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                                <span className="max-w-[250px]">
                                    1/339, Kulakkarai Main Rd, Thoraipakkam, Perungudi, Tamil Nadu 600096
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <div className="flex gap-2">
                                {data().socialLinks.map(({ icon: Icon, label, href }) => (
                                    <Button
                                        key={label}
                                        size="sm"
                                        variant="secondary"
                                        asChild
                                        className="hover:bg-accent hover:text-white dark:hover:bg-accent !border-border hover:border-accent cursor-pointer shadow-none transition-all duration-300 hover:scale-110 hover:-rotate-6"
                                    >
                                        <Link href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined}>
                                            <Icon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="hover:bg-accent hover:text-white dark:hover:bg-accent !border-border hover:border-accent cursor-pointer shadow-none transition-all duration-300 hover:scale-110 hover:rotate-12"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </div>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="w-full max-w-md space-y-3 pt-4"
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-ink">
                                Subscribe to our newsletter
                            </label>
                            <div className="relative w-full">
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="h-10 w-full bg-paper border-border focus:ring-accent"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="absolute top-0.5 right-0.5 bottom-0.5 h-auto cursor-pointer transition-all duration-300 hover:bg-accent hover:text-white"
                                    variant="ghost"
                                    size="sm"
                                >
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-ink-muted text-xs">
                                Get the latest updates, tutorials, and exclusive offers.
                            </p>
                        </form>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid w-full grid-cols-2 items-start justify-between gap-8 px-5 lg:col-span-3">
                        {(['Services', 'Company', 'Resources', 'Legal'] as const).map(
                            (section) => (
                                <div key={section} className="w-full">
                                    <h3 className="border-accent mb-4 -ml-5 border-l-2 pl-5 text-sm font-semibold tracking-wider uppercase text-ink">
                                        {section}
                                    </h3>
                                    <ul className="space-y-3">
                                        {data().navigation[section].map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="group text-ink-secondary hover:text-accent decoration-accent -ml-5 inline-flex items-center gap-2 underline-offset-8 transition-all duration-300 hover:pl-5 hover:underline text-sm"
                                                >
                                                    <ArrowDownLeft className="text-accent rotate-[225deg] opacity-70 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100 sm:group-hover:rotate-[225deg] md:rotate-0 w-3 h-3" />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="animate-rotate-3d via-accent h-px w-full bg-gradient-to-r from-transparent to-transparent" />
                <div className="text-ink-muted container m-auto flex flex-col items-center justify-between gap-4 p-4 text-xs md:flex-row md:px-0 md:text-sm">
                    <p className="">
                        &copy; {currentYear} IQMath Technologies LLP | All rights reserved
                    </p>
                    <div className="flex items-center gap-4">
                        {data().bottomLinks.map(({ href, label }) => (
                            <Link key={href} href={href} className="hover:text-ink transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <span className="from-accent/5 absolute inset-x-0 bottom-0 left-0 -z-10 h-1/3 w-full bg-gradient-to-t pointer-events-none" />
            </div>

            {/* Animations */}
            <style jsx>{`
        /* ===== Animation Presets ===== */
        .animate-rotate-3d {
          animation: rotate3d 8s linear infinite;
        }

        .animate-energy-flow {
          animation: energy-flow 4s linear infinite;
          background-size: 200% 100%;
        }

        /* ===== Keyframes ===== */
        @keyframes rotate3d {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        @keyframes energy-flow {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
        </footer>
    );
}

export default Footer;
