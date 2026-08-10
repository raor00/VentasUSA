"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimationEngine from "@/components/ScrollAnimationEngine";
import QuotationModal from "@/components/QuotationModal";
import RouteMapSection from "@/components/RouteMapSection";
import LifecyclePhase from "@/components/LifecyclePhase";

export default function LandingPage() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [trackingQuery, setTrackingQuery] = useState("");
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [heroProgress, setHeroProgress] = useState(0);
    const WA_URL = "https://wa.me/13053030502?text=" + encodeURIComponent("Hola, necesito importar carga prioritaria desde USA.");

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, []);

    // Simple scroll progress for hero visual animations (inspirado en el video: revela progresivo de info, "apertura" de compuerta, montacarga entra)
    useEffect(() => {
        const heroSection = document.getElementById('hero-section');
        if (!heroSection) return;

        const onScroll = () => {
            const rect = heroSection.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (-rect.top) / (rect.height * 1.2)));
            setHeroProgress(progress);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-9999 origin-left scale-x-0" />

            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-200 hidden lg:block">
                <div className="relative w-px h-52 bg-white/10 rounded-full overflow-hidden">
                    <div className="scroll-route-fill absolute top-0 left-0 w-full h-full bg-linear-to-b from-accent to-blue-300 rounded-full origin-top scale-y-0" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-7 pt-1">
                    {(["hero", "mapa", "ciclo", "cta"] as const).map((s, i) => (
                        <div
                            key={s}
                            className="scroll-dot w-2 h-2 rounded-full border border-white/30 bg-transparent transition-all duration-300 cursor-pointer"
                            data-section-dot={s}
                            title={["Hero Operativo", "Mapa de Importación", "Ciclo de Operatividad", "Acción"][i]}
                        />
                    ))}
                </div>
            </div>

            <ScrollAnimationEngine />

            <main className="relative flex flex-col min-h-screen overflow-x-hidden">
                <Navbar />

                <section
                    id="hero-section"
                    data-section="hero"
                    className="relative w-full min-h-svh bg-[linear-gradient(180deg,#050d1c_0%,#0A192F_52%,#0d2137_100%)]"
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(37,99,235,0.06) 1px, transparent 1px)",
                            backgroundSize: "min(58px, 12vw) min(58px, 12vw)",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-w-[760px] h-[42vh] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 72%)" }} />
                    <div className="absolute top-1/2 right-0 w-[42vw] max-w-[420px] h-[42vw] max-h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(74,158,221,0.08) 0%, transparent 72%)" }} />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 min-h-svh flex flex-col justify-center gap-6 sm:gap-8">
                        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-5">
                            <div data-hero-animate className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ background: "rgba(37,99,235,0.12)", borderColor: "rgba(192,138,46,0.35)" }}>
                                <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: "#C08A2E" }} />
                                <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: "#E7C98A" }}>Logistica Industrial de Respuesta Critica</span>
                            </div>

                            <h1 data-hero-animate className="font-display font-bold text-white tracking-tight leading-[1.05] text-[clamp(2rem,7vw,4.5rem)]">
                                No movemos paquetes,
                                <br />
                                <span className="animate-shimmer-text bg-[linear-gradient(90deg,#2563EB,#60A5FA,#2563EB)] bg-size-[200%_auto] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                    movemos continuidad operativa.
                                </span>
                            </h1>

                            <p data-hero-animate className="text-blue-200/80 leading-relaxed max-w-2xl text-[clamp(0.95rem,2.2vw,1.2rem)]">
                                Ventas en USA esta diseñado para empresas que no pueden detener su operacion: traemos maquinaria, repuestos criticos, equipos de alto valor y carga prioritaria desde USA hacia Venezuela con velocidad, trazabilidad y control logistico de punta a punta.
                            </p>

                            <div data-hero-animate className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
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
                            </div>

                            <div data-hero-animate className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[0.8rem]" style={{ color: "rgba(147,197,253,0.6)" }}>
                                {[
                                    { icon: "flight_land", label: "Aterrizaje Verificado" },
                                    { icon: "move_down", label: "Compuerta Sincronizada" },
                                    { icon: "forklift", label: "Descarga con Montacarga" },
                                ].map((badge, i) => (
                                    <div key={badge.label} className="flex items-center gap-1.5">
                                        {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block mr-3" />}
                                        <span className="material-symbols-outlined text-accent" style={{ fontSize: "1.1rem" }}>{badge.icon}</span>
                                        <span>{badge.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div data-hero-animate className="flex flex-col items-center gap-2 mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
                                <div className="w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                                    <div className="w-full h-1/2 bg-accent animate-scroll-drop" />
                                </div>
                            </div>

                            {/* Hero visual limpio y schematic (inspirado en el video y los mockups que mostraste): imagen base simple + HUDs limpios + revela progresivo con scroll (compuerta "abre" revelando interior, info emerge del hold, montacarga entra). Sin mezclar SVG pesado. Estilo operativo limpio, topografía simple, colores navy/gold/azul consistentes. */}
                            <div className="relative w-full max-w-[820px] mx-auto mt-2" data-hero-animate>
                                <img 
                                    src="/assets/landing-concepts/schematic-fase1.jpg" 
                                    alt="Schematic operativo limpio: avión de carga en tarmac con compuerta abierta, montacarga, estilo mockup limpio como en el video" 
                                    className="w-full h-auto rounded-xl shadow-2xl border border-[#C08A2E]/20" 
                                    style={{ maxHeight: '46vh' }} 
                                />

                                {/* Interior del hold que "se revela" cuando la compuerta "abre" (progreso del video) */}
                                <div 
                                    className="absolute left-[48%] top-[38%] w-[28%] h-[32%] bg-[#0A192F]/70 border border-[#C08A2E]/40 rounded-sm overflow-hidden"
                                    style={{ 
                                        opacity: Math.max(0, heroProgress * 1.4 - 0.3), 
                                        transition: 'opacity 0.15s' 
                                    }}
                                >
                                    <div className="p-1 text-[8px] font-mono text-[#E7C98A] leading-none">
                                        COMPUERTA LIBERADA<br/>
                                        <span className="text-[#93C5FD]">MONTACARGA LISTO</span><br/>
                                        <span className="text-[#C08A2E]">AOG • REPUESTOS / MACH.IND</span>
                                    </div>
                                </div>

                                {/* Montacarga que entra con el scroll (como en el video + freezpak) */}
                                <div 
                                    className="absolute text-2xl"
                                    style={{ 
                                        left: `${18 + heroProgress * 22}%`, 
                                        top: '72%', 
                                        opacity: heroProgress > 0.45 ? 1 : 0,
                                        transition: 'left 0.1s linear, opacity 0.2s',
                                        transform: 'translateY(-50%)'
                                    }}
                                >
                                    🚜
                                </div>

                                {/* HUDs limpios estilo los mockups que mostraste (pequeños, redondos, buena legibilidad) */}
                                <div className="absolute top-3 left-3 px-2 py-1 bg-[#0A192F]/90 border border-[#C08A2E] text-[#E7C98A] font-mono text-[9px] rounded shadow" 
                                     style={{ opacity: heroProgress > 0.1 ? 1 : 0.3 }}>
                                    COMPUERTA: {heroProgress > 0.5 ? 'LIBERADA' : 'ABRIENDO'}
                                </div>
                                <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#0A192F]/90 border border-[#2563EB] text-[#93C5FD] font-mono text-[9px] rounded shadow"
                                     style={{ opacity: heroProgress > 0.35 ? 1 : 0.3 }}>
                                    MONTACARGA: {heroProgress > 0.65 ? 'OPERANDO' : 'EN POSICIÓN'}
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-black/80 border border-[#C08A2E] text-[#E7C98A] font-mono text-[8px] rounded"
                                     style={{ opacity: heroProgress > 0.2 ? 1 : 0.2 }}>
                                    MIA → CCS • 2450km • {heroProgress > 0.7 ? 'OPERACIÓN COMPLETADA' : 'PRIORIDAD AOG'}
                                </div>
                            </div>
                            <div className="text-center text-[9px] text-[#E7C98A]/60 -mt-1">Sigue el video de referencia • Scroll revela la operación (compuerta + montacarga + datos) • Estilo schematic limpio</div>
                            <button onClick={() => setShowVideoModal(true)} className="text-[10px] px-2.5 py-0.5 border border-[#C08A2E]/40 text-[#E7C98A] rounded hover:bg-[#C08A2E]/10 transition self-center">ver video original de referencia</button>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)" }} />
                </section>

                <div id="tracking-section" className="relative z-30 max-w-3xl mx-auto w-full px-4 sm:px-6 -mt-8">
                        <div data-animate="tracking-card" className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100" style={{ boxShadow: "0 20px 60px rgba(10,25,47,0.15)" }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-display font-bold text-lg text-primary">Rastreo Operativo B2B</h3>
                                <span className="text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider" style={{ background: "rgba(192,138,46,0.14)", color: "#8A6422" }}>Visibilidad Activa</span>
                            </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 text-lg">barcode_scanner</span>
                            </div>
                            <input 
                                value={trackingQuery}
                                onChange={(e) => setTrackingQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && trackingQuery.trim()) {
                                        router.push(`/tracking/${encodeURIComponent(trackingQuery.trim())}`);
                                    }
                                }}
                                className="block w-full pl-10 pr-24 py-3 bg-background-light border border-gray-200 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" 
                                placeholder="MAN-CAT-9022 / VU-CARGO-019" 
                                type="text" 
                            />
                            <button 
                                onClick={() => {
                                    const q = trackingQuery.trim() || 'VU-CARGO-019';
                                    router.push(`/tracking/${encodeURIComponent(q)}`);
                                }}
                                className="absolute inset-y-1 right-1 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition-colors"
                            >
                                Ver Estado
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 font-mono">Consulte manifiesto, estado documental, liberacion de compuerta y avance de descarga desde un mismo punto de control. (Demo funcional: ingrese ID y presione Enter o el botón)</p>
                    </div>
                </div>

                <div data-section="ticker" className="w-full bg-primary text-white py-3 overflow-hidden border-y border-white/10 relative z-20 mt-6">
                    <div className="ticker-wrap">
                        <div className="ticker">
                            <div className="inline-flex items-center gap-10 font-mono text-xs sm:text-sm tracking-wide">
                                {[
                                    { icon: "✈️", text: "Vuelo industrial confirmado en plataforma" },
                                    { icon: "📄", text: "Manifiesto validado para descarga prioritaria" },
                                    { icon: "🚪", text: "Compuerta habilitada con corredor asegurado" },
                                    { icon: "🏗️", text: "Maquinaria critica en proceso de extracción" },
                                    { icon: "🚚", text: "Carga liberada para almacén o despacho coordinado" },
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

                <RouteMapSection onVideoClick={() => setShowVideoModal(true)} />

                {/* Ciclo de Operatividad — toda la información estructurada (estilo schematic operativo del video, sin sobrecarga visual) */}
                <section className="relative py-16 sm:py-20 bg-[#0A192F] overflow-hidden" id="animacion-ciclo" data-section="ciclo">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4" style={{ background: "rgba(37,99,235,0.12)", borderColor: "rgba(192,138,46,0.35)" }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C08A2E" }} />
                                <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase" style={{ color: "#E7C98A" }}>CICLO DE OPERATIVIDAD</span>
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">De la solicitud en USA hasta la continuidad operativa.<br />6 fases con visibilidad total y trazabilidad.</h2>
                            <p className="text-blue-200/70 max-w-2xl mx-auto">Cada fase con datos operativos claros (prioridad AOG, montacarga, compuerta, tiempos). El estilo schematic/HUD del video de referencia se mantiene en overlays y en el mapa; aquí toda la información aparece estructurada al avanzar.</p>
                        </div>

                        {/* Ciclo de 6 fases - toda la información al hacer scroll (estilo freezpak life cycle adaptado a importación maquinaria pesada) */}
                        <div className="mb-6 text-center">
                            <div className="inline text-xs font-bold tracking-[2px] uppercase text-[#E7C98A]/80">Ciclo completo de importación urgente</div>
                            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">De la solicitud en USA hasta la continuidad operativa en Venezuela.<br />Cada fase con visibilidad total.</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <LifecyclePhase
                                phase={1}
                                title="01 Solicitud & compra USA"
                                visualSrc="/assets/landing-concepts/schematic-fase1.jpg"
                                desc="Tu empresa define qué necesita traer desde USA (maquinaria pesada, repuestos críticos) y coordinamos proveedor, recolección, documentación base y prioridad operativa desde el origen."
                                microInteraction="light-pulse"
                            />
                            <LifecyclePhase
                                phase={2}
                                title="02 Consolidación & embarque aéreo"
                                visualSrc="/assets/landing-concepts/schematic-fase2.jpg"
                                desc="La mercancía se recibe, se consolida, se valida documentalmente y se prepara para embarque aéreo con trazabilidad durante todo el tránsito."
                                microInteraction="none"
                            />
                            <LifecyclePhase
                                phase={3}
                                title="03 Vuelo prioritario MIA-CCS"
                                visualSrc="/assets/landing-concepts/schematic-fase3.jpg"
                                desc="2450 km, ~4h. Monitoreo en tiempo real del vuelo industrial. Notificaciones de posición y estado para tu equipo operativo."
                                microInteraction="none"
                            />
                            <LifecyclePhase
                                phase={4}
                                title="04 Descarga montacarga & liberación compuerta"
                                visualSrc="/assets/landing-concepts/schematic-fase4.jpg"
                                desc="Al aterrizar, activamos liberación operativa, descarga prioritaria con montacargas y salida coordinada para que la carga llegue en tiempo récord."
                                microInteraction="crate-slide"
                                cta={{ label: "Ver video del concepto", href: "/assets/landing-concepts/2.mp4" }}
                            />
                            <LifecyclePhase
                                phase={5}
                                title="05 Entrega + continuidad operativa"
                                visualSrc="/assets/landing-concepts/schematic-fase5.jpg"
                                desc="Carga en custodia sale al destino final. Tu operación no se detiene. Entrega coordinada en Caracas o donde la necesites."
                                microInteraction="none"
                            />
                            <LifecyclePhase
                                phase={6}
                                title="06 Trazabilidad post-op"
                                visualSrc="/assets/landing-concepts/schematic-fase6.jpg"
                                desc="Todo el ciclo documentado. Manifiestos, fotos de descarga, firmas, estado final. Listo para auditoría o próxima importación."
                                microInteraction="light-pulse"
                            />
                        </div>

                        <p className="text-center text-xs text-white/40 mt-6">Desplázate por las fases. La información completa del ciclo de importación de maquinaria pesada y repuestos críticos aparece a medida que avanzas. Estilo esquemático operativo para máxima claridad en la interfaz de control.</p>
                    </div>
                </section>

                <section data-section="cta" className="py-16 sm:py-20 bg-background-light relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                        <h2 data-animate="cta-title" className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-5 sm:mb-6">
                            Cuando tu operacion no puede detenerse, la logistica tampoco.
                        </h2>
                        <p data-animate="cta-desc" className="text-slate-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
                            Coordinamos carga critica, maquinaria, repuestos y activos industriales desde USA hacia Venezuela con velocidad, trazabilidad y control operativo en cada etapa.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
            <QuotationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

            {/* Modal simple para video del concepto (integrado sin ser repetitivo en las secciones) */}
            {showVideoModal && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 p-4" onClick={() => setShowVideoModal(false)}>
                    <div className="bg-[#0A192F] rounded-xl p-4 max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between mb-3">
                            <div className="text-sm text-[#E7C98A]">Video del concepto: Flujo operativo (estilo del video adjuntado)</div>
                            <button onClick={() => setShowVideoModal(false)} className="text-white/70 hover:text-white">✕</button>
                        </div>
                        <video src="/assets/landing-concepts/reference-video.mp4" controls muted playsInline className="w-full rounded" poster="/assets/landing-concepts/schematic-fase3.jpg" />
                        <p className="text-xs text-white/50 mt-2">Este es el video exacto que adjuntaste (c18e0bc4...). Lo seguimos para la animación del hero (compuerta que se abre + info emerge + montacarga) y la sección de mapa (schematic + HUDs + este video visible). También tenemos nuestra versión adaptada schematic en 2.mp4.</p>
                    </div>
                </div>
            )}
        </>
    );
}
