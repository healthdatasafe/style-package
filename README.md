# hds-style

Shared Tailwind theme, color palettes, and Flowbite configuration for Health Data Safe applications.

## Install

```bash
npm install git+https://github.com/healthdatasafe/style-package.git
```

React apps should also install:
```bash
npm install flowbite-react
```

## Usage

In your app's main CSS file:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import "tailwindcss";
@import "hds-style/css/theme.css";
@import "hds-style/css/palettes.css";
```

**Important**: The Google Fonts `@import url()` must come before `@import "tailwindcss"` (CSS spec requires `@import` rules to precede all other rules).

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

- **Fonts**: Inter (body text) + Inter Tight (headings/display) — apps add the Google Fonts `@import url()` in their CSS
- **Default font weight**: 300 (light)
- **Tailwind plugins**: `@tailwindcss/typography`, `flowbite/plugin`
- **Dark mode variant**: `dark:` classes work with `.dark` on ancestor

### palettes.css

Three color palettes, each setting CSS custom properties:

| Palette | Class | Primary | Use case |
|---|---|---|---|
| Doctor light | `.palette-doctor` | Blue (#1C64F2) | Doctor/clinical apps |
| Patient light | `.palette-patient` | Teal (#0D9488) | Patient-facing apps |
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
