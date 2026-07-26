"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const isActive = (href, pathname) =>
  pathname === href || (href === "/doctors" && pathname.startsWith("/doctors"));

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = showMenu ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [showMenu]);

  useEffect(() => {
    if (!showMenu) return;
    const onKeyDown = (e) => { if (e.key === "Escape") setShowMenu(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showMenu]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "border-b border-border/80 bg-surface-glass backdrop-blur-md shadow-soft"
        : "border-b border-border/60 bg-surface/95"
        }`}
    >
      <div className="container flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="flex min-h-10 items-center transition-transform duration-300 hover:scale-[1.02] active:scale-95"
        >
          <span className="text-xl font-extrabold tracking-tight text-primary md:text-2xl">
            Mend<span className="text-accent">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-lg border border-border/70 bg-surface-muted/70 p-1 text-sm font-semibold md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative inline-flex min-h-9 items-center rounded-md px-3.5 transition-colors duration-300 ${isActive(href, pathname)
                  ? "bg-surface text-primary shadow-sm"
                  : "text-foreground-muted hover:bg-surface/70 hover:text-foreground"
                  }`}
              >
                {label}
                {isActive(href, pathname) && (
                  <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-btn transition-all hover:-translate-y-0.5 hover:bg-primary-hover sm:px-5"
          >
            Create account
          </Link>

          <button
            className="flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-surface-muted p-2 text-foreground transition-colors hover:bg-border/60 md:hidden"
            onClick={() => setShowMenu(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none invisible"
          }`}
        onClick={() => setShowMenu(false)}
      />

      <div
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-[min(320px,85vw)] flex-col border-l border-border bg-surface p-5 shadow-hover transition-transform duration-300 ease-in-out md:hidden ${showMenu ? "translate-x-0" : "translate-x-full invisible"
          }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <span className="text-lg font-extrabold tracking-tight text-primary">
            Mend<span className="text-accent">.</span>
          </span>
          <button
            onClick={() => setShowMenu(false)}
            className="flex min-h-10 min-w-10 items-center justify-center rounded-lg p-2 transition-all hover:bg-surface-muted"
          >
            <X size={20} className="text-foreground-muted" />
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setShowMenu(false)}
                className={`block rounded-lg px-4 py-3 text-base font-bold transition-all ${isActive(href, pathname)
                  ? "bg-primary-soft text-primary"
                  : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-border pt-4">
          <Link
            href="/login"
            onClick={() => setShowMenu(false)}
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition-all hover:bg-primary-hover"
          >
            Create account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
