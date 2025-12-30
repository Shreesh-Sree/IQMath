"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            router.push("/admin/dashboard");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-paper-warm flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-ink mb-2">
                        IQ<span className="text-accent">math</span> Admin
                    </h1>
                    <p className="text-ink-muted">
                        Sign in to manage your website
                    </p>
                </div>

                <div className="bg-paper rounded-lg border border-border p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            required
                            placeholder="admin@iqmath.in"
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />

                        {error && (
                            <div className="text-sm text-error bg-error/10 px-3 py-2 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-ink-muted mt-6">
                    <a href="/" className="hover:text-ink">
                        ← Back to website
                    </a>
                </p>
            </div>
        </div>
    );
}
