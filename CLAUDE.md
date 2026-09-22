# CYPH — Venue Partnerships Deck

> Read `README.md` first - it is the canonical map of this repo (purpose, layout, who it talks to, run/test). This file holds only Claude-specific rules and incident history.

> **Scope rule (Cash, 2026-09-14): no frontend changes and no copy you were not asked for.** A backend task is backend only. Do not add a surface, a row, a pill, a section, a playground entry, a fixture, a DS component, a type field, or a `include=` param in any frontend (`*-fe`, the design systems, `cyph-internal`, `cyph-appendix`, the decks) to "show" backend work. Do not write, add, or reword user-facing copy (labels, section titles, hover text, empty states, error text) unless Cash dictated the words. If a frontend change looks necessary to make the work useful, say so in one line and stop; Cash decides. This applies to sibling repos too: working in `underground-be` gives no licence to touch `underground-fe` or the DS.

## Scope Discipline
Implement ONLY what was explicitly requested. Do not add unrequested UI sections, intro summaries, visualizations, fonts, or styling. If you believe an addition would help, list it as a suggestion at the end of your response instead of building it.

## Domain Vocabulary & Design Tokens
- Always use design-system tokens for color, spacing, and typography. Never hardcode hex values or font families.

## What this is

The venue-partnerships deck for Cyph (cypher.nyc). A sibling to `cyph-deck` (investor pitch) built from the same HTML/CSS/JS shell, but rewritten to sell cafes, indie bookstores, cocktail bars, and cultural institutions on hosting Cyph residencies and weekly drops. No financials — the close ask is "join the residency; scheduling later."

The cyph-deck remains the investor artifact. This deck shares the same 15-slide shell and brand system; only the slides that read as investor-specific were rewritten.

## Slide map (how it differs from cyph-deck)

Slides 0–8 are identical to cyph-deck. Rewrites are concentrated in 9–14:

- `s0` title — sub swapped to "a venue partnership brief."
- `s1` founders — unchanged
- `s2` crisis — unchanged
- `s3` counter-culture — unchanged (venues *are* the next counter-culture hosts)
- `s4` "what about now?" — unchanged
- `s5` how it works (layer stack) — IRL layer copy updated in `deck.js` to name venue types
- `s6` underground transit map — unchanged
- `s7` collaborators — headline reframed as "the people we bring through your door"
- `s8` cyph — unchanged
- `s9` IRL (**rewritten**) — "the cyph closes every day — into your space." Drops the "100+ venues" stat; reframes Unschooled as a sister org alongside a "you host, we program" deal
- `s10` was "how we make money" → **"what we bring to your room."** Four event types in a 2×2 grid: research hackathons, curated watch parties, meaningful discussions + book surfacing, office hours
- `s11` was "user market size" → **"from 1K to 3 million."** Scale trajectory chart (SVG) with five milestones on a log curve: 1K (today) → 10K → 100K → 1M → 3M (when we blow up). Sub-headline: "we'd love to work with you now — and when we blow up." Subtle "venture backed · seed stage" note bottom-right.
- `s12` was "gtm" → **"what the network looks like at scale."** Keeps the floating headshot/brand collage; rewrites the four crisis cards and bracket captions to a venue-network narrative (NYC → 6 cities, matching engine, flywheel)
- `s13` testimonials — unchanged (demand is still the point)
- `s14` close — **"join the residency."** Scheduling and logistics later. Rebrand disclaimer removed.

## What to keep in sync

Anything shared with `cyph-deck` should stay visually consistent — founders cards, transit map, layer stack, cyph flyer carousel, testimonials grid. Assets live at the same paths; both decks currently share the same `assets/` tree (copied at scaffold time).

## Nav

Eighth button renamed `business` → `partnership`. `btnChapterMap` in `deck.js` maps `partnership` → the `business` chapter key (so `ch[]` and `bars[]` still line up without renumbering).

## Color scheme

Unchanged from cyph-deck — Cornflower `#608FE6`, Paprika `#EC4E20`, Deep Space `#13293D`, Amaranth `#6D1A36`, Amber `#FBAF00`. Cream `#ede8de` backgrounds.

## Slide structure

15 slides, IDs `s0`–`s14`. `T = 15` in `deck.js`. Counter reads `XX/15`.

## Key files

The file map lives in `README.md` (Layout).

## Local Dev Ports
Before starting any server, check the port is free and record every background process you start. At the end of the session, kill ONLY the processes you started — never blanket-kill by port or name, since the user has pre-existing dev servers running. Ports in active use: 8000 (backend), 8002, 8200 (API), 5373 (portal).

## Verification
After a UI fix, hard-reload with cache disabled before claiming success. If the user reports still seeing the bug, assume it is real and reproduce it rather than attributing it to a stale module cache.
