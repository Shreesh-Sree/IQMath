import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IQmath Technologies LLP",
    template: "%s | IQmath Technologies",
  },
  description:
    "Data Science, AI/ML Training, Corporate Workshops & IT Consulting. Building technical excellence through education and innovation.",
  keywords: [
    "Data Science Training",
    "AI ML Courses",
    "Corporate Training",
    "Python Training",
    "Machine Learning",
    "IT Consulting",
    "EdTech India",
    "Student Workshops",
    "Internship Programs",
  ],
  authors: [{ name: "IQmath Technologies LLP" }],
  creator: "IQmath Technologies LLP",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "IQmath Technologies",
    title: "IQmath Technologies LLP",
    description:
      "Data Science, AI/ML Training, Corporate Workshops & IT Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQmath Technologies LLP",
    description:
      "Data Science, AI/ML Training, Corporate Workshops & IT Consulting",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
