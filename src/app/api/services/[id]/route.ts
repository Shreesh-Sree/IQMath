import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Service } from "@/lib/models";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single service
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const service = await Service.findById(id);

        if (!service) {
            return NextResponse.json(
                { success: false, error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: service });
    } catch (error) {
        console.error("Error fetching service:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch service" },
            { status: 500 }
        );
    }
}

// PATCH update service
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        await connectToDatabase();

        const body = await request.json();

        const service = await Service.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!service) {
            return NextResponse.json(
                { success: false, error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: service });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update service" },
            { status: 500 }
        );
    }
}

// DELETE service
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        await connectToDatabase();

        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return NextResponse.json(
                { success: false, error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Service deleted" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete service" },
            { status: 500 }
        );
    }
}
