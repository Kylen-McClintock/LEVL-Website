import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: "sm" | "default" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10": variant === "primary",
                        "bg-brand-copper text-white hover:bg-brand-copper/90": variant === "secondary",
                        "bg-transparent text-white hover:bg-white/10": variant === "ghost",
                        "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40": variant === "outline",

                        "h-9 px-4 text-sm": size === "sm",
                        "h-11 px-8 text-base": size === "default",
                        "h-14 px-10 text-lg": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
