# Changelog

## [Unreleased]

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
