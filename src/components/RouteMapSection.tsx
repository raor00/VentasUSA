"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, svg } from "animejs";

export default function RouteMapSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const animated = useRef(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated.current) {
                    animated.current = true;
                    runAnimations();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function runAnimations() {
        // 1. Route line draw — createDrawable sets up the path, then animate draw property
        svg.createDrawable("#route-line");
        svg.createDrawable("#route-glow");

        animate("#route-line", {
            draw: "0 1",
            duration: 2500,
            ease: "inOutQuart",
            delay: 200,
        });
        animate("#route-glow", {
            draw: "0 1",
            opacity: [0, 1],
            duration: 2500,
            ease: "inOutQuart",
            delay: 200,
        });

        // 2. Plane motion along SVG path
        const motionPath = svg.createMotionPath("#flight-path-motion");
        const planeEl = document.querySelector<SVGGElement>("#plane-icon");
        if (planeEl) {
            planeEl.style.opacity = "1";
            animate("#plane-icon", {
                ...motionPath,
                duration: 5000,
                ease: "linear",
                loop: true,
                delay: 1000,
            });
        }

        // 3. City cards stagger reveal
        animate(".city-card-animate", {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 600,
            ease: "outExpo",
            delay: stagger(200, { start: 900 }),
        });

        // 4. Stats counters — plain object tween, update DOM on each tick
        document.querySelectorAll<HTMLElement>(".counter-val").forEach((el, i) => {
            const target = parseInt(el.dataset.val ?? "0", 10);
            const proxy = { val: 0 };
            animate(proxy, {
                val: target,
                duration: 2000,
                ease: "outExpo",
                delay: 400 + i * 150,
                onUpdate: () => {
                    el.textContent = String(Math.round(proxy.val));
                },
            });
        });
    }

    return (
        <section
            ref={sectionRef}
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

                {/* Map card */}
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

                    <svg
                        viewBox="0 0 760 290"
                        width="100%"
                        style={{ display: "block" }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                    >
                        {/* Grid */}
                        {[0, 72, 144, 216, 288].map((y) => (
                            <line key={`gy${y}`} x1="0" y1={y} x2="760" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
                        ))}
                        {[0, 190, 380, 570, 760].map((x) => (
                            <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="290" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
                        ))}
                        <text x="4" y="286" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">8°N</text>
                        <text x="4" y="214" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">13°N</text>
                        <text x="4" y="142" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">18°N</text>
                        <text x="4" y="70"  fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">23°N</text>
                        <text x="192" y="284" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">81°W</text>
                        <text x="382" y="284" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">74°W</text>
                        <text x="572" y="284" fontSize="7.5" fill="rgba(255,255,255,0.12)" fontFamily="monospace">67°W</text>

                        {/* Caribbean ambient */}
                        <ellipse cx="380" cy="160" rx="310" ry="120" fill="rgba(20,60,120,0.1)" />

                        {/* Florida */}
                        <path
                            d="M 154 0 C 148 5,143 10,145 18 C 147 24,155 25,164 25 C 168 25,170 28,170 32 C 170 36,167 39,163 42 Q 174 45,185 43 Q 199 42,208 36 Q 216 32,220 31 C 223 28,225 23,224 18 C 223 13,222 8,222 0 Z"
                            fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.22)" strokeWidth="0.9"
                        />
                        <path
                            d="M 190 44 Q 183 48,175 49 Q 165 50,155 49 Q 147 48,140 48"
                            stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"
                        />
                        <text x="188" y="17" fontSize="7" fill="rgba(255,255,255,0.16)" fontFamily="monospace" textAnchor="middle">FLORIDA</text>

                        {/* Cuba */}
                        <path
                            d="M 87 87 C 110 79,145 72,160 70 C 178 68,200 71,222 75 C 248 79,278 83,310 89 C 340 94,368 100,388 109 C 380 114,365 116,348 115 C 318 113,285 108,255 105 C 225 103,198 101,175 99 C 152 97,122 94,100 93 C 92 91,86 90,87 87 Z"
                            fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.2)" strokeWidth="0.9"
                        />
                        <text x="230" y="84" fontSize="7.5" fill="rgba(255,255,255,0.18)" fontFamily="monospace" textAnchor="middle" letterSpacing="3">CUBA</text>

                        {/* Hispaniola */}
                        <ellipse cx="418" cy="123" rx="32" ry="12" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.15)" strokeWidth="0.7" />
                        <text x="418" y="127" fontSize="6" fill="rgba(255,255,255,0.14)" fontFamily="monospace" textAnchor="middle">HISPANIOLA</text>

                        {/* Puerto Rico */}
                        <ellipse cx="510" cy="135" rx="12" ry="6" fill="rgba(37,99,235,0.06)" stroke="rgba(37,99,235,0.15)" strokeWidth="0.7" />

                        {/* Lesser Antilles */}
                        {([
                            [625, 160, 3.5],
                            [645, 178, 3],
                            [660, 196, 2.5],
                            [672, 212, 2.5],
                        ] as [number, number, number][]).map(([cx, cy, r]) => (
                            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.18)" strokeWidth="0.8" />
                        ))}
                        <ellipse cx="682" cy="230" rx="7" ry="5" fill="rgba(37,99,235,0.07)" stroke="rgba(37,99,235,0.15)" strokeWidth="0.8" />

                        {/* Venezuela */}
                        <path
                            d="M 408 224 C 425 221,438 223,446 228 C 451 231,453 236,450 240 C 456 235,466 228,478 221 C 486 216,496 212,508 213 C 514 214,516 220,513 228 C 510 234,505 238,500 240 C 508 237,520 233,535 231 C 550 229,566 230,580 238 C 594 245,610 244,630 241 C 655 238,682 237,710 238 C 728 239,746 240,760 241 L 760 290 L 408 290 Z"
                            fill="rgba(50,40,10,0.18)" stroke="rgba(231,201,138,0.22)" strokeWidth="0.9"
                        />
                        <path
                            d="M 410 230 Q 480 225 540 232 Q 580 236 610 242"
                            stroke="rgba(231,201,138,0.06)" strokeWidth="3" fill="none"
                        />
                        <text x="564" y="264" fontSize="7.5" fill="rgba(231,201,138,0.18)" fontFamily="monospace" textAnchor="middle" letterSpacing="2">VENEZUELA</text>

                        {/* Flight route */}
                        {/* Hidden path for anime.js motion path — must start at same origin as plane (0,0) */}
                        <path id="flight-path-motion" d="M 0 0 C 120 -61 360 -21 374 214" stroke="none" fill="none" />
                        {/* Glow */}
                        <path
                            id="route-glow"
                            d="M 220 31 C 340 -30 480 10 594 245"
                            stroke="rgba(37,99,235,0.14)"
                            strokeWidth="8"
                            fill="none"
                            style={{ opacity: 0 }}
                        />
                        {/* Dashed line */}
                        <path
                            id="route-line"
                            d="M 220 31 C 340 -30 480 10 594 245"
                            stroke="rgba(37,99,235,0.6)"
                            strokeWidth="1.8"
                            strokeDasharray="8 6"
                            fill="none"
                        />
                        {/* Waypoints */}
                        <circle cx="340" cy="0"  r="2" fill="rgba(255,255,255,0.14)" />
                        <circle cx="470" cy="8"  r="2" fill="rgba(255,255,255,0.14)" />
                        <circle cx="545" cy="82" r="2" fill="rgba(255,255,255,0.14)" />

                        {/* City markers — Miami */}
                        <circle cx="220" cy="31" r="5" fill="#2563EB" fillOpacity="0.22" />
                        <circle cx="220" cy="31" r="3" fill="#2563EB" />
                        <circle cx="220" cy="31" r="6" fill="none" stroke="#2563EB" strokeWidth="0.8" strokeOpacity="0.35">
                            <animate attributeName="r" from="6" to="22" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" repeatCount="indefinite" />
                        </circle>

                        {/* City markers — Caracas */}
                        <circle cx="594" cy="245" r="5" fill="#E7C98A" fillOpacity="0.18" />
                        <circle cx="594" cy="245" r="3" fill="#E7C98A" />
                        <circle cx="594" cy="245" r="6" fill="none" stroke="#E7C98A" strokeWidth="0.8" strokeOpacity="0.35">
                            <animate attributeName="r" from="6" to="22" dur="2.5s" begin="0.9s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" begin="0.9s" repeatCount="indefinite" />
                        </circle>

                        {/* Plane icon — positioned at (220, 31) = Miami, anime.js translates along motion path */}
                        <g id="plane-icon" transform="translate(220,31)" style={{ opacity: 0 }}>
                            <g transform="translate(-8,-8)">
                                {/* Simple plane silhouette */}
                                <path
                                    d="M8 1 L15 7 L11 7 L11 15 L9 15 L9 7 L5 7 L5 15 L3 15 L3 7 L1 7 Z"
                                    fill="white"
                                    opacity="0.9"
                                />
                            </g>
                        </g>
                    </svg>

                    {/* Miami city card */}
                    <div
                        className="city-card-animate absolute bottom-4 left-3 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md"
                        style={{
                            background: "rgba(8,18,38,0.92)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                            opacity: 0,
                        }}
                    >
                        <span className="text-sm">🇺🇸</span>
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#2563EB", boxShadow: "0 0 0 3px rgba(37,99,235,0.25)" }} />
                        <div>
                            <div className="text-[11.5px] font-bold text-white leading-none">Miami, Florida</div>
                            <div className="text-[8.5px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>25°46′N · 80°11′W</div>
                        </div>
                        <div className="text-[9px] font-extrabold rounded px-1.5 py-0.5 ml-1"
                            style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.3)", color: "#93c5fd" }}>
                            MIA
                        </div>
                    </div>

                    {/* Caracas city card */}
                    <div
                        className="city-card-animate absolute bottom-4 right-3 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md"
                        style={{
                            background: "rgba(8,18,38,0.92)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                            opacity: 0,
                        }}
                    >
                        <span className="text-sm">🇻🇪</span>
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#E7C98A", boxShadow: "0 0 0 3px rgba(231,201,138,0.25)" }} />
                        <div>
                            <div className="text-[11.5px] font-bold text-white leading-none">Caracas, Venezuela</div>
                            <div className="text-[8.5px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>10°28′N · 66°54′W</div>
                        </div>
                        <div className="text-[9px] font-extrabold rounded px-1.5 py-0.5 ml-1"
                            style={{ background: "rgba(231,201,138,0.12)", border: "1px solid rgba(231,201,138,0.28)", color: "#E7C98A" }}>
                            CCS
                        </div>
                    </div>

                    {/* Flight badge */}
                    <div
                        className="absolute left-1/2 flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-md text-[10px] font-bold whitespace-nowrap"
                        style={{
                            top: "38%",
                            transform: "translateX(-50%)",
                            background: "rgba(10,22,48,0.88)",
                            border: "1px solid rgba(37,99,235,0.35)",
                            color: "#93c5fd",
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.6-.7 1.1l.3.9c.2.6.7 1 1.3 1l3.9-.2 2.2 2.8-3 .5c-.7.1-1.1.7-.9 1.4l.2.8c.2.6.8 1 1.4.9l4-.5 2.3 3.2c.2.3.5.5.8.5h.5c.7 0 1.1-.7.9-1.3z" />
                        </svg>
                        MIA → CCS · 2,450 km · ~4h vuelo
                    </div>
                </div>

                {/* Bottom chips + CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { dot: "#22c55e", text: "Vuelos semanales confirmados" },
                            { dot: "#2563EB", text: "Carga mínima 50 kg · sin límite" },
                            { dot: "#E7C98A", text: "Aduana, seguro y entrega incluidos" },
                            { dot: "#a855f7", text: "Maquinaria pesada · repuestos · tech" },
                        ].map(({ dot, text }) => (
                            <div
                                key={text}
                                className="flex items-center gap-1.5 text-[9.5px] rounded px-2.5 py-1.5"
                                style={{ border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)" }}
                            >
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                                {text}
                            </div>
                        ))}
                    </div>
                    <a
                        href={`https://wa.me/13053030502?text=${encodeURIComponent("Hola, necesito importar carga desde USA.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-bold text-[11.5px] text-white rounded-xl px-5 py-2.5 flex-shrink-0 transition-all hover:-translate-y-0.5"
                        style={{ background: "#2563EB", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Solicitar cotización
                    </a>
                </div>
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
