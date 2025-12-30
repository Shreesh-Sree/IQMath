import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Appointment } from "@/lib/models";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

// GET all appointments (admin only)
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const appointments = await Appointment.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}

// POST create new appointment (public)
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();

        // Validate required fields
        const required = ["name", "email", "phone", "purpose", "preferredTime"];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Parse preferred time
        if (body.preferredDate && body.preferredTime) {
            body.preferredTime = new Date(`${body.preferredDate}T${body.preferredTime}:00`);
        }

        const appointment = await Appointment.create({
            ...body,
            status: "pending",
        });

        return NextResponse.json({ success: true, data: appointment }, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
