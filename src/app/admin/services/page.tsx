"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminLayout } from "@/components/admin";
import { Badge, Button, Modal } from "@/components/ui";

interface Service {
    _id: string;
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    isVisible: boolean;
    order: number;
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; service: Service | null }>({
        open: false,
        service: null,
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            if (data.success) {
                setServices(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = async (service: Service) => {
        try {
            await fetch(`/api/services/${service._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isVisible: !service.isVisible }),
            });
            fetchServices();
        } catch (error) {
            console.error("Failed to toggle visibility:", error);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.service) return;

        try {
            await fetch(`/api/services/${deleteModal.service._id}`, {
                method: "DELETE",
            });
            setDeleteModal({ open: false, service: null });
            fetchServices();
        } catch (error) {
            console.error("Failed to delete service:", error);
        }
    };

    const getCategoryBadge = (category: string) => {
        const variants: Record<string, "default" | "accent" | "success"> = {
            training: "accent",
            consulting: "success",
            development: "default",
        };
        return variants[category] || "default";
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-ink mb-1">Services</h1>
                        <p className="text-ink-muted">Manage your service offerings</p>
                    </div>
                    <Link href="/admin/services/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Add Service
                    </Link>
                </div>

                {/* Services List */}
                <div className="bg-paper border border-border rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-ink-muted">Loading...</div>
                    ) : services.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-ink-muted mb-4">No services yet</p>
                            <Link href="/admin/services/new" className="btn btn-primary">
                                Add your first service
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-paper-subtle border-b border-border">
                                <tr>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Service</th>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Category</th>
                                    <th className="text-left px-4 py-3 text-sm font-medium text-ink-muted">Status</th>
                                    <th className="text-right px-4 py-3 text-sm font-medium text-ink-muted">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {services.map((service) => (
                                    <tr key={service._id}>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-ink">{service.title}</p>
                                            <p className="text-sm text-ink-muted line-clamp-1">
                                                {service.shortDescription}
                                            </p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant={getCategoryBadge(service.category)}>
                                                {service.category}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={() => toggleVisibility(service)}
                                                className={`flex items-center gap-1.5 text-sm ${service.isVisible
                                                        ? "text-success"
                                                        : "text-ink-muted"
                                                    }`}
                                            >
                                                {service.isVisible ? (
                                                    <>
                                                        <Eye className="w-4 h-4" />
                                                        Visible
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="w-4 h-4" />
                                                        Hidden
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/services/${service._id}`}
                                                    className="p-2 text-ink-muted hover:text-ink rounded-md hover:bg-paper-subtle"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteModal({ open: true, service })}
                                                    className="p-2 text-ink-muted hover:text-error rounded-md hover:bg-paper-subtle"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, service: null })}
                title="Delete Service"
                size="sm"
            >
                <p className="text-ink-secondary mb-6">
                    Are you sure you want to delete "{deleteModal.service?.title}"?
                    This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <Button
                        variant="secondary"
                        onClick={() => setDeleteModal({ open: false, service: null })}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        className="bg-error hover:bg-error/90"
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </AdminLayout>
    );
}
