"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { name: "Science", href: "/#science" },
    { name: "App", href: "/#app" },
    { name: "About", href: "/about" },
    { name: "Learn", href: "/learn", hiddenOnMobile: true },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-dark/80 backdrop-blur-md border-b border-white/10" : "bg-transparent py-4"
                }`}
        >
            <Container className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/levl-logo.png"
                        alt="LEVL"
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Link href="/#early-access">
                        <Button variant="primary" size="sm" className="hidden md:flex">
                            Gain Early Access
                        </Button>
                    </Link>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-16 left-0 right-0 bg-brand-dark border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
                >
                    {navLinks.map((link) => {
                        if (link.hiddenOnMobile) return null;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-white/90 py-2 border-b border-white/5"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    <Link href="/#early-access" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mt-2">Gain Early Access</Button>
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
