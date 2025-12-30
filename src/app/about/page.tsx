import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";

export const metadata = {
    title: "About",
    description: "IQmath Technologies LLP - Eight years of technical training and AI consulting across India.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* ============================================
            Opening - Not a typical "About Us" hero
            Narrative-first, honest, specific
            ============================================ */}
                <section className="pt-16 pb-20 lg:pt-24 lg:pb-28">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8">
                                <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                    About IQmath
                                </p>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-8">
                                    A technical training company<br />
                                    that stayed technical.
                                </h1>
                                <p className="text-xl text-ink-secondary leading-relaxed max-w-2xl">
                                    We started in 2016 as trainers who could actually write code.
                                    That hasn't changed. Our instructors still ship production software.
                                    Our consultants still build real models.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
            The Story - Editorial narrative, not bullet points
            ============================================ */}
                <section className="py-20 lg:py-28 bg-paper-warm">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                            <div className="lg:col-span-5">
                                <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-6">
                                    How we got here
                                </h2>
                            </div>
                            <div className="lg:col-span-6 lg:col-start-7">
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-lg text-ink-secondary leading-relaxed mb-6">
                                        IQmath started when a group of data scientists at a Pune-based
                                        analytics firm realized they spent more time explaining Python
                                        to new hires than doing actual analysis.
                                    </p>
                                    <p className="text-lg text-ink-secondary leading-relaxed mb-6">
                                        The corporate training programs available were either too basic
                                        (2-day bootcamps that taught nothing lasting) or too academic
                                        (university courses disconnected from industry practice).
                                        We wanted something in between.
                                    </p>
                                    <p className="text-lg text-ink-secondary leading-relaxed mb-6">
                                        So we built it. Structured 8-12 week programs. Project-based
                                        learning with real datasets. Instructors who had actually worked
                                        in the field. The first year, we trained 40 engineers at three
                                        companies.
                                    </p>
                                    <p className="text-lg text-ink leading-relaxed font-medium">
                                        Eight years later, we've trained over 5,000 professionals
                                        across 50+ institutions. But the approach hasn't changed:
                                        practical skills taught by practitioners.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
            What We Believe - Values without slogans
            ============================================ */}
                <section className="py-20 lg:py-28">
                    <div className="container">
                        <div className="max-w-3xl mb-16">
                            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                What we believe
                            </h2>
                            <p className="text-lg text-ink-secondary">
                                Not mission statements. Not inspirational posters.
                                Just the principles that guide how we work.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                            <div>
                                <h3 className="text-xl font-semibold text-ink mb-3">
                                    Skills over certificates
                                </h3>
                                <p className="text-ink-secondary leading-relaxed">
                                    A certificate proves you attended something. We care whether you can
                                    actually build something after. Every program ends with a project that
                                    would be credible on a real portfolio.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-ink mb-3">
                                    Depth over breadth
                                </h3>
                                <p className="text-ink-secondary leading-relaxed">
                                    We'd rather you understand one algorithm deeply than have vague
                                    awareness of twenty. Our programs are focused. You won't learn
                                    everything, but what you learn, you'll know how to use.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-ink mb-3">
                                    Instructors who still practice
                                </h3>
                                <p className="text-ink-secondary leading-relaxed">
                                    Every instructor on our team actively works on consulting or
                                    development projects. We don't teach from slides someone else wrote.
                                    We teach from experience we're still accumulating.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-ink mb-3">
                                    No sales theater
                                </h3>
                                <p className="text-ink-secondary leading-relaxed">
                                    If our programs aren't right for you, we'll say so. If there's a
                                    free resource that covers what you need, we'll point you there.
                                    We've grown through referrals, not aggressive marketing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
            Leadership - Brief, no motivational quotes
            ============================================ */}
                <section className="py-20 lg:py-28 bg-paper-warm">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
                            <div className="lg:col-span-5">
                                <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                    Leadership
                                </h2>
                                <p className="text-ink-secondary leading-relaxed">
                                    The people who set direction and take responsibility.
                                    All still involved in delivery, not just management.
                                </p>
                            </div>

                            <div className="lg:col-span-6 lg:col-start-7">
                                <div className="space-y-10">
                                    <div>
                                        <h3 className="text-xl font-semibold text-ink mb-1">
                                            Dr. Anil Sharma
                                        </h3>
                                        <p className="text-sm text-accent mb-3">Founder & CEO</p>
                                        <p className="text-ink-secondary leading-relaxed">
                                            PhD in Statistics from IIT Bombay. 12 years at IBM Research
                                            before starting IQmath. Still leads our most complex AI
                                            consulting engagements.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-ink mb-1">
                                            Priya Menon
                                        </h3>
                                        <p className="text-sm text-accent mb-3">Head of Training</p>
                                        <p className="text-ink-secondary leading-relaxed">
                                            Former ML engineer at Flipkart. Designed our core curriculum and
                                            assessment framework. Runs instructor development and quality
                                            assurance for all programs.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-ink mb-1">
                                            Vikram Rao
                                        </h3>
                                        <p className="text-sm text-accent mb-3">Head of Consulting</p>
                                        <p className="text-ink-secondary leading-relaxed">
                                            15 years in enterprise software. Led data platform projects
                                            at TCS and Infosys. Manages client relationships and
                                            technical architecture for consulting projects.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <Link
                                        href="/team"
                                        className="inline-flex items-center gap-2 text-accent font-medium"
                                    >
                                        Meet the full team <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================
            Contact CTA - Understated
            ============================================ */}
                <section className="py-20 lg:py-24">
                    <div className="container">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                Want to know more?
                            </h2>
                            <p className="text-lg text-ink-secondary mb-8">
                                If you're evaluating training partners or exploring technical
                                consulting, we're happy to share more about our approach and
                                past work.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/book-appointment"
                                    className="btn btn-primary btn-lg"
                                >
                                    Schedule a conversation
                                </Link>
                                <Link
                                    href="/services"
                                    className="btn btn-secondary btn-lg"
                                >
                                    See our services
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
