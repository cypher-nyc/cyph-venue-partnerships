const T = 7;
let cur = 0;
let busy = false;
let goTimer = null;
let layerStep = 0;
let arenaStep = 0;
let _prevCur = 0;

/* ── isometric layer stack data (s5) ── */
const layerInfo = [
  null,
  {
    ids: ["isoL1"],
    num: "01",
    title: "underground",
    sub: "where you become dangerous.",
    desc: "a living world of buried artifacts, suppressed ideas, and unexplored intellectual territory — that maps your thinking over time.",
    color: "#EC4E20",
  },
  {
    ids: ["isoL2"],
    num: "02",
    title: "cyph",
    sub: "where ideas get tested in real time.",
    desc: "a live intellectual \u2018cyph\u2019 that resists the echo chamber and places you into productive tension with minds you'd never otherwise meet.",
    color: "#608FE6",
  },
  {
    ids: ["isoL3"],
    num: "03",
    title: "irl",
    sub: "into your room.",
    desc: "everything found underground and tested in the cyph spills out — into partner cafes, bookstores, bars and cultural rooms. the human face, the drink, the shelf, the experience that changes you.",
    color: "#6D1A36",
  },
  {
    ids: ["isoL1", "isoL2", "isoL3"],
    num: "∞",
    title: "why venues matter.",
    sub: "",
    desc: "the digital layers produce hungry minds. your room is where that hunger lands — not as a pop-up, but as a place those people start to belong.",
    color: "gradient",
  },
];

function updateLayerStack(step) {
  busy = true;
  ["isoL1", "isoL2", "isoL3"].forEach(function (id) {
    document.getElementById(id).classList.remove("active");
  });
  ["ldot1", "ldot2", "ldot3", "ldot4"].forEach(function (id) {
    document.getElementById(id).classList.remove("active");
  });
  if (step >= 1 && step <= 4) {
    var d = layerInfo[step];
    d.ids.forEach(function (id) {
      document.getElementById(id).classList.add("active");
    });
    document.getElementById("ldot" + step).classList.add("active");
    var numEl = document.getElementById("layerNum");
    var titleEl = document.getElementById("layerTitle");
    var subEl = document.getElementById("layerSub");
    numEl.textContent = d.num;
    titleEl.textContent = d.title;
    subEl.textContent = d.sub;
    if (d.color === "gradient") {
      var grad = "linear-gradient(90deg, #13293D, #FBAF00, #608FE6, #6D1A36)";
      numEl.style.background = grad;
      numEl.style.webkitBackgroundClip = "text";
      numEl.style.webkitTextFillColor = "transparent";
      titleEl.style.color = "var(--charcoal)";
      subEl.style.color = "var(--charcoal)";
    } else {
      numEl.style.background = "none";
      numEl.style.webkitBackgroundClip = "unset";
      numEl.style.webkitTextFillColor = "unset";
      numEl.style.color = d.color;
      titleEl.style.color = d.color;
      subEl.style.color = d.color;
    }
    document.getElementById("layerDesc").textContent = d.desc;
    document.getElementById("layerAnno").style.opacity = "1";
  }
  setTimeout(function () {
    busy = false;
  }, 400);
}

/* ── cyph slide (s8) flyer carousel: a single flyer card on the left
   cycles through 6 flyers. steps 1-3 = live (live1-3.png), 4-6 = conceptual
   (concept1-3.png). the right side shows underground artifacts + office
   hours related to the active flyer (see updateCyphDetail). ── */
function updateArenaCards(step) {
  busy = true;
  // toggle which flyer image is .cyph-flyer-active (crossfade in CSS)
  for (var i = 1; i <= 6; i++) {
    var card = document.getElementById("cf" + i);
    if (card) card.classList.toggle("cyph-flyer-active", i === step);
  }
  updateCyphDetail(step);
  setTimeout(function () {
    busy = false;
  }, 400);
}

/* ── cyph (s8) per-flyer fixtures: each step's underground artifacts +
   office hours host. mirrors arena-fe's underground_resources +
   office_hours_candidates payloads (momentCoreApi.ts).
   the artifact image paths are placeholders pulled from assets/artifacts/
   (the user will swap them for curated picks). ── */
const cyphFixtures = [
  // step 1 — knicks vs rockets (live)
  {
    section: "live",
    sectionSub: "topics sourced from API's & real-time listening.",
    artifacts: [
      {
        src: "assets/images/knicks_rockets/cassette.png",
        caption: "archive · 1994 ECF tape",
      },
      {
        src: "assets/images/knicks_rockets/1980_flyer.png",
        caption: "ephemera · 1980 game flyer",
      },
      {
        src: "assets/images/knicks_rockets/book.png",
        caption: "monograph · the cap",
      },
    ],
    host: {
      img: "assets/images/knicks_rockets/office_hours/chris_robinson.jpeg",
      room: "understanding the nba salary cap",
      name: "chris robinson",
    },
  },
  // step 2 — the oscars (live)
  {
    section: "live",
    sectionSub: "topics sourced from API's & real-time listening.",
    artifacts: [
      {
        src: "assets/images/oscars/pauline.jpg",
        caption: "criticism · pauline kael",
      },
      {
        src: "assets/images/oscars/ari-aster.jpg",
        caption: "interview · ari aster",
      },
      {
        src: "assets/images/oscars/box_office.webp",
        caption: "data viz · best pic vs box office",
      },
    ],
    host: {
      img: "assets/images/oscars/office_hours/jordan_rose.jpeg",
      room: "oscar's: behind the scenes",
      name: "jordan rose",
    },
  },
  // step 3 — mamdani inauguration (live)
  {
    section: "live",
    sectionSub: "topics sourced from API's & real-time listening.",
    artifacts: [
      {
        src: "assets/images/mamdani/transcript.jpg",
        caption: "transcript · inaugural address",
      },
      {
        src: "assets/images/mamdani/housing.webp",
        caption: "history · NYC mayors & housing",
      },
      {
        src: "assets/images/mamdani/rent_freeze.jpeg",
        caption: "report · what a rent freeze does",
      },
    ],
    host: {
      img: "assets/images/mamdani/office_hours/nia_gibson.jpeg",
      room: "what mamdani inherits",
      name: "nia gibson",
    },
  },
  // step 4 — has culture become content? (conceptual)
  {
    section: "conceptual",
    sectionSub: "ideas surfaced from pulses in deep research.",
    artifacts: [
      {
        src: "assets/images/is_culture_content/commodity_fetishism.png",
        caption: "essay · marx, commodity fetishism",
      },
      {
        src: "assets/images/is_culture_content/mass_culture.png",
        caption: "essay · adorno, the culture industry",
      },
      {
        src: "assets/images/is_culture_content/the_century_of_the_self.png",
        caption: "doc · curtis, century of the self",
      },
    ],
    host: {
      img: "assets/images/is_culture_content/office_hours/tom_freston_I_want_my_mtv_back.png",
      room: "i want my mtv back: what we lost",
      name: "tom freston",
    },
  },
  // step 5 — is art a weapon? (conceptual)
  {
    section: "conceptual",
    sectionSub: "ideas surfaced from pulses in deep research.",
    artifacts: [
      {
        src: "assets/images/is_art_a_weapon/propaganda.png",
        caption: "archive · propaganda",
      },
      {
        src: "assets/images/is_art_a_weapon/society_spectacle.png",
        caption: "monograph · debord, society of the spectacle",
      },
      {
        src: "assets/images/is_art_a_weapon/graphic.png",
        caption: "ephemera · protest graphics",
      },
    ],
    host: {
      img: "assets/images/is_art_a_weapon/office_hours/dred_scott.png",
      room: "by any medium necessary",
      name: "dred scott",
    },
  },
  // step 6 — is the soul actually cartesian? (conceptual)
  {
    section: "conceptual",
    sectionSub: "ideas surfaced from pulses in deep research.",
    artifacts: [
      {
        src: "assets/images/soul_cartesian/meditations.png",
        caption: "text · descartes, meditations",
      },
      {
        src: "assets/images/soul_cartesian/concept_of_mind.png",
        caption: "monograph · ryle, the concept of mind",
      },
      {
        src: "assets/images/soul_cartesian/hylomorphism.png",
        caption: "theory · aristotelian hylomorphism",
      },
    ],
    host: {
      img: "assets/images/soul_cartesian/office_hours/ian_mcgilchrist.png",
      room: "the ghost was never in the machine",
      name: "iain mcgilchrist",
    },
  },
];

function updateCyphDetail(step) {
  var fx = cyphFixtures[(step || 1) - 1];
  if (!fx) return;

  // section label toggles live ↔ conceptual
  var label = document.getElementById("cyphSectionLabel");
  if (label) label.textContent = fx.section;
  var sub = document.getElementById("cyphSectionSub");
  if (sub) sub.textContent = fx.sectionSub;

  // floating underground artifacts — swap img.src + caption text on the
  // three fixed wrapper divs so their drift animations stay running.
  for (var i = 0; i < 3; i++) {
    var art = fx.artifacts && fx.artifacts[i];
    var imgEl = document.getElementById("cyphArt" + (i + 1));
    var capEl = document.getElementById("cyphArt" + (i + 1) + "Cap");
    if (imgEl && art) imgEl.src = art.src;
    if (capEl && art) capEl.textContent = art.caption;
  }

  // office hours host — circular avatar matching arena-fe Dashboard.tsx
  // (108px circle + name + future date + orange rsvp pill).
  var hostEl = document.getElementById("cyphHosts");
  if (hostEl && fx.host) {
    hostEl.innerHTML =
      '<div class="cyph-host">' +
      '<div class="cyph-host-circle">' +
      '<img src="' +
      fx.host.img +
      '" alt="" />' +
      "</div>" +
      '<div class="cyph-host-meta">' +
      '<div class="cyph-host-room">' +
      fx.host.room +
      "</div>" +
      '<div class="cyph-host-name">hosted by ' +
      fx.host.name +
      "</div>" +
      "</div>" +
      "</div>";
  }
}

function setStackPositions(ids, activeIdx) {
  var positions = ["pos-front", "pos-mid", "pos-back"];
  ids.forEach(function (id, i) {
    var el = document.getElementById(id);
    el.classList.remove("pos-front", "pos-mid", "pos-back");
    if (i === activeIdx) {
      el.classList.add("pos-front");
    } else {
      /* distribute remaining cards to mid/back */
      var behind =
        i < activeIdx
          ? "pos-back"
          : i === activeIdx + 1
            ? "pos-mid"
            : "pos-back";
      el.classList.add(behind);
    }
  });
}

const ch = {
  0: "cyph",
  1: "founders",
  2: "irl",
  3: "irl",
  4: "business",
  5: "business",
  6: "close",
};

const bars = [
  [10, 10, 5, 5],
  [22, 22, 8, 10],
  [45, 40, 20, 30],
  [62, 55, 35, 50],
  [80, 72, 55, 68],
  [92, 86, 78, 82],
  [100, 100, 100, 100],
];

const bgMap = {
  cyph: "shell",
  founders: "shell",
  irl: "irl",
  business: "nextsteps",
  close: "nextsteps",
};

/* ── update backgrounds, HUD, bars for slide i ── */
function applySlide(i) {
  document.getElementById("s" + cur).classList.remove("active");

  const nc = ch[i];
  const activeBg = bgMap[nc] || "shell";

  ["shell", "underground", "arena", "irl", "nextsteps"].forEach((c) => {
    const el = document.getElementById("bg-" + c);
    if (el)
      el.style.opacity =
        c === activeBg ||
        ((c === "shell" || c === "nextsteps") &&
          (activeBg === "shell" || activeBg === "nextsteps"))
          ? "1"
          : "0";
  });

  document
    .getElementById("citySil")
    .classList[nc === "arena" ? "add" : "remove"]("show");
  document.getElementById("hudCtr").textContent =
    String(i + 1).padStart(2, "0") + "/07";
  document.getElementById("bhudCtr").textContent =
    String(i + 1).padStart(2, "0") + "/07";

  const p = Math.round((i / (T - 1)) * 100);
  const f = document.getElementById("xpFill");
  f.style.width = p + "%";
  if (nc === "underground") f.style.background = "#EC4E20";
  else if (nc === "arena") f.style.background = "#608FE6";
  else if (nc === "irl") f.style.background = "#6D1A36";
  else if (nc === "crisis") f.style.background = "#EC4E20";
  else f.style.background = "#FBAF00";

  updateNav(nc);

  const b = bars[i];
  ["bar0", "bar1", "bar2", "bar3"].forEach((id, j) => {
    document.getElementById(id).style.width = b[j] + "%";
  });
}

/* ── highlight the active nav button for the current chapter ── */
const btnChapterMap = {
  cyph: "cyph",
  founders: "founders",
  irl: "irl",
  partnership: "business",
  close: "close",
};
function updateNav(chapter) {
  document.querySelectorAll(".hud-nav-btn").forEach((btn) => {
    if (btnChapterMap[btn.textContent.trim()] === chapter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/* ── sequential navigation (arrows / bottom buttons) ── */
const SKIP = []; // hidden slides
function go(i) {
  if (busy || i < 0 || i >= T || i === cur) return;
  if (SKIP.includes(i)) {
    i += i > cur ? 1 : -1;
    if (i < 0 || i >= T) return;
  }
  doGo(i);
}

function doGo(i) {
  busy = true;
  _prevCur = cur;
  applySlide(i);
  goTimer = setTimeout(() => {
    goTimer = null;
    document.getElementById("s" + i).classList.add("active");
    cur = i;
    runA(i);
    setTimeout(() => {
      busy = false;
    }, 500);
  }, 180);
}

/* ── direct jump from nav (always works, ignores busy) ── */
function goTo(i) {
  if (i < 0 || i >= T || i === cur) return;
  if (goTimer) {
    clearTimeout(goTimer);
    goTimer = null;
  }
  _prevCur = cur;
  busy = false;

  // Remove active from ALL slides
  for (var j = 0; j < T; j++) {
    var sl = document.getElementById("s" + j);
    if (sl) sl.classList.remove("active");
  }

  // Update backgrounds, HUD, bars
  var nc = ch[i];
  var activeBg = bgMap[nc] || "shell";
  ["shell", "underground", "arena", "irl", "nextsteps"].forEach(function (c) {
    var el = document.getElementById("bg-" + c);
    if (el)
      el.style.opacity =
        c === activeBg ||
        ((c === "shell" || c === "nextsteps") &&
          (activeBg === "shell" || activeBg === "nextsteps"))
          ? "1"
          : "0";
  });
  document
    .getElementById("citySil")
    .classList[nc === "arena" ? "add" : "remove"]("show");
  document.getElementById("hudCtr").textContent =
    String(i + 1).padStart(2, "0") + "/07";
  document.getElementById("bhudCtr").textContent =
    String(i + 1).padStart(2, "0") + "/07";
  var p = Math.round((i / (T - 1)) * 100);
  var f = document.getElementById("xpFill");
  f.style.width = p + "%";
  if (nc === "underground") f.style.background = "#EC4E20";
  else if (nc === "arena") f.style.background = "#608FE6";
  else if (nc === "irl") f.style.background = "#6D1A36";
  else if (nc === "crisis") f.style.background = "#EC4E20";
  else f.style.background = "#FBAF00";
  updateNav(nc);
  var b = bars[i];
  ["bar0", "bar1", "bar2", "bar3"].forEach(function (id, j) {
    document.getElementById(id).style.width = b[j] + "%";
  });

  // Activate target slide
  document.getElementById("s" + i).classList.add("active");
  cur = i;
  runA(i);
}

/* ── fit-to-viewport scaling ──
   visualViewport excludes the iOS Safari address bar / bottom toolbar, so
   it gives us the actually-visible area. innerWidth/Height fall back for
   browsers without visualViewport support. */
function vpWidth() {
  return (
    (window.visualViewport && window.visualViewport.width) || window.innerWidth
  );
}
function vpHeight() {
  return (
    (window.visualViewport && window.visualViewport.height) ||
    window.innerHeight
  );
}
function computeFitScale() {
  return Math.min(vpWidth() / 1440, vpHeight() / 900);
}
function applyFitScale() {
  var shell = document.getElementById("game-shell");
  if (!shell) return;
  shell.style.transform =
    "translate(-50%, -50%) scale(" + computeFitScale() + ")";
}
window.addEventListener("resize", applyFitScale);
window.addEventListener("orientationchange", applyFitScale);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", applyFitScale);
}

/* ── init ── */
document.addEventListener("DOMContentLoaded", () => {
  var shell = document.getElementById("game-shell");
  /* lock button is a dev-only affordance — hide it on the deployed site,
     show only when running locally (localhost / 127.0.0.1 / file://). */
  var host = location.hostname;
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "";
  if (!isLocal) {
    var dc = document.getElementById("deck-controls");
    if (dc) dc.style.display = "none";
  }
  /* trigger the CSS keyframe entrance via --fit-scale. anime.js can't
     interpolate translate percentages so this is CSS-driven. */
  shell.style.setProperty("--fit-scale", computeFitScale());
  shell.classList.add("entered");
  setTimeout(function () {
    applyFitScale();
    runA(0);
  }, 800);

  const s = document.getElementById("citySil");
  [
    30, 50, 25, 65, 40, 55, 35, 72, 42, 30, 58, 45, 68, 35, 55, 42, 30, 50, 38,
    60,
  ].forEach((h) => {
    const d = document.createElement("div");
    d.className = "sil-bldg";
    d.style.width = 12 + Math.random() * 14 + "px";
    d.style.height = h + "px";
    s.appendChild(d);
  });
});

/* ── keyboard navigation ── */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    go(cur + 1);
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    go(cur - 1);
  }
});

/* ── bottom nav buttons ── */
document.getElementById("navNext").addEventListener("click", () => go(cur + 1));
document.getElementById("navPrev").addEventListener("click", () => go(cur - 1));

/* ── per-slide animations ── */
function runA(i) {
  if (lockActive) return;
  const B = "easeOutBack",
    C = "easeOutCubic";
  switch (i) {
    case 0:
      anime({
        targets: "#s0 h1",
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: B,
      });
      anime({
        targets: "#s0 .sub",
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 150,
        easing: C,
      });
      break;
    case 1:
      anime({
        targets: "#charA",
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: B,
      });
      anime({
        targets: "#charB",
        translateX: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 120,
        easing: B,
      });
      setTimeout(() => {
        document.querySelectorAll("#s1 .badge-stat-fill").forEach((bar, j) => {
          anime({
            targets: bar,
            width: bar.dataset.fill + "%",
            duration: 700,
            delay: 100 + j * 80,
            easing: C,
          });
        });
      }, 400);
      break;
    case 2:
      /* IRL: how-it-works. fade headline then stagger the three columns. */
      anime({
        targets: "#s2 h2, #s2 > div > p",
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(120),
        easing: C,
      });
      anime({
        targets: "#s2 [style*='grid-template-columns: 1fr 1fr 1fr'] > div",
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(140, { start: 300 }),
        easing: B,
      });
      break;
    case 3:
      /* partner rooms: isometric platforms stagger up, legend fades in */
      anime({
        targets: "#s3 .venue-iso-scene > div",
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 650,
        delay: anime.stagger(140, { start: 100 }),
        easing: B,
      });
      anime({
        targets: "#s3 > div > div:last-child > div > div",
        translateX: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: anime.stagger(100, { start: 400 }),
        easing: C,
      });
      break;
    case 4:
      /* what we bring: four event cards (2x2 grid) */
      anime({
        targets: "#s4 [style*='grid-template-columns: 1fr 1fr'] > div",
        translateY: [14, 0],
        opacity: [0, 1],
        duration: 450,
        delay: anime.stagger(140, { start: 150 }),
        easing: B,
      });
      break;
    case 5:
      /* flywheel: timeline rail + 3 phase columns */
      anime({
        targets: "#s5 [style*='grid-template-columns: 1fr 1fr 1fr'] > div",
        translateY: [14, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(160, { start: 150 }),
        easing: B,
      });
      break;
    case 6:
      anime({
        targets: "#s6 h1",
        translateY: [12, 0],
        opacity: [0, 1],
        duration: 600,
        easing: C,
      });
      anime({
        targets: "#s6 .sub",
        opacity: [0, 1],
        duration: 500,
        delay: 300,
        easing: C,
      });
      break;
  }
}

/* ═══ LOCK MODE ═══ */
var lockActive = false;

function toggleLock() {
  lockActive = !lockActive;
  var btn = document.getElementById("lock-btn");

  if (lockActive) {
    /* finish all running anime.js animations instantly */
    anime.running.forEach(function (a) {
      a.seek(a.duration);
    });

    /* ensure all route lines on s6 are fully drawn */
    ["philosophy", "sports", "theology", "architecture"].forEach(function (r) {
      var line = document.getElementById("route-" + r);
      if (line) line.style.strokeDashoffset = "0";
    });
    /* ensure all stops and stop-text visible */
    document.querySelectorAll(".stop, .stop-text").forEach(function (el) {
      el.style.opacity = "1";
    });

    /* ensure iso layers on s5 are visible at current step */
    var anno = document.getElementById("layerAnno");
    if (anno) anno.style.opacity = "1";

    /* ensure quest paths filled */
    document.querySelectorAll(".quest-dot").forEach(function (d) {
      d.classList.add("complete");
    });
    document.querySelectorAll(".quest-path").forEach(function (p) {
      p.classList.add("filled");
    });

    /* force all animated elements to final opacity/transform */
    document
      .querySelectorAll("#s0 h1, #s0 .sub, #s0 .cbadge")
      .forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    document.querySelectorAll("#charA, #charB").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#s1 .badge-stat-fill").forEach(function (bar) {
      if (bar.dataset.fill) bar.style.width = bar.dataset.fill + "%";
    });
    document.querySelectorAll("#s2 .crisis-item").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#s2 .threat-fill").forEach(function (b) {
      if (b.dataset.fill) b.style.width = b.dataset.fill + "%";
    });
    document.querySelectorAll("#s3 .tl-item").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#s4 h1, #s4 .sub").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".iso-layer").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document
      .querySelectorAll("#s7 .transit-map-panel, #s7 .inv-sub-card")
      .forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    document
      .querySelectorAll("#s8 .game-panel, .arena-col .arena-card")
      .forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    document.querySelectorAll(".card-stack").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document
      .querySelectorAll("#s10 .game-panel, #s10 .biz-main, #s10 .biz-card")
      .forEach(function (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    document.querySelectorAll("#s11 .user-row").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#questChain .quest-node").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#s13 .test-bubble").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll("#s14 h1, #s14 .sub").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });

    /* swap inverted images to pre-inverted versions (html2canvas can't do filter:invert) */
    var invertMap = {
      "assets/brands/schomburg.png": "assets/brands/schomburg_inv.png",
      "assets/brands/internet_archive.png":
        "assets/brands/internet_archive_inv.png",
      "assets/brands/fifa.png": "assets/brands/fifa_inv.png",
      "assets/brands/irl/3rdspace.png": "assets/brands/irl/3rdspace_inv.png",
    };
    document.querySelectorAll('img[style*="invert"]').forEach(function (img) {
      var src = img.getAttribute("src");
      if (invertMap[src]) {
        img.dataset.origSrc = src;
        img.setAttribute("src", invertMap[src]);
        img.style.filter = "none";
      }
    });

    /* fix infinity gradient — use solid color fallback */
    var numEl = document.getElementById("layerNum");
    if (numEl) numEl.style.color = "#608FE6";

    document.body.classList.add("locked");
    btn.classList.add("active");
    btn.innerHTML = "&#x1f513;";
  } else {
    /* restore inverted images */
    document.querySelectorAll("img[data-orig-src]").forEach(function (img) {
      img.setAttribute("src", img.dataset.origSrc);
      img.style.filter = "invert(1)";
      img.removeAttribute("data-orig-src");
    });

    document.body.classList.remove("locked");
    btn.classList.remove("active");
    btn.innerHTML = "&#x1f512;";
  }
}
