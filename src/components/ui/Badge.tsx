import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "glow"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "border-transparent bg-brand-purple/20 text-purple-100 hover:bg-brand-purple/30": variant === "default",
                    "border-white/20 text-white/80": variant === "outline",
                    "border-transparent bg-brand-copper/20 text-orange-100 shadow-[0_0_10px_rgba(180,83,9,0.3)]": variant === "glow",
                },
                className
            )}
            {...props}
        />
    )
}
