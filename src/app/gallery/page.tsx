import Link from "next/link";
import { Header, Footer } from "@/components/layout";

export const metadata = {
    title: "Gallery",
    description: "Photos from IQmath Technologies workshops, training sessions, and events.",
};

// Sample gallery data - would come from database in production
const galleryCategories = [
    {
        name: "Workshops",
        count: 24,
        images: [
            { id: 1, caption: "Python bootcamp at Symbiosis University, November 2024" },
            { id: 2, caption: "Data Science workshop for corporate team" },
            { id: 3, caption: "Hands-on session during ML fundamentals course" },
        ],
    },
    {
        name: "Corporate Training",
        count: 18,
        images: [
            { id: 4, caption: "8-week program at TechCorp India" },
            { id: 5, caption: "Cloud computing training session" },
            { id: 6, caption: "Team project presentation day" },
        ],
    },
    {
        name: "Events & Seminars",
        count: 12,
        images: [
            { id: 7, caption: "AI in Business executive seminar" },
            { id: 8, caption: "Annual data science conference panel" },
            { id: 9, caption: "Industry-academia partnership launch" },
        ],
    },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Opening */}
                <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
                    <div className="container">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-widest text-ink-muted mb-6">
                                Gallery
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-6">
                                From our programs and events
                            </h1>
                            <p className="text-xl text-ink-secondary leading-relaxed">
                                Photos from workshops, training sessions, and events we've
                                conducted over the years.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Gallery Sections */}
                <section className="py-12 lg:py-16">
                    <div className="container">
                        {galleryCategories.map((category, categoryIndex) => (
                            <div
                                key={category.name}
                                className={categoryIndex !== 0 ? "mt-16 pt-16 border-t border-border" : ""}
                            >
                                <div className="flex items-baseline justify-between mb-8">
                                    <h2 className="text-2xl font-semibold text-ink">
                                        {category.name}
                                    </h2>
                                    <span className="text-sm text-ink-muted">
                                        {category.count} photos
                                    </span>
                                </div>

                                {/* Image grid - asymmetric layout */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {category.images.map((image, imageIndex) => (
                                        <div
                                            key={image.id}
                                            className={`
                        relative bg-paper-muted rounded-lg overflow-hidden
                        ${imageIndex === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'}
                      `}
                                        >
                                            {/* Placeholder for actual images */}
                                            <div className="absolute inset-0 flex items-end p-4">
                                                <p className="text-sm text-ink-muted">
                                                    {image.caption}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 lg:py-20 bg-paper-warm">
                    <div className="container">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-semibold text-ink mb-4">
                                Want to see us in action?
                            </h2>
                            <p className="text-ink-secondary mb-6">
                                Book a consultation and we'll share more examples of our work
                                with similar organizations.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/book-appointment"
                                    className="btn btn-primary"
                                >
                                    Book a consultation
                                </Link>
                                <Link
                                    href="/events"
                                    className="btn btn-secondary"
                                >
                                    See upcoming events
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
