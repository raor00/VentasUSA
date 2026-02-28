"use client";

import React from "react";

interface CargoPlaneProps {
    className?: string;
}

const CargoPlane: React.FC<CargoPlaneProps> = ({ className = "" }) => {
    return (
        <div className={`cargo-plane-wrapper ${className}`}>
            <svg
                viewBox="0 0 320 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Fuselage gradient */}
                <defs>
                    <linearGradient id="fuselageGrad" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0A192F" />
                        <stop offset="60%" stopColor="#112240" />
                        <stop offset="100%" stopColor="#1a3a5c" />
                    </linearGradient>
                    <linearGradient id="wingGrad" x1="100" y1="50" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#112240" />
                        <stop offset="100%" stopColor="#0A192F" />
                    </linearGradient>
                    <linearGradient id="accentLine" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00BFA6" stopOpacity="0" />
                        <stop offset="30%" stopColor="#00BFA6" />
                        <stop offset="70%" stopColor="#00BFA6" />
                        <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00BFA6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#00BFA6" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="shadowFilter">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#0A192F" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Engine trail / contrail */}
                <g className="plane-trail" opacity="0.5">
                    <line x1="10" y1="62" x2="-80" y2="68" stroke="url(#trailGrad)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="10" y1="72" x2="-90" y2="78" stroke="url(#trailGrad)" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Main body (fuselage) */}
                <g filter="url(#shadowFilter)">
                    {/* Fuselage body */}
                    <path
                        d="M30 65 Q35 45, 90 40 L260 38 Q300 38, 310 55 L310 75 Q300 90, 260 85 L90 82 Q35 80, 30 65Z"
                        fill="url(#fuselageGrad)"
                    />

                    {/* Cockpit windows */}
                    <path
                        d="M280 48 Q295 45, 305 55 L305 60 Q298 52, 280 52Z"
                        fill="#1a3a5c"
                        stroke="#2a5a8c"
                        strokeWidth="0.5"
                    />
                    <path
                        d="M284 50 Q296 47, 302 55 L302 58 Q296 52, 284 53Z"
                        fill="#3a7abd"
                        opacity="0.4"
                    />

                    {/* Cargo door markings */}
                    <rect x="110" y="42" width="40" height="38" rx="2" fill="none" stroke="#1a3a5c" strokeWidth="1" strokeDasharray="4 2" />
                    <rect x="160" y="42" width="40" height="38" rx="2" fill="none" stroke="#1a3a5c" strokeWidth="1" strokeDasharray="4 2" />

                    {/* Accent stripe */}
                    <rect x="60" y="58" width="220" height="3" rx="1.5" fill="url(#accentLine)" />

                    {/* VentasUSA logo text */}
                    <text x="140" y="54" fill="#00BFA6" fontSize="7" fontFamily="Space Grotesk, sans-serif" fontWeight="700" letterSpacing="1.5" filter="url(#glow)">
                        VENTAS USA
                    </text>
                </g>

                {/* Left wing (rear) */}
                <path
                    d="M120 65 L60 100 Q50 105, 55 110 L80 108 L150 75Z"
                    fill="url(#wingGrad)"
                    opacity="0.9"
                />
                {/* Right wing (near/top) */}
                <path
                    d="M120 55 L60 22 Q50 17, 48 22 L72 25 L150 50Z"
                    fill="url(#wingGrad)"
                />
                {/* Wing highlight */}
                <path
                    d="M120 55 L68 25 L72 25 L150 50Z"
                    fill="#1a3a5c"
                    opacity="0.5"
                />

                {/* Tail fin (vertical stabilizer) */}
                <path
                    d="M50 55 L30 20 Q28 15, 32 15 L55 18 Q60 20, 60 28 L60 50Z"
                    fill="url(#fuselageGrad)"
                />
                {/* Tail accent */}
                <rect x="38" y="22" width="2" height="30" rx="1" fill="#00BFA6" opacity="0.6" />

                {/* Horizontal stabilizer */}
                <path
                    d="M45 68 L20 82 Q15 85, 18 88 L35 86 L55 72Z"
                    fill="url(#wingGrad)"
                    opacity="0.85"
                />
                <path
                    d="M45 58 L25 42 Q22 40, 20 42 L35 45 L55 55Z"
                    fill="url(#wingGrad)"
                    opacity="0.85"
                />

                {/* Engine pods under wings */}
                <ellipse cx="95" cy="30" rx="10" ry="5" fill="#0A192F" />
                <ellipse cx="95" cy="30" rx="6" ry="3" fill="#1a3a5c" />
                <ellipse cx="95" cy="100" rx="10" ry="5" fill="#0A192F" />
                <ellipse cx="95" cy="100" rx="6" ry="3" fill="#1a3a5c" />

                {/* Engine glow */}
                <circle cx="85" cy="30" r="3" fill="#00BFA6" opacity="0.6" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="100" r="3" fill="#00BFA6" opacity="0.6" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* Navigation lights */}
                <circle cx="310" cy="60" r="2" fill="#ff4444">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="48" cy="22" r="1.5" fill="#00ff44">
                    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
};

export default CargoPlane;
