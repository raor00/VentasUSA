"use client";

import React from "react";

interface CargoPlaneProps {
    className?: string;
    id?: string;
}

const CargoPlane: React.FC<CargoPlaneProps> = ({ className = "", id }) => {
    return (
        <div
            className={`cargo-plane-wrapper relative w-full ${className}`}
            id={id}
            style={{ aspectRatio: "520/200" }}
        >
            <svg
                viewBox="0 0 520 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                preserveAspectRatio="xMidYMid meet"
                aria-label="VentasUSA Cargo Aircraft"
            >
                <defs>
                    {/* ── Fuselage ── */}
                    <linearGradient id="cp-fuse-top" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#2c4a6e" />
                        <stop offset="30%"  stopColor="#1a3a5c" />
                        <stop offset="65%"  stopColor="#0d2137" />
                        <stop offset="100%" stopColor="#091929" />
                    </linearGradient>

                    <linearGradient id="cp-fuse-belly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#0d2137" />
                        <stop offset="100%" stopColor="#06111e" />
                    </linearGradient>

                    {/* Specular sheen on top of fuselage */}
                    <linearGradient id="cp-fuse-sheen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.07" />
                        <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    {/* ── Wings ── */}
                    <linearGradient id="cp-wing-top" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#1e3d5a" />
                        <stop offset="60%"  stopColor="#0f2540" />
                        <stop offset="100%" stopColor="#091929" />
                    </linearGradient>

                    <linearGradient id="cp-wing-under" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%"   stopColor="#0a1f33" />
                        <stop offset="100%" stopColor="#060f1e" />
                    </linearGradient>

                    {/* ── Engine nacelle ── */}
                    <linearGradient id="cp-engine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#1e3d5a" />
                        <stop offset="50%"  stopColor="#0d2137" />
                        <stop offset="100%" stopColor="#06111e" />
                    </linearGradient>

                    <linearGradient id="cp-engine-intake" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#1a3a5c" />
                        <stop offset="40%"  stopColor="#0a1f33" />
                        <stop offset="100%" stopColor="#020a14" />
                    </linearGradient>

                    {/* ── Cockpit glass ── */}
                    <linearGradient id="cp-glass" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%"   stopColor="#5ba0d4" stopOpacity="0.55" />
                        <stop offset="50%"  stopColor="#2a6a9e" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0d3560" stopOpacity="0.15" />
                    </linearGradient>

                    {/* ── Accent stripe ── */}
                    <linearGradient id="cp-stripe" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#00BFA6" stopOpacity="0" />
                        <stop offset="8%"   stopColor="#00BFA6" stopOpacity="0.85" />
                        <stop offset="92%"  stopColor="#00BFA6" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="cp-stripe2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#00BFA6" stopOpacity="0" />
                        <stop offset="8%"   stopColor="#00BFA6" stopOpacity="0.28" />
                        <stop offset="92%"  stopColor="#00BFA6" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
                    </linearGradient>

                    {/* ── Exhaust heat haze ── */}
                    <radialGradient id="cp-exhaust" cx="100%" cy="50%" r="80%">
                        <stop offset="0%"   stopColor="#00BFA6" stopOpacity="0.45" />
                        <stop offset="45%"  stopColor="#0078a0" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
                    </radialGradient>

                    {/* ── Drop shadow ── */}
                    <filter id="cp-shadow" x="-5%" y="-20%" width="115%" height="150%">
                        <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#020810" floodOpacity="0.55" />
                    </filter>

                    {/* ── Ambient glow for exhaust ── */}
                    <filter id="cp-exhaust-glow" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Fuselage clip */}
                    <clipPath id="cp-fuse-clip">
                        <path d="M54 93 C62 62, 130 56, 180 55 L390 52 C440 52, 480 66, 493 90 C480 114, 440 128, 390 128 L180 125 C130 124, 62 118, 54 93Z" />
                    </clipPath>

                    {/* Wing clip for leading edge taper */}
                    <clipPath id="cp-wing-clip">
                        <rect x="0" y="0" width="520" height="200" />
                    </clipPath>
                </defs>

                {/* ================================================================
                    GROUND SHADOW (subtle ellipse beneath the plane)
                ================================================================ */}
                <ellipse cx="280" cy="185" rx="220" ry="8" fill="#000" opacity="0.18" />

                {/* ================================================================
                    MAIN AIRCRAFT GROUP
                ================================================================ */}
                <g filter="url(#cp-shadow)">

                    {/* ──────────────────────────────────────────
                        LOWER (aft) HORIZONTAL STABILIZER
                    ────────────────────────────────────────── */}
                    <path
                        d="M76 98 L28 126 C20 131, 19 138, 24 140 L52 137 L88 110Z"
                        fill="url(#cp-wing-under)"
                        opacity="0.9"
                    />
                    {/* Stabilizer top surface line */}
                    <path
                        d="M76 98 L28 126 L31 124 L88 105Z"
                        fill="url(#cp-wing-top)"
                        opacity="0.5"
                    />

                    {/* ──────────────────────────────────────────
                        UPPER (aft) HORIZONTAL STABILIZER
                    ────────────────────────────────────────── */}
                    <path
                        d="M76 88 L28 60 C20 55, 19 48, 24 46 L52 49 L88 76Z"
                        fill="url(#cp-wing-top)"
                    />
                    {/* Upper stabilizer bottom shadow */}
                    <path
                        d="M76 88 L30 62 L28 60 L26 62 L86 90Z"
                        fill="#000"
                        opacity="0.12"
                    />

                    {/* ──────────────────────────────────────────
                        VERTICAL TAIL FIN
                    ────────────────────────────────────────── */}
                    {/* Main fin body */}
                    <path
                        d="M80 74 L60 16 C57 8, 52 6, 48 8 L44 11 C42 14, 44 22, 50 30 L78 76 Z"
                        fill="url(#cp-fuse-top)"
                    />
                    {/* Fin trailing edge sweep */}
                    <path
                        d="M78 76 L80 74 L60 16 L62 18Z"
                        fill="url(#cp-fuse-sheen)"
                        opacity="0.6"
                    />
                    {/* Fin accent stripe (vertical) */}
                    <path
                        d="M62 74 L50 28 L52 27 L65 73Z"
                        fill="#00BFA6"
                        opacity="0.55"
                    />
                    {/* Fin root fillet */}
                    <path
                        d="M78 76 C82 78, 84 82, 83 88 L80 90Z"
                        fill="#0d2137"
                        opacity="0.5"
                    />

                    {/* ──────────────────────────────────────────
                        LOWER WING — port (rear perspective)
                    ────────────────────────────────────────── */}
                    {/* Main lower wing */}
                    <path
                        d="M188 106 L82 152 C68 158, 64 164, 70 168 L112 164 L210 114Z"
                        fill="url(#cp-wing-under)"
                        opacity="0.92"
                    />
                    {/* Lower wing top face */}
                    <path
                        d="M188 106 L82 152 L88 150 L210 108Z"
                        fill="url(#cp-wing-top)"
                        opacity="0.35"
                    />
                    {/* Lower wing trailing edge panel line */}
                    <line x1="190" y1="110" x2="105" y2="158" stroke="#1a3a5c" strokeWidth="0.6" opacity="0.5" />

                    {/* Engine pylon — lower wing */}
                    <path
                        d="M152 110 L136 138 L148 134 L162 112Z"
                        fill="#0d2137"
                        opacity="0.9"
                    />

                    {/* ──────────────────────────────────────────
                        UPPER WING — starboard
                    ────────────────────────────────────────── */}
                    {/* Main upper wing */}
                    <path
                        d="M188 80 L82 34 C68 28, 62 22, 68 18 L112 22 L210 76Z"
                        fill="url(#cp-wing-top)"
                    />
                    {/* Wing top specular */}
                    <path
                        d="M188 80 L90 36 L96 34 L210 72Z"
                        fill="url(#cp-fuse-sheen)"
                        opacity="0.9"
                    />
                    {/* Wing trailing edge panel line */}
                    <line x1="190" y1="76" x2="108" y2="30" stroke="#2a5a8c" strokeWidth="0.7" opacity="0.5" />
                    {/* Wing leading edge accent */}
                    <path
                        d="M188 80 L82 34 L84 32 L190 78Z"
                        fill="#00BFA6"
                        opacity="0.08"
                    />

                    {/* Engine pylon — upper wing */}
                    <path
                        d="M152 76 L136 48 L148 52 L162 74Z"
                        fill="#0d2137"
                        opacity="0.9"
                    />

                    {/* ──────────────────────────────────────────
                        ENGINE NACELLE — lower (port)
                    ────────────────────────────────────────── */}
                    <ellipse cx="140" cy="144" rx="22" ry="8" fill="url(#cp-engine)" />
                    <ellipse cx="140" cy="144" rx="16" ry="5.5" fill="#0d2137" />
                    {/* Intake face */}
                    <ellipse cx="120" cy="144" rx="8" ry="8" fill="url(#cp-engine-intake)" />
                    <ellipse cx="120" cy="144" rx="4.5" ry="4.5" fill="#04090f" />
                    {/* Exhaust heat shimmer */}
                    <ellipse
                        cx="98" cy="144" rx="14" ry="8"
                        fill="url(#cp-exhaust)"
                        filter="url(#cp-exhaust-glow)"
                        opacity="0.75"
                    />
                    {/* Cowling highlight */}
                    <path d="M121 136 Q140 133, 162 136 L162 140 Q140 137, 121 140Z" fill="#ffffff" opacity="0.04" />

                    {/* ──────────────────────────────────────────
                        ENGINE NACELLE — upper (starboard)
                    ────────────────────────────────────────── */}
                    <ellipse cx="140" cy="42" rx="22" ry="8" fill="url(#cp-engine)" />
                    <ellipse cx="140" cy="42" rx="16" ry="5.5" fill="#0d2137" />
                    {/* Intake face */}
                    <ellipse cx="120" cy="42" rx="8" ry="8" fill="url(#cp-engine-intake)" />
                    <ellipse cx="120" cy="42" rx="4.5" ry="4.5" fill="#04090f" />
                    {/* Exhaust heat shimmer */}
                    <ellipse
                        cx="98" cy="42" rx="14" ry="8"
                        fill="url(#cp-exhaust)"
                        filter="url(#cp-exhaust-glow)"
                        opacity="0.75"
                    />
                    {/* Cowling highlight */}
                    <path d="M121 34 Q140 31, 162 34 L162 38 Q140 35, 121 38Z" fill="#ffffff" opacity="0.04" />

                    {/* ──────────────────────────────────────────
                        FUSELAGE — main body
                    ────────────────────────────────────────── */}
                    {/* Belly */}
                    <path
                        d="M54 93 C62 62, 130 56, 180 55 L390 52 C440 52, 480 66, 493 90 C480 114, 440 128, 390 128 L180 125 C130 124, 62 118, 54 93Z"
                        fill="url(#cp-fuse-belly)"
                    />
                    {/* Top surface */}
                    <path
                        d="M54 93 C62 62, 130 56, 180 55 L390 52 C440 52, 480 66, 493 90 L493 86 C480 62, 440 48, 390 48 L180 51 C130 52, 62 58, 54 93Z"
                        fill="url(#cp-fuse-top)"
                    />
                    {/* Specular sheen */}
                    <path
                        d="M60 88 C68 64, 130 58, 180 57 L390 54 C435 54, 472 66, 488 86 L490 84 C474 64, 436 52, 390 52 L180 53 C130 54, 68 62, 60 86Z"
                        fill="url(#cp-fuse-sheen)"
                    />

                    {/* ──────────────────────────────────────────
                        CARGO DOOR PANELS (technical panel lines)
                    ────────────────────────────────────────── */}
                    {/* Main cargo door */}
                    <rect x="185" y="58" width="72" height="58" rx="2" fill="none" stroke="#1e4a7a" strokeWidth="0.8" opacity="0.5" />
                    {/* Door latch marks */}
                    <line x1="185" y1="87" x2="257" y2="87" stroke="#1e4a7a" strokeWidth="0.5" opacity="0.35" />
                    <circle cx="258" cy="68" r="1.5" fill="#1e4a7a" opacity="0.5" />
                    <circle cx="258" cy="106" r="1.5" fill="#1e4a7a" opacity="0.5" />

                    {/* Secondary cargo door */}
                    <rect x="267" y="58" width="62" height="58" rx="2" fill="none" stroke="#1e4a7a" strokeWidth="0.8" opacity="0.5" />
                    <line x1="267" y1="87" x2="329" y2="87" stroke="#1e4a7a" strokeWidth="0.5" opacity="0.35" />

                    {/* Aft panel */}
                    <rect x="338" y="60" width="44" height="56" rx="2" fill="none" stroke="#1e4a7a" strokeWidth="0.6" opacity="0.4" />

                    {/* Structural frame lines */}
                    <line x1="180" y1="55" x2="180" y2="125" stroke="#1a3560" strokeWidth="0.5" opacity="0.35" />
                    <line x1="388" y1="52" x2="388" y2="128" stroke="#1a3560" strokeWidth="0.5" opacity="0.35" />

                    {/* ──────────────────────────────────────────
                        ACCENT CHEATLINE (branding stripe)
                    ────────────────────────────────────────── */}
                    <rect x="80" y="83" width="390" height="3.5" rx="1.75" fill="url(#cp-stripe)" />
                    <rect x="80" y="89" width="390" height="1.5" rx="0.75"  fill="url(#cp-stripe2)" />

                    {/* ──────────────────────────────────────────
                        FUSELAGE TEXT
                    ────────────────────────────────────────── */}
                    <text
                        x="200" y="76"
                        fill="#00BFA6"
                        fontSize="9"
                        fontFamily="Space Grotesk, sans-serif"
                        fontWeight="700"
                        letterSpacing="3"
                        opacity="0.9"
                    >
                        VENTAS USA
                    </text>
                    <text
                        x="200" y="106"
                        fill="#4a9edd"
                        fontSize="5"
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="2"
                        opacity="0.5"
                    >
                        CARGO LOGISTICS
                    </text>

                    {/* ──────────────────────────────────────────
                        NOSE / COCKPIT SECTION
                    ────────────────────────────────────────── */}
                    {/* Radome */}
                    <path
                        d="M388 52 C440 52, 480 66, 493 90 C480 114, 440 128, 388 128 L388 52Z"
                        fill="#0d2137"
                    />
                    {/* Nose specular */}
                    <path
                        d="M388 52 C435 53, 472 65, 488 86 L490 84 C474 64, 437 52, 388 52Z"
                        fill="#1a3a5c"
                        opacity="0.4"
                    />

                    {/* Cockpit upper window strip */}
                    <path
                        d="M408 60 C440 58, 470 66, 482 78 L482 82 C470 70, 440 63, 408 65Z"
                        fill="url(#cp-glass)"
                    />
                    {/* Window frame dividers */}
                    <line x1="428" y1="61" x2="426" y2="65" stroke="#1a3a5c" strokeWidth="0.8" opacity="0.6" />
                    <line x1="448" y1="60" x2="446" y2="64" stroke="#1a3a5c" strokeWidth="0.8" opacity="0.6" />
                    <line x1="465" y1="62" x2="464" y2="66" stroke="#1a3a5c" strokeWidth="0.8" opacity="0.6" />

                    {/* Cockpit lower window strip (smaller) */}
                    <path
                        d="M408 114 C440 116, 470 108, 482 96 L482 100 C470 113, 440 120, 408 118Z"
                        fill="url(#cp-glass)"
                        opacity="0.6"
                    />

                    {/* Nose tip */}
                    <path
                        d="M490 86 C494 87, 496 89, 494 93 C492 96, 490 97, 490 97 L490 86Z"
                        fill="#162d44"
                    />

                    {/* ──────────────────────────────────────────
                        NOSE GEAR DOOR (subtle detail)
                    ────────────────────────────────────────── */}
                    <rect x="310" y="122" width="14" height="5" rx="2" fill="#091929" stroke="#1a3a5c" strokeWidth="0.5" opacity="0.6" />
                    <rect x="260" y="122" width="14" height="5" rx="2" fill="#091929" stroke="#1a3a5c" strokeWidth="0.5" opacity="0.6" />

                    {/* ──────────────────────────────────────────
                        NAVIGATION LIGHTS — static, no blink
                    ────────────────────────────────────────── */}
                    {/* Nose beacon */}
                    <circle cx="494" cy="90" r="2" fill="#cc2222" opacity="0.7" />
                    <circle cx="494" cy="90" r="3.5" fill="#cc2222" opacity="0.12" />
                    {/* Tail white strobe */}
                    <circle cx="46" cy="13" r="1.5" fill="#e8f4ff" opacity="0.65" />
                    {/* Wing tip light (green — starboard) */}
                    <circle cx="68" cy="19" r="1.2" fill="#22cc55" opacity="0.55" />

                </g>

                {/* ================================================================
                    ENGINE EXHAUST PLUMES (outside main shadow group for opacity)
                ================================================================ */}
                {/* Lower engine exhaust */}
                <ellipse cx="86" cy="144" rx="20" ry="6" fill="url(#cp-exhaust)" opacity="0.55" filter="url(#cp-exhaust-glow)" />
                {/* Upper engine exhaust */}
                <ellipse cx="86" cy="42"  rx="20" ry="6" fill="url(#cp-exhaust)" opacity="0.55" filter="url(#cp-exhaust-glow)" />

            </svg>
        </div>
    );
};

export default CargoPlane;
