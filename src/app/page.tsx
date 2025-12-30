"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { SwissHero } from "@/components/ui/swiss-hero";
import { SwissBento } from "@/components/ui/swiss-bento";
import { SwissStats } from "@/components/ui/swiss-stats";
import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

// Featured testimonial data
const testimonials = [
  {
    quote: "Thank You For Sharing Your Experience and what i gained Knowledge in sql, phython, mongodb its all only because of you sir thanks a lot.",
    name: "Maria Binoth",
    title: "Learner @ IQMath"
  },
  {
    quote: "The course structure is amazing. I learned so much in a short time. Highly recommended for beginners.",
    name: "Soundarya",
    title: "Student"
  },
  {
    quote: "It was very useful and clear explanation. Thank you sir for the guidance.",
    name: "Logambal",
    title: "Student"
  },
  {
    quote: "Practical, hands-on training that actually helps in the job market. 10/10.",
    name: "Arjun Mehta",
    title: "Data Analyst"
  }
];

// Events Data
const events = [
  { date: "JAN 15", title: "PYTHON FOR DATA SCIENCE", type: "WORKSHOP" },
  { date: "JAN 28", title: "AI IN BUSINESS: EXEC SEMINAR", type: "WEBINAR" },
  { date: "FEB 10", title: "ADVANCED ML ALGORITHMS", type: "BOOTCAMP" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper font-sans text-ink selection:bg-[var(--brand-green)] selection:text-white">
      <Header />

      <main className="flex-1">

        {/* HERO SECTION */}
        <SwissHero />

        {/* SERVICES SECTION */}
        <SwissBento />

        {/* STATS SECTION */}
        <SwissStats />

        {/* TESTIMONIALS & EVENTS - Split Layout */}
        <section className="py-24 bg-paper">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

              {/* Left: Testimonials (Peer Review) */}
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-[2px] bg-[var(--brand-blue)]"></div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[var(--brand-blue)]">03. PEER_REVIEW</span>
                </div>
                <h2 className="text-3xl font-bold mb-10 tracking-tight">COMMUNITY<br />FEEDBACK</h2>

                <div className="relative overflow-hidden border-l-2 border-ink-muted/10 pl-8">
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[var(--brand-blue)] animate-pulse" />
                  <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed="slow"
                    className="py-4"
                  />
                </div>
              </div>

              {/* Right: Events (Timeline) */}
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-[2px] bg-[var(--brand-green)]"></div>
                  <span className="text-xs font-mono tracking-widest uppercase text-[var(--brand-green)]">04. TIMELINE</span>
                </div>
                <h2 className="text-3xl font-bold mb-10 tracking-tight">UPCOMING<br />SESSIONS</h2>

                <div className="space-y-0">
                  {events.map((event, i) => (
                    <div key={i} className="group border-b border-ink-muted/10 py-6 flex items-center justify-between hover:bg-paper-subtle hover:pl-4 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-6">
                        <span className="font-mono text-sm text-[var(--brand-green)] pt-1">{event.date}</span>
                        <div>
                          <h4 className="font-bold text-lg leading-none mb-1 group-hover:text-[var(--brand-blue)] transition-colors">{event.title}</h4>
                          <span className="text-[10px] tracking-widest uppercase text-ink-muted">{event.type}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-ink-muted group-hover:text-ink opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  ))}
                  <Link href="/events" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mt-8 hover:text-[var(--brand-blue)] transition-colors">
                    View Full Schedule <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA SECTION - Function Call */}
        <section className="bg-[var(--brand-blue)] text-white py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:200%_200%] animate-shimmer" />
          <div className="container px-6 md:px-12 relative z-10 text-center">
            <span className="font-mono text-xs tracking-widest uppercase opacity-80 mb-4 block">/// INITIALIZE_SEQUENCE</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              READY TO<br />START LEARNING?
            </h2>
            <p className="max-w-xl mx-auto text-white/80 text-lg mb-12 leading-relaxed">
              Join our community of over 500+ professionals. Lifetime access to world-class engineering resources.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-appointment"
                className="px-8 py-5 bg-white text-[var(--brand-blue)] font-bold text-lg hover:bg-paper hover:scale-105 transition-all duration-300 shadow-xl"
              >
                GET STARTED
              </Link>
              <Link
                href="/contact"
                className="px-8 py-5 border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                CONTACT TEAM
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
