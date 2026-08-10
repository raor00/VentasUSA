# VentasUSA — Bug fixes, CTAs funcionales, Scroll Animation & Modal

**Date:** 2026-05-14
**Status:** Approved

---

## 1. Scope

Four interconnected workstreams for the VentasUSA B2B landing page:

1. **Bug fixes** — 9 defects identified during audit
2. **Functional CTAs** — hybrid WhatsApp + modal form conversion flow
3. **Modal de cotización** — Corporate Light design, Lucide icons, Inter font
4. **Scroll-driven plane animation** — Scroll Narrative via GSAP ScrollTrigger scrub + plane color improvements

---

## 2. Bug Fixes

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | root | `null` file created by bad command | Delete it |
| 2 | `Navbar.tsx` | `/login` link → 404 | Redirect to `/dashboard` until auth built |
| 3 | `page.tsx` | All CTAs are non-functional `<button>` elements | Wire to WhatsApp/modal (see §3) |
| 4 | `Footer.tsx` | Privacy/terms links are `<span>` not `<a>` | Convert to `<a>` with `href="#"` placeholder |
| 5 | `Footer.tsx` | Social media `href="#"` | Keep as-is (no real accounts yet) |
| 6 | `Footer.tsx` | Copyright "2024" | Update to "2025" |
| 7 | `Footer.tsx` | Placeholder phone/email/address | Update to real data: `+1 (305) 303-0502`, `corporate@ventasusa.com`, `Doral, FL` |
| 8 | `page.tsx` ticker | Duplicate ticker item | Remove duplicate |
| 9 | `AnimatedHeroScenario.tsx` | Forklifts stuck after first repeat cycle | Move `gsap.set(".fk1"/.fk2", { x: 1100 })` inside timeline at t=0 |

---

## 3. Functional CTAs — Hybrid Flow

### Decision: Hybrid (C)
- **Primary CTA** (filled navy button) → opens WhatsApp with pre-filled message
- **Secondary CTA** (outline button) → opens `<QuotationModal>` component

### WhatsApp Config
```
Number: +13053030502
Message template: "Hola, necesito importar [TIPO] desde USA. Mi empresa es [EMPRESA]."
URL: https://wa.me/13053030502?text=...
```

### CTA Locations
- Hero section: primary + secondary
- Process section: secondary only  
- Urgency/control section: primary
- Bottom CTA section: primary + secondary

---

## 4. Modal de Cotización — `QuotationModal.tsx`

### Visual Design: Corporate Light (A refined)
- Background: white `#FFFFFF` on dark overlay `rgba(2,8,23,0.72)` with `backdrop-filter: blur(4px)`
- Border radius: 18px, box-shadow multi-layer
- Font: **Inter** (body) + **Inter Tight** (title, 800 weight)
- Icons: **Lucide SVG** inline — no emoji anywhere in UI
- Accent: `#2563EB` (blue) for focus states and selected cargo
- Status badge: "Operación Prioritaria" amber pill in header

### Form Fields (5 total — max friction threshold)
| Field | Type | Required |
|-------|------|----------|
| Empresa | text input | yes |
| Nombre | text input | yes |
| WhatsApp o Email | text input | yes |
| Tipo de carga | 4-option grid (Maquinaria / Repuestos / Equipos / Otro) | yes |
| Urgencia | 3 pills (AOG / Alta / Normal) | yes |

### Submission
- **Email** via [Formspree](https://formspree.io) — no backend required
- **WhatsApp** button alongside submit: opens `wa.me` with brief pre-filled from form values
- Footer note: "Tus datos son confidenciales y no se comparten con terceros"

### Component API
```tsx
<QuotationModal isOpen={boolean} onClose={() => void} />
```
Managed via `useState` in `page.tsx`. Trap focus, close on overlay click or Escape key.

---

## 5. Scroll-Driven Plane Animation

### Decision: A — Scroll Narrative

The hero section **pins** (ScrollTrigger `pin: true`) while the user scrolls through ~300vh of scroll distance. GSAP `scrub: 1` binds timeline progress directly to scroll position — no autoplay.

### Timeline Phases (mapped to scroll %)
| Scroll % | Phase | Animation | Side Label |
|----------|-------|-----------|------------|
| 0–5% | Entry | Plane arrives from right, settles on runway | — |
| 5–35% | Ramp opens | `#ramp` rotates down, hold light activates | "01 · Aterriza con prioridad" |
| 35–65% | Forklifts deploy | FK1 exits hold (x: 0→-300), FK2 follows offset | "02 · Carga se libera" |
| 65–85% | Forklifts return | FK1/FK2 return, ramp closes | "03 · Listo para despacho" |
| 85–100% | Departure | Plane lifts, smoke puff, exits frame left | "04 · En camino a destino" |

### Implementation
- File: `AnimatedHeroScenario.tsx` — replace `repeat: -1` autoplay with scrub-controlled timeline
- ScrollTrigger: `pin: true`, `scrub: 1`, `start: "top top"`, `end: "+=300%"`
- Narrative labels: absolutely positioned `<div>` elements that fade in at matching scroll progress using separate `ScrollTrigger` instances
- **No new libraries** — GSAP ScrollTrigger already installed

### Forklift Bug Fix (prerequisite)
Before converting to scrub, move FK1/FK2 initial state inside timeline:
```js
// WRONG — outside timeline, not reset on scrub reverse
gsap.set(".fk1", { x: 1100 });

// CORRECT — inside timeline at position 0
tl.set(".fk1", { x: 1100 }, 0)
  .set(".fk2", { x: 1100 }, 0)
```

### Plane Color Improvements
Current plane SVG uses low-contrast greys on dark background. Changes:
- Fuselage: `#C8D8E8` → `#E8F2FF` (brighter, more visible)
- Window row: add subtle `#7FBAFF` tint
- Engine nacelles: `#94A3B8` → `#B0C4D8`
- Ramp/hold interior: `#1E3A5F` → `#1A4A7A` (deeper blue, more contrast)
- Wing accent line: add thin `#2563EB` stroke

---

## 6. Architecture Notes

### Files Modified
- `src/app/page.tsx` — CTA wiring, ticker fix, modal state
- `src/components/AnimatedHeroScenario.tsx` — forklift fix, scrub timeline, color updates
- `src/components/QuotationModal.tsx` — **new file**
- `src/components/Footer.tsx` — links, copyright, contact data
- `src/components/Navbar.tsx` — login redirect
- `root/null` — delete

### Files NOT Modified
- `ScrollAnimationEngine.tsx` — existing scroll triggers untouched
- `StoreContext.tsx` — no changes
- `layout.tsx` — font migration deferred (separate task)

### Dependencies
- No new npm packages
- Formspree account needed (free tier, user must create and get endpoint)

---

## 7. Out of Scope (deferred)

- Platform pages: `/login`, `/dashboard`, `/admin`, `/tracking/[id]`
- `next/font` migration
- Open Graph meta tags
- Lottie animation (C option not chosen)
