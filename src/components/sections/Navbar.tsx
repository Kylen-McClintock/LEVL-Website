"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { name: "Science", href: "/#science" },
    { name: "App", href: "/#app" },
    { name: "About", href: "/about" },
    { name: "Learn", href: "/learn", hiddenOnMobile: true },
    { name: "Research", href: "/research" },
];

export function Navbar({ showCart = true }: { showCart?: boolean } = {}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const { cart, openCart } = useCart();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 15);
    });

    const totalQuantity = cart?.totalQuantity || 0;
    const isProductPage = pathname === "/" || pathname?.startsWith("/products/");

    const handleActionClick = (e: React.MouseEvent) => {
        if (isProductPage) {
            const purchaseEl = document.getElementById("purchase");
            if (purchaseEl) {
                e.preventDefault();
                purchaseEl.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-brand-dark/90 backdrop-blur-md border-b border-white/10 py-1"
                    : "bg-transparent py-2 md:py-3"
            }`}
        >
            <Container className="flex items-center justify-between h-12 md:h-14">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/levl-logo.png"
                        alt="LEVL"
                        width={110}
                        height={36}
                        className="h-6 md:h-7 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs md:text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action: Morphing Cart / CTA & Mobile Menu */}
                <div className="flex items-center gap-2.5 md:gap-4">
                    <AnimatePresence mode="wait">
                        {totalQuantity > 0 ? (
                            /* When Cart has items -> Show Cart Button with Badge */
                            <motion.button
                                key="cart-button"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                id="cart-trigger"
                                onClick={openCart}
                                className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-white/10 border border-white/20 hover:border-[var(--color-levl-cyan)] text-white hover:text-[var(--color-levl-cyan)] transition-all cursor-pointer shadow-lg"
                                aria-label="Open Cart"
                            >
                                <ShoppingBag className="w-4 h-4 text-[var(--color-levl-cyan)]" />
                                <span className="text-xs font-bold text-white">Cart</span>
                                <span className="bg-[var(--color-levl-cyan)] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_var(--color-levl-cyan)] ml-0.5">
                                    {totalQuantity}
                                </span>
                            </motion.button>
                        ) : (
                            /* When Cart is Empty -> Show High-Converting Action Button */
                            <motion.div
                                key="cta-button"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={isProductPage ? "#purchase" : "/products/longevity/#purchase"}
                                    onClick={handleActionClick}
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 md:px-5 md:py-2 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-xs md:text-sm hover:bg-[var(--color-levl-cyan)]/90 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] cursor-pointer tracking-tight whitespace-nowrap"
                                >
                                    <span>Get DeepCell</span>
                                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Hamburger Menu Toggle */}
                    <button
                        className="md:hidden text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </Container>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-[#07090E]/95 backdrop-blur-xl border-b border-white/10 p-5 md:hidden flex flex-col gap-3 shadow-2xl"
                >
                    {navLinks.map((link) => {
                        if (link.hiddenOnMobile) return null;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-white/90 py-2 border-b border-white/5 hover:text-[var(--color-levl-cyan)] transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <Link
                        href={isProductPage ? "#purchase" : "/products/longevity/#purchase"}
                        onClick={handleActionClick}
                        className="w-full mt-2 py-3 rounded-full bg-[var(--color-levl-cyan)] text-black font-bold text-sm text-center shadow-lg block"
                    >
                        Get DeepCell
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}
