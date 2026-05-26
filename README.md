# ✨ Khine Ko Thant — Developer Portfolio

A cinematic, immersive developer portfolio built with **Next.js 16**, **React Three Fiber**, **Framer Motion**, and **GSAP**. Features real-time 3D drone swarm animations with custom GLSL shaders, parallax scrolling, glassmorphism UI, dark/light theme support, and hidden easter eggs.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r184-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 🚀 Highlights

- **Interactive 3D Hero Scene** — A swarm of laser-scanning scout drones (DamagedHelmet glTF models) orbit in real-time, track the user's cursor, and fire custom GLSL-attenuated laser beams with post-processing bloom effects.
- **Cinematic Loading Screen** — Smooth preloader with progress tracking via `@react-three/drei`'s `useProgress`, including a fallback timer to prevent users from ever getting stuck.
- **Glassmorphism Design System** — Fully themed glass-card components, gradient text animations, and mesh-shift background effects across dark and light modes.
- **Framer Motion Choreography** — Section-level scroll-triggered animations, animated counters, staggered grid reveals, and smooth page transitions.
- **Lenis Smooth Scrolling** — Buttery-smooth scroll experience powered by the Lenis library.
- **Custom Cursor Follower** — A subtle cursor-tracking element that adds polish to desktop interactions.
- **Magnetic Buttons** — Interactive hover-magnetic CTA buttons with spring physics.
- **Easter Eggs** 🥚 — Konami Code triggers a Matrix-style digital rain, a hidden rubber duck debugger, and keyboard shortcut secrets.

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router (page, layout, globals)
├── components/
│   ├── easter-eggs/        # KonamiCode, RubberDuck, KeyboardShortcuts
│   ├── layout/             # Navbar, Footer, CursorFollower
│   ├── providers/          # ThemeProvider, SmoothScroll, EasterEggProvider
│   ├── sections/           # Hero, About, Experience, Projects, Skills, FunCorner, Contact
│   ├── three/              # HeroScene (drone swarm), SkillsScene (3D skill viz)
│   └── ui/                 # AnimatedText, MagneticButton, ProjectCard, SectionHeading, SkillBadge, TimelineItem
├── hooks/                  # useActiveSection, useMediaQuery, useReducedMotion, useScrollProgress
├── lib/                    # Data layer (data.ts), animation presets (animations.ts)
└── types/                  # TypeScript interfaces
```

---

## 🎨 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport intro with 3D drone swarm, animated subtitle typewriter, parallax scrolling, and gradient CTA buttons |
| **About** | Photo avatar with animated gradient border, floating skill badges, and animated stat counters |
| **Experience** | Interactive timeline with expandable achievement cards |
| **Projects** | Filterable project grid with technology-based filtering, animated card reveals, and long-press easter eggs |
| **Skills** | Categorized skill badges with proficiency levels, filterable tabs, and a 3D background scene |
| **Beyond the Code** | Education, certifications, and a "Currently" status card |
| **Contact** | Dual-column layout with contact links and a client-side contact form (mailto-based) |

---

## 🛠️ Tech Stack

### Core
- **Next.js 16** — App Router, dynamic imports, `next/font` optimization
- **React 19** — Latest concurrent features
- **TypeScript 5** — Full type safety across all components

### 3D & Visual
- **Three.js (r184)** — WebGL rendering engine
- **React Three Fiber** — Declarative Three.js in React
- **@react-three/drei** — Helpers: `useGLTF`, `Environment`, `Float`, `PresentationControls`, `Clone`
- **@react-three/postprocessing** — Bloom, EffectComposer for cinematic post-processing
- **Custom GLSL Shaders** — Hand-written vertex/fragment shaders for laser beam attenuation with additive blending

### Animation
- **Framer Motion 12** — Scroll-triggered animations, `AnimatePresence`, layout animations, spring physics
- **GSAP 3** — Timeline-based animations via `@gsap/react`
- **Lenis** — Smooth scrolling library

### Styling
- **Tailwind CSS 4** — Utility-first CSS with custom design tokens
- **Lucide React** — Clean, consistent icon set
- **Custom CSS** — Glassmorphism, gradient animations, `meshShift` keyframes, blinking caret

### Other
- **canvas-confetti** — Celebration effects
- **Sonner** — Toast notifications
- **class-variance-authority + clsx + tailwind-merge** — Type-safe component variants

---

## ⚡ Performance

- **Dynamic Imports** — 3D scenes are code-split and loaded lazily with `next/dynamic`
- **Adaptive DPR** — Canvas pixel ratio scales down on mobile (`1x`) vs desktop (`1.5x`)
- **Reduced Motion** — Custom `useReducedMotion` hook respects `prefers-reduced-motion` for accessibility
- **SSR-Safe** — All Three.js/WebGL components are client-only (`ssr: false`) to prevent hydration mismatches
- **Asset Preloading** — `useGLTF.preload()` for glTF models to minimize loading jank
- **Progressive Loading** — Preloader with simulated progress + real asset tracking

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone the repository
git clone https://github.com/khinekothant-github/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

---

## 🥚 Easter Eggs

> Try these hidden interactions:

- **Konami Code** — Type `↑ ↑ ↓ ↓ ← → ← → B A` for a Matrix-style digital rain
- **Rubber Duck** — Find and summon the rubber duck debugger
- **Keyboard Shortcuts** — Discover hidden navigation shortcuts
- **Project Cards** — Long-press (hold 2s) on a project card for behind-the-scenes stories

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ☕ and late nights by <strong>Khine Ko Thant</strong>
</p>
