"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock Auth Logic
        if (username === "admin" && password === "admin123") {
            router.push("/admin");
        } else if (username.length > 0 && password.length > 0) {
            // Any other valid looking input goes to user dashboard
            router.push("/dashboard");
        } else {
            setError("Por favor ingresa credenciales válidas.");
        }
    };

    return (
        <div className="min-h-screen bg-background-light flex items-center justify-center p-4 relative overflow-hidden bg-map-pattern">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-3 mb-2">
                        <div className="bg-primary text-white p-2 rounded-lg shadow-lg">
                            <span className="material-symbols-outlined text-3xl">factory</span>
                        </div>
                        <h1 className="font-display font-bold text-2xl tracking-tight text-primary uppercase">
                            Ventas en USA
                        </h1>
                    </Link>
                    <p className="text-slate-500 font-medium text-sm text-center">
                        Plataforma Logística e Industrial B2B
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-lift border border-slate-100 overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-xl font-display font-bold text-primary mb-6 text-center">
                            Acceso Corporativo
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                    Usuario / Email
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-background-light border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none"
                                        placeholder="admin"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl">
                                        lock
                                    </span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-background-light border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-xs font-bold text-red-500 mt-2 text-center animate-pulse">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 mt-4"
                            >
                                Iniciar Sesión
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-400 font-medium mb-4">
                                ¿No tienes una cuenta corporativa?
                            </p>
                            <button className="text-sm font-bold text-accent hover:text-teal-600 transition-colors uppercase tracking-wide">
                                Solicitar Registro Industrial
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="mt-8 text-center text-slate-400 text-[10px] font-mono uppercase tracking-widest">
                    ID de Sesión Segura: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
            </div>
        </div>
    );
}
