import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
    });
}

export function formatDateTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + "...";
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
    // Indian phone number validation (10 digits, optionally with +91)
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getEventStatus(date: Date, endDate?: Date): "upcoming" | "ongoing" | "completed" {
    const now = new Date();
    const eventDate = new Date(date);
    const eventEndDate = endDate ? new Date(endDate) : eventDate;

    if (now < eventDate) return "upcoming";
    if (now > eventEndDate) return "completed";
    return "ongoing";
}
