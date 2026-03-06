"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animate menu open/close
    useEffect(() => {
        const menu = menuRef.current;
        const menuLinks = menuLinksRef.current;
        if (!menu) return;

        if (menuOpen) {
            // Open: fade + slide down
            gsap.set(menu, { display: "flex" });
            gsap.fromTo(menu,
                { opacity: 0, y: -16 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
            );
            // Links stagger in
            if (menuLinks) {
                const links = menuLinks.querySelectorAll(".menu-link");
                gsap.fromTo(links,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.1 }
                );
            }
        } else {
            // Close: fade out
            gsap.to(menu, {
                opacity: 0,
                y: -10,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => { gsap.set(menu, { display: "none" }); },
            });
        }
    }, [menuOpen]);

    const navLinks = [
        { label: "Logística Industrial", href: "#" },
        { label: "Carga Pesada", href: "#" },
        { label: "Rastreo B2B", href: "#" },
    ];

    return (
        <>
            {/* ── MAIN NAVBAR ── */}
            <nav
                className={`
                    fixed z-[100] transition-all duration-500 ease-out
                    ${scrolled
                        ? "top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl rounded-2xl shadow-2xl shadow-black/40 border border-white/10 bg-[#0A192F]/92 backdrop-blur-xl px-1"
                        : "top-0 left-0 right-0 bg-transparent px-0"
                    }
                `}
            >
                <div className={`${scrolled ? "px-5" : "px-4 sm:px-6 max-w-7xl mx-auto"}`}>
                    <div className="flex items-center h-14 gap-3">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
                            <div className="p-1.5 rounded-lg bg-accent/20 border border-accent/30">
                                <span className="material-symbols-outlined text-lg text-accent">factory</span>
                            </div>
                            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                                VENTAS EN USA
                            </span>
                        </Link>

                        {/* Desktop nav links — always visible on desktop, compact when scrolled */}
                        <div className={`hidden lg:flex items-center flex-1 transition-all duration-500 ${
                            scrolled ? "gap-3 xl:gap-4" : "gap-5 xl:gap-7"
                        }`}>
                            {navLinks.map((item) => (
                                <a
                                    key={item.label}
                                    className={`font-medium text-white/70 hover:text-accent transition-colors duration-200 whitespace-nowrap ${
                                        scrolled ? "text-xs" : "text-sm"
                                    }`}
                                    href={item.href}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Login button — always top right */}
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center justify-center px-4 h-8 text-xs font-bold rounded-xl transition-all duration-300 whitespace-nowrap bg-accent text-white hover:bg-teal-400 shadow-md shadow-accent/20"
                        >
                            Acceso Corporativo
                        </Link>

                        {/* Hamburger */}
                        <button
                            className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── FULL-SCREEN MENU OVERLAY ── */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-[99] hidden flex-col"
                style={{ background: "rgba(6,15,30,0.97)", backdropFilter: "blur(20px)" }}
            >
                {/* Subtle accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #00BFA6, transparent)" }} />

                {/* Header row */}
                <div className="relative z-10 flex justify-between items-center px-6 sm:px-10 pt-5 pb-4 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                        <div className="p-1.5 rounded-lg bg-accent/20 border border-accent/30">
                            <span className="material-symbols-outlined text-lg text-accent">factory</span>
                        </div>
                        <span className="font-display font-bold text-base text-white">VENTAS EN USA</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="hidden sm:flex items-center justify-center px-4 h-8 text-xs font-bold rounded-xl bg-accent text-white hover:bg-teal-400 transition-colors" onClick={() => setMenuOpen(false)}>
                            Acceso Corporativo
                        </Link>
                        <button
                            className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <span className="material-symbols-outlined text-white text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Menu content */}
                <div ref={menuLinksRef} className="relative z-10 flex flex-col flex-1 justify-center px-6 sm:px-10 lg:px-16 py-8 max-w-2xl">
                    <p className="text-xs font-mono text-accent/50 tracking-widest uppercase mb-8">Navegación</p>

                    {[...navLinks, { label: "Acceso Corporativo", href: "/login" }, { label: "Rastreo de Carga", href: "/tracking" }].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="menu-link group flex items-center gap-4 py-4 border-b border-white/5 hover:border-accent/20 transition-all duration-200"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors flex-shrink-0" />
                            <span className="font-display font-bold text-2xl sm:text-3xl text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                            <span className="material-symbols-outlined text-accent/0 group-hover:text-accent/50 transition-all ml-auto text-lg group-hover:translate-x-1 duration-200">arrow_forward</span>
                        </Link>
                    ))}

                    {/* Mobile login */}
                    <Link href="/login" className="sm:hidden mt-8 flex items-center justify-center px-6 h-11 bg-accent text-white font-bold rounded-xl hover:bg-teal-400 transition-colors" onClick={() => setMenuOpen(false)}>
                        Acceso Corporativo
                    </Link>

                    {/* Quick stats row */}
                    <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                        {[
                            { icon: "flight_takeoff", label: "Miami → Venezuela" },
                            { icon: "schedule", label: "72h Urgente" },
                            { icon: "verified", label: "ISO Certificado" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-accent text-sm">{stat.icon}</span>
                                <span className="font-mono text-xs text-white/40">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="relative z-10 px-6 sm:px-10 py-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-xs text-white/20">© 2025 VentasUSA — Logística Industrial</span>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="font-mono text-xs text-accent/40">Operativo</span>
                    </div>
                </div>
            </div>
        </>
    );
}
