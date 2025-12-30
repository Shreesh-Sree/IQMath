"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    Users,
    MessageSquare,
    Image,
    CalendarCheck,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/media", label: "Media", icon: Image },
    { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
];

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

    useEffect(() => {
        // Check authentication
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (!data.success) {
                    router.push("/admin/login");
                } else {
                    setUser(data.data.user);
                }
            })
            .catch(() => {
                router.push("/admin/login");
            });
    }, [router]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-paper-warm flex items-center justify-center">
                <p className="text-ink-muted">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper-warm">
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-paper border border-border rounded-md"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-paper border-r border-border transform transition-transform lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-border">
                        <Link href="/admin/dashboard" className="text-xl font-bold text-ink">
                            IQ<span className="text-accent">math</span>
                            <span className="text-sm font-normal text-ink-muted ml-2">Admin</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-accent text-white"
                                            : "text-ink-secondary hover:bg-paper-subtle hover:text-ink"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-border">
                        <div className="mb-3 px-3">
                            <p className="text-sm font-medium text-ink truncate">
                                {user.name || user.email}
                            </p>
                            <p className="text-xs text-ink-muted truncate">
                                {user.email}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-ink-secondary hover:bg-paper-subtle hover:text-ink transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign out
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-ink-muted hover:bg-paper-subtle hover:text-ink transition-colors mt-1"
                        >
                            ← View website
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-ink/20 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="lg:ml-64 min-h-screen">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;
