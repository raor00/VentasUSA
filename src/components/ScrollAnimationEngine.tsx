"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimationEngine() {
    useEffect(() => {
        // Track all tweens & triggers created here for manual cleanup
        const tweens: gsap.core.Tween[] = [];
        const timelines: gsap.core.Timeline[] = [];
        const triggers: ScrollTrigger[] = [];

        const timer = setTimeout(() => {

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const isMobile = window.matchMedia("(max-width: 767px)").matches;

            // =====================================================
            // HERO CONTENT — stagger reveal (always runs first)
            // =====================================================
            const heroElements = document.querySelectorAll<HTMLElement>("[data-hero-animate]");
            if (heroElements.length) {
                // Set initial state imperatively before animating
                gsap.set(heroElements, { opacity: 0, y: isMobile ? 24 : 40, filter: isMobile ? "blur(0px)" : "blur(5px)" });
                const t = gsap.to(heroElements, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: isMobile ? 0.65 : 0.9,
                    stagger: isMobile ? 0.1 : 0.18,
                    ease: "power3.out",
                    delay: 0.4,
                });
                tweens.push(t);
            }

            // Reduced motion users should still receive static reveal animations only.
            if (prefersReducedMotion) {
                // no-op; rest of section animations remain deterministic.
            }

            // =====================================================
            // TRACKING CARD — spring float-in on scroll
            // =====================================================
            const trackingCard = document.querySelector("[data-animate='tracking-card']");
            if (trackingCard) {
                const st = ScrollTrigger.create({
                    trigger: trackingCard,
                    start: "top 95%",
                    once: true,
                    onEnter: () => {
                        gsap.fromTo(trackingCard,
                            { opacity: 0, y: 70, scale: 0.9 },
                            { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.4)" }
                        );
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // TICKER BAR
            // =====================================================
            const ticker = document.querySelector("[data-section='ticker']");
            if (ticker) {
                const st = ScrollTrigger.create({
                    trigger: ticker,
                    start: "top 95%",
                    once: true,
                    onEnter: () => {
                        gsap.fromTo(ticker, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
                    },
                });
                triggers.push(st);
            }

            // (old process triggers removed as part of clean structure for the new ciclo operativo - per redesign tasks)

            // =====================================================
            // URGENCY SECTION
            // =====================================================
            const urgencySection = document.querySelector("[data-section='urgency']");
            if (urgencySection) {
                // Parallax grid background
                const gridBg = urgencySection.querySelector<HTMLElement>(".parallax-grid");
                if (gridBg && !isMobile) {
                    const st = ScrollTrigger.create({
                        trigger: urgencySection,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                        onUpdate: (self) => {
                            gsap.set(gridBg, { yPercent: -25 * self.progress });
                        },
                    });
                    triggers.push(st);
                }

                const urgencyEls: { selector: string; from: gsap.TweenVars }[] = [
                    { selector: "[data-animate='badge']", from: { opacity: 0, scale: 0.5, y: 18 } },
                    { selector: "[data-animate='title']", from: { opacity: 0, y: 60, skewY: 2 } },
                    { selector: "[data-animate='desc']", from: { opacity: 0, y: 35 } },
                    { selector: "[data-animate='cta-btn']", from: { opacity: 0, y: 25, scale: 0.92 } },
                    { selector: "[data-animate='dashboard']", from: { opacity: 0, x: 100, rotationY: -15, scale: 0.9 } },
                ];

                urgencyEls.forEach(({ selector, from }) => {
                    const el = urgencySection.querySelector(selector);
                    if (!el) return;
                    const st = ScrollTrigger.create({
                        trigger: el,
                        start: "top 88%",
                        once: true,
                        onEnter: () => {
                            gsap.fromTo(el, from, {
                                opacity: 1, y: 0, x: 0, scale: 1, skewY: 0, rotationY: 0,
                                duration: isMobile ? 0.55 : selector.includes("title") ? 1.1 : 0.8,
                                ease: selector.includes("badge") ? "back.out(2)" : selector.includes("dashboard") ? "power3.out" : "power3.out",
                            });
                        },
                    });
                    triggers.push(st);
                });

                // List items stagger
                const urgencyItems = urgencySection.querySelectorAll("[data-animate='item']");
                if (urgencyItems.length) {
                    const st = ScrollTrigger.create({
                        trigger: urgencyItems[0],
                        start: "top 88%",
                        once: true,
                        onEnter: () => {
                            if (isMobile) {
                                gsap.fromTo(urgencyItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.45, ease: "power2.out" });
                                return;
                            }
                            gsap.fromTo(urgencyItems, { opacity: 0, x: -70 }, { opacity: 1, x: 0, stagger: 0.2, duration: 0.85, ease: "power3.out" });
                        },
                    });
                    triggers.push(st);
                }

                // Progress bar
                const progressBar = urgencySection.querySelector("[data-animate='progress-bar']");
                if (progressBar) {
                    const st = ScrollTrigger.create({
                        trigger: progressBar,
                        start: "top 88%",
                        once: true,
                        onEnter: () => {
                            gsap.fromTo(progressBar, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1.4, ease: "power2.out" });
                        },
                    });
                    triggers.push(st);
                }

                // Stats
                const statItems = urgencySection.querySelectorAll("[data-animate='stat']");
                if (statItems.length) {
                    const st = ScrollTrigger.create({
                        trigger: statItems[0],
                        start: "top 88%",
                        once: true,
                        onEnter: () => {
                            if (isMobile) {
                                gsap.fromTo(statItems, { opacity: 0, y: 16, scale: 1 }, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" });
                                return;
                            }
                            gsap.fromTo(statItems, { opacity: 0, y: 25, scale: 0.87 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "back.out(1.4)" });
                        },
                    });
                    triggers.push(st);
                }
            }

            // =====================================================
            // CTA SECTION
            // =====================================================
            const ctaSection = document.querySelector("[data-section='cta']");
            if (ctaSection) {
                const ctaEls: { selector: string; from: gsap.TweenVars }[] = [
                    { selector: "[data-animate='cta-title']", from: { opacity: 0, y: 70, scale: 0.92 } },
                    { selector: "[data-animate='cta-desc']", from: { opacity: 0, y: 35 } },
                ];
                ctaEls.forEach(({ selector, from }) => {
                    const el = ctaSection.querySelector(selector);
                    if (!el) return;
                    const st = ScrollTrigger.create({
                        trigger: el,
                        start: "top 88%",
                        once: true,
                        onEnter: () => {
                            gsap.fromTo(el, from, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out" });
                        },
                    });
                    triggers.push(st);
                });

                const ctaBtns = ctaSection.querySelectorAll("[data-animate='cta-element']");
                if (ctaBtns.length) {
                    const st = ScrollTrigger.create({
                        trigger: ctaBtns[0],
                        start: "top 90%",
                        once: true,
                        onEnter: () => {
                            gsap.fromTo(ctaBtns, { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.9, ease: "back.out(1.4)" });
                        },
                    });
                    triggers.push(st);
                }
            }

            // =====================================================
            // SCROLL PROGRESS BAR (top)
            // =====================================================
            const scrollProgressBar = document.querySelector(".scroll-progress-bar");
            if (scrollProgressBar) {
                const st = ScrollTrigger.create({
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: isMobile ? false : 0.3,
                    onUpdate: (self) => {
                        gsap.set(scrollProgressBar, { scaleX: self.progress });
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // SCROLL ROUTE LINE (right side)
            // =====================================================
            const routeFill = document.querySelector(".scroll-route-fill");
            if (routeFill) {
                const st = ScrollTrigger.create({
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: isMobile ? false : 0.5,
                    onUpdate: (self) => {
                        gsap.set(routeFill, { scaleY: self.progress });
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // SECTION DOTS (updated for operational ciclo structure per redesign)
            // =====================================================
            (["hero", "mapa", "ciclo", "cta"] as const).forEach((sectionId) => {
                const dot = document.querySelector(`[data-section-dot="${sectionId}"]`);
                const section = document.querySelector(`[data-section="${sectionId}"]`);
                if (!dot || !section) return;
                const st = ScrollTrigger.create({
                    trigger: section,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => gsap.to(dot, { backgroundColor: "#2563EB", borderColor: "#2563EB", scale: 1.5, duration: 0.3 }),
                    onLeave: () => gsap.to(dot, { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", scale: 1, duration: 0.3 }),
                    onEnterBack: () => gsap.to(dot, { backgroundColor: "#2563EB", borderColor: "#2563EB", scale: 1.5, duration: 0.3 }),
                    onLeaveBack: () => gsap.to(dot, { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", scale: 1, duration: 0.3 }),
                });
                triggers.push(st);
            });

            // =====================================================
            // FLIGHT PATH LINE
            // =====================================================
            const flightPath = document.querySelector(".flight-path-line");
            if (flightPath) {
                const t1 = gsap.fromTo(flightPath,
                    { scaleX: 0, transformOrigin: "left center", opacity: 0 },
                    { scaleX: 1, opacity: 1, duration: 2.2, ease: "power2.out", delay: 0.4 }
                );
                const t2 = gsap.to(flightPath, { opacity: 0, duration: 0.9, delay: 3.2, ease: "power2.in" });
                tweens.push(t1, t2);
            }

        }, 300);

        // ── CLEANUP ─────────────────────────────────────────────
        return () => {
            clearTimeout(timer);
            tweens.forEach((t) => t.kill());
            timelines.forEach((tl) => tl.kill());
            triggers.forEach((st) => st.kill());
        };
    }, []);

    return null;
}
