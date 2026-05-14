"use client";

import { useEffect, useRef, useState } from "react";

interface QuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WA_NUMBER = "13053030502";

function buildWAMessage(empresa: string, tipo: string, urgencia: string) {
    return encodeURIComponent(
        `Hola, necesito importar ${tipo || "carga"} desde USA. Mi empresa es ${empresa || "[empresa]"}. Urgencia: ${urgencia || "Normal"}.`
    );
}

export default function QuotationModal({ isOpen, onClose }: QuotationModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [empresa, setEmpresa] = useState("");
    const [nombre, setNombre] = useState("");
    const [contacto, setContacto] = useState("");
    const [tipoCarga, setTipoCarga] = useState("");
    const [urgencia, setUrgencia] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setEmpresa(""); setNombre(""); setContacto("");
            setTipoCarga(""); setUrgencia(""); setSent(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            // Replace FORMSPREE_ID with actual endpoint from formspree.io
            await fetch("https://formspree.io/f/FORMSPREE_ID", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ empresa, nombre, contacto, tipoCarga, urgencia }),
            });
            setSent(true);
        } catch {
            // fail silently — WhatsApp fallback always available
        } finally {
            setSending(false);
        }
    };

    const cargoOptions = [
        { value: "Maquinaria pesada", icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
        )},
        { value: "Repuestos", icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        )},
        { value: "Equipos / Tech", icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>
        )},
        { value: "Otro", icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        )},
    ];

    const urgenciaOptions = [
        { value: "AOG · Inmediata", dotColor: "#DC2626", pillClass: "bg-red-50 border-red-200 text-red-600 hover:border-red-600" },
        { value: "Alta prioridad",  dotColor: "#F59E0B", pillClass: "bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-500" },
        { value: "Normal",          dotColor: "#CBD5E1", pillClass: "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400" },
    ];

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4"
            style={{ background: "rgba(2,8,23,0.72)", backdropFilter: "blur(4px)" }}
        >
            <div
                className="bg-white rounded-[18px] p-7 w-full max-w-[460px] relative"
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.05), 0 20px 48px -8px rgba(0,0,0,0.18)" }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                    <div className="flex items-start gap-3">
                        <div className="w-[42px] h-[42px] bg-[#0A192F] rounded-[10px] flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.6-.7 1.1l.3.9c.2.6.7 1 1.3 1l3.9-.2 2.2 2.8-3 .5c-.7.1-1.1.7-.9 1.4l.2.8c.2.6.8 1 1.4.9l4-.5 2.3 3.2c.2.3.5.5.8.5h.5c.7 0 1.1-.7.9-1.3z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 rounded-full px-2.5 py-0.5 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span className="text-[10px] font-bold text-amber-800 tracking-wide uppercase">Operación Prioritaria</span>
                            </div>
                            <h2 className="text-[#0A192F] font-extrabold text-[16px] leading-tight" style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}>
                                Solicitar Evaluación Logística
                            </h2>
                            <p className="text-slate-500 text-[11.5px] flex items-center gap-1 mt-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                Respondemos en menos de 2 horas hábiles
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-[30px] h-[30px] rounded-[8px] bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                <div className="h-px bg-slate-100 mb-5" />

                {sent ? (
                    <div className="py-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <p className="font-bold text-slate-800 mb-1">Solicitud enviada</p>
                        <p className="text-sm text-slate-500">Te contactamos en menos de 2 horas hábiles.</p>
                        <button onClick={onClose} className="mt-5 px-6 py-2 bg-[#0A192F] text-white text-sm font-bold rounded-lg hover:bg-[#1E3A5F] transition-colors">
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Empresa + Nombre */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.07em] mb-1.5">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                    Empresa
                                </label>
                                <input
                                    required
                                    value={empresa}
                                    onChange={e => setEmpresa(e.target.value)}
                                    placeholder="Mining Solutions SA"
                                    className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-[9px] px-3 py-2.5 text-[13px] text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.07em] mb-1.5">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    Nombre
                                </label>
                                <input
                                    required
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    placeholder="Carlos Mendoza"
                                    className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-[9px] px-3 py-2.5 text-[13px] text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Contacto */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.07em] mb-1.5">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                WhatsApp o Email
                            </label>
                            <input
                                required
                                value={contacto}
                                onChange={e => setContacto(e.target.value)}
                                placeholder="+58 414 555 0199"
                                className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-[9px] px-3 py-2.5 text-[13px] text-slate-900 placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] outline-none transition-all"
                            />
                        </div>

                        {/* Tipo de carga */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.07em] mb-2">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                                Tipo de carga
                            </label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {cargoOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setTipoCarga(opt.value)}
                                        className={`flex items-center gap-2 px-3 py-2.5 rounded-[9px] border-[1.5px] text-[12px] font-medium transition-all ${
                                            tipoCarga === opt.value
                                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                                : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                                        }`}
                                    >
                                        {opt.icon}
                                        {opt.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Urgencia */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-[0.07em] mb-2">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                Urgencia
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {urgenciaOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setUrgencia(opt.value)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] text-[11.5px] font-semibold transition-all ${opt.pillClass} ${
                                            urgencia === opt.value ? "ring-2 ring-offset-1" : ""
                                        }`}
                                    >
                                        <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={opt.dotColor}/></svg>
                                        {opt.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit row */}
                        <div className="flex gap-2 pt-1">
                            <button
                                type="submit"
                                disabled={sending}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#0A192F] hover:bg-[#1E3A5F] text-white font-bold text-[13px] rounded-[10px] py-3 transition-colors disabled:opacity-60"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                {sending ? "Enviando…" : "Enviar solicitud"}
                            </button>
                            <a
                                href={`https://wa.me/${WA_NUMBER}?text=${buildWAMessage(empresa, tipoCarga, urgencia)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold text-[13px] rounded-[10px] px-4 transition-colors"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                WhatsApp
                            </a>
                        </div>

                        {/* Privacy note */}
                        <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            Tus datos son confidenciales y no se comparten con terceros
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
