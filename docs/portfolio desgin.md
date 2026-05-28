---
version: alpha
name: Grey-portfolio-design-system
description: "A dark cinematic personal portfolio system for Grey, a Web3 product designer. The visual language is minimal, premium, editorial, and motion-led, inspired by dennissnellenberg.com for page rhythm and interaction pacing, with Linear and Coinbase as product-fintech references. The canvas is near-black, typography is large and high-contrast, secondary text stays quiet grey, and Gate green / blue accents are used only for moments of signal. The system avoids generic SaaS cards, purple gradients, crowded layouts, and AI-looking interface patterns."

style:
  keywords:
    - dark
    - cinematic
    - minimal
    - premium
    - Web3
    - editorial
  tone: Quiet confidence, product clarity, fintech precision, cinematic pacing.
  density: Spacious, focused, high-impact.
  personality: Premium Web3 product designer with a strong motion and systems sensibility.

reference:
  motion:
    source: dennissnellenberg.com
    principles:
      - Smooth page rhythm with generous vertical pacing.
      - Fade-up reveals that feel intentional and slow enough to read.
      - Hover motion that adds tactility without becoming decorative.
      - Large type and visuals leading the narrative.
  product-feeling:
    sources:
      - Linear
      - Coinbase
    principles:
      - Product-first surfaces with crisp hierarchy.
      - Fintech-grade trust and restraint.
      - Minimal chrome, strong content framing, no visual clutter.
      - Accent color as signal, not decoration.

colors:
  canvas: "#050505"
  canvas-elevated: "#0d0d0c"
  surface: "#141414"
  surface-soft: "#1c1c1c"
  ink: "#ffffff"
  ink-soft: "#f1f1f1"
  ink-muted: "#a6a6a6"
  ink-subtle: "#707070"
  hairline: "#2a2a2a"
  hairline-soft: "rgba(255,255,255,0.12)"
  gate-green: "#00b276"
  gate-blue: "#1f7aff"
  accent-green-soft: "rgba(0,178,118,0.16)"
  accent-blue-soft: "rgba(31,122,255,0.16)"
  danger: "#ff4d3d"

typography:
  display-hero:
    fontFamily: "Editorial serif or premium grotesk display"
    fontSize: "clamp(64px, 12vw, 190px)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  display-xl:
    fontFamily: "Editorial serif or premium grotesk display"
    fontSize: "clamp(48px, 8vw, 128px)"
    fontWeight: 500
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, Geist, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 64px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  body-large:
    fontFamily: "Inter, Geist, system-ui, sans-serif"
    fontSize: "clamp(20px, 2.4vw, 36px)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, Geist, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "Inter, Geist, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.14em"
    textTransform: uppercase
  mono:
    fontFamily: "JetBrains Mono, IBM Plex Mono, monospace"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

spacing:
  page-x: "clamp(18px, 3vw, 44px)"
  section-y: "clamp(86px, 12vw, 170px)"
  section-y-large: "clamp(110px, 16vw, 220px)"
  stack-xs: 8px
  stack-sm: 16px
  stack-md: 28px
  stack-lg: 48px
  stack-xl: 80px

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  pill: 999px

layout:
  hero:
    background: Full-bleed dark video or large visual with cinematic overlay.
    typography: Oversized title, short strategic positioning line, sparse metadata.
    rhythm: First viewport should feel immersive, not like a SaaS landing page.
  work:
    structure: Large editorial case-study rows with strong visual panels.
    cards: Use only when presenting actual work modules, not generic feature blocks.
    imagery: Large, dark, product-led visuals; avoid decorative mockups.
  content:
    hierarchy: One dominant idea per section.
    whitespace: Generous, especially around headings and visuals.
    borders: Hairline dividers, subtle contrast, no heavy outlines.

motion:
  principles:
    - Smooth page transitions.
    - Fade-up reveal on section entry.
    - Image hover scale between 1.02 and 1.06.
    - Magnetic interaction on primary buttons or project links.
    - Video and large visual motion should feel slow, grounded, and cinematic.
  easing:
    primary: "cubic-bezier(0.22, 1, 0.36, 1)"
    hover: "cubic-bezier(0.16, 1, 0.3, 1)"
  duration:
    reveal: "700ms-1000ms"
    hover: "350ms-600ms"
    page-transition: "900ms-1200ms"
  avoid:
    - Exaggerated animation.
    - Bouncy easing.
    - Constant moving decoration.
    - Scroll-jacking that makes reading harder.

components:
  navigation:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    typography: "{typography.caption}"
    borderBottom: "1px solid {colors.hairline-soft}"
    height: 80px
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
    hoverBackgroundColor: "{colors.gate-green}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.none}"
    padding: "15px 23px"
    hoverBorderColor: "{colors.gate-blue}"
  project-panel:
    backgroundColor: "{colors.canvas-elevated}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.none}"
    padding: "{spacing.stack-lg}"
    motion: "fade-up reveal, image hover scale"
  visual-frame:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    border: "1px solid {colors.hairline-soft}"
    rounded: "{rounded.none}"
    overlay: "cinematic black gradient"
  metric:
    textColor: "{colors.ink}"
    labelColor: "{colors.ink-muted}"
    typographyValue: "{typography.display-xl}"
    typographyLabel: "{typography.caption}"
  service-row:
    backgroundColor: transparent
    textColor: "{colors.ink-soft}"
    borderTop: "1px solid {colors.hairline-soft}"
    typography: "{typography.headline}"

interaction:
  hover:
    links: Underline draw or subtle opacity shift.
    visuals: Scale image or video container slightly, keep text stable.
    buttons: Magnetic pull may be used on pointer devices only.
  focus:
    color: "{colors.gate-blue}"
    outline: "1px solid {colors.gate-blue}"
    offset: 4px
  accessibility:
    contrast: Maintain strong contrast on black backgrounds.
    reducedMotion: Disable large transforms and long transitions when requested.

avoid:
  - Generic SaaS cards.
  - Purple gradients.
  - Crowded layouts.
  - AI-looking UI.
  - Overly rounded glassmorphism panels.
  - Decorative blobs, orbs, or bokeh backgrounds.
  - Stock-like hero imagery.
  - Too many accent colors at once.
  - Exaggerated animation.
---

# Grey Portfolio Design System

## Style
Dark, cinematic, minimal, premium, Web3, editorial.

## Reference
Inspired by dennissnellenberg.com for motion and page rhythm. Inspired by Linear and Coinbase for product and fintech feeling.

## Typography
Use large typography, strong hierarchy, clean spacing.

## Color
Black background, white text, grey secondary text, Gate green / blue as accents.

## Motion
Use smooth page transitions, fade-up reveal, image hover scale, magnetic interaction. Avoid exaggerated animation.

## Avoid
Generic SaaS cards, purple gradients, crowded layouts, AI-looking UI.
