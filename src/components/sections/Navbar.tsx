"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { name: "Science", href: "/#science" },
    { name: "App", href: "/#app" },
    { name: "About", href: "/about" },
    { name: "Learn", href: "/learn", hiddenOnMobile: true },
    { name: "Research", href: "/research" },
];

export function Navbar({ showCart = false }: { showCart?: boolean } = {}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const { cart, openCart } = useCart();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const totalQuantity = cart?.totalQuantity || 0;

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
                    {showCart && (
                        <button 
                            id="cart-trigger" 
                            onClick={openCart}
                            className="p-2 text-white hover:text-[var(--color-levl-cyan)] transition-colors relative"
                            aria-label="Open Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--color-levl-cyan)] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_var(--color-levl-cyan)]">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>
                    )}

                    <Link href="/products/longevity/">
                        <Button variant="primary" size="sm" className="hidden md:flex">
                            Order DeepCell
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
                    <Link href="/products/longevity/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mt-2">Order DeepCell</Button>
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
