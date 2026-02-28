"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary text-white p-1 rounded-md">
                            <span className="material-symbols-outlined text-2xl">factory</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-primary">VENTAS EN USA</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#">Logística Industrial</a>
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#">Carga Pesada</a>
                        <a className="text-sm font-medium text-slate-700 hover:text-primary transition-colors" href="#">Rastreo B2B</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="hidden sm:flex items-center justify-center px-4 h-9 text-sm font-bold text-primary hover:bg-gray-100 rounded transition-colors">
                            Acceso Corporativo
                        </Link>
                        <Link href="/login" className="flex items-center justify-center px-5 h-9 bg-primary hover:bg-secondary text-white text-sm font-bold rounded shadow-sm transition-colors tracking-wide">
                            Solicitar Cuenta
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
