"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LifecyclePhaseProps {
  phase: number;
  title: string;
  visualSrc: string;
  videoRef?: string;
  desc: string;
  microInteraction?: "crate-slide" | "light-pulse" | "none";
  cta?: { label: string; href: string };
}

export default function LifecyclePhase({
  phase,
  title,
  visualSrc,
  videoRef,
  desc,
  microInteraction = "none",
  cta,
}: LifecyclePhaseProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Subtle enter micro using GSAP (no new libs)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      card,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    if (microInteraction === "light-pulse" && visualRef.current) {
      tl.to(visualRef.current, {
        boxShadow: "0 0 0 8px rgba(37,99,235,0.15)",
        duration: 1.2,
        repeat: 1,
        yoyo: true,
      }, "-=0.3");
    }

    if (microInteraction === "crate-slide" && visualRef.current) {
      tl.fromTo(
        visualRef.current,
        { x: -8 },
        { x: 0, duration: 0.8 },
        "-=0.4"
      );
    }

    return () => {
      tl.kill();
    };
  }, [microInteraction]);

  return (
    <div
      ref={cardRef}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex flex-col h-full"
      data-phase={phase}
    >
      <div className="relative">
        <img
          ref={visualRef}
          src={visualSrc}
          alt={title}
          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.015]"
        />
        {videoRef && (
          <a
            href={`#video-demo-${phase}`}
            className="absolute bottom-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 text-[#E7C98A] border border-white/20 hover:bg-black/90"
          >
            Ver video
          </a>
        )}
        <div className="absolute top-3 left-3 font-mono text-[10px] px-2.5 py-1 rounded-full bg-black/70 text-white/80 border border-white/20">
          Fase {phase.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="font-display font-bold text-lg text-white mb-2 tracking-tight">
          {title}
        </div>
        <p className="text-sm text-blue-100/80 leading-relaxed flex-1">{desc}</p>

        {cta && (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#C08A2E] hover:text-[#E7C98A] transition"
          >
            {cta.label} →
          </a>
        )}
      </div>
    </div>
  );
}
