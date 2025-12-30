"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, X, Clock, Eye } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Badge, Modal, Button, Textarea } from "@/components/ui";

interface Appointment {
    _id: string;
    name: string;
    email: string;
    phone: string;
    purpose: string;
    message: string;
    preferredTime: string;
    status: "pending" | "approved" | "rejected" | "completed";
    adminNotes?: string;
    createdAt: string;
}

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [detailModal, setDetailModal] = useState<{ open: boolean; appointment: Appointment | null }>({
        open: false,
        appointment: null,
    });
    const [adminNotes, setAdminNotes] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await fetch("/api/appointments");
            const data = await res.json();
            if (data.success) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string, notes?: string) => {
        try {
            await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, adminNotes: notes }),
            });
            fetchAppointments();
            setDetailModal({ open: false, appointment: null });
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const filteredAppointments = filter === "all"
        ? appointments
        : appointments.filter(a => a.status === filter);

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "accent" | "success" | "warning" | "error"> = {
            pending: "warning",
            approved: "success",
            rejected: "error",
            completed: "default",
        };
        return variants[status] || "default";
    };

    const getPurposeLabel = (purpose: string) => {
        const labels: Record<string, string> = {
            student: "Student Enquiry",
            college: "College Partnership",
            corporate: "Corporate Training",
        };
        return labels[purpose] || purpose;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-ink mb-1">Appointments</h1>
                    <p className="text-ink-muted">Manage consultation requests</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {["all", "pending", "approved", "rejected", "completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === status
                                    ? "bg-ink text-paper"
                                    : "bg-paper-subtle text-ink-secondary hover:bg-paper-muted"
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            {status !== "all" && (
                                <span className="ml-1.5 text-xs opacity-70">
                                    ({appointments.filter(a => a.status === status).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Appointments List */}
                <div className="bg-paper border border-border rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-ink-muted">Loading...</div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="p-8 text-center text-ink-muted">
                            No appointments found
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-paper-subtle border-b border-border">
                                <tr>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Contact</th>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Purpose</th>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Preferred Time</th>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Status</th>
                                    <th className="text-right px-4 py-3 text-sm font-medium text-ink-muted">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredAppointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-ink">{appointment.name}</p>
                                            <p className="text-sm text-ink-muted">{appointment.email}</p>
                                            <p className="text-sm text-ink-muted">{appointment.phone}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-ink">{getPurposeLabel(appointment.purpose)}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-ink-secondary">
                                                {formatDate(appointment.preferredTime)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant={getStatusBadge(appointment.status)}>
                                                {appointment.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setDetailModal({ open: true, appointment });
                                                        setAdminNotes(appointment.adminNotes || "");
                                                    }}
                                                    className="p-2 text-ink-muted hover:text-ink rounded-md hover:bg-paper-subtle"
                                                    title="View details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {appointment.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(appointment._id, "approved")}
                                                            className="p-2 text-ink-muted hover:text-success rounded-md hover:bg-paper-subtle"
                                                            title="Approve"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(appointment._id, "rejected")}
                                                            className="p-2 text-ink-muted hover:text-error rounded-md hover:bg-paper-subtle"
                                                            title="Reject"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                {appointment.status === "approved" && (
                                                    <button
                                                        onClick={() => updateStatus(appointment._id, "completed")}
                                                        className="p-2 text-ink-muted hover:text-accent rounded-md hover:bg-paper-subtle"
                                                        title="Mark completed"
                                                    >
                                                        <Clock className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={detailModal.open}
                onClose={() => setDetailModal({ open: false, appointment: null })}
                title="Appointment Details"
                size="lg"
            >
                {detailModal.appointment && (
                    <div className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Name</p>
                                <p className="font-medium text-ink">{detailModal.appointment.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Purpose</p>
                                <p className="font-medium text-ink">
                                    {getPurposeLabel(detailModal.appointment.purpose)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Email</p>
                                <a href={`mailto:${detailModal.appointment.email}`} className="text-accent">
                                    {detailModal.appointment.email}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Phone</p>
                                <a href={`tel:${detailModal.appointment.phone}`} className="text-accent">
                                    {detailModal.appointment.phone}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Preferred Time</p>
                                <p className="text-ink">{formatDate(detailModal.appointment.preferredTime)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-ink-muted mb-1">Submitted</p>
                                <p className="text-ink">{formatDate(detailModal.appointment.createdAt)}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-ink-muted mb-1">Message</p>
                            <p className="text-ink bg-paper-subtle p-3 rounded-md">
                                {detailModal.appointment.message || "No message provided"}
                            </p>
                        </div>

                        <div>
                            <Textarea
                                label="Admin Notes"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder="Add internal notes..."
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-border">
                            <Badge variant={getStatusBadge(detailModal.appointment.status)}>
                                {detailModal.appointment.status}
                            </Badge>

                            <div className="flex gap-2">
                                {detailModal.appointment.status === "pending" && (
                                    <>
                                        <Button
                                            variant="secondary"
                                            onClick={() => updateStatus(detailModal.appointment!._id, "rejected", adminNotes)}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            variant="accent"
                                            onClick={() => updateStatus(detailModal.appointment!._id, "approved", adminNotes)}
                                        >
                                            Approve
                                        </Button>
                                    </>
                                )}
                                {detailModal.appointment.status === "approved" && (
                                    <Button
                                        variant="primary"
                                        onClick={() => updateStatus(detailModal.appointment!._id, "completed", adminNotes)}
                                    >
                                        Mark Completed
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}
