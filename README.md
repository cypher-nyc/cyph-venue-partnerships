# cyph-venue-partnerships

The venue-partnerships deck for Cyph: a seven-slide single-page HTML/CSS/JS presentation that sells cafes, bookstores, bars and cultural institutions on hosting Cyph residencies, built from the same shell as `cyph-deck`. Layer: Subsidiary/site.

## Talks to

Standalone: yes. No platform service is called. The shared things are a local copy of the `auth.js` email gate (same Google Apps Script logger as cyph-deck, older script-tag contract without `data-mode`) and the `assets/` tree copied from `cyph-deck`.

| Service | Direction | Protocol | For what |
|---|---|---|---|
| Google Apps Script web app (`LOG_URL` in `auth.js`) | out | HTTPS POST (`fetch` / `sendBeacon`) | email gate + access log; silent no-op if `LOG_URL` is empty |
| cdnjs (anime.js 3.2.2) | out | script tag | slide animations |

Events published/subscribed: none.

## Stack

- Static HTML, CSS, vanilla JS; no package.json, no build.
- No port, no database, no store. `auth.js` bypasses the gate on `localhost`, `127.0.0.1` and file://.
- Deploy target: none in this repo (no workflow, no bucket config).

## Layout

```
index.html    all slide content: s0 title, s1 founders, s2 why we want to work with you, s3 who we are partnering with,
              s4 what we bring to your space, s5 we're venture backed (SVG trajectory), s6 join the residency (close);
              HUD nav cyph/founders/irl/partnership/close
styles.css    all styles (shared shell)
deck.js       navigation, chapter map, per-slide animations, layer-stack descriptions (T = 7)
auth.js       email gate + access logging
assets/       shared image tree (layers, people, brands, backgrounds, moments, cards, icons, reference)
favicon.png
```

## Run / test / lint

```
open /Users/cash/Documents/github/cyph/cyph-venue-partnerships/index.html    # or any static file server on localhost
```

No tests, no lint, no build.

## Rules for changing this repo

- Slide IDs `s0..s6` must stay contiguous; `deck.js` indexes `getElementById("s" + i)`. Adding or removing a slide is a lockstep edit of `index.html`, both HUD counters (`XX/07`), and `deck.js` (`T`, the `ch` chapter map, `bars`, the counter strings, the per-slide animation cases).
- The `partnership` nav button maps to the `business` chapter key in `btnChapterMap`; keep that mapping so `ch[]` and `bars[]` line up without renumbering.
- Founders cards, layer stack, background layers, fit-to-viewport scaling and the auth gate must stay visually consistent with `cyph-deck` and `cyph-office-hours`.
- No financials in this deck; the close ask is "join the residency; scheduling later."
- Copy is Cash-authored; only make dictated wording changes.
- Colors: Cornflower `#608FE6`, Paprika `#EC4E20`, Deep Space `#13293D`, Amaranth `#6D1A36`, Amber `#FBAF00`; cream `#ede8de` backgrounds. Do not introduce others.

## Deploy

Not wired. The repo holds no workflow and no hosting config; hosting follows the `cyph-deck` pattern (S3 + CloudFront or GitHub Pages) when it ships.
