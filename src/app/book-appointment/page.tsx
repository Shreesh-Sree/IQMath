"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Input, Textarea, Select } from "@/components/ui";

export default function BookAppointmentPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    // Generate date options for next 14 days
    const dateOptions = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        const value = date.toISOString().split('T')[0];
        const label = date.toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        return { value, label };
    });

    const timeOptions = [
        { value: "10:00", label: "10:00 AM" },
        { value: "11:00", label: "11:00 AM" },
        { value: "14:00", label: "2:00 PM" },
        { value: "15:00", label: "3:00 PM" },
        { value: "16:00", label: "4:00 PM" },
    ];

    if (submitted) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center">
                    <div className="container">
                        <div className="max-w-xl mx-auto text-center py-20">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-accent" />
                            </div>
                            <h1 className="text-3xl font-semibold text-ink mb-4">
                                Request received
                            </h1>
                            <p className="text-lg text-ink-secondary mb-8">
                                We'll confirm your consultation within 24 hours. You'll receive
                                an email with meeting details and preparation notes.
                            </p>
                            <a href="/" className="text-accent font-medium">
                                ← Back to homepage
                            </a>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
                    <div className="container">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Book a Consultation
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                Let's discuss your requirements
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                A 30-minute call with our team. We'll understand your situation,
                                answer questions, and suggest an approach — no sales pressure.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form */}
                <section className="py-8 lg:py-12">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Form */}
                            <div className="lg:col-span-7">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Purpose */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-ink mb-4">
                                            What are you looking for?
                                        </h2>
                                        <Select
                                            name="purpose"
                                            required
                                            options={[
                                                { value: "corporate", label: "Corporate Training Program" },
                                                { value: "college", label: "College Workshop / Partnership" },
                                                { value: "student", label: "Student Enquiry (Course / Internship)" },
                                                { value: "consulting", label: "AI/ML or Data Consulting Project" },
                                                { value: "development", label: "Software Development Project" },
                                                { value: "other", label: "Something else" },
                                            ]}
                                            placeholder="Select the best match"
                                        />
                                    </div>

                                    {/* Contact Info */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-ink mb-4">
                                            Your contact information
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Name"
                                                name="name"
                                                required
                                                placeholder="Your name"
                                            />
                                            <Input
                                                label="Organization"
                                                name="organization"
                                                placeholder="Company or Institution"
                                            />
                                            <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="you@company.com"
                                            />
                                            <Input
                                                label="Phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    {/* Preferred Time */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-ink mb-4">
                                            Preferred time
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <Select
                                                label="Date"
                                                name="preferredDate"
                                                required
                                                options={dateOptions}
                                                placeholder="Select a date"
                                            />
                                            <Select
                                                label="Time (IST)"
                                                name="preferredTime"
                                                required
                                                options={timeOptions}
                                                placeholder="Select a time"
                                            />
                                        </div>
                                        <p className="text-sm text-ink-muted mt-2">
                                            We'll confirm the exact time via email. If your preferred
                                            slot isn't available, we'll suggest alternatives.
                                        </p>
                                    </div>

                                    {/* Additional Context */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-ink mb-4">
                                            Anything else we should know?
                                        </h2>
                                        <Textarea
                                            name="message"
                                            rows={4}
                                            placeholder="Team size, timeline, specific requirements, questions you have..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary btn-lg"
                                    >
                                        {isSubmitting ? "Submitting..." : "Request consultation"}
                                    </button>
                                </form>
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-4 lg:col-start-9">
                                <div className="bg-paper-warm rounded-lg p-6 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-4 h-4 text-ink-muted" />
                                            <span className="text-sm font-medium text-ink">30 minutes</span>
                                        </div>
                                        <p className="text-sm text-ink-muted">
                                            Focused discussion. No lengthy sales presentations.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-ink-muted" />
                                            <span className="text-sm font-medium text-ink">Video call</span>
                                        </div>
                                        <p className="text-sm text-ink-muted">
                                            Google Meet or Zoom. Link sent after confirmation.
                                        </p>
                                    </div>

                                    <hr className="border-border" />

                                    <div>
                                        <h3 className="text-sm font-medium text-ink mb-2">
                                            What happens after
                                        </h3>
                                        <ol className="text-sm text-ink-muted space-y-2">
                                            <li className="flex gap-2">
                                                <span className="text-accent font-medium">1.</span>
                                                We confirm your slot within 24 hours
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-accent font-medium">2.</span>
                                                You receive a meeting link and prep notes
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-accent font-medium">3.</span>
                                                We have the call and discuss your needs
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="text-accent font-medium">4.</span>
                                                If relevant, we send a follow-up proposal
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
