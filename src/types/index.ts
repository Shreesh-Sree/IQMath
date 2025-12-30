// Database Types
export interface IUser {
    _id: string;
    email: string;
    name: string;
    role: "admin" | "editor";
    createdAt: Date;
    updatedAt: Date;
}

export interface IService {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    category: "training" | "consulting" | "development";
    outcomes: string[];
    targetAudience: string[];
    duration?: string;
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEvent {
    _id: string;
    title: string;
    slug: string;
    description: string;
    date: Date;
    endDate?: Date;
    location: string;
    type: "workshop" | "seminar" | "training" | "webinar";
    status: "upcoming" | "ongoing" | "completed";
    gallery: string[];
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITeamMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    skills: string[];
    achievements: string[];
    linkedin?: string;
    image?: string;
    order: number;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITestimonial {
    _id: string;
    name: string;
    role: string;
    organization: string;
    type: "student" | "institution" | "corporate";
    content: string;
    image?: string;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAppointment {
    _id: string;
    name: string;
    email: string;
    phone: string;
    purpose: "student" | "college" | "corporate";
    message: string;
    preferredTime: Date;
    status: "pending" | "approved" | "rejected" | "completed";
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMedia {
    _id: string;
    url: string;
    type: "image" | "video";
    category: string;
    caption: string;
    eventRef?: string;
    order: number;
    createdAt: Date;
}

// API Response Types
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Form Types
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export interface AppointmentFormData {
    name: string;
    email: string;
    phone: string;
    purpose: "student" | "college" | "corporate";
    message: string;
    preferredDate: string;
    preferredTime: string;
}

// Auth Types
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: "admin" | "editor";
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface JWTPayload {
    userId: string;
    email: string;
    role: "admin" | "editor";
    iat: number;
    exp: number;
}

// Navigation Types
export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}
