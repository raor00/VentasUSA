"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * AnimatedHeroScenario — Cinematic cargo logistics animation
 *
 * ViewBox 0 0 1000 400 | Ground y=350
 * Plane: nose LEFT (x≈185), tail RIGHT (x≈790)
 * Ramp pivots at plane-local (728, 280), opens rightward
 * Forklifts come from RIGHT (x=1100 → x=885)
 */
export default function AnimatedHeroScenario() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ── INITIAL STATES ──────────────────────────────────────────
            gsap.set(".plane-asm",   { x: 1200 });

            // Ramp closed (folded up at -45°), pivot at "0 0" = local top-left
            gsap.set(".cargo-ramp",  { rotation: -45, transformOrigin: "0 0" });

            // Hold interior light off
            gsap.set(".hold-light",  { opacity: 0 });

            // Cargo items — NO SVG transform attribute used.
            // GSAP owns position entirely (absolute coords within plane-asm).
            // c1 = crate (repuestos), c2 = machinery
            gsap.set(".c1", { x: 686, y: 224, opacity: 1 });
            gsap.set(".c2", { x: 645, y: 218, opacity: 1 });

            // Forklifts — GSAP owns x (y set by SVG group translate)
            gsap.set(".fk1", { x: 1100 });
            gsap.set(".fk2", { x: 1100 });
            gsap.set(".fk1-cargo", { opacity: 0 });
            gsap.set(".fk2-cargo", { opacity: 0 });

            // FX
            gsap.set(".eng-glow",    { opacity: 0 });
            gsap.set(".land-beam",   { opacity: 0 });
            gsap.set([".dust-l", ".dust-r"], {
                opacity: 0, scaleX: 0.1, transformOrigin: "center bottom",
            });

            // ── MASTER TIMELINE ─────────────────────────────────────────
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

            // ─ PHASE 1: PLANE APPROACHES ────────────────────────────────
            tl
                .to(".eng-glow",  { opacity: 0.85, duration: 0.5 }, 0)
                .to(".land-beam", { opacity: 0.4,  duration: 0.3 }, 0)
                .to(".plane-asm", { x: 0, duration: 5.0, ease: "power4.out" }, 0.1)
                .to(".land-beam", { opacity: 0, duration: 1.2 }, "-=1.8")
                // touchdown dust
                .to([".dust-l", ".dust-r"], {
                    opacity: 0.55, scaleX: 1, duration: 0.18,
                    ease: "back.out(3)", stagger: 0.05,
                }, "-=0.9")
                .to([".dust-l", ".dust-r"], {
                    opacity: 0, scaleX: 2.6, duration: 1.5,
                }, "-=0.4")
                .to(".eng-glow", { opacity: 0.12, duration: 2.8 }, "-=2.1");

            // ─ PHASE 2: CARGO DOOR OPENS ────────────────────────────────
            tl
                .to(".hold-light", { opacity: 1, duration: 0.9 }, "+=0.6")
                // ramp lowers with a bounce
                .to(".cargo-ramp", { rotation: 28, duration: 2.2, ease: "bounce.out" }, "-=0.2");

            // ─ PHASE 3: FORKLIFT 1 — repuestos crate ────────────────────
            tl
                // FK1 drives in from right
                .to(".fk1", { x: 885, duration: 2.4, ease: "power2.inOut" }, "+=0.4")
                // c1: slides along deck to ramp edge
                .to(".c1",  { x: 728, duration: 0.5, ease: "none" })
                // c1: drops to ramp surface
                .to(".c1",  { y: 280, duration: 0.18, ease: "power2.in" })
                // c1: slides down ramp to fork level
                .to(".c1",  { x: 843, y: 341, duration: 1.0, ease: "power2.in" })
                // visual transfer
                .set(".c1",        { opacity: 0 })
                .set(".fk1-cargo", { opacity: 1 })
                // FK1 exits right with cargo
                .to(".fk1", { x: 1200, duration: 2.6, ease: "power2.inOut" });

            // ─ PHASE 4: FORKLIFT 2 — heavy machinery ────────────────────
            tl
                // FK2 starts approaching while FK1 still departing
                .to(".fk2", { x: 885, duration: 2.4, ease: "power2.inOut" }, "-=2.0")
                .to(".c2",  { x: 728, duration: 0.8, ease: "none" })
                .to(".c2",  { y: 280, duration: 0.18, ease: "power2.in" })
                .to(".c2",  { x: 843, y: 341, duration: 1.2, ease: "power2.in" })
                .set(".c2",        { opacity: 0 })
                .set(".fk2-cargo", { opacity: 1 })
                .to(".fk2", { x: 1200, duration: 2.8, ease: "power2.inOut" });

            // ─ PHASE 5: CLOSE UP & DEPART ───────────────────────────────
            tl
                .to(".cargo-ramp", { rotation: -45, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
                .to(".hold-light", { opacity: 0, duration: 0.7 }, "<")
                .to(".eng-glow",   { opacity: 1.0, duration: 1.8 }, "+=0.4")
                .to(".plane-asm",  { x: -1320, duration: 3.8, ease: "power3.in" }, "+=0.5")
                .to(".eng-glow",   { opacity: 0,  duration: 0.8 }, "-=1.3");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden flex items-center justify-center pointer-events-none"
            aria-hidden="true"
            style={{ minHeight: "38vh" }}
        >
            {/* Ambient scene glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% 62%, rgba(0,191,166,0.08) 0%, transparent 100%)",
                }}
            />

            <svg
                viewBox="0 0 1000 400"
                className="w-full h-auto max-h-[68vh]"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* Fuselage gradient — dark navy top to deep blue-black */}
                    <linearGradient id="ahsFg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#243a56" />
                        <stop offset="45%"  stopColor="#162c44" />
                        <stop offset="100%" stopColor="#09162a" />
                    </linearGradient>

                    {/* Fuselage specular highlight */}
                    <linearGradient id="ahsSheen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.11" />
                        <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0"    />
                    </linearGradient>

                    {/* Tail fin */}
                    <linearGradient id="ahsTail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#0e1c2e" />
                        <stop offset="100%" stopColor="#04090f" />
                    </linearGradient>

                    {/* Wing */}
                    <linearGradient id="ahsWing" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#1a2f48" />
                        <stop offset="100%" stopColor="#060e1c" />
                    </linearGradient>

                    {/* Engine nacelle */}
                    <linearGradient id="ahsEng" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#1c3252" />
                        <stop offset="100%" stopColor="#060d1c" />
                    </linearGradient>

                    {/* Cargo ramp */}
                    <linearGradient id="ahsRamp" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#243a56" />
                        <stop offset="100%" stopColor="#09162a" />
                    </linearGradient>

                    {/* Cargo hold warm amber light */}
                    <radialGradient id="ahsHold" cx="50%" cy="60%" r="55%">
                        <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0"    />
                    </radialGradient>

                    {/* Engine exhaust glow blur */}
                    <filter id="ahsGlow" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="8" />
                    </filter>
                    {/* Landing beam blur */}
                    <filter id="ahsBeam" x="-15%" y="-15%" width="130%" height="130%">
                        <feGaussianBlur stdDeviation="5" />
                    </filter>
                    {/* Dust blur */}
                    <filter id="ahsDust" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>

                {/* ── TARMAC ─────────────────────────────────────────────── */}
                <rect x="0" y="350" width="1000" height="50" fill="#040810" />
                <line x1="0" y1="350" x2="1000" y2="350" stroke="#192e4a" strokeWidth="1.5" />

                {/* Runway center-line dashes */}
                {[...Array(9)].map((_, i) => (
                    <rect key={i} x={i * 116 + 8} y="358" width="68" height="4" rx="2" fill="#152640" opacity="0.8" />
                ))}

                {/* Taxiway edge lights */}
                {[...Array(11)].map((_, i) => (
                    <g key={i}>
                        <circle cx={42 + i * 90} cy="351" r="3.5" fill="#00BFA6" opacity="0.55" />
                        <circle cx={42 + i * 90} cy="351" r="7"   fill="#00BFA6" opacity="0.10" />
                    </g>
                ))}

                {/* ── PLANE ASSEMBLY ─────────────────────────────────────── */}
                <g className="plane-asm">

                    {/* Engine exhaust glow halo (behind hull) */}
                    <ellipse
                        className="eng-glow"
                        cx="555" cy="222" rx="68" ry="20"
                        fill="#00BFA6"
                        filter="url(#ahsGlow)"
                        opacity="0"
                    />

                    {/* Landing beam (from nose, fans forward-left) */}
                    <path
                        className="land-beam"
                        d="M 192 222 L -80 350 L 72 350 Z"
                        fill="white"
                        filter="url(#ahsBeam)"
                        opacity="0"
                    />

                    {/* ── LANDING GEAR ── */}

                    {/* Front strut */}
                    <rect x="250" y="286" width="7" height="42" rx="2" fill="#2a4060" />
                    <line x1="240" y1="295" x2="266" y2="295" stroke="#2a4060" strokeWidth="4" strokeLinecap="round" />
                    {/* Front wheels */}
                    <circle cx="246" cy="339" r="11" fill="#040c1a" stroke="#22385a" strokeWidth="2" />
                    <circle cx="260" cy="339" r="11" fill="#040c1a" stroke="#22385a" strokeWidth="2" />
                    <circle cx="246" cy="339" r="5"  fill="#22385a" />
                    <circle cx="260" cy="339" r="5"  fill="#22385a" />

                    {/* Rear strut (wider for twin-bogie) */}
                    <rect x="512" y="278" width="20" height="46" rx="2" fill="#2a4060" />
                    <line x1="500" y1="290" x2="544" y2="290" stroke="#2a4060" strokeWidth="5" strokeLinecap="round" />
                    {/* Rear wheels (tandem bogie) */}
                    <circle cx="505" cy="337" r="13" fill="#040c1a" stroke="#22385a" strokeWidth="2" />
                    <circle cx="531" cy="337" r="13" fill="#040c1a" stroke="#22385a" strokeWidth="2" />
                    <circle cx="505" cy="337" r="6"  fill="#22385a" />
                    <circle cx="531" cy="337" r="6"  fill="#22385a" />

                    {/* Touchdown dust puffs */}
                    <ellipse
                        className="dust-l"
                        cx="252" cy="349" rx="26" ry="9"
                        fill="#22385a" filter="url(#ahsDust)" opacity="0"
                    />
                    <ellipse
                        className="dust-r"
                        cx="518" cy="349" rx="34" ry="11"
                        fill="#22385a" filter="url(#ahsDust)" opacity="0"
                    />

                    {/* ── FUSELAGE HULL ── */}
                    {/*
                        Nose → upper-left  → straight top → tail-right
                        Tail-rear → lower-right → straight bottom → nose-belly
                        A proper cargo-plane silhouette: nose left, tail right
                    */}
                    <path d="
                        M 185 222
                        C 178 202, 200 158, 240 155
                        L 732 155
                        C 760 155, 782 166, 790 192
                        L 790 252
                        C 780 278, 756 286, 730 286
                        L 265 286
                        C 222 286, 182 268, 182 252
                        C 180 240, 180 230, 185 222
                        Z
                    " fill="url(#ahsFg)" />

                    {/* Specular sheen (top surface only) */}
                    <path d="
                        M 188 216
                        C 180 198, 202 160, 240 158
                        L 732 158
                        C 758 158, 779 168, 787 192
                        L 786 188
                        C 778 162, 758 157, 732 157
                        L 240 157
                        C 204 157, 182 198, 188 216
                        Z
                    " fill="url(#ahsSheen)" opacity="0.8" />

                    {/* ── VERTICAL TAIL FIN ── */}
                    {/* Rises from fuselage top at x≈735-790 */}
                    <path d="
                        M 735 155
                        L 768 26
                        C 776 15, 796 12, 800 22
                        L 790 155
                        Z
                    " fill="url(#ahsTail)" />

                    {/* Fin accent stripe (teal) */}
                    <path d="M 752 149 L 775 31 L 781 35 L 760 150 Z"
                        fill="#00BFA6" opacity="0.55" />

                    {/* VU logo BOX — on the fin, NOT the wing */}
                    <rect x="753" y="52" width="44" height="36" rx="5"
                        fill="#00BFA6" opacity="0.92" />
                    <text x="775" y="76"
                        fill="#040c18" fontSize="15" fontWeight="900"
                        textAnchor="middle" fontFamily="Inter, sans-serif"
                    >VU</text>

                    {/* ── HORIZONTAL STABILIZER ── */}
                    <path d="M 787 220 L 860 198 L 850 212 L 780 230 Z"
                        fill="#162c44" />

                    {/* ── COCKPIT WINDOWS ── */}
                    <path d="
                        M 214 172
                        C 232 154, 257 148, 280 148
                        L 274 163
                        C 253 162, 234 168, 223 180
                        Z
                    " fill="#4a9edd" opacity="0.66" />
                    {/* Window divider reflection */}
                    <path d="M 227 162 L 237 156 L 234 168 L 224 174 Z"
                        fill="#020810" opacity="0.45" />

                    {/* ── BRANDING CHEATLINE ── */}
                    <path d="M 184 244 C 242 266, 344 266, 668 266"
                        stroke="#00BFA6" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.9" />
                    <path d="M 186 254 C 242 274, 344 274, 668 274"
                        stroke="#1a4470" strokeWidth="1.5"  fill="none" strokeLinecap="round" opacity="0.55" />

                    {/* ── WING (swept, below fuselage) ── */}
                    <path d="
                        M 418 232
                        C 458 232, 528 258, 635 334
                        L 620 342
                        L 590 342
                        C 523 290, 472 256, 408 244
                        Z
                    " fill="url(#ahsWing)" />
                    {/* Winglet */}
                    <path d="M 635 334 L 656 292 L 644 286 L 618 334 Z"
                        fill="#00BFA6" opacity="0.72" />
                    {/* Flap panel line */}
                    <path d="M 418 232 C 458 240, 525 266, 630 338 L 622 342 C 526 270, 460 244, 416 242 Z"
                        fill="#060e1c" opacity="0.35" />

                    {/* ── ENGINE NACELLE (under wing) ── */}
                    <g transform="translate(474, 282)">
                        {/* Pylon */}
                        <path d="M 32 0 L 52 -30 L 72 -30 L 62 0 Z" fill="#162c44" />
                        {/* Nacelle body */}
                        <rect x="0" y="0" width="108" height="44" rx="22"
                            fill="url(#ahsEng)" stroke="#2a4060" strokeWidth="1.5" />
                        {/* Intake cowl */}
                        <path d="M 0 4 C -8 16, -8 28, 0 40 L 13 44 L 13 0 Z"
                            fill="#040c18" />
                        {/* Fan face */}
                        <ellipse cx="8" cy="22" rx="5.5" ry="14" fill="#010508" />
                        {/* Accent intake ring */}
                        <path d="M 13 0 C 21 0, 21 44, 13 44"
                            stroke="#00BFA6" strokeWidth="2" fill="none" />
                        {/* Exhaust cone */}
                        <path d="M 108 11 L 124 18 L 124 26 L 108 33 Z" fill="#2a4060" />
                        {/* Anti-collision beacon */}
                        <circle cx="8" cy="22" r="2.5" fill="#ef4444" opacity="0.65" />
                    </g>

                    {/* ── CARGO HOLD CUTAWAY (rear section, x=640–790) ── */}

                    {/* Interior dark cavity — no exterior border stroke */}
                    <path d="
                        M 642 160
                        L 730 160
                        C 754 160, 776 170, 786 192
                        L 786 248
                        C 776 272, 752 280, 728 280
                        L 642 280
                        Z
                    " fill="#030710" />

                    {/* Warm glow (animated) */}
                    <path className="hold-light" d="
                        M 642 160
                        L 730 160
                        C 754 160, 776 170, 786 192
                        L 786 248
                        C 776 272, 752 280, 728 280
                        L 642 280
                        Z
                    " fill="url(#ahsHold)" opacity="0" />

                    {/* Interior structural ribs */}
                    {[0, 1, 2, 3, 4].map(i => (
                        <line
                            key={i}
                            x1={660 + i * 18} y1="162"
                            x2={660 + i * 18} y2="278"
                            stroke="#0c1e30" strokeWidth="2.5" opacity="0.9"
                        />
                    ))}

                    {/* Deck floor line */}
                    <line x1="642" y1="216" x2="724" y2="216"
                        stroke="#00BFA6" strokeWidth="1.5"
                        strokeDasharray="7 6" opacity="0.28" />

                    {/* Floor grating */}
                    <rect x="642" y="268" width="86" height="12"
                        fill="#0c1e30" opacity="0.55" />

                    {/* Subtle hold opening outline (very low opacity) */}
                    <path d="
                        M 642 160
                        L 730 160
                        C 754 160, 776 170, 786 192
                        L 786 248
                        C 776 272, 752 280, 728 280
                        L 642 280
                        Z
                    " fill="none" stroke="#00BFA6" strokeWidth="1" opacity="0.20" />

                    {/* ── CARGO ITEM 1 — Repuestos crate (yellow) ── */}
                    {/*
                        NO SVG transform — GSAP sets initial pos: (686, 224)
                        Animation: → (728,224) → (728,280) → (843,341)
                    */}
                    <g className="c1">
                        <rect x="0" y="0" width="46" height="50" rx="3"
                            fill="#b45309" stroke="#92400e" strokeWidth="1.5" />
                        <line x1="12" y1="0"  x2="12" y2="50" stroke="#92400e" strokeWidth="1" opacity="0.65" />
                        <line x1="34" y1="0"  x2="34" y2="50" stroke="#92400e" strokeWidth="1" opacity="0.65" />
                        <line x1="0"  y1="20" x2="46" y2="20" stroke="#92400e" strokeWidth="0.8" opacity="0.5" />
                        <rect x="5" y="22" width="36" height="18" rx="2"
                            fill="#fef08a" opacity="0.95" />
                        <text x="23" y="30" fill="#78350f" fontSize="5.5" fontWeight="bold" textAnchor="middle">REPUESTOS</text>
                        <text x="23" y="37" fill="#78350f" fontSize="4"              textAnchor="middle">INDUSTRIALES</text>
                        <rect x="0"  y="46" width="46" height="5" rx="2" fill="#92400e" />
                        <rect x="0"  y="0"  width="5"  height="8" rx="1" fill="#78350f" />
                        <rect x="41" y="0"  width="5"  height="8" rx="1" fill="#78350f" />
                    </g>

                    {/* ── CARGO ITEM 2 — Heavy machinery (teal) ── */}
                    {/*
                        NO SVG transform — GSAP sets initial pos: (645, 218)
                        Animation: → (728,218) → (728,280) → (843,341)
                    */}
                    <g className="c2">
                        <rect x="0" y="0" width="66" height="58" rx="5"
                            fill="#0e7490" stroke="#0891b2" strokeWidth="2" />
                        {/* Gear face */}
                        <circle cx="33" cy="31" r="19" fill="#091c2c" />
                        <circle cx="33" cy="31" r="12" fill="#152a3e" />
                        <circle cx="33" cy="31" r="5"  fill="#00BFA6" />
                        {[0, 90, 180, 270].map((deg, i) => (
                            <circle
                                key={i}
                                cx={33 + 13 * Math.cos(deg * Math.PI / 180)}
                                cy={31 + 13 * Math.sin(deg * Math.PI / 180)}
                                r="2.5" fill="#040c1a"
                            />
                        ))}
                        <rect x="5"  y="5"  width="10" height="10" rx="2" fill="#0891b2" opacity="0.7" />
                        <rect x="51" y="5"  width="10" height="10" rx="2" fill="#0891b2" opacity="0.7" />
                        <rect x="0"  y="50" width="66" height="10" rx="3" fill="#0a617a" />
                        <text x="33" y="58" fill="#a5f3fc" fontSize="5.5" textAnchor="middle" fontWeight="bold">MACH.IND</text>
                    </g>

                    {/* ── CARGO RAMP ── */}
                    {/*
                        Pivot at SVG (728, 280).
                        GSAP rotation -45° (closed) → +28° (open).
                        transformOrigin "0 0" = local top-left = scene (728,280).
                    */}
                    <g className="cargo-ramp" transform="translate(728, 280)">
                        {/* Ramp surface */}
                        <rect x="0" y="0" width="130" height="16" rx="3"
                            fill="url(#ahsRamp)" />
                        {/* Non-slip ridges */}
                        {[...Array(9)].map((_, i) => (
                            <line
                                key={i}
                                x1={12 + i * 13} y1="0"
                                x2={9  + i * 13} y2="16"
                                stroke="#040c18" strokeWidth="2.5" opacity="0.5"
                            />
                        ))}
                        {/* Side rails */}
                        <line x1="0" y1="0"  x2="130" y2="0"  stroke="#2a4060" strokeWidth="1.5" opacity="0.8" />
                        <line x1="0" y1="16" x2="130" y2="16" stroke="#2a4060" strokeWidth="1.5" opacity="0.8" />
                        {/* Hydraulic arm */}
                        <path d="M 16 -2 L 16 -16 L 58 -16 L 58 -2"
                            fill="none" stroke="#2a4060" strokeWidth="3" strokeLinecap="round" />
                        {/* Hinge circle */}
                        <circle cx="0" cy="8" r="5" fill="#162c44" stroke="#2a4060" strokeWidth="2" />
                    </g>

                    {/* Brand text watermark */}
                    <text x="400" y="208"
                        fill="#94a3b8" opacity="0.10"
                        fontSize="23" fontWeight="900" letterSpacing="8"
                        fontFamily="Inter, sans-serif"
                    >VENTAS USA</text>

                </g>{/* end .plane-asm */}

                {/* ── FORKLIFT 1 — Yellow standard (carries repuestos crate) ── */}
                {/*
                    SVG y=285 positions wheels on ground.
                    GSAP x: 1100 (off-screen right) → 885 (at ramp) → 1200 (exit right)
                    Fork tips at x = 885 - 42 = 843 = ramp tip x ✓
                    fk1-cargo appears at scene (843, 341): rect x=-42 y=56 within group ✓
                */}
                <g className="fk1" transform="translate(0, 285)">
                    {/* Counterweight */}
                    <rect x="47" y="22" width="12" height="30" rx="2" fill="#92400e" opacity="0.85" />
                    {/* Body */}
                    <rect x="0"  y="20" width="55" height="32" rx="4" fill="#eab308" />
                    <path d="M 32 20 L 55 20 L 55 36 L 32 52 Z" fill="#ca8a04" />
                    <rect x="0"  y="47" width="55" height="7"  rx="2" fill="#ca8a04" />
                    {/* ROPS cage */}
                    <path d="M 10 20 L 10 1 L 30 1 L 34 20"
                        fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="11" y="3" width="18" height="15" rx="2" fill="#0a1829" opacity="0.7" />
                    {/* Operator silhouette */}
                    <circle cx="20" cy="0"  r="5.5" fill="#d1d5db" opacity="0.72" />
                    {/* Wheels (center y=56 → bottom y=65, group y=285 → scene y=350) */}
                    <circle cx="11" cy="56" r="9"  fill="#0a1829" stroke="#334155" strokeWidth="2" />
                    <circle cx="42" cy="56" r="9"  fill="#0a1829" stroke="#334155" strokeWidth="2" />
                    <circle cx="11" cy="56" r="4"  fill="#334155" />
                    <circle cx="42" cy="56" r="4"  fill="#334155" />
                    {/* Mast */}
                    <rect x="-8" y="4" width="5" height="53" rx="1" fill="#334155" />
                    {/* Fork arms (y=50-54 → scene y=335-339, near cargo stop y=341) */}
                    <rect x="-42" y="50" width="38" height="3.5" rx="1" fill="#475569" />
                    <rect x="-42" y="43" width="38" height="3.5" rx="1" fill="#475569" />

                    {/* ── FK1 loaded cargo ── */}
                    {/* Appears at scene (843, 341): rect x=-42, y=56 within group at (GSAP_x, 285) */}
                    <g className="fk1-cargo" opacity="0">
                        <rect x="-42" y="56" width="46" height="44" rx="3"
                            fill="#b45309" stroke="#92400e" strokeWidth="1.5" />
                        <rect x="-37" y="68" width="36" height="16" rx="2"
                            fill="#fef08a" opacity="0.95" />
                        <text x="-19" y="78" fill="#78350f" fontSize="5.5" fontWeight="bold" textAnchor="middle">REPUESTOS</text>
                        <rect x="-42" y="96" width="46" height="5" rx="2" fill="#92400e" />
                    </g>
                </g>

                {/* ── FORKLIFT 2 — Orange heavy-duty (carries machinery) ── */}
                {/*
                    SVG y=275 positions larger wheels on ground.
                    GSAP x: 1100 → 885 → 1200
                    fk2-cargo at scene (843, 341): rect x=-42 y=66 ✓
                */}
                <g className="fk2" transform="translate(0, 275)">
                    {/* Counterweight */}
                    <rect x="54" y="26" width="14" height="36" rx="2" fill="#9a3412" opacity="0.85" />
                    {/* Body (wider/taller) */}
                    <rect x="0"  y="24" width="64" height="36" rx="4" fill="#ea580c" />
                    <path d="M 38 24 L 64 24 L 64 42 L 38 60 Z" fill="#c2410c" />
                    <rect x="0"  y="54" width="64" height="8"  rx="2" fill="#c2410c" />
                    {/* ROPS cage */}
                    <path d="M 12 24 L 12 3 L 36 3 L 40 24"
                        fill="none" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="13" y="4"  width="22" height="17" rx="2" fill="#0a1829" opacity="0.7" />
                    {/* Operator */}
                    <circle cx="24" cy="1"  r="6.5" fill="#d1d5db" opacity="0.72" />
                    {/* Wheels (center y=64 → bottom y=75, group y=275 → scene y=350) */}
                    <circle cx="13" cy="64" r="11" fill="#0a1829" stroke="#334155" strokeWidth="2" />
                    <circle cx="50" cy="64" r="11" fill="#0a1829" stroke="#334155" strokeWidth="2" />
                    <circle cx="13" cy="64" r="5"  fill="#334155" />
                    <circle cx="50" cy="64" r="5"  fill="#334155" />
                    {/* Mast */}
                    <rect x="-10" y="3" width="6"  height="62" rx="1" fill="#334155" />
                    {/* Heavy fork arms */}
                    <rect x="-50" y="58" width="46" height="4.5" rx="1" fill="#475569" />
                    <rect x="-50" y="49" width="46" height="4.5" rx="1" fill="#475569" />

                    {/* ── FK2 loaded cargo ── */}
                    {/* Appears at scene (843, 341): rect x=-42 y=66 within group at (GSAP_x, 275) */}
                    <g className="fk2-cargo" opacity="0">
                        <rect x="-46" y="66" width="58" height="54" rx="5"
                            fill="#0e7490" stroke="#0891b2" strokeWidth="2" />
                        <circle cx="-17" cy="93" r="16" fill="#091c2c" />
                        <circle cx="-17" cy="93" r="10" fill="#152a3e" />
                        <circle cx="-17" cy="93" r="4.5" fill="#00BFA6" />
                        {[0, 90, 180, 270].map((deg, i) => (
                            <circle
                                key={i}
                                cx={-17 + 12 * Math.cos(deg * Math.PI / 180)}
                                cy={ 93 + 12 * Math.sin(deg * Math.PI / 180)}
                                r="2" fill="#040c1a"
                            />
                        ))}
                    </g>
                </g>

            </svg>
        </div>
    );
}
