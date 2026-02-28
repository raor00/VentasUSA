"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
    onQuoteClick?: () => void;
}

export default function Navbar({ onQuoteClick }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm">
                            <span className="material-symbols-outlined text-xl">local_shipping</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-display font-bold text-lg tracking-tight text-primary">VENTAS EN USA</span>
                            <span className="text-[9px] font-mono text-accent uppercase tracking-widest">Courier Industrial</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#servicios">Servicios</a>
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#sectores">Sectores</a>
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#como-funciona">Cómo Funciona</a>
                        <Link className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="/tracking/1">Rastrear Pedido</Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="flex items-center justify-center px-4 h-9 text-sm font-bold text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Acceso Corporativo
                        </Link>
                        <button
                            onClick={onQuoteClick}
                            className="flex items-center justify-center gap-1.5 px-5 h-9 bg-accent hover:bg-teal-500 text-white text-sm font-bold rounded-lg shadow-sm transition-colors tracking-wide"
                        >
                            <span className="material-symbols-outlined text-[18px]">request_quote</span>
                            Cotizar
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 text-primary transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl">{mobileOpen ? "close" : "menu"}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                        {[
                            { label: "Servicios", href: "#servicios" },
                            { label: "Sectores", href: "#sectores" },
                            { label: "Cómo Funciona", href: "#como-funciona" },
                            { label: "Rastrear Pedido", href: "/tracking/1" },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                            <Link
                                href="/login"
                                className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-gray-50 transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                Acceso Corporativo
                            </Link>
                            <button
                                onClick={() => { setMobileOpen(false); onQuoteClick?.(); }}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-teal-500 text-white text-sm font-bold rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">request_quote</span>
                                Cotizar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
