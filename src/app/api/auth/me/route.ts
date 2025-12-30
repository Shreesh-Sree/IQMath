import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { success: false, error: "Invalid token" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                user: {
                    id: payload.userId,
                    email: payload.email,
                    role: payload.role,
                },
            },
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
