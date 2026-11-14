# hds-style

Shared Tailwind theme, color palettes, and Flowbite configuration for Health Data Safe applications.

## Install

Pin a release tag, so each app adopts a new release on purpose:

```bash
npm install 'hds-style@github:healthdatasafe/style-package#0.4.0'
```

React apps should also install:
```bash
npm install flowbite-react
```

## Usage

Add Google Fonts in your HTML `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" />
```

In your app's main CSS file:

```css
@import "tailwindcss";
@import "hds-style/css/theme.css";
@import "hds-style/css/palettes.css";
/* optional */
@import "hds-style/css/tailwind-map.css";  /* bg-primary, text-foreground, text-body... follow the palette */
@import "hds-style/css/utilities.css";     /* tap-target, .dialog-panel */
```

Then apply a palette class on your root `<html>` element:

```html
<!-- Doctor-facing apps (blue accent) -->
<html class="palette-doctor">

<!-- Patient-facing apps (teal accent) -->
<html class="palette-patient">

<!-- Dark mode (any app type) -->
<html class="palette-dark">
```

## What's included

### theme.css

- **Fonts**: `font-sans` and `font-body` Inter; `font-display` Inter Tight for display titles, and `h1` in it (0.4.0)
  — apps load both families (Google Fonts link above)
- **No contextual alternates**: `font-variant-ligatures: no-contextual` on `html`, so Inter does not draw an `x` between figures as `×` in usernames, emails or codes
- **Tailwind plugins**: `@tailwindcss/typography`, `flowbite/plugin`
- **Dark mode variant**: `dark:` classes work with `.dark` on ancestor

### palettes.css

Three color palettes, each setting CSS custom properties:

| Palette | Class | Primary | Use case |
|---|---|---|---|
| Doctor light | `.palette-doctor` | Blue (#1C64F2) | Doctor/clinical apps |
| Patient light | `.palette-patient` | Teal (#0B7A70) | Patient-facing apps |
| Dark universal | `.palette-dark` | Blue (#3F83F8) | Dark mode for any app |

#### CSS custom properties

Each palette provides:
- `--hds-primary`, `--hds-primary-foreground`
- `--hds-background`, `--hds-foreground`
- `--hds-card`, `--hds-card-foreground`
- `--hds-secondary`, `--hds-secondary-foreground`
- `--hds-muted`, `--hds-muted-foreground`
- `--hds-accent`, `--hds-accent-foreground`
- `--hds-destructive`, `--hds-destructive-foreground`
- `--hds-border`, `--hds-input`, `--hds-ring`
- `--hds-chart-1` through `--hds-chart-10` (data visualization)

Colour roles (patient from 0.3.0, doctor from 0.4.0; dark follows): `--hds-text-body` (running text),
`--hds-text-faint` (placeholders, hints), `--hds-tint-border` (decorative edge), `--hds-control-off` (a switch turned
off), `--hds-warning` / `--hds-warning-bg`, `--hds-toast` (toast background, white text), `--hds-scrim` (behind a
pop-up).

Contrast: `npm test` checks every palette against WCAG (4.5:1 text, 3:1 controls).

### tailwind-map.css (optional)

Maps the palette to Tailwind colour names: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`,
`muted`, `accent`, `destructive` (each with `-foreground`), `border`, `input`, `ring`, and the roles `body`, `faint`,
`tint-border`, `control-off`, `warning`, `warning-bg`, `toast`, `scrim`. Also radii (`rounded` 1rem, `rounded-md`
0.75rem, `rounded-lg` 1rem) and `animate-hds-fade` / `animate-hds-rise`.

### utilities.css (optional)

- `tap-target` / `tap-target-lg`: an invisible 44 / 48 px touch area around a control drawn smaller.
- `.dialog-panel`: the pop-up card (1 rem margin and 22 rem on a phone, 32 rem from 640 px).

Use in Tailwind:
```html
<div class="bg-[var(--hds-background)] text-[var(--hds-foreground)]">
  <button class="bg-[var(--hds-primary)] text-[var(--hds-primary-foreground)]">
    Click me
  </button>
</div>
```

## Images (icons, logos)

Images are **not** included in this package. They are served from:

```
https://style.datasafe.dev/images/icons/       — Flowbite SVG icons
https://style.datasafe.dev/images/logos/        — HDS logos (all formats)
https://style.datasafe.dev/images/logos/favicon/ — Favicons
```

Browse all available assets at [style.datasafe.dev](https://style.datasafe.dev).
