// Seed script for initial admin user and sample data
// Run with: npx ts-node --project tsconfig.json scripts/seed.ts

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/iqmath";

// User Schema (inline for script)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
}, { timestamps: true });

// Service Schema (inline for script)
const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, enum: ["training", "consulting", "development"], required: true },
    outcomes: [String],
    targetAudience: [String],
    duration: String,
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected!");

        const User = mongoose.models.User || mongoose.model("User", UserSchema);
        const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

        // Create admin user
        const adminEmail = "admin@iqmath.in";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("Admin@123", 12);
            await User.create({
                email: adminEmail,
                password: hashedPassword,
                name: "Admin User",
                role: "admin",
            });
            console.log("✓ Admin user created (admin@iqmath.in / Admin@123)");
        } else {
            console.log("→ Admin user already exists");
        }

        // Create sample services
        const services = [
            {
                title: "Corporate Training Programs",
                slug: "corporate-training",
                shortDescription: "Structured technical training for enterprise teams. Python, Data Science, Machine Learning, and Cloud Computing.",
                fullDescription: "Our corporate training programs are designed for organizations that take skill development seriously. We offer 2-day intensive workshops to 12-week comprehensive programs, all instructor-led with hands-on projects using real datasets.",
                category: "training",
                outcomes: ["Teams that can apply skills to real projects", "Measurable skill improvement", "Industry-recognized certification"],
                targetAudience: ["Corporate L&D teams", "Engineering managers", "Tech-forward organizations"],
                duration: "2 days - 12 weeks",
                isVisible: true,
                order: 1,
            },
            {
                title: "Student Workshops",
                slug: "student-workshops",
                shortDescription: "Intensive workshops for engineering students. Industry-relevant curriculum that prepares students for actual jobs.",
                fullDescription: "We conduct 1-5 day intensive workshops at engineering colleges across India. Our curriculum is designed based on what employers actually look for, not academic syllabi. Students work on real-world projects using professional tools.",
                category: "training",
                outcomes: ["Graduates with demonstrable skills", "Portfolio-ready projects", "Career guidance"],
                targetAudience: ["Engineering colleges", "Universities", "Student technical clubs"],
                duration: "1-5 days",
                isVisible: true,
                order: 2,
            },
            {
                title: "AI & ML Solutions",
                slug: "ai-ml-solutions",
                shortDescription: "Custom machine learning solutions. We build models, not just proofs of concept. From problem framing to production deployment.",
                fullDescription: "We work with enterprises that have specific technical problems suited for AI/ML. Our approach starts with feasibility analysis - we'll tell you if AI is the right solution. If it is, we build end-to-end, from model development to production deployment.",
                category: "consulting",
                outcomes: ["AI systems that work in production", "Knowledge transfer to your team", "Maintainable solutions"],
                targetAudience: ["Enterprises with data", "Product companies", "Organizations with specific prediction needs"],
                isVisible: true,
                order: 3,
            },
            {
                title: "Data Analytics Consulting",
                slug: "data-analytics",
                shortDescription: "Help you understand your data and build sustainable analytics practice. From one-time analysis to full capability building.",
                fullDescription: "Many organizations collect data but don't use it effectively. We help build analytics infrastructure, create dashboards that people actually use, and train your team alongside delivery so they can maintain the systems.",
                category: "consulting",
                outcomes: ["Analytics people actually use", "Sustainable internal capability", "Data-informed decisions"],
                targetAudience: ["Organizations drowning in data", "Companies without data teams", "Businesses wanting to become data-driven"],
                isVisible: true,
                order: 4,
            },
            {
                title: "Software Development",
                slug: "software-development",
                shortDescription: "Custom software when you need specific tools. Data dashboards, automation systems, internal applications.",
                fullDescription: "We build custom software for organizations that need specific tools. Data dashboards, automation systems, internal applications. Our focus is on building maintainable software - we document everything and train your team.",
                category: "development",
                outcomes: ["Software your team can maintain", "Clear documentation", "Training included"],
                targetAudience: ["Organizations needing custom tools", "Companies with specific automation needs", "Businesses wanting data dashboards"],
                isVisible: true,
                order: 5,
            },
            {
                title: "Internship Programs",
                slug: "internship-programs",
                shortDescription: "Supervised project experience for students. Work on real client problems under professional mentorship.",
                fullDescription: "Our internship programs give students real project experience, not busy work. Interns work on actual client projects with supervision, receiving weekly mentorship and code reviews. Programs run 4-12 weeks.",
                category: "training",
                outcomes: ["Portfolio projects", "Real work experience", "Industry mentorship"],
                targetAudience: ["Final year students", "Fresh graduates", "Career changers"],
                duration: "4-12 weeks",
                isVisible: true,
                order: 6,
            },
        ];

        for (const serviceData of services) {
            const existing = await Service.findOne({ slug: serviceData.slug });
            if (!existing) {
                await Service.create(serviceData);
                console.log(`✓ Created service: ${serviceData.title}`);
            } else {
                console.log(`→ Service exists: ${serviceData.title}`);
            }
        }

        console.log("\n✓ Seed complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
}

seed();
