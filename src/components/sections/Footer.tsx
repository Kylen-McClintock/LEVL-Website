import { BentoCard } from "@/components/ui/BentoGrid";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

import Image from "next/image";

const navLinks = [
    { name: "Get Early Access", href: "/#early-access" },
    { name: "Science", href: "/#science" },
    { name: "App", href: "/#app" },
    { name: "LEV Trajectory", href: "/LEVTrajectory" },
    { name: "About", href: "https://levlhealth.com/pages/about" },
];

export function Footer() {
    return (
        <footer className="mt-24 border-t border-white/10 bg-black/40 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/levl-logo.png"
                                alt="LEVL"
                                width={120}
                                height={40}
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-white/60 mb-6 max-w-sm">
                            Advanced Longevity Supplements to Extend Healthy Lifespan
                        </p>
                        <p className="text-white/40 text-sm">© 2025 LEVL Health</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">Links</h3>
                        <ul className="space-y-2">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-white/60 hover:text-white transition-colors">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-4">Legal</h3>
                        <p className="text-xs text-white/30 leading-relaxed">
                            These statements have not been evaluated by the Food and Drug Administration.
                            This product is not intended to diagnose, treat, cure, or prevent any disease.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
