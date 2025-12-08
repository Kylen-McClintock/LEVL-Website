import { BentoCard } from "@/components/ui/BentoGrid";
import { Container } from "@/components/ui/Container";

const navLinks = [
    { name: "Shop DeepCell", href: "/#deepcell" },
    { name: "Science", href: "/#science" },
    { name: "App", href: "/#app" },
    { name: "About", href: "https://levlhealth.com/pages/about" },
    { name: "Blog", href: "https://levlhealth.com/blogs/news" },
    { name: "Privacy", href: "/privacy" },
];

export function Footer() {
    return (
        <footer className="mt-24 border-t border-white/10 bg-black/40 pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">LEVL</h2>
                        <p className="text-white/60 mb-6 max-w-sm">
                            Advanced longevity supplements that connect daily experience to long term hallmarks of aging.
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
