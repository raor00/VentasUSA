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
        const handleScroll = () => {
            const nextScrolled = window.scrollY > 80;
            setScrolled(nextScrolled);
            if (!nextScrolled) {
                setMenuOpen(false);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const menu = menuRef.current;
        const menuLinks = menuLinksRef.current;
        if (!menu || !scrolled) return;

        if (menuOpen) {
            gsap.set(menu, { display: "block" });
            gsap.fromTo(menu, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" });

            if (menuLinks) {
                const links = menuLinks.querySelectorAll(".menu-link");
                gsap.fromTo(links, { opacity: 0, y: -8 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.2, ease: "power2.out", delay: 0.05 });
            }
        } else {
            gsap.to(menu, {
                opacity: 0,
                y: -10,
                duration: 0.18,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(menu, { display: "none" });
                },
            });
        }
    }, [menuOpen, scrolled]);

    const navLinks = [
        { label: "Logística Industrial", href: "#process-section" },
        { label: "Carga Pesada", href: "#heavy-cargo-section" },
        { label: "Rastreo B2B", href: "#tracking-section" },
    ];

    return (
        <>
            <nav
                className={`fixed z-[100] transition-all duration-500 ease-out ${
                    scrolled
                        ? "top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl rounded-2xl shadow-2xl shadow-black/40 border border-white/10 bg-[#0A192F]/92 backdrop-blur-xl"
                        : "top-0 left-0 right-0 bg-transparent"
                }`}
            >
                <div className={`${scrolled ? "px-5" : "px-4 sm:px-6 max-w-7xl mx-auto"}`}>
                    <div className="flex items-center h-16 gap-3">
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 mr-3">
                            <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                                <span className="material-symbols-outlined text-[20px] text-accent">factory</span>
                            </div>
                            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
                                VENTAS EN USA
                            </span>
                        </Link>

                        {!scrolled && (
                            <div className="hidden lg:flex items-center flex-1 gap-6 xl:gap-8">
                                {navLinks.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="font-semibold text-base text-white/78 hover:text-accent transition-colors duration-200 whitespace-nowrap tracking-[0.01em]"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        <div className="flex-1" />

                        <Link
                            href="/login"
                            className="hidden sm:flex items-center justify-center px-5 h-10 text-sm font-bold rounded-xl transition-all duration-300 whitespace-nowrap bg-accent text-white hover:bg-blue-700 shadow-md shadow-accent/20"
                        >
                            Acceso Corporativo
                        </Link>

                        {scrolled && (
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition-colors flex-shrink-0"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-white text-xl">{menuOpen ? "close" : "menu"}</span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {scrolled && (
                <div
                    ref={menuRef}
                    className="fixed hidden z-[99] top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-white/10 bg-[#0A192F]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden"
                >
                    <div className="px-5 py-4 border-b border-white/8">
                        <p className="text-[10px] sm:text-xs font-mono text-accent/60 tracking-[0.3em] uppercase">Navegación</p>
                    </div>

                    <div ref={menuLinksRef} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {navLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="menu-link group rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-accent/30 transition-all px-4 py-4"
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-display font-bold text-base sm:text-lg text-white group-hover:text-accent transition-colors">
                                            {item.label}
                                        </p>
                                        <p className="text-xs text-white/45 mt-1">Ir a esta sección</p>
                                    </div>
                                    <span className="material-symbols-outlined text-white/25 group-hover:text-accent transition-colors">arrow_outward</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
