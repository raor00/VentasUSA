# VentasUSA — Bug fixes, CTAs, Scroll Animation & Modal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 9 bugs, wire functional CTAs (WhatsApp + modal), build `QuotationModal` component, and replace the autoplay plane animation with a scroll-driven narrative.

**Architecture:** `QuotationModal` is a new isolated component managed via `useState` in `page.tsx`. Scroll animation replaces the `repeat: -1` GSAP timeline in `AnimatedHeroScenario.tsx` with a `ScrollTrigger` pinned scrub timeline — no new dependencies. CTAs become `<a>` (WhatsApp) and `<button onClick>` (modal) throughout the page.

**Tech Stack:** Next.js 14, TypeScript, TailwindCSS v4, GSAP 3.14.2 + ScrollTrigger, Formspree (no backend), Lucide SVG icons (inline, no package).

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Delete | `null` (root) | Artifact from bad command |
| Modify | `src/components/Navbar.tsx:96` | Fix `/login` → `/dashboard` |
| Modify | `src/components/Footer.tsx` | Links, copyright, contact data |
| Modify | `src/app/page.tsx` | Ticker fix, CTA wiring, modal state |
| Create | `src/components/QuotationModal.tsx` | Modal form component |
| Modify | `src/components/AnimatedHeroScenario.tsx` | Forklift fix, scrub timeline, plane colors |

---

## Task 1: Quick Mechanical Fixes

**Files:**
- Delete: `null` (project root)
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1.1: Delete null artifact**

```bash
rm /Users/oviedo/Documents/GitHub/VentasUSA/null
```

Expected: file gone, no error.

- [ ] **Step 1.2: Fix Navbar login link**

In `src/components/Navbar.tsx`, line 96, change:

```tsx
// BEFORE
href="/login"

// AFTER
href="/dashboard"
```

- [ ] **Step 1.3: Fix Footer links, copyright, and contact**

Replace the entire bottom bar and contact section in `src/components/Footer.tsx`.

Change line 57 (phone):
```tsx
// BEFORE
<span>+1 (305) 555-0123</span>

// AFTER
<a href="tel:+13053030502" className="hover:text-white transition-colors">+1 (305) 303-0502</a>
```

Change line 61 (email):
```tsx
// BEFORE
<span>corporate@ventasenusa.com</span>

// AFTER
<a href="mailto:corporate@ventasusa.com" className="hover:text-white transition-colors">corporate@ventasusa.com</a>
```

Change line 69 (copyright):
```tsx
// BEFORE
<p>© 2024 Ventas en USA LLC. Todos los derechos reservados.</p>

// AFTER
<p>© 2025 Ventas en USA LLC. Todos los derechos reservados.</p>
```

Change lines 71-73 (`<span>` → `<a>`):
```tsx
// BEFORE
<span className="hover:text-white transition-colors">Privacidad</span>
<span className="hover:text-white transition-colors">Términos de Carga</span>
<span className="hover:text-white transition-colors">Mapa del sitio</span>

// AFTER
<a href="#" className="hover:text-white transition-colors">Privacidad</a>
<a href="#" className="hover:text-white transition-colors">Términos de Carga</a>
<a href="#" className="hover:text-white transition-colors">Mapa del sitio</a>
```

Also fix Capacidades list links (`src/components/Footer.tsx` lines 29-35):
```tsx
// BEFORE
<li><span className="hover:text-white transition-colors">Operación aérea industrial</span></li>
<li><span className="hover:text-white transition-colors">Visibilidad documental B2B</span></li>
<li><span className="hover:text-white transition-colors">Coordinación Miami → Venezuela</span></li>
<li><span className="hover:text-white transition-colors">Soporte para carga crítica</span></li>

// AFTER
<li><a href="#" className="hover:text-white transition-colors">Operación aérea industrial</a></li>
<li><a href="#" className="hover:text-white transition-colors">Visibilidad documental B2B</a></li>
<li><a href="#" className="hover:text-white transition-colors">Coordinación Miami → Venezuela</a></li>
<li><a href="#" className="hover:text-white transition-colors">Soporte para carga crítica</a></li>
```

Also fix Soluciones list (`src/components/Footer.tsx` lines 40-44):
```tsx
// BEFORE
<li><span className="hover:text-white transition-colors">Carga proyecto</span></li>
<li><span className="hover:text-white transition-colors">Repuestos críticos</span></li>
<li><span className="hover:text-white transition-colors">Maquinaria pesada</span></li>
<li><span className="hover:text-white transition-colors">Despacho coordinado</span></li>

// AFTER
<li><a href="#" className="hover:text-white transition-colors">Carga proyecto</a></li>
<li><a href="#" className="hover:text-white transition-colors">Repuestos críticos</a></li>
<li><a href="#" className="hover:text-white transition-colors">Maquinaria pesada</a></li>
<li><a href="#" className="hover:text-white transition-colors">Despacho coordinado</a></li>
```

- [ ] **Step 1.4: Fix ticker duplicate in `src/app/page.tsx`**

In `page.tsx`, the ticker array (lines 138-149) has 6 items where index 0 and index 5 are identical. Remove index 5 (the last item):

```tsx
// BEFORE — array has 6 items, last one duplicates first
{[
    { icon: "✈️", text: "Vuelo industrial confirmado en plataforma" },
    { icon: "📄", text: "Manifiesto validado para descarga prioritaria" },
    { icon: "🚪", text: "Compuerta habilitada con corredor asegurado" },
    { icon: "🏗️", text: "Maquinaria critica en proceso de extracción" },
    { icon: "🚚", text: "Carga liberada para almacén o despacho coordinado" },
    { icon: "✈️", text: "Vuelo industrial confirmado en plataforma" }, // ← remove this
].map(...)}

// AFTER — 5 items
{[
    { icon: "✈️", text: "Vuelo industrial confirmado en plataforma" },
    { icon: "📄", text: "Manifiesto validado para descarga prioritaria" },
    { icon: "🚪", text: "Compuerta habilitada con corredor asegurado" },
    { icon: "🏗️", text: "Maquinaria critica en proceso de extracción" },
    { icon: "🚚", text: "Carga liberada para almacén o despacho coordinado" },
].map(...)}
```

- [ ] **Step 1.5: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "fix: null artifact, navbar login link, footer links/copyright/contact, ticker duplicate"
```

---

## Task 2: QuotationModal Component

**Files:**
- Create: `src/components/QuotationModal.tsx`

- [ ] **Step 2.1: Create `src/components/QuotationModal.tsx`**

```tsx
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
```

- [ ] **Step 2.2: Commit**

```bash
git add src/components/QuotationModal.tsx
git commit -m "feat: QuotationModal component — Corporate Light, Inter font, Lucide icons, Formspree + WA"
```

---

## Task 3: Wire CTAs in `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 3.1: Add imports and modal state**

At the top of `src/app/page.tsx`, add the import and `useState`:

```tsx
// Add to existing imports
import { useEffect, useState } from "react";   // replace existing useEffect import
import QuotationModal from "@/components/QuotationModal";
```

Inside `LandingPage()`, add after the existing `useEffect`:

```tsx
const [modalOpen, setModalOpen] = useState(false);
const WA_URL = "https://wa.me/13053030502?text=" + encodeURIComponent("Hola, necesito importar carga prioritaria desde USA.");
```

Add `<QuotationModal>` before the closing `</>`:

```tsx
// Just before </> (the last line of the return)
<QuotationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
```

- [ ] **Step 3.2: Wire Hero CTAs (lines 81-88)**

```tsx
// BEFORE
<button className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:-translate-y-1" style={{ background: "#2563EB", boxShadow: "0 8px 32px rgba(37,99,235,0.28)" }}>
    Solicitar Operacion Prioritaria
</button>
<button className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:bg-white/20" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(192,138,46,0.35)" }}>
    <span className="material-symbols-outlined text-[1.2rem]" style={{ color: "#E7C98A" }}>monitoring</span>
    Ver Centro de Control
</button>

// AFTER
<a
    href={WA_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:-translate-y-1"
    style={{ background: "#2563EB", boxShadow: "0 8px 32px rgba(37,99,235,0.28)" }}
>
    Solicitar Operacion Prioritaria
</a>
<button
    onClick={() => setModalOpen(true)}
    className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:bg-white/20"
    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(192,138,46,0.35)" }}
>
    <span className="material-symbols-outlined text-[1.2rem]" style={{ color: "#E7C98A" }}>monitoring</span>
    Ver Centro de Control
</button>
```

- [ ] **Step 3.3: Wire Urgency section CTA (line 225)**

```tsx
// BEFORE
<button data-animate="cta-btn" className="flex items-center gap-2 px-6 h-11 font-bold rounded-xl transition-all duration-300 text-sm uppercase tracking-wide group text-white hover:text-white" style={{ border: "1px solid rgba(192,138,46,0.45)", color: "#E7C98A" }}>
    Solicitar Diagnostico Operativo
    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>

// AFTER
<a
    href={WA_URL}
    target="_blank"
    rel="noopener noreferrer"
    data-animate="cta-btn"
    className="flex items-center gap-2 px-6 h-11 font-bold rounded-xl transition-all duration-300 text-sm uppercase tracking-wide group text-white hover:text-white"
    style={{ border: "1px solid rgba(192,138,46,0.45)", color: "#E7C98A" }}
>
    Solicitar Diagnostico Operativo
    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
```

- [ ] **Step 3.4: Wire Bottom CTA section (lines 296-302)**

```tsx
// BEFORE
<button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: "#2563EB", boxShadow: "0 4px 20px rgba(37,99,235,0.24)" }}>
    Solicitar Evaluacion Logistica
</button>
<button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-primary text-sm sm:text-base font-bold rounded-xl transition-colors hover:bg-black/5" style={{ border: "1px solid rgba(192,138,46,0.4)", color: "#8A6422" }}>
    Hablar con un Asesor Operativo
</button>

// AFTER
<a
    href={WA_URL}
    target="_blank"
    rel="noopener noreferrer"
    data-animate="cta-element"
    className="flex items-center justify-center px-8 h-12 text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
    style={{ background: "#2563EB", boxShadow: "0 4px 20px rgba(37,99,235,0.24)" }}
>
    Solicitar Evaluacion Logistica
</a>
<button
    onClick={() => setModalOpen(true)}
    data-animate="cta-element"
    className="flex items-center justify-center px-8 h-12 text-sm sm:text-base font-bold rounded-xl transition-colors hover:bg-black/5"
    style={{ border: "1px solid rgba(192,138,46,0.4)", color: "#8A6422" }}
>
    Hablar con un Asesor Operativo
</button>
```

- [ ] **Step 3.5: Verify in browser**

```bash
npm run dev
```

- Open `http://localhost:3000`
- Click "Solicitar Operacion Prioritaria" → should open WhatsApp
- Click "Ver Centro de Control" → modal should open
- Click modal overlay or Escape → modal closes
- Click "Hablar con un Asesor Operativo" at bottom → modal opens

- [ ] **Step 3.6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire CTAs — WhatsApp primary, QuotationModal secondary"
```

---

## Task 4: Forklift Fix in `AnimatedHeroScenario.tsx`

**Files:**
- Modify: `src/components/AnimatedHeroScenario.tsx`

- [ ] **Step 4.1: Move FK1/FK2 initial states inside timeline**

In `src/components/AnimatedHeroScenario.tsx`, lines 43-44 currently set FK positions **outside** the timeline. GSAP `repeat: -1` only resets props set inside the timeline — so on the second cycle FK1/FK2 start at x:1200 (where they exited), not x:1100.

Delete lines 43-44:
```tsx
// DELETE THESE (outside timeline)
gsap.set(".fk1", { x: 1100, force3D: true });
gsap.set(".fk2", { x: 1100, force3D: true });
```

In the master timeline, at line 56 where `const tl = gsap.timeline({...})` is defined, add `.set()` calls for FK1 and FK2 at position 0 of the timeline, before Phase 1:

```tsx
const tl = gsap.timeline({
    repeat: prefersReducedMotion || isMobile ? 0 : -1,
    repeatDelay: isMobile ? 0 : 2.5,
    defaults: { force3D: true },
});

// ── RESET FK positions at t=0 so every repeat starts clean ──
tl.set(".fk1", { x: 1100 }, 0)
  .set(".fk2", { x: 1100 }, 0);

// ─ PHASE 1: PLANE APPROACHES ───────────────────
tl
    .to(".eng-glow",  { opacity: 0.85, duration: 0.5 }, 0)
    // ... rest of phase 1 unchanged
```

- [ ] **Step 4.2: Verify forklift loops correctly**

```bash
npm run dev
```

Watch the animation complete one full cycle. On the second cycle:
- FK1 should arrive from the right (x:1100), pick up cargo, exit right
- FK2 should arrive from the right (x:1100), pick up cargo, exit right
- Both forklifts should NOT start stuck at the right edge

- [ ] **Step 4.3: Commit**

```bash
git add src/components/AnimatedHeroScenario.tsx
git commit -m "fix: forklift stuck bug — move FK1/FK2 gsap.set inside timeline at t=0"
```

---

## Task 5: Plane Color Improvements

**Files:**
- Modify: `src/components/AnimatedHeroScenario.tsx`

- [ ] **Step 5.1: Update fuselage gradient (lines 146-150)**

```tsx
// BEFORE
<linearGradient id="ahsFg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#243a56" />
    <stop offset="45%"  stopColor="#162c44" />
    <stop offset="100%" stopColor="#09162a" />
</linearGradient>

// AFTER — brighter top, more contrast against dark background
<linearGradient id="ahsFg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#2e5070" />
    <stop offset="45%"  stopColor="#1a3a58" />
    <stop offset="100%" stopColor="#0a1a2e" />
</linearGradient>
```

- [ ] **Step 5.2: Update engine nacelle gradient (lines 172-175)**

```tsx
// BEFORE
<linearGradient id="ahsEng" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#1c3252" />
    <stop offset="100%" stopColor="#060d1c" />
</linearGradient>

// AFTER
<linearGradient id="ahsEng" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%"   stopColor="#2a4870" />
    <stop offset="100%" stopColor="#0a1428" />
</linearGradient>
```

- [ ] **Step 5.3: Update cargo hold interior (lines 389-397)**

```tsx
// BEFORE — fill="#030710"
<path d="
    M 642 160
    L 730 160
    C 754 160, 776 170, 786 192
    L 786 248
    C 776 272, 752 280, 728 280
    L 642 280
    Z
" fill="#030710" />

// AFTER — deeper blue with more contrast
<path d="
    M 642 160
    L 730 160
    C 754 160, 776 170, 786 192
    L 786 248
    C 776 272, 752 280, 728 280
    L 642 280
    Z
" fill="#05101e" />
```

- [ ] **Step 5.4: Add wing accent line (after the existing flap panel line, around line 363)**

```tsx
// ADD after the flap panel line — thin blue accent on wing leading edge
<path d="M 430 236 C 474 238, 548 266, 646 332"
    stroke="#2563EB" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
```

- [ ] **Step 5.5: Verify colors look better**

```bash
npm run dev
```

Open `http://localhost:3000`. The plane should appear:
- More visible against the dark navy hero background
- Fuselage noticeably lighter/brighter
- Blue accent line visible on the wing

- [ ] **Step 5.6: Commit**

```bash
git add src/components/AnimatedHeroScenario.tsx
git commit -m "feat: improve plane SVG colors — brighter fuselage, higher contrast on dark bg"
```

---

## Task 6: Scroll Narrative Animation

**Files:**
- Modify: `src/components/AnimatedHeroScenario.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 6.1: Register ScrollTrigger plugin**

At the top of `src/components/AnimatedHeroScenario.tsx`, add ScrollTrigger import and registration:

```tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

- [ ] **Step 6.2: Add narrative label markup**

Inside the return of `AnimatedHeroScenario`, add narrative labels as absolutely-positioned divs. These appear alongside the plane as the user scrolls. Replace the outer `<div>` wrapper:

```tsx
return (
    <div
        ref={containerRef}
        className="cargo-plane-container w-full h-full relative overflow-hidden flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{ minHeight: "clamp(280px, 44vh, 520px)" }}
    >
        {/* Narrative labels — fade in at specific scroll phases */}
        <div className="narrative-label label-01 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none hidden sm:block">
            <span className="font-mono text-[10px] text-blue-400/60 tracking-[0.2em] uppercase">01</span>
            <p className="text-white/80 font-bold text-sm sm:text-base leading-tight mt-0.5">Aterriza con<br/>prioridad</p>
        </div>
        <div className="narrative-label label-02 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none hidden sm:block">
            <span className="font-mono text-[10px] text-blue-400/60 tracking-[0.2em] uppercase">02</span>
            <p className="text-white/80 font-bold text-sm sm:text-base leading-tight mt-0.5">Carga se<br/>libera</p>
        </div>
        <div className="narrative-label label-03 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none hidden sm:block">
            <span className="font-mono text-[10px] text-blue-400/60 tracking-[0.2em] uppercase">03</span>
            <p className="text-white/80 font-bold text-sm sm:text-base leading-tight mt-0.5">Listo para<br/>despacho</p>
        </div>
        <div className="narrative-label label-04 absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none select-none hidden sm:block">
            <span className="font-mono text-[10px] text-blue-400/60 tracking-[0.2em] uppercase">04</span>
            <p className="text-white/80 font-bold text-sm sm:text-base leading-tight mt-0.5">En camino<br/>a destino</p>
        </div>

        {/* Ambient scene glow */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: "radial-gradient(ellipse 70% 50% at 50% 62%, rgba(37,99,235,0.08) 0%, transparent 100%)",
            }}
        />

        <svg
            viewBox="0 0 1000 400"
            className="w-full h-auto max-h-[70vh] sm:max-h-[68vh]"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* ... all existing SVG content unchanged ... */}
        </svg>
    </div>
);
```

- [ ] **Step 6.3: Replace `useLayoutEffect` animation logic with scroll-driven timeline**

Replace the entire `useLayoutEffect` body in `AnimatedHeroScenario.tsx` with the following. This converts the `repeat: -1` autoplay into a scrub-controlled narrative:

```tsx
useLayoutEffect(() => {
    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {

        // ── INITIAL STATES (same as before) ─────────────────────
        gsap.set(".plane-asm",   { x: 1200, force3D: true });
        gsap.set(".cargo-ramp",  { rotation: -45, transformOrigin: "0 0", force3D: true });
        gsap.set(".hold-light",  { opacity: 0 });
        gsap.set(".c1", { x: 646, y: 158, opacity: 1, force3D: true });
        gsap.set(".c2", { x: 636, y: 208, opacity: 1, force3D: true });
        gsap.set(".fk1", { x: 1100, force3D: true });
        gsap.set(".fk2", { x: 1100, force3D: true });
        gsap.set(".fk1-cargo", { opacity: 0 });
        gsap.set(".fk2-cargo", { opacity: 0 });
        gsap.set(".eng-glow",   { opacity: 0 });
        gsap.set(".land-beam",  { opacity: 0 });
        gsap.set([".dust-l", ".dust-r"], {
            opacity: 0, scaleX: 0.1, transformOrigin: "center bottom",
        });
        // Narrative labels start hidden
        gsap.set([".label-01", ".label-02", ".label-03", ".label-04"], {
            opacity: 0, x: -10,
        });

        if (prefersReducedMotion) {
            // Reduced motion: show plane parked, no animation
            gsap.set(".plane-asm", { x: 0 });
            return;
        }

        if (isMobile) {
            // Mobile: simple autoplay (no pin — bad UX on mobile with scroll)
            const tl = gsap.timeline({
                repeat: -1,
                repeatDelay: 2,
                defaults: { force3D: true },
            });
            tl.set(".fk1", { x: 1100 }, 0)
              .set(".fk2", { x: 1100 }, 0);
            tl
                .to(".eng-glow",  { opacity: 0.85, duration: 0.5 }, 0)
                .to(".land-beam", { opacity: 0.4,  duration: 0.3 }, 0)
                .to(".plane-asm", { x: 0, duration: 5.0, ease: "power4.out" }, 0.1)
                .to(".land-beam", { opacity: 0, duration: 1.2 }, "-=1.8")
                .to([".dust-l", ".dust-r"], { opacity: 0.55, scaleX: 1, duration: 0.18, ease: "back.out(3)", stagger: 0.05 }, "-=0.9")
                .to([".dust-l", ".dust-r"], { opacity: 0, scaleX: 2.6, duration: 1.5 }, "-=0.4")
                .to(".eng-glow", { opacity: 0.12, duration: 2.8 }, "-=2.1")
                .to(".hold-light", { opacity: 1, duration: 0.9 }, "+=0.6")
                .to(".cargo-ramp", { rotation: 28, duration: 2.2, ease: "bounce.out" }, "-=0.2")
                .to(".fk1", { x: 892, duration: 2.4, ease: "power2.inOut" }, "+=0.4")
                .to(".c1",  { x: 728, duration: 0.5, ease: "none" })
                .to(".c1",  { y: 280, duration: 0.18, ease: "power2.in" })
                .to(".c1",  { x: 850, y: 278, duration: 1.0, ease: "power2.in" })
                .set(".c1",        { opacity: 0 })
                .set(".fk1-cargo", { opacity: 1 })
                .to(".fk1", { x: 1200, duration: 2.6, ease: "power2.inOut" })
                .to(".fk2", { x: 892, duration: 2.4, ease: "power2.inOut" }, "-=2.0")
                .to(".c2",  { x: 728, duration: 0.8, ease: "none" })
                .to(".c2",  { y: 280, duration: 0.18, ease: "power2.in" })
                .to(".c2",  { x: 850, y: 266, duration: 1.2, ease: "power2.in" })
                .set(".c2",        { opacity: 0 })
                .set(".fk2-cargo", { opacity: 1 })
                .to(".fk2", { x: 1200, duration: 2.8, ease: "power2.inOut" })
                .to(".cargo-ramp", { rotation: -45, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
                .to(".hold-light", { opacity: 0, duration: 0.7 }, "<")
                .to(".eng-glow",   { opacity: 1.0, duration: 1.8 }, "+=0.4")
                .to(".plane-asm",  { x: -1320, duration: 3.8, ease: "power3.in" }, "+=0.5")
                .to(".eng-glow",   { opacity: 0, duration: 0.8 }, "-=1.3");
            return;
        }

        // ── DESKTOP: Scroll Narrative ────────────────────────────────
        // Total timeline duration is conceptual (GSAP will scrub it).
        // We use duration values to set relative proportions only.
        const tl = gsap.timeline({ defaults: { force3D: true } });

        // Phase 1 (0–20%): Plane arrives, lands (0→5s of 25s total)
        tl
            .to(".eng-glow",  { opacity: 0.85, duration: 0.5 }, 0)
            .to(".land-beam", { opacity: 0.4,  duration: 0.3 }, 0)
            .to(".plane-asm", { x: 0, duration: 5.0, ease: "power4.out" }, 0.1)
            .to(".land-beam", { opacity: 0, duration: 1.2 }, "-=1.8")
            .to([".dust-l", ".dust-r"], { opacity: 0.55, scaleX: 1, duration: 0.18, ease: "back.out(3)", stagger: 0.05 }, "-=0.9")
            .to([".dust-l", ".dust-r"], { opacity: 0, scaleX: 2.6, duration: 1.5 }, "-=0.4")
            .to(".eng-glow", { opacity: 0.12, duration: 2.8 }, "-=2.1")
            // label-01 in
            .to(".label-01", { opacity: 1, x: 0, duration: 0.5 }, 2.0)
            // label-01 out before ramp
            .to(".label-01", { opacity: 0, x: -10, duration: 0.3 }, 4.5);

        // Phase 2 (20–40%): Ramp opens (5→10s)
        tl
            .to(".hold-light", { opacity: 1, duration: 0.9 }, "+=0.3")
            .to(".cargo-ramp", { rotation: 28, duration: 2.2, ease: "bounce.out" }, "-=0.2")
            .to(".label-02", { opacity: 1, x: 0, duration: 0.5 }, "<+=0.5");

        // Phase 3 & 4 (40–70%): Forklifts deploy and return (10→18s)
        tl
            .to(".label-02", { opacity: 0, x: -10, duration: 0.3 }, "+=0.2")
            .to(".fk1", { x: 892, duration: 2.4, ease: "power2.inOut" }, "+=0.4")
            .to(".c1",  { x: 728, duration: 0.5, ease: "none" })
            .to(".c1",  { y: 280, duration: 0.18, ease: "power2.in" })
            .to(".c1",  { x: 850, y: 278, duration: 1.0, ease: "power2.in" })
            .set(".c1",        { opacity: 0 })
            .set(".fk1-cargo", { opacity: 1 })
            .to(".fk1", { x: 1200, duration: 2.6, ease: "power2.inOut" })
            .to(".fk2", { x: 892, duration: 2.4, ease: "power2.inOut" }, "-=2.0")
            .to(".c2",  { x: 728, duration: 0.8, ease: "none" })
            .to(".c2",  { y: 280, duration: 0.18, ease: "power2.in" })
            .to(".c2",  { x: 850, y: 266, duration: 1.2, ease: "power2.in" })
            .set(".c2",        { opacity: 0 })
            .set(".fk2-cargo", { opacity: 1 })
            .to(".fk2", { x: 1200, duration: 2.8, ease: "power2.inOut" });

        // Phase 5 (70–85%): Close up (18→21s)
        tl
            .to(".label-03", { opacity: 1, x: 0, duration: 0.5 }, "<-=1.0")
            .to(".cargo-ramp", { rotation: -45, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
            .to(".hold-light", { opacity: 0, duration: 0.7 }, "<")
            .to(".label-03", { opacity: 0, x: -10, duration: 0.3 }, "+=0.3");

        // Phase 6 (85–100%): Depart (21→25s)
        tl
            .to(".label-04", { opacity: 1, x: 0, duration: 0.5 }, "+=0.2")
            .to(".eng-glow",  { opacity: 1.0, duration: 1.8 }, "<")
            .to(".plane-asm", { x: -1320, duration: 3.8, ease: "power3.in" }, "+=0.5")
            .to(".eng-glow",  { opacity: 0, duration: 0.8 }, "-=1.3")
            .to(".label-04", { opacity: 0, x: -10, duration: 0.5 }, "-=0.8");

        // ── SCROLLTRIGGER ────────────────────────────────────────────
        ScrollTrigger.create({
            trigger: "#hero-section",
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 1.2,
            animation: tl,
            anticipatePin: 1,
        });

    }, containerRef);

    return () => ctx.revert();
}, []);
```

- [ ] **Step 6.4: Verify scroll animation**

```bash
npm run dev
```

- Open `http://localhost:3000`
- Hero section should stay pinned as you scroll
- Plane arrives → ramp opens → forklifts load → ramp closes → plane departs
- Each phase label ("01 · Aterriza…" etc.) should fade in and out
- Scrolling back up should reverse the animation
- After the hero sequence ends (~300vh down), normal page scroll resumes

- [ ] **Step 6.5: Commit**

```bash
git add src/components/AnimatedHeroScenario.tsx
git commit -m "feat: scroll-driven plane animation — GSAP ScrollTrigger scrub, narrative labels, mobile fallback"
```

---

## Task 7: Final Visual Review

- [ ] **Step 7.1: Run dev server and walk through full page**

```bash
npm run dev
```

Checklist:
- [ ] `null` file deleted from root
- [ ] Navbar "Acceso Corporativo" links to `/dashboard` (not 404)
- [ ] Footer phone clickable (`tel:`), email clickable (`mailto:`)
- [ ] Footer copyright shows "2025"
- [ ] Footer links are `<a>` elements (Privacy, Terms, etc.)
- [ ] Ticker has 5 items, no duplicate
- [ ] Hero primary CTA opens WhatsApp in new tab
- [ ] Hero secondary CTA opens QuotationModal
- [ ] Modal closes on overlay click
- [ ] Modal closes on Escape key
- [ ] Modal cargo type buttons are selectable
- [ ] Modal urgency pills are selectable
- [ ] Modal WhatsApp button includes form values in message
- [ ] Plane colors look more visible against dark background
- [ ] Forklift loops correctly (no stuck behavior on 2nd cycle)
- [ ] Scroll animation pins hero and scrubs through 5 phases on desktop
- [ ] Mobile: plane still animates (autoplay, no pin)
- [ ] Reduced motion: plane shows parked, no animation

- [ ] **Step 7.2: Note Formspree setup**

The modal uses `FORMSPREE_ID` as a placeholder in `QuotationModal.tsx` line 69. Before going to production:
1. Create account at `formspree.io`
2. Create a new form → get the ID (e.g. `xabc1234`)
3. Replace `FORMSPREE_ID` in `QuotationModal.tsx` with actual ID

- [ ] **Step 7.3: Final commit**

```bash
git add -A
git commit -m "chore: final review — all bugs fixed, CTAs functional, modal + scroll animation complete"
```
