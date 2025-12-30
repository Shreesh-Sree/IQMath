import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";

export const metadata = {
    title: "Services",
    description: "Corporate training, AI/ML consulting, and software development services from IQmath Technologies.",
};

// Services data - would come from database in production
const services = [
    {
        id: "corporate-training",
        category: "Training",
        title: "Corporate Training Programs",
        description: "Structured technical training for enterprise teams. Python, Data Science, Machine Learning, and Cloud Computing.",
        details: [
            "2-day to 12-week programs based on your needs",
            "Instructor-led sessions with hands-on projects",
            "Custom curriculum aligned to your tech stack",
            "Post-training assessment and certification",
        ],
        audience: "Corporate L&D teams, Engineering managers",
        outcome: "Teams that can actually apply what they learned to real projects.",
    },
    {
        id: "student-workshops",
        category: "Training",
        title: "Student Workshops",
        description: "Intensive workshops for engineering students. Industry-relevant curriculum that prepares students for actual jobs.",
        details: [
            "1-5 day intensive workshops",
            "Aligned to industry requirements, not academic syllabi",
            "Real-world projects using professional tools",
            "Career guidance and portfolio development",
        ],
        audience: "Colleges, Universities, Student groups",
        outcome: "Graduates with demonstrable skills employers actually want.",
    },
    {
        id: "internship-programs",
        category: "Training",
        title: "Internship & Live Projects",
        description: "Supervised project experience for students. Work on real client problems under professional mentorship.",
        details: [
            "4-12 week structured internships",
            "Work on actual client projects (not toy problems)",
            "Weekly mentorship and code reviews",
            "Industry-recognized completion certificate",
        ],
        audience: "Final year students, Fresh graduates",
        outcome: "Portfolio projects that demonstrate real capability.",
    },
    {
        id: "data-analytics",
        category: "Consulting",
        title: "Data Analytics Consulting",
        description: "Help you understand your data and build sustainable analytics practice. From one-time analysis to full capability building.",
        details: [
            "Data infrastructure assessment and design",
            "Dashboard and reporting system development",
            "Team capability building alongside delivery",
            "Ongoing support and optimization",
        ],
        audience: "Organizations with data they're not using well",
        outcome: "Analytics that people actually use to make decisions.",
    },
    {
        id: "ai-ml-solutions",
        category: "Consulting",
        title: "AI & ML Solutions",
        description: "Custom machine learning solutions. We build models, not just proofs of concept. From problem framing to production deployment.",
        details: [
            "Feasibility analysis before we start",
            "Model development and validation",
            "Integration with your existing systems",
            "Knowledge transfer to your team",
        ],
        audience: "Enterprises with specific technical problems",
        outcome: "AI systems that work in production, maintained by your team.",
    },
    {
        id: "software-development",
        category: "Development",
        title: "Software & Web Development",
        description: "Custom software when you need specific tools. Data dashboards, automation systems, internal applications.",
        details: [
            "Requirement analysis and architecture design",
            "Iterative development with regular demos",
            "Documentation and training for your team",
            "Support and maintenance options",
        ],
        audience: "Organizations needing custom tools",
        outcome: "Software your team can actually maintain.",
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
                    <div className="container">
                        <div className="max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Services
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                What we can do for you
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                Everything we offer falls into three categories: training, consulting,
                                or development. Each service has specific outcomes, not vague
                                promises about transformation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services List - Not cards, editorial layout */}
                <section className="py-12 lg:py-16">
                    <div className="container">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`py-12 lg:py-16 ${index !== services.length - 1 ? 'border-b border-border' : ''}`}
                            >
                                <div className="grid lg:grid-cols-12 gap-8">
                                    {/* Left - Service info */}
                                    <div className="lg:col-span-5">
                                        <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
                                            {service.category}
                                        </p>
                                        <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                            {service.title}
                                        </h2>
                                        <p className="text-lg text-ink-secondary leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex items-center gap-2 text-accent font-medium"
                                        >
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    {/* Right - Details */}
                                    <div className="lg:col-span-6 lg:col-start-7">
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-3">
                                                    What's included
                                                </h3>
                                                <ul className="space-y-2">
                                                    {service.details.map((detail, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-ink-secondary">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-2">
                                                        For
                                                    </h3>
                                                    <p className="text-ink-secondary">{service.audience}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-2">
                                                        Outcome
                                                    </h3>
                                                    <p className="text-ink-secondary">{service.outcome}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 lg:py-24 bg-paper-warm">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7">
                                <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                    Not sure which service fits?
                                </h2>
                                <p className="text-lg text-ink-secondary">
                                    Book a 30-minute call. We'll understand your situation and
                                    recommend an approach — or tell you if we're not the right fit.
                                </p>
                            </div>
                            <div className="lg:col-span-4 lg:col-start-9">
                                <Link
                                    href="/book-appointment"
                                    className="btn btn-primary btn-lg w-full justify-center"
                                >
                                    Book a consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
