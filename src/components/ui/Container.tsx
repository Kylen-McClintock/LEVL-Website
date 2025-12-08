import { cn } from "@/lib/utils"

export function Container({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function Section({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={cn("py-12 md:py-16 lg:py-24", className)}
            {...props}
        >
            {children}
        </section>
    )
}
