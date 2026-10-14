// Zastępcze ilustracje SVG biżuterii (do czasu dodania prawdziwych zdjęć).
const GOLD = "#d4b06a";
const GOLD_DARK = "#a98550";

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  return "#" + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => c(v).toString(16).padStart(2, "0")).join("");
}

const ART = {
  moon: `<path d="M120 60 Q200 250 280 60" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <path d="M205 215 a42 42 0 1 0 28 62 a34 34 0 1 1 -28 -62z" fill="${GOLD}"/>`,
  drop: `<path d="M120 60 Q200 230 280 60" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <path d="M200 205 C170 245 165 285 200 300 C235 285 230 245 200 205Z" fill="${GOLD}"/>`,
  leaf: `<path d="M100 70 Q200 260 300 70" fill="none" stroke="${GOLD}" stroke-width="3"/>
    ${[0, 1, 2, 3, 4].map((i) => {
      const t = 0.3 + i * 0.1, x = 100 + 200 * t, y = 70 + 2 * 190 * t * (1 - t) * 1.0;
      return `<ellipse cx="${x}" cy="${y + 14}" rx="9" ry="20" transform="rotate(${(t - 0.5) * -70} ${x} ${y + 14})" fill="${GOLD}"/>`;
    }).join("")}`,
  discs: [105, 295].map((x) => `<line x1="${x}" y1="80" x2="${x}" y2="130" stroke="${GOLD}" stroke-width="3"/>
    <circle cx="${x}" cy="175" r="44" fill="${GOLD}"/><circle cx="${x}" cy="175" r="44" fill="none" stroke="${GOLD_DARK}" stroke-width="2" stroke-dasharray="3 7"/>`).join(""),
  drops: [110, 290].map((x) => `<line x1="${x}" y1="70" x2="${x}" y2="120" stroke="${GOLD}" stroke-width="3"/>
    <path d="M${x} 120 C${x - 35} 190 ${x - 30} 260 ${x} 275 C${x + 30} 260 ${x + 35} 190 ${x} 120Z" fill="${GOLD}"/>`).join(""),
  crescents: [115, 285].map((x) => `<line x1="${x}" y1="90" x2="${x}" y2="140" stroke="${GOLD}" stroke-width="3"/>
    <path d="M${x} 150 a40 40 0 1 0 30 68 a32 32 0 1 1 -30 -68z" fill="${GOLD}"/>`).join(""),
  "ring-plain": `<ellipse cx="200" cy="215" rx="85" ry="75" fill="none" stroke="${GOLD}" stroke-width="12"/>
    <path d="M190 148 q-20 -25 -5 -45 M205 148 q20 -25 5 -45" fill="none" stroke="${GOLD}" stroke-width="4"/>`,
  "ring-pearl": `<ellipse cx="200" cy="230" rx="85" ry="75" fill="none" stroke="${GOLD}" stroke-width="10"/>
    <ellipse cx="200" cy="150" rx="46" ry="38" fill="#f4efe8" stroke="${GOLD}" stroke-width="8"/>
    <ellipse cx="188" cy="140" rx="14" ry="8" fill="#fff" opacity=".7"/>`,
  "ring-teal": `<ellipse cx="200" cy="230" rx="85" ry="75" fill="none" stroke="${GOLD}" stroke-width="10"/>
    <ellipse cx="200" cy="150" rx="46" ry="38" fill="#3d8c86" stroke="${GOLD}" stroke-width="8"/>
    <path d="M170 150 q20 -18 40 0 q-20 14 -40 0z" fill="#8fd0c5" opacity=".6"/>`,
  bracelet: `<ellipse cx="200" cy="200" rx="115" ry="95" fill="none" stroke="${GOLD}" stroke-width="22"/>
    <path d="M95 200 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" transform="translate(-10 70)" fill="none" stroke="${GOLD_DARK}" stroke-width="3"/>`,
  "bracelet-beads": `<path d="M95 100 Q200 330 305 100" fill="none" stroke="${GOLD}" stroke-width="3"/>
    ${[...Array(9)].map((_, i) => {
      const t = 0.08 + i * 0.105, x = 95 + 210 * t, y = 100 + 2 * 230 * t * (1 - t);
      const col = ["#5d8f7b", "#b9855a", "#e3d6bd", "#3d8c86", "#c7a06a"][i % 5];
      return `<circle cx="${x}" cy="${y + 4}" r="15" fill="${col}"/>`;
    }).join("")}`
};

function artSvg(kind, tone) {
  const light = shade(tone, 38), dark = shade(tone, -28);
  return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="g-${kind}-${tone.slice(1)}" cx="35%" cy="30%" r="90%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>
    <rect width="400" height="400" fill="url(#g-${kind}-${tone.slice(1)})"/>
    <path d="M0 330 Q120 290 220 330 T400 310 V400 H0Z" fill="#000" opacity=".08"/>
    <g>${ART[kind] || ""}</g></svg>`;
}

function productImage(p) {
  return p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : artSvg(p.art, p.tone);
}
