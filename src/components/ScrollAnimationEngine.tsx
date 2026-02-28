"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimationEngine() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const ctx = gsap.context(() => {
            // =========================================
            // 1. PLANE INTRO ANIMATION (on page load)
            // =========================================
            const plane = document.querySelector(".cargo-plane-container");
            if (plane) {
                gsap.set(plane, {
                    xPercent: 120,
                    yPercent: -30,
                    scale: 0.5,
                    opacity: 0,
                    rotation: -8,
                });

                gsap.to(plane, {
                    xPercent: 0,
                    yPercent: 0,
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 2.2,
                    ease: "power3.out",
                    delay: 0.3,
                });

                // Gentle float after landing
                gsap.to(plane, {
                    y: "+=12",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 2.5,
                });
            }

            // =========================================
            // 2. HERO CONTENT STAGGER REVEAL
            // =========================================
            const heroElements = document.querySelectorAll("[data-hero-animate]");
            if (heroElements.length) {
                gsap.set(heroElements, { opacity: 0, y: 40 });
                gsap.to(heroElements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: "power2.out",
                    delay: 0.6,
                });
            }

            // =========================================
            // 3. PLANE SCROLL-DRIVEN FLIGHT PATH
            // =========================================
            if (plane) {
                // As user scrolls past the hero, the plane flies across the screen
                const flightTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "[data-section='process']",
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 1.5,
                    },
                });

                flightTl
                    .to(plane, {
                        x: () => window.innerWidth * 0.3,
                        y: -60,
                        rotation: -5,
                        scale: 0.7,
                        ease: "none",
                    })
                    .to(plane, {
                        x: () => window.innerWidth * 0.6,
                        y: -120,
                        rotation: 3,
                        scale: 0.5,
                        opacity: 0.6,
                        ease: "none",
                    });

                // When we reach the urgency section, the plane returns from the other side
                gsap.fromTo(
                    plane,
                    {
                        x: () => -window.innerWidth * 0.3,
                        y: -40,
                        rotation: 5,
                        scale: 0.4,
                        opacity: 0.3,
                    },
                    {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 0.6,
                        opacity: 0.5,
                        scrollTrigger: {
                            trigger: "[data-section='urgency']",
                            start: "top 90%",
                            end: "bottom 50%",
                            scrub: 2,
                        },
                    }
                );
            }

            // =========================================
            // 4. SECTION REVEAL ANIMATIONS
            // =========================================
            // Process section cards
            const processCards = document.querySelectorAll("[data-animate='card']");
            processCards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 80,
                    scale: 0.92,
                    rotation: i % 2 === 0 ? -2 : 2,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // Section titles
            const sectionTitles = document.querySelectorAll("[data-animate='title']");
            sectionTitles.forEach((title) => {
                gsap.from(title, {
                    opacity: 0,
                    y: 50,
                    clipPath: "inset(100% 0% 0% 0%)",
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // Section subtitles / descriptions
            const sectionDescs = document.querySelectorAll("[data-animate='desc']");
            sectionDescs.forEach((desc) => {
                gsap.from(desc, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: desc,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // =========================================
            // 5. URGENCY SECTION PARALLAX + REVEALS
            // =========================================
            const urgencySection = document.querySelector("[data-section='urgency']");
            if (urgencySection) {
                // Grid background parallax
                const gridBg = urgencySection.querySelector(".parallax-grid");
                if (gridBg) {
                    gsap.to(gridBg, {
                        yPercent: -30,
                        scrollTrigger: {
                            trigger: urgencySection,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });
                }

                // Urgency list items stagger
                const urgencyItems = urgencySection.querySelectorAll("[data-animate='item']");
                gsap.from(urgencyItems, {
                    opacity: 0,
                    x: -60,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: urgencyItems[0] || urgencySection,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                // Dashboard card entrance
                const dashCard = urgencySection.querySelector("[data-animate='dashboard']");
                if (dashCard) {
                    gsap.from(dashCard, {
                        opacity: 0,
                        x: 100,
                        rotationY: -15,
                        scale: 0.9,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: dashCard,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    });
                }
            }

            // =========================================
            // 6. CTA SECTION REVEAL
            // =========================================
            const ctaSection = document.querySelector("[data-section='cta']");
            if (ctaSection) {
                const ctaContent = ctaSection.querySelectorAll("[data-animate='cta-element']");
                gsap.from(ctaContent, {
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            // =========================================
            // 7. TICKER BAR PARALLAX
            // =========================================
            const ticker = document.querySelector("[data-section='ticker']");
            if (ticker) {
                gsap.from(ticker, {
                    opacity: 0,
                    scaleX: 0.8,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ticker,
                        start: "top 95%",
                        toggleActions: "play none none none",
                    },
                });
            }

            // =========================================
            // 8. TRACKING CARD FLOAT-IN
            // =========================================
            const trackingCard = document.querySelector("[data-animate='tracking-card']");
            if (trackingCard) {
                gsap.from(trackingCard, {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                    duration: 1.4,
                    ease: "back.out(1.4)",
                    delay: 1.2,
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return null; // This component is purely for animation logic
}
