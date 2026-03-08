# 🎂 Demo Bakery Shop — 3D Interactive Bakery Website Template

A **premium, fully responsive bakery website template** featuring real-time **Three.js 3D cake visualization**, smooth GSAP animations, an interactive cake customizer, 360° video gallery, and a modern dark-themed UI — all built with **pure HTML, CSS & JavaScript** (no frameworks).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

---

## ✨ Features

### 🎨 3D Interactive Cake (Three.js)
- **Procedural 3D tiered cake** built entirely with Three.js geometry — 3 tiers, frosting drips, candles with flickering flames, cherries, sprinkles, and a heart topper
- **Drag-to-rotate** interaction with smooth auto-rotation
- **5 flavor themes** — Chocolate, Red Velvet, Fruit, Birthday, Wedding — instantly switch colors in real-time
- Displayed in elegant **rectangular frames** (not circular) in both hero and customizer sections
- **Shadow mapping** and multi-light setup (key, fill, rim) for realistic rendering

### 🛠️ Cake Customizer
- **Size selection** — 500g / 1 Kg / 2 Kg with animated scaling via GSAP elastic easing
- **Flavor picker** — 4 flavors that instantly change the 3D cake's color palette
- **Color theme** — 6 accent colors that tint drips, topper & decorations  
- **Message on cake** — type a message and see it appear as an overlay on the 3D preview
- **Live price calculation** that updates dynamically

### 🎥 Video Showcase & 360° Gallery
- **5 cake showcase panels** with looping MP4 videos (Chocolate, Red Velvet, Fruit, Birthday, Wedding)
- **360° Cake Gallery** section with video switcher for each cake type
- **Video protection** — disabled right-click, drag, keyboard shortcuts (Ctrl+S, F12, etc.)

### 🎭 Animations & Effects
- **GSAP ScrollTrigger** — section reveals, parallax floating pastries, counter animations
- **Animated preloader** — layered cake loader with progress bar
- **Hero entrance timeline** — staggered fade-in for text, stats, and 3D cake
- **Magnetic buttons** — subtle hover follow effect
- **Cursor glow** — radial gradient follows mouse
- **Card tilt effect** — 3D perspective tilt on hover for review & location cards
- **CSS particles** — floating ambient particles in the hero section
- **Infinite review scroll** — auto-scrolling testimonial cards

### 📱 Fully Responsive
- **Desktop** (1400px max) → **Tablet** (1024px) → **Mobile** (768px) → **Small** (480px)
- All sections, navigation, 3D frames, and grids adapt gracefully
- Mobile hamburger menu with smooth toggle

### 📍 Other Sections
- **Navigation** — sticky with scroll-based styling, active link highlighting, smooth scroll
- **About / Our Story** — image stack with experience badge, feature cards
- **Photo Gallery** — CSS grid with hover overlays
- **Customer Reviews** — infinite scrolling testimonials
- **Order Form** — full form with WhatsApp integration
- **Location** — Google Maps embed (Lodhi Garden, Delhi) with contact cards
- **Footer** — multi-column links, social icons, contact info

---

## 🗂️ Project Structure

```
bakri_shop_temp1/
├── index.html              # Main HTML file (all sections)
├── css/
│   └── style.css           # Complete stylesheet (~2500 lines)
├── js/
│   ├── three-scene.js      # Three.js 3D cake scene builder
│   └── main.js             # GSAP animations, interactions & customizer logic
├── images/
│   ├── Chocolate Truffle Cake/
│   │   └── Flow_delpmaspu_.mp4
│   ├── Red Velvet Dream/
│   │   └── Red_velvet_cake_with_frosting_806ddb5839.mp4
│   ├── Fresh Fruit Cake/
│   │   └── Ultra_realistic_360_degree_rotating_product_video__815907df33.mp4
│   ├── Birthday Special Cake/
│   │   └── Colorful_birthday_cake_rotating_00f8da4174.mp4
│   └── Custom Wedding Cake/
│       └── Wedding_cake_rotating_in_studio_9a49f5091e.mp4
├── plan.md                 # Original project plan
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local HTTP server (required for video loading & Three.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/i-amraj/bakri_shop_temp1.git
   cd bakri_shop_temp1
   ```

2. **Start a local server**
   ```bash
   # Python
   python -m http.server 8080

   # Node.js
   npx serve .

   # VS Code
   # Use the "Live Server" extension
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, sections, forms |
| **CSS3** | Custom properties, grid, flexbox, animations, gradients |
| **Tailwind CSS** (CDN) | Utility classes with `tw-` prefix for layout helpers |
| **JavaScript** (ES6+) | DOM manipulation, event handling, interactions |
| **Three.js** r128 (CDN) | WebGL 3D cake rendering with PBR materials |
| **GSAP** 3.12.2 (CDN) | ScrollTrigger animations, elastic easing, timelines |
| **Google Fonts** | Playfair Display + Poppins |
| **Google Maps Embed** | Location section with Lodhi Garden, Delhi |

---

## 🎮 3D Cake Controls

| Action | Desktop | Mobile |
|---|---|---|
| **Rotate** | Click & drag | Touch & drag |
| **Auto-rotate** | Enabled by default | Enabled by default |
| **Switch flavor** | Click flavor pills | Tap flavor pills |
| **Resume auto-rotate** | Wait 3 seconds after drag | Wait 3 seconds after drag |

---

## 🎨 Customization Guide

### Changing Bakery Name
Edit `index.html` — search for "Demo Bakery Shop" and replace with your bakery name.

### Changing Cake Themes
Edit `js/three-scene.js` — modify the `THEMES` object:
```javascript
const THEMES = {
    chocolate: { base: 0x4a2c2a, frost: 0x7B3F00, drip: 0x3a1c1a, accent: 0xe8567f, plate: 0xe0d5c8 },
    // Add or modify themes here
};
```

### Changing Videos
Replace MP4 files in `images/` subfolders. Update paths in `js/main.js` → `videoMap` object.

### Changing Map Location
Edit the `<iframe>` src in the Location section of `index.html`.

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #e8567f;
    --gold: #d4a041;
    --dark: #1a1a2e;
    --cream: #fff8f0;
}
```

---

## 📸 Sections Overview

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Split layout — text left, 3D cake in frame right, flavor pills |
| 2 | **Cake Showcase** | 5 alternating panels with videos, details & pricing |
| 3 | **360° Gallery** | Video-based cake viewer with switcher buttons |
| 4 | **Customizer** | 3D cake preview + size/flavor/color/message options |
| 5 | **About** | Image stack, experience badge, feature list |
| 6 | **Gallery** | CSS grid with gradient placeholders & hover overlays |
| 7 | **Reviews** | Auto-scrolling testimonial cards |
| 8 | **Order** | Full order form + WhatsApp integration |
| 9 | **Location** | Google Maps + contact info cards |
| 10 | **Footer** | Links, socials, contact, copyright |

---

## ⚡ Performance Notes

- All libraries loaded via **CDN** — no build step required
- Three.js renderer uses `alpha: true` for transparent background blending
- `devicePixelRatio` capped at 2 to prevent GPU overload on Retina displays
- Shadow maps set to 1024×1024 for quality/performance balance
- Videos use `playsinline`, `muted`, `loop` for mobile autoplay compliance
- CSS animations use `transform` and `opacity` for GPU-accelerated rendering

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 👨‍💻 Credits

**Designed & Developed by [Raj Soni](https://github.com/i-amraj)**

- 🌐 GitHub: [@i-amraj](https://github.com/i-amraj)
- 🎂 Project: [bakri_shop_temp1](https://github.com/i-amraj/bakri_shop_temp1)

---

### Built with Three.js, GSAP, Tailwind CSS & lots of ☕

> *"Every cake tells a story — this website tells them all in 3D."*
