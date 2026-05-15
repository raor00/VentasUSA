# RouteMapSection — Spec

**Date:** 2026-05-15
**Status:** Approved

## What

New landing page section: animated route map Miami → Caracas, placed between the ticker and the process section.

## Layout

Full-width section on dark navy background (`#0A192F`). Two-column header (title + service tags). Stats row. Map card with geographic SVG. Bottom chip row + CTA button.

## Map Content

- SVG geographic outlines: Florida peninsula + Keys, Cuba, Hispaniola, Puerto Rico, Lesser Antilles chain, Trinidad, Venezuela (north coast with Paraguana Peninsula + Gulf of Venezuela)
- Lat/lon grid overlay (decorative)
- Animated route: dashed arc MIA → CCS (path: `M 220 31 C 340 -30 480 10 594 245` in `viewBox="0 0 760 290"`)
- City cards: Miami (🇺🇸, blue, `25°46'N · 80°11'W`, IATA: MIA) and Caracas (🇻🇪, gold, `10°28'N · 66°54'W`, IATA: CCS)
- Flight badge: `MIA → CCS · 2,450 km · ~4h vuelo`

## Animations (anime.js)

All triggered by IntersectionObserver (threshold 0.2), runs once:

1. **Route draw**: `strokeDashoffset` 680→0, 2500ms, easeInOutQuart, delay 200ms
2. **Plane motion**: `anime.path('#flight-path-motion')` → translateX/Y/rotate, 5000ms, linear, loop, delay 1000ms
3. **City card reveals**: opacity+translateY stagger, delay 800ms
4. **Stats counters**: `innerHTML` 0→N, 2000ms, easeOutExpo, stagger

## Stats

| Value | Unit | Label |
|-------|------|-------|
| 72 | h | Entrega promedio |
| 500 | + | Empresas atendidas |
| 99 | % | On-time delivery |
| 2,450 | km | Ruta directa |

## Files

| Action | File |
|--------|------|
| Create | `src/components/RouteMapSection.tsx` |
| Modify | `src/app/page.tsx` — import + insert after ticker |

## Dependencies

- `animejs` (already installed)
- No new packages
