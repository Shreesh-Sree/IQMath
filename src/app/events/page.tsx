import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui";

export const metadata = {
    title: "Events",
    description: "Workshops, seminars, and training events from IQmath Technologies.",
};

// Sample events - would come from database in production
const upcomingEvents = [
    {
        slug: "python-data-science-workshop-jan-2025",
        title: "Python for Data Science Workshop",
        date: "January 15-17, 2025",
        location: "Mumbai",
        type: "Workshop",
        description: "A 3-day intensive workshop covering Python fundamentals, pandas, and basic machine learning. Ideal for engineers transitioning into data roles.",
    },
    {
        slug: "ai-business-executive-seminar",
        title: "AI in Business: Executive Seminar",
        date: "January 28, 2025",
        location: "Online (Zoom)",
        type: "Webinar",
        description: "A half-day session for business leaders on practical AI applications, realistic timelines, and how to evaluate AI project proposals.",
    },
    {
        slug: "ml-engineering-corporate-batch",
        title: "ML Engineering - Corporate Batch",
        date: "February 3 - March 28, 2025",
        location: "Pune (On-site)",
        type: "Training",
        description: "8-week intensive program covering ML engineering practices, model deployment, and MLOps. Limited to 20 participants from corporate partners.",
    },
];

const pastEvents = [
    {
        slug: "data-analytics-workshop-dec-2024",
        title: "Data Analytics for Business Teams",
        date: "December 5-6, 2024",
        location: "Bangalore",
        type: "Workshop",
        attendees: 45,
    },
    {
        slug: "python-bootcamp-nov-2024",
        title: "Python Bootcamp - Symbiosis University",
        date: "November 18-22, 2024",
        location: "Pune",
        type: "Workshop",
        attendees: 120,
    },
    {
        slug: "cloud-computing-seminar-oct-2024",
        title: "Cloud Computing for Data Teams",
        date: "October 15, 2024",
        location: "Online",
        type: "Webinar",
        attendees: 85,
    },
    {
        slug: "ml-fundamentals-sept-2024",
        title: "Machine Learning Fundamentals",
        date: "September 10-14, 2024",
        location: "Mumbai",
        type: "Training",
        attendees: 28,
    },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
                    <div className="container">
                        <div className="max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Events
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                Workshops, seminars, and training programs
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                Public events we run throughout the year. For private corporate
                                training, <Link href="/contact" className="text-accent hover:underline">contact us directly</Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="py-12 lg:py-16 bg-paper-warm">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-3">
                                <h2 className="text-xl font-semibold text-ink mb-2">
                                    Upcoming
                                </h2>
                                <p className="text-sm text-ink-muted">
                                    Open for registration
                                </p>
                            </div>

                            <div className="lg:col-span-8 lg:col-start-5">
                                <div className="space-y-8">
                                    {upcomingEvents.map((event) => (
                                        <div
                                            key={event.slug}
                                            className="pb-8 border-b border-border last:border-0 last:pb-0"
                                        >
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <Badge variant="accent">{event.type}</Badge>
                                                <span className="text-sm text-ink-muted flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4" />
                                                    {event.date}
                                                </span>
                                                <span className="text-sm text-ink-muted flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" />
                                                    {event.location}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-ink mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-ink-secondary mb-4">
                                                {event.description}
                                            </p>
                                            <Link
                                                href={`/events/${event.slug}`}
                                                className="inline-flex items-center gap-2 text-accent font-medium text-sm"
                                            >
                                                View details & register <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Past Events */}
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-3">
                                <h2 className="text-xl font-semibold text-ink mb-2">
                                    Past events
                                </h2>
                                <p className="text-sm text-ink-muted">
                                    Recently completed
                                </p>
                            </div>

                            <div className="lg:col-span-8 lg:col-start-5">
                                <div className="divide-y divide-border">
                                    {pastEvents.map((event) => (
                                        <div
                                            key={event.slug}
                                            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8"
                                        >
                                            <div className="sm:w-32 flex-shrink-0">
                                                <span className="text-sm text-ink-muted">{event.date}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-ink">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm text-ink-muted">
                                                    {event.location} · {event.attendees} attendees
                                                </p>
                                            </div>
                                            <Badge className="self-start sm:self-center">{event.type}</Badge>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-border">
                                    <Link
                                        href="/gallery"
                                        className="text-accent font-medium"
                                    >
                                        View photos from past events →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Organize an event CTA */}
                <section className="py-16 lg:py-20 bg-paper-warm">
                    <div className="container">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-semibold text-ink mb-4">
                                Want us to run an event at your organization?
                            </h2>
                            <p className="text-ink-secondary mb-6">
                                We conduct workshops and training programs at corporate offices
                                and college campuses. Tell us what you're looking for.
                            </p>
                            <Link
                                href="/book-appointment"
                                className="btn btn-primary"
                            >
                                Discuss your requirements
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
