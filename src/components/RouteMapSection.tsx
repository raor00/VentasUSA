"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate } from "animejs";

gsap.registerPlugin(ScrollTrigger);

export default function RouteMapSection({ onVideoClick }: { onVideoClick?: () => void }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const animated = useRef(false);
    const [mapProgress, setMapProgress] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Scroll driven progress for operational animations/transitions — schematic HUD style (como hero y video: info se revela progresivamente con el scrub)
        const st = ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
                const p = self.progress;
                setMapProgress(p);
            },
            onEnter: () => {
                if (!animated.current) {
                    animated.current = true;
                    // Counters + initial pulse (sin depender del SVG antiguo que fue reemplazado por schematic)
                    document.querySelectorAll<HTMLElement>(".counter-val").forEach((el, i) => {
                        const target = parseInt(el.dataset.val ?? "0", 10);
                        const proxy = { val: 0 };
                        animate(proxy, {
                            val: target,
                            duration: 1800,
                            ease: "outExpo",
                            delay: 300 + i * 120,
                            onUpdate: () => {
                                el.textContent = String(Math.round(proxy.val));
                            },
                        });
                    });
                }
            },
        });

        return () => {
            st.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="mapa"
            data-section="mapa"
            className="py-20 sm:py-24 relative overflow-hidden"
            style={{ background: "#0A192F" }}
        >
            {/* Background glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(37,99,235,0.07) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                    <div>
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest"
                            style={{
                                background: "rgba(37,99,235,0.12)",
                                border: "1px solid rgba(37,99,235,0.28)",
                                color: "#93c5fd",
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: "#22c55e",
                                    animation: "rmPulseDot 1.8s ease-in-out infinite",
                                }}
                            />
                            Operaciones Activas
                        </div>
                        <h2
                            className="font-extrabold text-white leading-tight mb-3"
                            style={{ fontSize: "clamp(1.5rem,4vw,2.25rem)", letterSpacing: "-0.03em" }}
                        >
                            Importación directa{" "}
                            <span style={{ color: "#2563EB" }}>USA → Venezuela</span>
                        </h2>
                        <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.42)" }}>
                            Vuelos de carga industrial entre Miami y Venezuela. Gestión integral:
                            despacho, aduana, seguro y entrega final puerta a puerta.
                        </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        {[
                            ["Operador certificado", "IATA"],
                            ["Ruta activa", "MIA → CCS"],
                            ["Carga desde", "50 kg"],
                            ["Seguro incluido", "100%"],
                        ].map(([label, value]) => (
                            <div
                                key={value}
                                className="flex items-center gap-2 text-[10.5px] rounded-lg px-3 py-[5px]"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    color: "rgba(255,255,255,0.45)",
                                }}
                            >
                                {label}{" "}
                                <span className="font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats row */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    {[
                        { val: 72,   unit: "h",  label: "Entrega promedio" },
                        { val: 500,  unit: "+",  label: "Empresas atendidas" },
                        { val: 99,   unit: "%",  label: "On-time delivery" },
                        { val: 2450, unit: "km", label: "Ruta directa" },
                    ].map(({ val, unit, label }) => (
                        <div
                            key={label}
                            className="rounded-xl px-4 py-3 min-w-[90px]"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <div className="font-black text-white leading-none" style={{ fontSize: 22 }}>
                                <span className="counter-val" data-val={String(val)}>{val}</span>
                                <span className="font-bold" style={{ fontSize: 12, color: "#2563EB" }}>{unit}</span>
                            </div>
                            <div className="mt-1 text-[9.5px]" style={{ color: "rgba(255,255,255,0.32)" }}>
                                {label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map card — ahora schematic/operativo como el hero y fases (estilo video: menos geo realista, más HUD control panel, info revelada por scroll) */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: "linear-gradient(180deg,rgba(4,12,32,0.9) 0%,rgba(2,15,38,0.95) 100%)",
                        border: "1px solid rgba(37,99,235,0.12)",
                    }}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(37,99,235,0.06) 0%, transparent 70%)",
                        }}
                    />

                    {/* Visual schematic mejorado: topografía y colores pulidos (mapa estilizado limpio, ruta dashed gold como en el mockup que te gustó, HUDs pequeños y claros, plane simple que se mueve). Base schematic + overlays para mejor legibilidad y "operatividad". */}
                    <div className="relative">
                        <img
                            src="/assets/landing-concepts/schematic-fase3.jpg"
                            alt="Schematic operativo ruta MIA-CCS limpio: topografía simplificada, colores navy/gold, plane y ruta como mockup del video"
                            className="w-full h-auto block"
                            style={{ maxHeight: "340px", objectFit: "cover" }}
                        />

                        {/* Ruta dashed limpia y plane que se mueve (mejora topografía visual sin sobrecargar) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path 
                                d="M15 45 Q 40 30, 65 55 Q 80 48, 88 60" 
                                fill="none" 
                                stroke="#C08A2E" 
                                strokeWidth="0.8" 
                                strokeDasharray="2 1.5" 
                                opacity="0.85"
                            />
                            {/* Plane marker limpio que avanza con el progreso */}
                            <g style={{ transform: `translate(${15 + mapProgress * 73}%, 45%)` }}>
                                <circle cx="0" cy="0" r="1.2" fill="#2563EB" />
                                <text x="2" y="0.5" fontSize="2.5" fill="#E7C98A" fontFamily="monospace">✈</text>
                            </g>
                        </svg>

                        {/* HUDs limpios y pequeños como en el mockup que mostraste (mejor tipografía, bordes sutiles, colores pulidos) */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-[#0A192F]/95 border border-[#C08A2E]/70 text-[#E7C98A] font-mono text-[8px] rounded-sm shadow"
                             style={{ opacity: mapProgress > 0.08 ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                            RUTA: MIA → CCS<br /><span className="text-[7px] text-[#93C5FD]">2450km {mapProgress > 0.65 ? 'COMPLETADOS' : 'EN CURSO'}</span>
                        </div>

                        <div className="absolute top-3 right-3 px-2 py-1 bg-[#0A192F]/95 border border-[#2563EB]/70 text-[#93C5FD] font-mono text-[8px] rounded-sm shadow"
                             style={{ opacity: mapProgress > 0.3 ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                            PRIORIDAD: AOG<br /><span className="text-[7px]">EN VUELO</span>
                        </div>

                        {/* Label superior como en el mockup */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-[1px] text-[#C08A2E]/70">VUELO MIA-CCS</div>

                        {/* Badge central de ruta */}
                        <div className="absolute left-1/2 top-[36%] -translate-x-1/2 px-2 py-0.5 bg-black/85 border border-[#C08A2E]/60 text-[#E7C98A] font-mono text-[7.5px] rounded-sm"
                             style={{ opacity: mapProgress > 0.12 ? 1 : 0.3 }}>
                            MIA → CCS · 2450 km · {mapProgress > 0.6 ? '~0h' : '~4h'} VUELO
                        </div>

                        {/* Barra de progreso limpia en la parte inferior de la imagen */}
                        <div className="absolute bottom-2 left-3 right-3 h-px bg-white/10">
                            <div className="h-px bg-[#C08A2E]" style={{ width: `${mapProgress * 100}%` }} />
                        </div>
                    </div>

                    {/* Panel Operativo inferior mejorado (colores y tipografía pulidos, topografía más clara) */}
                    <div className="p-2 bg-[#0A192F]/95 border-t border-[#C08A2E]/50 text-[8px] font-mono text-[#E7C98A]">
                        <div className="flex items-center justify-between mb-0.5">
                            <div>PROGRESO RUTA: {Math.round(mapProgress * 100)}%</div>
                            <div className="text-[#93C5FD]/80">ESTADO: {mapProgress < 0.2 ? 'PREPARACIÓN EMBARQUE' : mapProgress < 0.45 ? 'EN VUELO PRIORITARIO' : mapProgress < 0.7 ? 'APROX. CCS - LISTO DESCARGA' : 'MONTACARGA OPERANDO • COMPUERTA LIBERADA'}</div>
                        </div>
                        <div className="h-px bg-white/10">
                            <div className="h-px bg-[#2563EB]" style={{ width: `${mapProgress * 100}%` }} />
                        </div>
                        <div className="mt-0.5 text-[7px] text-white/40">MIA 25°46′N 80°11′W → CCS 10°28′N 66°54′W • AOG • 2450 km • ~4h</div>
                    </div>

                    {/* Integración del video del concepto (sin repetirlo en el flujo principal; referencia del video adjuntado que pediste para el estilo schematic/operativo) */}
                    <div className="px-3 pb-2 pt-1 text-right">
                        <button
                            onClick={() => onVideoClick ? onVideoClick() : window.open('/assets/landing-concepts/2.mp4', '_blank')}
                            className="inline text-[10px] font-mono text-[#E7C98A]/70 hover:text-[#E7C98A] underline decoration-[#C08A2E]/40 hover:decoration-[#C08A2E]"
                        >
                            ver video del concepto (apertura compuerta + montacarga + revela info)
                        </button>
                    </div>

                </div>

                {/* Se removió la fila antigua de chips + CTA y el video embebido (causaba render raro). El botón de arriba abre el concepto. La sección ahora es schematic limpio + topografía y colores mejorados (ruta dashed + plane móvil como en tus mockups). */}
            </div>

            <style>{`
                @keyframes rmPulseDot {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
            `}</style>
        </section>
    );
}
