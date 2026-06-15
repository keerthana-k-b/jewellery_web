---
name: Aethelgard Light
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4d4635'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#e9c349'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5e604d'
  on-tertiary: '#ffffff'
  tertiary-container: '#b4b49d'
  on-tertiary-container: '#454634'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system embodies a "Contemporary Heritage" aesthetic, pivoting from a dark, mysterious atmosphere to an illuminated, high-end editorial experience. It targets a sophisticated audience that values provenance, luxury, and clarity. 

The style is a fusion of **Minimalism** and **Tactile Luxury**. It utilizes expansive white space (the "Alabaster" foundation) paired with delicate, high-contrast accents. The emotional response should be one of "composed excellence"—feeling both historic and fresh. Elements are defined by fine "hairline" strokes and subtle depth rather than heavy blocks of color.

## Colors
The palette is rooted in light-reflective surfaces to enhance the sense of space and premium quality.
- **Foundation:** Pure #FFFFFF for primary backgrounds, transitioning to #FAFAFA for subtle sectioning, and #F5F5DC (Cream) for elevated surface containers or tooltips.
- **Primary Accent:** #D4AF37 (Metallic Gold) is used sparingly for interactive highlights, active states, and decorative borders.
- **Ink:** #1A1A1A (Deep Charcoal) provides the primary contrast for typography, ensuring WCAG AAA legibility.
- **Accents:** Use a 10% opacity version of the gold for hover states on light surfaces.

## Typography
Typography is the primary vehicle for the brand's heritage feel. 
- **Headlines:** Playfair Display provides a high-contrast, serif elegance. Use tight letter-spacing for large display titles to maintain a modern editorial look.
- **Body:** Source Serif 4 is chosen for its exceptional readability in long-form content, maintaining the scholarly/literary tone of the design system.
- **Labels:** Source Sans 3 provides a functional, neutral counterpoint for metadata, navigation, and buttons, often set in uppercase with increased tracking for a refined "engraved" appearance.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to preserve the intentionality of a printed book or luxury magazine. 
- **Desktop:** A 12-column grid with a maximum width of 1200px. Content is centered with generous 64px outer margins to create a "frame" effect.
- **Mobile:** A 4-column fluid grid.
- **Rhythm:** Spacing follows an 8px base unit. Use larger "hero" gaps (80px+) between major sections to emphasize the minimalist, airy nature of the light theme. Vertical rhythm is critical; prioritize generous line-heights and whitespace over dense information density.

## Elevation & Depth
In this light theme, depth is achieved through **Tonal Layers** and **Fine Outlines** rather than heavy shadows.
- **Surface Tiers:** Background is #FFFFFF. Floating cards or modally-distinct areas use #FAFAFA with a 1px solid border in #D4AF37 at 30% opacity.
- **Shadows:** Use "Ambient Whispers"—very light, highly diffused shadows (e.g., `0 10px 30px rgba(26, 26, 26, 0.04)`).
- **Hairlines:** Separation is often achieved by a single 0.5pt horizontal or vertical line in light gold or soft grey, mimicking the layout of a classic newspaper or high-end ledger.

## Shapes
The design system employs **Sharp (0)** roundedness. Right angles communicate architectural precision and traditional authority. Buttons, input fields, and cards should all feature crisp 90-degree corners. This sharpness contrasts beautifully with the organic curves of the Playfair Display serifs.

## Components
- **Buttons:** Primary buttons are #1A1A1A (Deep Charcoal) with #FFFFFF text for maximum impact, or #FFFFFF with a #D4AF37 1px border for secondary actions. Text is always uppercase Label-SM.
- **Input Fields:** Minimalist design with only a bottom border (1px) in light grey, turning Gold (#D4AF37) on focus. Labels sit above the field in Source Sans 3.
- **Cards:** No background color (transparent) or #FAFAFA. Defined by a 1px Gold hairline border. Avoid heavy drop shadows; use a slight 2px offset gold shadow for a "pressed" effect on click.
- **Chips/Tags:** Small, sharp-edged boxes with a #F5F5DC (Cream) background and #1A1A1A text.
- **Lists:** Separated by thin, full-width horizontal hairlines. Hover states should subtly transition the background to #F5F5DC.
- **Interactive Elements:** All hover states for links and icons should transition to #D4AF37.