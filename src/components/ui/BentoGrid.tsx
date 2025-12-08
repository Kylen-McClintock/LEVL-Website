import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto w-full max-w-7xl px-4",
                className
            )}
        >
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3 | 4;
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-3xl overflow-hidden relative transition-all duration-300 group hover:scale-[1.01]",
                {
                    "lg:col-span-1": colSpan === 1,
                    "lg:col-span-2": colSpan === 2,
                    "lg:col-span-3": colSpan === 3,
                    "lg:col-span-4": colSpan === 4,
                    "lg:row-span-1": rowSpan === 1,
                    "lg:row-span-2": rowSpan === 2,
                    "lg:row-span-3": rowSpan === 3,
                    "lg:row-span-4": rowSpan === 4,
                },
                className
            )}
        >
            {children}
        </div>
    );
}
