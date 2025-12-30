import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "accent" | "success" | "warning" | "error";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default: "badge",
            accent: "badge badge-accent",
            success: "badge badge-success",
            warning: "badge badge-warning",
            error: "badge badge-error",
        };

        return (
            <span ref={ref} className={cn(variants[variant], className)} {...props} />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
