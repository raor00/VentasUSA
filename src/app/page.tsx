"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeroScenario from "@/components/AnimatedHeroScenario";
import ScrollAnimationEngine from "@/components/ScrollAnimationEngine";

export default function LandingPage() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, []);

    return (
        <>
            <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-9999 origin-left scale-x-0" />

            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-200 hidden lg:block">
                <div className="relative w-px h-44 bg-white/10 rounded-full overflow-hidden">
                    <div className="scroll-route-fill absolute top-0 left-0 w-full h-full bg-linear-to-b from-accent to-teal-300 rounded-full origin-top scale-y-0" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-9 pt-1">
                    {(["hero", "process", "urgency", "cta"] as const).map((s, i) => (
                        <div
                            key={s}
                            className="scroll-dot w-2 h-2 rounded-full border border-white/30 bg-transparent transition-all duration-300 cursor-pointer"
                            data-section-dot={s}
                            title={["Hero", "Proceso", "Monitoreo", "Cierre"][i]}
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
                            backgroundImage: "linear-gradient(rgba(0,191,166,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(0,191,166,0.06) 1px, transparent 1px)",
                            backgroundSize: "min(58px, 12vw) min(58px, 12vw)",
                        }}
                    />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-w-[760px] h-[42vh] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,191,166,0.1) 0%, transparent 72%)" }} />
                    <div className="absolute top-1/2 right-0 w-[42vw] max-w-[420px] h-[42vw] max-h-[420px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(74,158,221,0.08) 0%, transparent 72%)" }} />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 min-h-svh flex flex-col justify-center gap-6 sm:gap-8">
                        <div className="w-full" aria-hidden="true">
                            <AnimatedHeroScenario />
                        </div>

                        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-5">
                            <div data-hero-animate className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ background: "rgba(0,191,166,0.12)", borderColor: "rgba(0,191,166,0.3)" }}>
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
                                <span className="text-[11px] sm:text-xs font-bold text-accent tracking-widest uppercase">Logistica Industrial de Respuesta Critica</span>
                            </div>

                            <h1 data-hero-animate className="font-display font-bold text-white tracking-tight leading-[1.05] text-[clamp(2rem,7vw,4.5rem)]">
                                No movemos paquetes,
                                <br />
                                <span className="animate-shimmer-text bg-[linear-gradient(90deg,#00BFA6,#4a9edd,#00BFA6)] bg-size-[200%_auto] bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                    movemos continuidad operativa.
                                </span>
                            </h1>

                            <p data-hero-animate className="text-blue-200/80 leading-relaxed max-w-2xl text-[clamp(0.95rem,2.2vw,1.2rem)]">
                                Ventas en USA esta diseñado para empresas que no pueden detener su operacion: traemos maquinaria, repuestos criticos, equipos de alto valor y carga prioritaria desde USA hacia Venezuela con velocidad, trazabilidad y control logistico de punta a punta.
                            </p>

                            <div data-hero-animate className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none">
                                <button className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:-translate-y-1" style={{ background: "#00BFA6", boxShadow: "0 8px 32px rgba(0,191,166,0.35)" }}>
                                    Solicitar Operacion Prioritaria
                                </button>
                                <button className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl text-white transition-all duration-300 hover:bg-white/20" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                                    <span className="material-symbols-outlined text-accent text-[1.2rem]">monitoring</span>
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
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)" }} />
                </section>

                <div id="tracking-section" className="relative z-30 max-w-3xl mx-auto w-full px-4 sm:px-6 -mt-8">
                    <div data-animate="tracking-card" className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100" style={{ boxShadow: "0 20px 60px rgba(10,25,47,0.15)" }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-lg text-primary">Centro de Coordinacion de Descarga</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Operativo</span>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 text-lg">barcode_scanner</span>
                            </div>
                            <input className="block w-full pl-10 pr-24 py-3 bg-background-light border border-gray-200 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" placeholder="FLIGHT-CARGO-042..." type="text" />
                            <button className="absolute inset-y-1 right-1 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition-colors">Ver Estado</button>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 font-mono">Consulte vuelo, compuerta activa y avance de montacarga en tiempo real.</p>
                    </div>
                </div>

                <div data-section="ticker" className="w-full bg-primary text-white py-3 overflow-hidden border-y border-white/10 relative z-20 mt-6">
                    <div className="ticker-wrap">
                        <div className="ticker">
                            <div className="inline-flex items-center gap-10 font-mono text-xs sm:text-sm tracking-wide">
                                {[
                                    { icon: "✈️", text: "Aterrizaje confirmado en plataforma 3" },
                                    { icon: "🚪", text: "Compuerta de carga en apertura segura" },
                                    { icon: "🦺", text: "Montacarga en posicion de extraccion" },
                                    { icon: "📦", text: "Mercancia industrial liberada" },
                                    { icon: "✈️", text: "Aterrizaje confirmado en plataforma 3" },
                                    { icon: "🚪", text: "Compuerta de carga en apertura segura" },
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

                <section id="process-section" data-section="process" className="py-20 sm:py-24 bg-background-light relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0A192F 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div data-animate="title-wrap" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                <span className="text-xs font-bold text-primary tracking-wide uppercase">Secuencia Operativa</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">Un guion claro, de pista a almacen</h2>
                            <p className="text-slate-600 text-base sm:text-lg">Cada bloque de la interfaz representa exactamente lo que ocurre en la operacion fisica.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            {[
                                { num: "01", icon: "flight_land", bg: "#0A192F", iconColor: "white", title: "Aterrizaje y Posicionamiento", desc: "El avion reduce velocidad, toma pista y se alinea con zona de descarga para iniciar maniobra segura." },
                                { num: "02", icon: "garage_door", bg: "white", iconColor: "#0A192F", border: true, title: "Apertura de Compuerta", desc: "La compuerta trasera desciende y habilita el corredor de salida de mercancia con senalizacion de seguridad." },
                                { num: "03", icon: "forklift", bg: "#00BFA6", iconColor: "white", title: "Extraccion con Montacarga", desc: "El montacarga ingresa, toma la carga y la traslada al area de inspeccion sin romper la cadena operativa." },
                            ].map((card, index, arr) => (
                                <div key={card.num} data-animate="card" className={`group relative bg-background-light p-6 sm:p-8 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 ${index === arr.length - 1 ? "sm:col-span-2 sm:max-w-md sm:mx-auto md:col-span-1 md:max-w-none" : ""}`}>
                                    <div className="absolute top-0 right-0 p-4 font-display text-5xl sm:text-6xl font-bold text-primary select-none" style={{ opacity: 0.08 }}>{card.num}</div>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 sm:mb-6 shadow-md group-hover:scale-110 transition-transform duration-300" style={{ background: card.bg, color: card.iconColor, border: card.border ? "1px solid rgba(10,25,47,0.2)" : "none" }}>
                                        <span className="material-symbols-outlined text-2xl sm:text-3xl">{card.icon}</span>
                                    </div>
                                    <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-3">{card.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="heavy-cargo-section" data-section="urgency" className="relative py-20 sm:py-24 overflow-hidden" style={{ background: "#0A192F" }}>
                    <div className="parallax-grid absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,191,166,0.12) 0%, transparent 70%)" }} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12">
                            <div className="lg:w-1/2 w-full">
                                <div data-animate="badge" className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-5 sm:mb-6" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                                    <span className="material-symbols-outlined text-accent text-sm">emergency</span>
                                    <span className="font-mono text-xs text-accent font-bold tracking-wider uppercase">Control de Operacion</span>
                                </div>

                                <h2 data-animate="title" className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-5 sm:mb-6">
                                    Coherencia total
                                    <br />
                                    <span className="text-accent">entre escena y proceso.</span>
                                </h2>

                                <p data-animate="desc" className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                                    Lo que ves en la animacion coincide con los estados operativos: aeronave en tierra, compuerta activa, montacarga en movimiento y mercancia en retiro.
                                </p>

                                <ul className="space-y-4 mb-7 sm:mb-8">
                                    {[
                                        { icon: "visibility", title: "Estados Claros", desc: "Cada fase tiene representacion visual comprensible y consistente." },
                                        { icon: "responsive_layout", title: "Vista Responsive", desc: "La experiencia se adapta a mobile, tablet y escritorio." },
                                    ].map((item) => (
                                        <li key={item.title} data-animate="item" className="flex items-start gap-3">
                                            <div className="p-1.5 rounded-lg shrink-0" style={{ background: "rgba(0,191,166,0.2)" }}>
                                                <span className="material-symbols-outlined text-accent text-lg sm:text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold font-display text-sm sm:text-base">{item.title}</h4>
                                                <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button data-animate="cta-btn" className="flex items-center gap-2 px-6 h-11 font-bold rounded-xl transition-all duration-300 text-sm uppercase tracking-wide group border border-accent text-accent hover:bg-accent hover:text-white">
                                    Validar Flujo con mi Equipo
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
                                        <span className="font-mono text-[10px] sm:text-xs text-gray-500">LIVE_RAMP_MONITOR</span>
                                    </div>
                                    <div className="p-4 sm:p-6 relative">
                                        <div className="flex justify-between items-start mb-6 sm:mb-8">
                                            <div>
                                                <div className="text-[10px] text-gray-400 font-mono mb-1">VUELO</div>
                                                <div className="text-white font-mono text-lg sm:text-xl tracking-wider">VU-CARGO-019</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-400 font-mono mb-1">STATUS</div>
                                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-emerald-300 text-xs font-bold uppercase" style={{ background: "rgba(16,185,129,0.16)", border: "1px solid rgba(16,185,129,0.3)" }}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    Descargando
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 font-mono">
                                                <span>Pista</span>
                                                <span>Zona de Almacen</span>
                                            </div>
                                            <div className="h-2 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.1)" }}>
                                                <div data-animate="progress-bar" className="absolute left-0 top-0 h-full w-3/4 rounded-full" style={{ background: "#00BFA6", boxShadow: "0 0 15px rgba(0,191,166,0.5)" }} />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                                                {[
                                                    { label: "Compuerta", value: "ABIERTA", color: "#6ee7b7" },
                                                    { label: "Montacarga", value: "EN RAMPA", color: "white" },
                                                    { label: "Carga", value: "EN RETIRO", color: "#67e8f9" },
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
                            <button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: "#00BFA6", boxShadow: "0 4px 20px rgba(0,191,166,0.3)" }}>
                                Solicitar Evaluacion Logistica
                            </button>
                            <button data-animate="cta-element" className="flex items-center justify-center px-8 h-12 text-primary text-sm sm:text-base font-bold rounded-xl transition-colors hover:bg-black/5" style={{ border: "1px solid rgba(10,25,47,0.2)" }}>
                                Hablar con un Asesor Operativo
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
