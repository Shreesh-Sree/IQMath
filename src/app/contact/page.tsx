"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Input, Textarea, Select } from "@/components/ui";

export default function ContactPage() {
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

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
                    <div className="container">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Contact
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                Get in touch
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                Questions about our services, partnership inquiries, or just
                                want to learn more. We typically respond within 24 hours.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Form + Details */}
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Form */}
                            <div className="lg:col-span-7">
                                {submitted ? (
                                    <div className="bg-paper-warm border border-border rounded-lg p-8">
                                        <h2 className="text-xl font-semibold text-ink mb-2">
                                            Message sent
                                        </h2>
                                        <p className="text-ink-secondary">
                                            Thank you for reaching out. We'll get back to you within
                                            24 hours. If it's urgent, call us directly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <Input
                                                label="Name"
                                                name="name"
                                                required
                                                placeholder="Your name"
                                            />
                                            <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="you@company.com"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <Input
                                                label="Phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                            />
                                            <Select
                                                label="Inquiry type"
                                                name="inquiryType"
                                                options={[
                                                    { value: "training", label: "Corporate Training" },
                                                    { value: "workshop", label: "Student Workshop" },
                                                    { value: "consulting", label: "AI/ML Consulting" },
                                                    { value: "development", label: "Software Development" },
                                                    { value: "partnership", label: "Partnership" },
                                                    { value: "other", label: "Other" },
                                                ]}
                                                placeholder="Select one"
                                            />
                                        </div>

                                        <Textarea
                                            label="Message"
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Tell us about your requirements, timeline, and any specific needs..."
                                        />

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-primary btn-lg"
                                        >
                                            {isSubmitting ? "Sending..." : "Send message"}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Details */}
                            <div className="lg:col-span-4 lg:col-start-9">
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-4">
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:info@iqmath.in"
                                            className="flex items-center gap-3 text-ink hover:text-accent transition-colors"
                                        >
                                            <Mail className="w-5 h-5 text-ink-muted" />
                                            info@iqmath.in
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-4">
                                            Phone
                                        </h3>
                                        <a
                                            href="tel:+919876543210"
                                            className="flex items-center gap-3 text-ink hover:text-accent transition-colors"
                                        >
                                            <Phone className="w-5 h-5 text-ink-muted" />
                                            +91 98765 43210
                                        </a>
                                        <p className="text-sm text-ink-muted mt-2 ml-8">
                                            Monday - Friday, 10am - 6pm IST
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-4">
                                            WhatsApp
                                        </h3>
                                        <a
                                            href="https://wa.me/919876543210"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-ink hover:text-accent transition-colors"
                                        >
                                            <MessageCircle className="w-5 h-5 text-ink-muted" />
                                            Send a message
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-4">
                                            Office
                                        </h3>
                                        <div className="flex items-start gap-3 text-ink">
                                            <MapPin className="w-5 h-5 text-ink-muted flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p>IQmath Technologies LLP</p>
                                                <p className="text-ink-muted">
                                                    Tech Park, Tower A, 5th Floor<br />
                                                    Sector 5, Senapati Bapat Road<br />
                                                    Pune, Maharashtra 411028
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map */}
                <section className="border-t border-border">
                    <div className="h-80 lg:h-96 bg-paper-muted flex items-center justify-center">
                        <p className="text-ink-muted">
                            {/* Google Maps embed would go here */}
                            Map: Pune, Maharashtra
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
