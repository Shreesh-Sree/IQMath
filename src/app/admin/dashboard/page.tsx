"use client";

import Link from "next/link";
import {
    Briefcase,
    Calendar,
    Users,
    MessageSquare,
    CalendarCheck,
    ArrowRight,
    Clock,
} from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Badge } from "@/components/ui";

// Sample dashboard data - would come from API in production
const stats = [
    { label: "Active Services", value: 6, icon: Briefcase, href: "/admin/services" },
    { label: "Upcoming Events", value: 3, icon: Calendar, href: "/admin/events" },
    { label: "Team Members", value: 8, icon: Users, href: "/admin/team" },
    { label: "Pending Appointments", value: 5, icon: CalendarCheck, href: "/admin/appointments" },
];

const recentAppointments = [
    {
        id: 1,
        name: "Rahul Sharma",
        purpose: "Corporate Training",
        date: "Dec 30, 2024",
        status: "pending"
    },
    {
        id: 2,
        name: "Priya College",
        purpose: "Workshop Partnership",
        date: "Dec 29, 2024",
        status: "pending"
    },
    {
        id: 3,
        name: "Tech Solutions Ltd",
        purpose: "AI Consulting",
        date: "Dec 28, 2024",
        status: "approved"
    },
];

const upcomingEvents = [
    { id: 1, title: "Python for Data Science Workshop", date: "Jan 15, 2025" },
    { id: 2, title: "AI in Business Seminar", date: "Jan 28, 2025" },
];

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-ink mb-1">Dashboard</h1>
                    <p className="text-ink-muted">
                        Overview of your website content and recent activity
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link
                                key={stat.label}
                                href={stat.href}
                                className="bg-paper border border-border rounded-lg p-4 hover:border-ink-muted transition-colors group"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-ink mb-1">{stat.value}</p>
                                        <p className="text-sm text-ink-muted">{stat.label}</p>
                                    </div>
                                    <Icon className="w-5 h-5 text-ink-muted group-hover:text-accent transition-colors" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Appointments */}
                    <div className="bg-paper border border-border rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="font-semibold text-ink">Recent Appointments</h2>
                            <Link
                                href="/admin/appointments"
                                className="text-sm text-accent font-medium flex items-center gap-1"
                            >
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="divide-y divide-border">
                            {recentAppointments.map((appointment) => (
                                <div key={appointment.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-ink">{appointment.name}</p>
                                        <p className="text-sm text-ink-muted">{appointment.purpose}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            variant={appointment.status === "pending" ? "warning" : "success"}
                                        >
                                            {appointment.status}
                                        </Badge>
                                        <p className="text-xs text-ink-muted mt-1">{appointment.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-paper border border-border rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="font-semibold text-ink">Upcoming Events</h2>
                            <Link
                                href="/admin/events"
                                className="text-sm text-accent font-medium flex items-center gap-1"
                            >
                                Manage <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="divide-y divide-border">
                            {upcomingEvents.map((event) => (
                                <div key={event.id} className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-ink">{event.title}</p>
                                        <p className="text-sm text-ink-muted">{event.date}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4">
                                <Link
                                    href="/admin/events/new"
                                    className="btn btn-secondary btn-sm w-full justify-center"
                                >
                                    + Add new event
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-paper border border-border rounded-lg p-4">
                    <h2 className="font-semibold text-ink mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/services/new" className="btn btn-secondary btn-sm">
                            + Add Service
                        </Link>
                        <Link href="/admin/events/new" className="btn btn-secondary btn-sm">
                            + Add Event
                        </Link>
                        <Link href="/admin/team/new" className="btn btn-secondary btn-sm">
                            + Add Team Member
                        </Link>
                        <Link href="/admin/testimonials/new" className="btn btn-secondary btn-sm">
                            + Add Testimonial
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
