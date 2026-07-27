import Link from "next/link";
import { Mail, Phone, ExternalLink } from "lucide-react";

const companyLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Find doctors", href: "/doctors" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
];

const Footer = () => {
    return (
        <footer className="mt-20 w-full border-t border-border bg-surface">
            <div className="container py-16">
                <div className="grid grid-cols-1 gap-12 text-sm sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
                    <div className="space-y-5">
                        <span className="text-xl font-extrabold tracking-[-0.035em] text-primary md:text-2xl">
                            Mend<span className="text-accent">.</span>
                        </span>
                        <p className="max-w-md font-medium leading-relaxed text-foreground-muted">
                            Mend helps patients connect with trusted doctors through a
                            simple, secure booking experience — from specialty search to
                            confirmed visit.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-primary hover:shadow-soft"
                                >
                                    {social.label}
                                    <ExternalLink size={12} className="text-accent opacity-70" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <p className="label-caps">Company</p>
                        <ul className="flex flex-col gap-3 font-semibold text-foreground-muted">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex transition-all duration-200 hover:translate-x-0.5 hover:text-accent"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <p className="label-caps">Get in touch</p>
                        <ul className="flex flex-col gap-4 font-semibold text-foreground-muted">
                            <li>
                                <a
                                    href="tel:+966-000-000-000"
                                    className="group inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-accent"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent-soft">
                                        <Phone
                                            size={14}
                                            className="text-foreground-muted group-hover:text-accent"
                                        />
                                    </div>
                                    <span>+966-000-000-000</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:clinic@mend.app"
                                    className="group inline-flex items-center gap-2.5 break-all transition-colors duration-200 hover:text-accent"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-all duration-300 group-hover:border-accent/30 group-hover:bg-accent-soft">
                                        <Mail
                                            size={14}
                                            className="text-foreground-muted group-hover:text-accent"
                                        />
                                    </div>
                                    <span>clinic@mend.app</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-10 border-border" />

                <div className="flex flex-col items-center justify-between gap-4 py-1 text-center text-xs font-semibold text-foreground-muted sm:flex-row">
                    <p>
                        Copyright {new Date().getFullYear()} Mend. All rights reserved.
                    </p>
                    <Link
                        href="/contact"
                        className="flex min-h-11 items-center justify-center rounded-xl border border-border bg-background px-5 py-2.5 font-bold text-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-soft"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;