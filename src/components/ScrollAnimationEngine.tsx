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

            const plane = document.querySelector<HTMLElement>(".cargo-plane-container");
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            // =====================================================
            // HERO CONTENT — stagger reveal (always runs first)
            // =====================================================
            const heroElements = document.querySelectorAll<HTMLElement>("[data-hero-animate]");
            if (heroElements.length) {
                // Set initial state imperatively before animating
                gsap.set(heroElements, { opacity: 0, y: 40, filter: "blur(5px)" });
                const t = gsap.to(heroElements, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.9,
                    stagger: 0.18,
                    ease: "power3.out",
                    delay: 0.4,
                });
                tweens.push(t);
            }

            // =====================================================
            // PLANE ANIMATION ENGINE
            // =====================================================
            if (plane && !prefersReducedMotion) {
                // Gate: scroll triggers only activate after intro lands
                let introComplete = false;
                let launchST: ScrollTrigger | null = null;
                let exitST: ScrollTrigger | null = null;
                let reEntryST: ScrollTrigger | null = null;
                let finalExitST: ScrollTrigger | null = null;

                // Set starting position BEFORE any paint
                gsap.set(plane, {
                    x: -window.innerWidth * 0.85,
                    y: 30,
                    scale: 0.25,
                    opacity: 0,
                    rotation: 10,
                    transformOrigin: "center center",
                    force3D: true,
                });

                // ── INTRO TIMELINE: 3-phase cinematic entry ──
                const introTl = gsap.timeline({
                    delay: 0.15,
                    onComplete: () => {
                        introComplete = true;

                        // Idle float — gentle yoyo bob
                        const floatTween = gsap.to(plane, {
                            y: "+=14",
                            rotation: "+=1",
                            duration: 3.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                            delay: 0.1,
                        });
                        tweens.push(floatTween);

                        // Scale breathing
                        const breatheTween = gsap.to(plane, {
                            scale: "+=0.018",
                            duration: 4.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                            delay: 0.25,
                        });
                        tweens.push(breatheTween);

                        // Enable scroll triggers on the next animation frame
                        requestAnimationFrame(() => {
                            ScrollTrigger.refresh();
                            launchST?.enable();
                            exitST?.enable();
                            reEntryST?.enable();
                            finalExitST?.enable();
                        });
                    },
                });

                introTl
                    // Phase 1 — accelerate into frame from far left
                    .to(plane, {
                        opacity: 1,
                        scale: 0.55,
                        x: -window.innerWidth * 0.32,
                        y: 18,
                        rotation: 5,
                        duration: 0.75,
                        ease: "power2.out",
                    })
                    // Phase 2 — sweep through center with momentum
                    .to(plane, {
                        x: -window.innerWidth * 0.05,
                        y: 0,
                        scale: 0.88,
                        rotation: 1.5,
                        duration: 0.7,
                        ease: "power3.out",
                    })
                    // Phase 3 — decelerate into final rest position
                    .to(plane, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        duration: 0.85,
                        ease: "back.out(1.15)",
                    });

                timelines.push(introTl);

                // Kill idle loops when scroll takes over
                const killIdle = () => {
                    if (!introComplete) return;
                    gsap.killTweensOf(plane, "y,rotation,scale");
                };

                // ── SCROLL PHASE 1: LAUNCH — plane tilts nose-toward-viewer as user scrolls ──
                launchST = ScrollTrigger.create({
                    trigger: "[data-section='hero']",
                    start: "top top",
                    end: "bottom 30%",
                    scrub: 2,
                    onEnter: killIdle,
                    onUpdate: (self) => {
                        if (!introComplete) return;
                        const p = self.progress;
                        gsap.set(plane, {
                            x: Math.sin(p * Math.PI * 0.5) * 28,
                            y: p * 140,
                            rotation: p * 22,
                            scale: 1 + p * 0.38,
                            scaleY: 1 - p * 0.28,
                            opacity: 1 - p * 0.18,
                            transformOrigin: "center center",
                            overwrite: "auto",
                        });
                    },
                });
                launchST.disable();
                triggers.push(launchST);

                // ── SCROLL PHASE 2: EXIT — plane fades as it "delivers" ──
                exitST = ScrollTrigger.create({
                    trigger: "[data-section='process']",
                    start: "top 70%",
                    end: "top 0%",
                    scrub: 1.8,
                    onUpdate: (self) => {
                        if (!introComplete) return;
                        const p = self.progress;
                        gsap.set(plane, {
                            y: 140 + p * 190,
                            rotation: 22 + p * 14,
                            scale: 1.38 - p * 0.78,
                            scaleY: 0.72,
                            opacity: Math.max(0, 0.82 - p * 0.82),
                            overwrite: "auto",
                        });
                    },
                });
                exitST.disable();
                triggers.push(exitST);

                // ── SCROLL PHASE 3: RE-ENTRY — swoops back during urgency section ──
                reEntryST = ScrollTrigger.create({
                    trigger: "[data-section='urgency']",
                    start: "top 80%",
                    end: "center 40%",
                    scrub: 2,
                    onUpdate: (self) => {
                        if (!introComplete) return;
                        const p = self.progress;
                        gsap.set(plane, {
                            x: (1 - p) * -window.innerWidth * 0.18,
                            y: -95 + p * 75,
                            rotation: -9 + p * 7,
                            scale: 0.38 + p * 0.22,
                            scaleY: 1,
                            opacity: 0.18 + p * 0.42,
                            overwrite: "auto",
                        });
                    },
                });
                reEntryST.disable();
                triggers.push(reEntryST);

                // ── SCROLL PHASE 4: FINAL EXIT — fades on CTA ──
                finalExitST = ScrollTrigger.create({
                    trigger: "[data-section='cta']",
                    start: "top 80%",
                    end: "center 50%",
                    scrub: 1.5,
                    onUpdate: (self) => {
                        if (!introComplete) return;
                        const p = self.progress;
                        gsap.set(plane, {
                            y: -18 - p * 38,
                            opacity: Math.max(0, 0.58 - p * 0.58),
                            scale: Math.max(0, 0.58 - p * 0.28),
                            overwrite: "auto",
                        });
                    },
                });
                finalExitST.disable();
                triggers.push(finalExitST);
            } // End of if (plane) block

            // =====================================================
            // TRACKING CARD — spring float-in on scroll
            // =====================================================
            const trackingCard = document.querySelector("[data-animate='tracking-card']");
            if (trackingCard) {
                const st = ScrollTrigger.create({
                    trigger: trackingCard,
                    start: "top 95%",
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
                    onEnter: () => {
                        gsap.fromTo(ticker, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // PROCESS SECTION
            // =====================================================
            const processTitleWrap = document.querySelector("[data-section='process'] [data-animate='title-wrap']");
            if (processTitleWrap) {
                const st = ScrollTrigger.create({
                    trigger: processTitleWrap,
                    start: "top 88%",
                    onEnter: () => {
                        gsap.fromTo(processTitleWrap, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" });
                    },
                });
                triggers.push(st);
            }

            const processCards = document.querySelectorAll("[data-animate='card']");
            if (processCards.length) {
                const st = ScrollTrigger.create({
                    trigger: processCards[0],
                    start: "top 88%",
                    onEnter: () => {
                        gsap.fromTo(processCards,
                            { opacity: 0, y: 80, scale: 0.9 },
                            { opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: { amount: 0.45, ease: "power2.out" }, ease: "power3.out" }
                        );
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // URGENCY SECTION
            // =====================================================
            const urgencySection = document.querySelector("[data-section='urgency']");
            if (urgencySection) {
                // Parallax grid background
                const gridBg = urgencySection.querySelector<HTMLElement>(".parallax-grid");
                if (gridBg) {
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
                        onEnter: () => {
                            gsap.fromTo(el, from, {
                                opacity: 1, y: 0, x: 0, scale: 1, skewY: 0, rotationY: 0,
                                duration: selector.includes("title") ? 1.1 : 0.8,
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
                        onEnter: () => {
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
                        onEnter: () => {
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
                    scrub: 0.3,
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
                    scrub: 0.5,
                    onUpdate: (self) => {
                        gsap.set(routeFill, { scaleY: self.progress });
                    },
                });
                triggers.push(st);
            }

            // =====================================================
            // SECTION DOTS
            // =====================================================
            (["hero", "process", "urgency", "cta"] as const).forEach((sectionId) => {
                const dot = document.querySelector(`[data-section-dot="${sectionId}"]`);
                const section = document.querySelector(`[data-section="${sectionId}"]`);
                if (!dot || !section) return;
                const st = ScrollTrigger.create({
                    trigger: section,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => gsap.to(dot, { backgroundColor: "#00BFA6", borderColor: "#00BFA6", scale: 1.5, duration: 0.3 }),
                    onLeave: () => gsap.to(dot, { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", scale: 1, duration: 0.3 }),
                    onEnterBack: () => gsap.to(dot, { backgroundColor: "#00BFA6", borderColor: "#00BFA6", scale: 1.5, duration: 0.3 }),
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
