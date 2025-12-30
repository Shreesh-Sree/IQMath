import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Header, Footer } from "@/components/layout";

export const metadata = {
    title: "Team",
    description: "Meet the IQmath Technologies team - practitioners who teach and build.",
};

// Team data - would come from database in production
const team = [
    {
        name: "Dr. Anil Sharma",
        role: "Founder & CEO",
        bio: "PhD in Statistics from IIT Bombay. 12 years at IBM Research before starting IQmath. Leads complex AI consulting engagements and sets technical direction for the company.",
        skills: ["Machine Learning", "Statistical Modeling", "Research"],
        linkedin: "https://linkedin.com/in/anilsharma",
    },
    {
        name: "Priya Menon",
        role: "Head of Training",
        bio: "Former ML engineer at Flipkart. Designed our core curriculum and assessment framework. Runs instructor development and quality assurance for all programs.",
        skills: ["Curriculum Design", "Python", "Data Science"],
        linkedin: "https://linkedin.com/in/priyamenon",
    },
    {
        name: "Vikram Rao",
        role: "Head of Consulting",
        bio: "15 years in enterprise software at TCS and Infosys. Manages client relationships and technical architecture for consulting projects. Specializes in data platform design.",
        skills: ["Enterprise Architecture", "Data Engineering", "Project Management"],
        linkedin: "https://linkedin.com/in/vikramrao",
    },
    {
        name: "Sneha Kulkarni",
        role: "Senior Instructor",
        bio: "5 years teaching data science. Background in biostatistics research at AIIMS. Known for making complex statistical concepts accessible to working engineers.",
        skills: ["Statistics", "R", "Python", "Teaching"],
        linkedin: "https://linkedin.com/in/snehakulkarni",
    },
    {
        name: "Arjun Nair",
        role: "ML Engineer & Instructor",
        bio: "Built recommendation systems at a Bangalore startup. Now focuses on teaching ML to corporate teams while working on consulting projects.",
        skills: ["Deep Learning", "NLP", "MLOps"],
        linkedin: "https://linkedin.com/in/arjunnair",
    },
    {
        name: "Kavitha Subramanian",
        role: "Data Engineer",
        bio: "ETL and data pipeline specialist. Worked at Mu Sigma before joining IQmath. Leads technical implementation on data infrastructure projects.",
        skills: ["Apache Spark", "AWS", "Data Pipelines"],
        linkedin: "https://linkedin.com/in/kavithasubramanian",
    },
    {
        name: "Rahul Mehta",
        role: "Full Stack Developer",
        bio: "Builds the dashboards and tools we deliver to clients. 7 years of experience spanning frontend, backend, and data visualization.",
        skills: ["React", "Node.js", "D3.js", "PostgreSQL"],
        linkedin: "https://linkedin.com/in/rahulmehta",
    },
    {
        name: "Ananya Das",
        role: "Program Manager",
        bio: "Coordinates all training programs and client engagements. Ensures logistics run smoothly and clients have clear points of contact throughout.",
        skills: ["Program Management", "Client Relations", "Operations"],
        linkedin: "https://linkedin.com/in/ananyadas",
    },
];

export default function TeamPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
                    <div className="container">
                        <div className="max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Team
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                People who actually do the work
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                Every person here either teaches, builds, or manages projects directly.
                                No sales-only roles. No management layers between you and the people
                                doing the work.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team List - Deliberately not a grid of cards */}
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="space-y-0">
                            {team.map((member, index) => (
                                <div
                                    key={member.name}
                                    className={`py-10 lg:py-12 ${index !== team.length - 1 ? 'border-b border-border' : ''}`}
                                >
                                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                                        {/* Left - Name and role */}
                                        <div className="lg:col-span-4">
                                            <div className="flex items-start gap-4">
                                                {/* Initials avatar - not a photo dependency */}
                                                <div className="w-14 h-14 rounded-full bg-paper-muted flex items-center justify-center text-lg font-semibold text-ink-muted flex-shrink-0">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-semibold text-ink">
                                                        {member.name}
                                                    </h2>
                                                    <p className="text-accent">{member.role}</p>
                                                    {member.linkedin && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mt-2"
                                                        >
                                                            <Linkedin className="w-4 h-4" />
                                                            LinkedIn
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right - Bio and skills */}
                                        <div className="lg:col-span-7 lg:col-start-6">
                                            <p className="text-ink-secondary leading-relaxed mb-4">
                                                {member.bio}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {member.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2.5 py-1 text-xs font-medium bg-paper-muted text-ink-muted rounded"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Join us */}
                <section className="py-20 lg:py-24 bg-paper-warm">
                    <div className="container">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl lg:text-3xl font-semibold text-ink mb-4">
                                Interested in joining?
                            </h2>
                            <p className="text-lg text-ink-secondary mb-6">
                                We're always looking for instructors and engineers who can both
                                build and teach. If you have real technical experience and enjoy
                                explaining things, we'd like to hear from you.
                            </p>
                            <Link
                                href="/contact"
                                className="btn btn-primary btn-lg"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
