import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Appointment } from "@/lib/models";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET single appointment
export async function GET(request: NextRequest, { params }: RouteParams) {
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

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return NextResponse.json(
                { success: false, error: "Appointment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: appointment });
    } catch (error) {
        console.error("Error fetching appointment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch appointment" },
            { status: 500 }
        );
    }
}

// PATCH update appointment (admin only)
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

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!appointment) {
            return NextResponse.json(
                { success: false, error: "Appointment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: appointment });
    } catch (error) {
        console.error("Error updating appointment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update appointment" },
            { status: 500 }
        );
    }
}

// DELETE appointment (admin only)
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

        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return NextResponse.json(
                { success: false, error: "Appointment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: "Appointment deleted" });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete appointment" },
            { status: 500 }
        );
    }
}
