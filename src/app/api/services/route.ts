import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Service } from "@/lib/models";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

// GET all services
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const isAdmin = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        // If admin, return all services; otherwise only visible ones
        const query = isAdmin && verifyToken(isAdmin)
            ? {}
            : { isVisible: true };

        const services = await Service.find(query).sort({ order: 1, createdAt: -1 });

        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

// POST create new service
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const body = await request.json();

        // Generate slug from title if not provided
        if (!body.slug) {
            body.slug = body.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
        }

        const service = await Service.create(body);

        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating service:", error);

        if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
            return NextResponse.json(
                { success: false, error: "A service with this slug already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: "Failed to create service" },
            { status: 500 }
        );
    }
}
