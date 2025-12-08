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

// Define colSpanClass and rowSpanClass as they are used in the new BentoCard component
const colSpanClass = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
};

const rowSpanClass = {
    1: "lg:row-span-1",
    2: "lg:row-span-2",
};

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2;
    className?: string;
}

export function BentoCard({ children, colSpan = 1, rowSpan = 1, className, ...props }: BentoCardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-3xl overflow-hidden relative transition-all duration-300 group hover:scale-[1.01]",
                // Mobile: default to col-span-4 (full width) unless overridden by specific mobile classes in className
                // Desktop: use the colSpan prop
                colSpanClass[colSpan],
                rowSpanClass[rowSpan],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
