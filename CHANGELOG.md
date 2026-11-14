# Changelog

## [Unreleased]

## [0.5.1] - 2026-11-14

### Fixed
- Dark primary and ring `#84B4FB` (0.5.0: `#76A9FA`): primary as text on muted, as in an active tab, was 4.3:1; now
  4.9:1 (7.0:1 on card, 8.1:1 under its `#111827` text). `npm test` now also checks primary on background and on
  muted.

## [0.5.0] - 2026-11-14

Plan 121, third step: dark comes back as shared tokens. **Visible** only in apps that use `.palette-dark`.

### Added
- **Patient dark**: `.palette-patient.palette-dark` (a patient app keeps `palette-patient` and adds `palette-dark`)
  gives teal instead of blue: primary, accent-foreground and ring `#2DD4BF` with `#042F2E` text on primary (7.8:1),
  tint-border `#134E4A`, toast `#115E59`.
- Colour roles in `.palette-dark`: text-body `#D1D5DB`, text-faint `#9CA3AF`, tint-border `#1E3A8A`, control-off
  `#7D8590`, warning `#FBBF24` on warning-bg `#422006`, toast `#1E429F`, scrim `rgba(0, 0, 0, 0.6)`.
- Tailwind's `dark:` variant also matches `.palette-dark` (it matched `.dark` only), so hds-forms-js (`dark:`
  classes) and token-based components follow one class. Apps that set both are unaffected.

### Fixed
- **Dark palette contrast** (WCAG AA): primary `#76A9FA` (was `#3F83F8`) with `#111827` text on it (was white,
  3.6:1; now 7.5:1), and 6.2:1 as text on the card (was 4.1:1); destructive `#F98080` (was `#F05252`) with `#111827`
  text (was white, 3.5:1; now 7.1:1), 5.9:1 on the card (was 4.2:1); ring follows primary. No blue or red holds 4.5:1
  both with white text and as text on the dark card, hence the dark text. **Apps that put `text-white` on
  `bg-primary` or `bg-destructive` in dark must switch to the `-foreground` token when they adopt 0.5.0.**
- `npm test` checks a compound palette on top of the one it overrides; no known failures left.

## [0.4.0] - 2026-11-14

Plan 121, second step: the patient look becomes the patient palette. **Visible**: patient apps' colours, and the text
font of every app that does not set its own.

### Changed
- **Patient palette v2** in `.palette-patient` (hds-webapp's values): background `#FAFAFA` (was mint `#F0FDFA`),
  card-foreground `#111827`, secondary and accent `#F0FDF9` with `#0B7A70` text, muted `#F1F5F9`, border and input
  `#E5E7EB`, destructive `#DC2626`. Primary, foreground, muted-foreground and ring unchanged. Every text pair still
  4.5:1 or more (`npm test`).
- **Text in Inter**: `--font-sans` is Inter first (was Inter Tight), so `font-sans` and the default body font are
  Inter. Inter Tight stays for display titles (`font-display`).
- `h1` uses `--font-display` (base layer, so a utility still overrides it).

### Added
- Colour roles in `.palette-doctor`: as patient, with `--hds-tint-border` `#BFDBFE` and `--hds-toast` `#1E429F`
  (white text 9.0:1).

## [0.3.0] - 2026-11-13

Plan 121, first step of promoting hds-webapp's patient look: additive only, nothing changes on screen for an app that
only re-pins.

### Added
- Colour roles in `.palette-patient` (hds-webapp's values): `--hds-text-body`, `--hds-text-faint`,
  `--hds-tint-border`, `--hds-control-off`, `--hds-warning`, `--hds-warning-bg`, `--hds-toast`, `--hds-scrim`. Doctor
  and dark values follow in a later release.
- `--font-display` (Inter Tight) and the `font-display` class, for display titles.
- `css/tailwind-map.css` (opt-in): the `--color-* → --hds-*` mapping every Tailwind consumer copied, the colour roles
  (with fallbacks for palettes without them), radii (`--radius` 1rem, `-md` 0.75rem, `-lg` 1rem) and the motion
  presets `animate-hds-fade` / `animate-hds-rise`.
- `css/utilities.css` (opt-in): `tap-target` / `tap-target-lg` (44 / 48 px touch area) and `.dialog-panel`.
- `npm test`: WCAG contrast check of every palette (`scripts/contrast-check.mjs`); known failures are listed with the
  release that fixes them.

### Fixed
- Doctor palette accent text meets WCAG AA: `--hds-accent-foreground` is `#1A56DB` (was `#1C64F2`, 4.3:1 on
  `--hds-accent` `#E5EDFF`): 5.3:1. Found by the new contrast check. Still failing, fixed in the dark release: dark
  primary for white text and as text on cards, dark destructive (listed as known in the check).

### Removed
- `--font-weight: 300` in `theme.css`: not a Tailwind variable, nothing read it (no consumer, no utility), so text was
  never light by default as the README said.

## [0.2.5] - 2026-11-12

### Fixed
- Form controls follow the palette (B-2026-10-27-21): flowbite's plugin hard-wires its form base styles to blue-600,
  so checked checkboxes and radios, their focus ring, text fields' focus ring and border, and range thumbs were
  off-palette blue in the patient palette. `theme.css` now sets them from `--hds-primary` / `--hds-ring` (blue-600
  when no palette class is set), in the base layer with `html` in front so they outrank flowbite's rules there while
  any utility still overrides them. Checked in a hds-webapp build: both rules in `@layer base`, the palette one wins.

## [0.2.4] - 2026-11-06

### Fixed
- Patient palette teal meets WCAG AA (B-2026-11-06-4): `--hds-primary` and `--hds-accent-foreground` are `#0B7A70`
  (was `#0D9488`, 3.7:1 on white and for white text on it, 3.3:1 on `--hds-muted`): 4.6:1 on muted and secondary,
  5.2:1 on white, the value hds-webapp already set locally. The focus ring (`--hds-ring`) and `--hds-chart-1` keep
  `#0D9488` (not text).

## [0.2.3] - 2026-11-06

### Fixed
- Patient and dark palettes' muted text meets WCAG AA (4.5:1 for small text), as the doctor palette's did in 0.2.2
  (B-2026-11-03-5). Patient `--hds-muted-foreground` is `#4F7471` (was `#5F8B87`, 3.3:1 on `--hds-muted`, 3.8:1 on
  white): the value hds-webapp already set locally, now 4.5:1 on muted and secondary, 5.2:1 on white. Dark
  `--hds-muted-foreground` is `#B2B8C2` (was `#9CA3AF`, 4.1:1 on `--hds-muted` / `--hds-secondary`): 5.2:1 there,
  7.4:1 on cards.

## [0.2.2] - 2026-11-03

### Fixed
- Doctor palette muted text meets WCAG AA: `--hds-muted-foreground` is `#4B5563` (was `#6B7280`, 4.4:1 on
  `--hds-muted` and 4.0:1 on `--hds-secondary`, below 4.5:1 for small text). Seen by axe on the doctor
  dashboard's patient page (section labels, inactive tabs, the patient's name over the chat).

## [0.2.1] - 2026-10-27

### Fixed
- Identifiers render literally: contextual alternates (`calt`) are off for the whole page
  (`font-variant-ligatures: no-contextual` on `html`, inherited by form fields), so Inter no longer draws
  an `x` between figures as `×` (a username `m2x9` read `m2×9`).
- `--font-mono` generic keywords unquoted, so `font-mono` falls back to a monospace font.
- `package.json` version caught up with this changelog (it still read 0.1.0).

## [0.2.0] - 2026-03-10

### Added
- Tailwind `primary-*` color scale for palette-aware theming

### Fixed
- Patient palette muted contrast

## [0.1.0] - 2026-02-12

### Added
- Initial release
- npm-importable CSS theme for HDS applications
- Color palettes (patient, doctor) with CSS custom properties
- Flowbite configuration
- Google Fonts integration via HTML `<link>` tag (not CSS `@import`)
- Theme CSS with typography, spacing, and component styles
