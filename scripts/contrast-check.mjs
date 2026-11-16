#!/usr/bin/env node
// WCAG 2.x contrast check of the palettes in css/palettes.css. `npm test`. Red on any pair below its minimum,
// except the known ones listed in KNOWN (each with the release that fixes it).
// Text: 4.5:1. Controls and focus rings (non-text): 3:1. Decorative tokens are not checked.
// A background written `token/10 surface` is the token at 10% over that surface (a tinted badge or alert).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(path.join(ROOT, 'css/palettes.css'), 'utf8');

// A compound block (`.palette-patient.palette-dark`) overrides its last class, so it is checked on top of it.
const palettes = {};
for (const m of css.matchAll(/^\.([a-z-.]+)\s*\{([^}]*)\}/gm)) {
  const base = m[1].includes('.') ? palettes[m[1].split('.').pop()] : {};
  const vars = palettes[m[1]] = { ...base };
  for (const v of m[2].matchAll(/(--hds-[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})\b/g)) vars[v[1]] = v[2];
}

const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// `success/10 muted`: the token at 10% over a surface, as Tailwind's `bg-success/10` on it (blended in sRGB).
const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const over = (top, pct, under) => {
  const [t, u] = [rgb(top), rgb(under)];
  return `#${t.map((c, i) => Math.round((pct / 100) * c + (1 - pct / 100) * u[i]).toString(16).padStart(2, '0')).join('')}`;
};
const resolve = (v, spec) => {
  const m = spec.match(/^([a-z0-9-]+)\/(\d+) ([a-z0-9-]+)$/);
  if (!m) return v[`--hds-${spec}`];
  const [top, under] = [v[`--hds-${m[1]}`], v[`--hds-${m[3]}`]];
  return top && under ? over(top, Number(m[2]), under) : undefined;
};

// [foreground, background, minimum]
const TEXT = 4.5; const UI = 3;
const SURFACES = ['card', 'background', 'muted'];
// A status role is text on each surface and on its own 10% tint over it, and a fill under its -foreground.
const status = (role) => [
  [`${role}-foreground`, role, TEXT],
  ...SURFACES.flatMap((s) => [[role, s, TEXT], [role, `${role}/10 ${s}`, TEXT]]),
];
const PAIRS = [
  ['foreground', 'background', TEXT],
  ['card-foreground', 'card', TEXT],
  ['primary-foreground', 'primary', TEXT],
  ['primary', 'card', TEXT],
  ['primary', 'background', TEXT],
  ['primary', 'muted', TEXT],
  ['secondary-foreground', 'secondary', TEXT],
  ['muted-foreground', 'muted', TEXT],
  ['muted-foreground', 'card', TEXT],
  ['accent-foreground', 'accent', TEXT],
  ['destructive-foreground', 'destructive', TEXT],
  ['destructive', 'card', TEXT],
  ['destructive', 'background', TEXT],
  ['destructive', 'muted', TEXT],
  ['ring', 'card', UI],
  ['input', 'card', UI],
  ['input', 'background', UI],
  ['input', 'muted', UI],
  ['text-body', 'card', TEXT],
  ['text-faint', 'card', TEXT],
  ['text-faint', 'background', TEXT],
  ['control-off', 'card', UI],
  ['control-off', 'background', UI],
  ['warning', 'card', TEXT],
  ['warning', 'warning-bg', TEXT],
  ...status('success'),
  ...status('info'),
  // Red text on red tint: on the destructive tint (`bg-destructive/10`) and on its own, over each surface.
  ...SURFACES.flatMap((s) => [['destructive-text', s, TEXT], ['destructive-text', `destructive/10 ${s}`, TEXT],
    ['destructive-text', `destructive-text/10 ${s}`, TEXT]]),
];
// Known failures, kept visible: `palette pair` -> why it stays, or the release that fixes it.
// Red text on muted: `--hds-destructive` stays as it is (fills, borders, text on card); text on a muted
// surface takes `--hds-destructive-text` (0.6.0), checked above.
const ON_MUTED = 'by design, red text on muted uses destructive-text';
const KNOWN = Object.fromEntries(['palette-doctor', 'palette-patient', 'palette-dark', 'palette-patient.palette-dark']
  .map((p) => [`${p} destructive/muted`, ON_MUTED]));

let failed = 0;
for (const [name, v] of Object.entries(palettes)) {
  console.log(`\n${name}`);
  for (const [fg, bg, min] of PAIRS) {
    const a = resolve(v, fg); const b = resolve(v, bg);
    if (!a || !b) continue;
    const r = ratio(a, b);
    const key = `${name} ${fg}/${bg}`;
    const ok = r >= min;
    const mark = ok ? '✓' : KNOWN[key] ? '~' : '✗';
    if (!ok && !KNOWN[key]) failed++;
    console.log(`  ${mark} ${fg} ${a} on ${bg} ${b}: ${r.toFixed(2)}:1 (min ${min})${!ok && KNOWN[key] ? `  known: ${KNOWN[key]}` : ''}`);
  }
}
console.log(failed ? `\n${failed} pair(s) below the minimum` : '\nAll pairs meet their minimum (known ones marked ~)');
process.exit(failed ? 1 : 0);
