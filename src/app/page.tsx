"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroScenario from "@/components/AnimatedHeroScenario";
import ScrollAnimationEngine from "@/components/ScrollAnimationEngine";

export default function LandingPage() {
    // Force scroll to top on mount — prevent browser scroll restoration
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, []);

    return (
        <>
            {/* ── Scroll progress bar (top) ── */}
            <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left scale-x-0" />

            {/* ── Scroll route line (right side, desktop only) ── */}
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[200] hidden lg:block">
                <div className="relative w-px h-44 bg-white/10 rounded-full overflow-hidden">
                    <div className="scroll-route-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent to-teal-300 rounded-full origin-top scale-y-0" />
                </div>
                {/* Section dots */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-9 pt-1">
                    {(["hero", "process", "urgency", "cta"] as const).map((s, i) => (
                        <div
                            key={s}
                            className="scroll-dot w-2 h-2 rounded-full border border-white/30 bg-transparent transition-all duration-300 cursor-pointer"
                            data-section-dot={s}
                            title={["Hero", "Proceso", "Urgencias", "CTA"][i]}
                        />
                    ))}
                </div>
            </div>

            {/* ── Animation engine ── */}
            <ScrollAnimationEngine />

            <main className="relative flex flex-col min-h-screen overflow-x-hidden">
                <Navbar />

                {/* ================================================================
                    HERO SECTION — Full-screen dark cinematic
                    Plane enters LEFT → RIGHT, then scroll drives nose-toward-viewer
                    ================================================================ */}
                <section
                    id="hero-section"
                    data-section="hero"
                    className="relative w-full"
                    style={{ minHeight: "100svh", background: "linear-gradient(180deg, #060f1e 0%, #0A192F 50%, #0d2137 100%)" }}
                >
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(0,191,166,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(0,191,166,0.06) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Ambient glow orbs */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,191,166,0.08) 0%, transparent 70%)" }} />
                    <div className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(74,158,221,0.07) 0%, transparent 70%)" }} />

                    {/* Content wrapper — full height flex column */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-full" style={{ minHeight: "100svh", paddingTop: "4rem", paddingBottom: "2rem" }}>

                        {/* ── CARGO PLANE ANIMATION — dominant centerpiece ── */}
                        <div
                            className="w-full max-w-6xl mx-auto px-4 sm:px-8 relative"
                            aria-hidden="true"
                        >
                            <AnimatedHeroScenario />
                        </div>

                        {/* ── HERO COPY ── */}
                        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center mt-4 sm:mt-6 flex flex-col items-center gap-5">

                            {/* Badge */}
                            <div data-hero-animate className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ background: "rgba(0,191,166,0.12)", borderColor: "rgba(0,191,166,0.3)" }}>
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
                                <span className="text-xs font-bold text-accent tracking-widest uppercase">
                                    Carga Crítica &amp; Maquinaria Industrial
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 data-hero-animate className="font-display font-bold text-white tracking-tight" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.05 }}>
                                Logística Industrial
                                <br />
                                <span className="animate-shimmer-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundImage: "linear-gradient(90deg, #00BFA6, #4a9edd, #00BFA6)", backgroundSize: "200% auto" }}>
                                    y de Alto Valor.
                                </span>
                            </h1>

                            {/* Description */}
                            <p data-hero-animate className="text-blue-200/75 leading-relaxed max-w-2xl" style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)" }}>
                                Importación especializada de maquinaria pesada, repuestos industriales y
                                tecnología de alta densidad. Sin límites de dimensión ni valor.
                            </p>

                            {/* CTA Buttons */}
                            <div data-hero-animate className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
                                <button
                                    className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:-translate-y-1"
                                    style={{ background: "#00BFA6", boxShadow: "0 8px 32px rgba(0,191,166,0.35)", fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                                >
                                    Cotizar Carga Pesada
                                </button>
                                <button
                                    className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:bg-white/20"
                                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
                                >
                                    <span className="material-symbols-outlined text-accent" style={{ fontSize: "1.2rem" }}>forklift</span>
                                    Servicios Corporativos
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div data-hero-animate className="flex flex-wrap items-center justify-center gap-4 sm:gap-8" style={{ color: "rgba(147,197,253,0.6)", fontSize: "0.8rem" }}>
                                {[
                                    { icon: "verified", label: "Certificación ISO" },
                                    { icon: "shield", label: "Seguro de Carga 100%" },
                                    { icon: "schedule", label: "Entrega en 72h" },
                                ].map((badge, i) => (
                                    <div key={badge.label} className="flex items-center gap-1.5">
                                        {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block mr-3" />}
                                        <span className="material-symbols-outlined text-accent" style={{ fontSize: "1.1rem" }}>{badge.icon}</span>
                                        <span>{badge.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll indicator */}
                            <div data-hero-animate className="flex flex-col items-center gap-2 mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
                                <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                                    <div className="w-full h-1/2 bg-accent animate-scroll-drop" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom fade to white */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)" }} />
                </section>

                {/* ================================================================
                    TRACKING CARD
                    ================================================================ */}
                <div className="relative z-30 max-w-2xl mx-auto w-full px-4 sm:px-6 -mt-8">
                    <div
                        data-animate="tracking-card"
                        className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100"
                        style={{ boxShadow: "0 20px 60px rgba(10,25,47,0.15)" }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-lg text-primary">Rastreo de Manifiesto</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Operativo</span>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 text-lg">barcode_scanner</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-24 py-3 bg-background-light border border-gray-200 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                placeholder="BOL-9821-IND..."
                                type="text"
                            />
                            <button className="absolute inset-y-1 right-1 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition-colors">
                                Localizar
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 font-mono">Ingrese Bill of Lading o Nro. de Guía Industrial.</p>
                    </div>
                </div>

                {/* ================================================================
                    TICKER BAR
                    ================================================================ */}
                <div
                    data-section="ticker"
                    className="w-full bg-primary text-white py-3 overflow-hidden border-y border-white/10 relative z-20 mt-6"
                >
                    <div className="ticker-wrap">
                        <div className="ticker">
                            <div className="inline-flex items-center gap-10 font-mono text-xs sm:text-sm tracking-wide">
                                {[
                                    { icon: "🏭", text: "Maquinaria Pesada en Tránsito" },
                                    { icon: "✈️", text: "Carga Aérea Consolidada: Salida 18:00" },
                                    { icon: "⚓️", text: "Contenedores Flat Rack Disponibles" },
                                    { icon: "⚙️", text: "Repuestos Críticos: Prioridad Alta" },
                                    { icon: "🏭", text: "Maquinaria Pesada en Tránsito" },
                                    { icon: "✈️", text: "Carga Aérea Consolidada: Salida 18:00" },
                                    { icon: "⚓️", text: "Contenedores Flat Rack Disponibles" },
                                ].map((item, i) => (
                                    <span key={i} className="flex items-center gap-2 whitespace-nowrap">
                                        {i > 0 && <span className="w-1 h-1 bg-white/30 rounded-full mr-8" />}
                                        <span className="text-accent">{item.icon}</span> {item.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================================================================
                    PROCESS SECTION
                    ================================================================ */}
                <section data-section="process" className="py-20 sm:py-24 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div data-animate="title-wrap" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-xs font-bold text-primary tracking-wide uppercase">Proceso Logístico</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">Proceso Logístico Integral</h2>
                            <p className="text-slate-600 text-base sm:text-lg">Gestión de cadena de suministro para industrias exigentes. Control total desde origen hasta planta.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                { num: "01", icon: "inventory_2", bg: "#0A192F", iconColor: "white", title: "Identificación de Carga", desc: "Registro detallado de equipos y evaluación de requerimientos técnicos de transporte (peso, dimensiones, fragilidad)." },
                                { num: "02", icon: "pallet", bg: "white", iconColor: "#0A192F", border: true, title: "Consolidación y Resguardo", desc: "Almacenamiento especializado en Miami con manejo de carga frágil, peligrosa y pesada. Embalaje industrial certificado." },
                                { num: "03", icon: "local_shipping", bg: "#00BFA6", iconColor: "white", title: "Despacho y Entrega Crítica", desc: "Gestión aduanal experta, nacionalización y entrega directa en planta industrial o sitio de obra con grúas si es requerido." },
                            ].map((card) => (
                                <div
                                    key={card.num}
                                    data-animate="card"
                                    className="group relative bg-[#F6F8FA] p-6 sm:p-8 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="absolute top-0 right-0 p-4 font-display text-5xl sm:text-6xl font-bold text-primary select-none" style={{ opacity: 0.08 }}>{card.num}</div>
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300"
                                        style={{ background: card.bg, color: card.iconColor, border: card.border ? "1px solid rgba(10,25,47,0.2)" : "none" }}
                                    >
                                        <span className="material-symbols-outlined text-2xl sm:text-3xl">{card.icon}</span>
                                    </div>
                                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-3">{card.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================================================================
                    URGENCY SECTION
                    ================================================================ */}
                <section data-section="urgency" className="relative py-20 sm:py-24 overflow-hidden" style={{ background: "#0A192F" }}>
                    <div className="parallax-grid absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,191,166,0.12) 0%, transparent 70%)" }} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12">
                            <div className="lg:w-1/2 w-full">
                                <div data-animate="badge" className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-5 sm:mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                                    <span className="material-symbols-outlined text-accent text-sm">emergency</span>
                                    <span className="font-mono text-xs text-accent font-bold tracking-wider uppercase">SERVICIO CRÍTICO</span>
                                </div>

                                <h2 data-animate="title" className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-5 sm:mb-6">
                                    Urgencias en<br />
                                    <span className="text-accent">menos de 72 horas.</span>
                                </h2>

                                <p data-animate="desc" className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                                    Para cuando la línea de producción no puede detenerse. Importa repuestos críticos, maquinaria pesada o equipos industriales con prioridad máxima de embarque y despacho aduanal preferencial.
                                </p>

                                <ul className="space-y-4 mb-7 sm:mb-8">
                                    {[
                                        { icon: "settings_alert", title: "Repuestos Críticos", desc: "Solución inmediata para líneas de producción detenidas." },
                                        { icon: "precision_manufacturing", title: "Maquinaria Paralizada", desc: "Logística de emergencia para reactivación operativa." },
                                    ].map((item) => (
                                        <li key={item.title} data-animate="item" className="flex items-start gap-3">
                                            <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: "rgba(0,191,166,0.2)" }}>
                                                <span className="material-symbols-outlined text-accent text-lg sm:text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold font-display text-sm sm:text-base">{item.title}</h4>
                                                <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button data-animate="cta-btn" className="flex items-center gap-2 px-6 h-11 font-bold rounded-xl transition-all duration-300 text-sm uppercase tracking-wide group" style={{ border: "1px solid #00BFA6", color: "#00BFA6" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#00BFA6"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#00BFA6"; }}
                                >
                                    Solicitar Envío Urgente
                                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div data-animate="dashboard" className="relative rounded-2xl p-1 overflow-hidden" style={{ background: "rgba(17,34,64,0.8)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
                                    <div className="px-4 py-2 flex justify-between items-center rounded-t-xl" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <span className="font-mono text-[10px] sm:text-xs text-gray-500">INDUSTRIAL_LOGISTICS_DASHBOARD</span>
                                    </div>
                                    <div className="p-4 sm:p-6 relative">
                                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                                            <div>
                                                <div className="text-[10px] text-gray-400 font-mono mb-1">PART NUMBER</div>
                                                <div className="text-white font-mono text-lg sm:text-xl tracking-wider">CAT-3406-E</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-400 font-mono mb-1">STATUS</div>
                                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-red-400 text-xs font-bold uppercase" style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)" }}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                    AOG / Crítico
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 font-mono">
                                                <span>MIAMI HUB</span>
                                                <span>PLANTA VALENCIA</span>
                                            </div>
                                            <div className="h-2 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.1)" }}>
                                                <div data-animate="progress-bar" className="absolute left-0 top-0 h-full w-3/4 rounded-full" style={{ background: "#00BFA6", boxShadow: "0 0 15px rgba(0,191,166,0.5)" }} />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                                                {[
                                                    { label: "ETA Planta", value: "14:00 HRS", color: "white" },
                                                    { label: "Peso Neto", value: "850 KG", color: "white" },
                                                    { label: "Tipo", value: "URGENT", color: "#f87171" },
                                                ].map((stat) => (
                                                    <div key={stat.label} data-animate="stat" className="p-2 sm:p-3 rounded-xl text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                        <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase mb-1">{stat.label}</div>
                                                        <div className="font-display font-bold text-sm sm:text-lg" style={{ color: stat.color }}>{stat.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none select-none" style={{ opacity: 0.08 }}>
                                            <span className="material-symbols-outlined text-7xl sm:text-9xl text-white">conveyor_belt</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================================================
                    CTA SECTION
                    ================================================================ */}
                <section data-section="cta" className="py-16 sm:py-20 bg-[#F6F8FA] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <h2 data-animate="cta-title" className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-5 sm:mb-6">
                            Soluciones para su Industria
                        </h2>
                        <p data-animate="cta-desc" className="text-slate-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
                            Solicite una cotización técnica detallada para su proyecto de importación. Transparencia en costos de flete, seguro y nacionalización.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: "#00BFA6", boxShadow: "0 4px 20px rgba(0,191,166,0.3)" }}>
                                Cotizar Proyecto
                            </button>
                            <button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-primary text-sm sm:text-base font-bold rounded-xl transition-colors hover:bg-black/5" style={{ border: "1px solid rgba(10,25,47,0.2)" }}>
                                Contactar Ventas B2B
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
