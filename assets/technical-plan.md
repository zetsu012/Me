## Framework Decision: **Vue 3 + Vite** ✓

**Rationale:**
- You're actively using Vue 3 at WebMD - leverage existing expertise
- Faster development cycle for portfolios
- Smaller bundle sizes than React
- Better performance for single-page applications
- Less boilerplate, cleaner code

---

## Complete Technology Stack

### **Core Technologies**
```
Frontend: Vue 3.4+ (Composition API with <script setup>)
Build Tool: Vite 5.x (instant HMR, optimized builds)
Language: TypeScript (optional but recommended)
Package Manager: npm or pnpm
```

### **Styling & UI**
```
CSS Framework: Tailwind CSS 3.x
- Custom anime-themed color palette
- Dark mode utilities
- Responsive breakpoints

Animation: 
- GSAP (complex timeline animations)
- Vue Transition (component animations)
- CSS custom animations

Icons: Iconify Vue or Lucide Vue
```

### **Key Libraries**
```
Routing: Vue Router 4.x (SPA navigation)
Particles: tsparticles-vue3 (anime background effects)
Utilities: VueUse (composition utilities)
Smooth Scroll: Lenis or locomotive-scroll
Forms: VeeValidate (contact form validation)
```

### **Development Tools**
```
Linting: ESLint + Prettier
Git Hooks: Husky (optional)
Testing: Vitest (if needed)
```

---

## Project Architecture

### **Folder Structure**
```
portfolio-vue/
├── public/
│   ├── favicon.ico
│   ├── resume.pdf
│   └── projects/
│       └── screenshots/
│
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── animations.css
│   │   │   └── tailwind.css
│   │   ├── images/
│   │   │   ├── avatar.png
│   │   │   ├── hero-bg.jpg
│   │   │   └── project-thumbnails/
│   │   └── fonts/ (if custom fonts)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TheNavbar.vue
│   │   │   ├── TheFooter.vue
│   │   │   └── TheSidebar.vue
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   ├── SkillsSection.vue
│   │   │   ├── ExperienceSection.vue
│   │   │   └── ContactSection.vue
│   │   │
│   │   ├── ui/
│   │   │   ├── ProjectCard.vue
│   │   │   ├── SkillCard.vue
│   │   │   ├── TimelineItem.vue
│   │   │   ├── AnimatedButton.vue
│   │   │   ├── SectionTitle.vue
│   │   │   └── LoadingScreen.vue
│   │   │
│   │   └── effects/
│   │       ├── ParticlesBackground.vue
│   │       ├── MouseFollower.vue
│   │       └── ScrollProgress.vue
│   │
│   ├── composables/
│   │   ├── useScrollAnimation.ts
│   │   ├── useTheme.ts
│   │   ├── useParticles.ts
│   │   └── useIntersectionObserver.ts
│   │
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── socialLinks.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   └── experience.ts
│   │
│   ├── utils/
│   │   ├── animations.ts
│   │   └── helpers.ts
│   │
│   ├── views/
│   │   ├── HomeView.vue
│   │   └── ProjectDetailView.vue (optional)
│   │
│   ├── App.vue
│   ├── main.ts
│   └── router.ts
│
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Key Dependencies (package.json)

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "@vueuse/core": "^10.7.0",
    "gsap": "^3.12.0",
    "tsparticles-vue3": "^2.12.0",
    "lenis": "^1.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## Component Breakdown

### **1. Layout Components**
- **TheNavbar.vue**: Sticky nav with blur effect, anime-style menu items
- **TheFooter.vue**: Social links, copyright, back-to-top button
- **TheSidebar.vue**: Quick links panel (inspired by Fandom sidebar)

### **2. Section Components**
- **HeroSection.vue**: Large hero banner with animated name, tagline, CTA buttons
- **AboutSection.vue**: Profile card, bio, tech stack overview
- **ProjectsSection.vue**: Grid of project cards with filtering
- **SkillsSection.vue**: Categorized skill cards with proficiency levels
- **ExperienceSection.vue**: Vertical timeline of work experience
- **ContactSection.vue**: Contact form with anime-style validation

### **3. UI Components**
- **ProjectCard.vue**: Hover effects, tech badges, "View Details" button
- **SkillCard.vue**: Icon, name, proficiency bar
- **TimelineItem.vue**: Date, company, role, achievements
- **AnimatedButton.vue**: Reusable button with hover animations
- **SectionTitle.vue**: Animated section headings with accent lines

### **4. Effect Components**
- **ParticlesBackground.vue**: Animated particle system
- **MouseFollower.vue**: Custom cursor effect (optional)
- **ScrollProgress.vue**: Progress bar showing scroll position

---

## Anime Design System

### **Color Palette (Tailwind Config)**
```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',  // Main blue
    600: '#2563eb',
    700: '#1d4ed8',
  },
  accent: {
    500: '#a855f7',  // Purple/magenta
    600: '#9333ea',
  },
  success: '#10b981',
  dark: {
    100: '#2d2d2d',
    200: '#1a1a1a',
    300: '#0a0a0a',
  },
}
```

### **Typography**
```javascript
fontFamily: {
  sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
  display: ['Montserrat', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
}
```

### **Animation Presets**
- Fade in on scroll
- Slide up on scroll
- Stagger animations for lists
- Hover glow effects
- Page transitions

---

## Development Phases

### **Phase 1: Project Setup** (Day 1-2)
- Initialize Vite + Vue 3 project
- Install and configure Tailwind CSS
- Setup routing with Vue Router
- Configure TypeScript (if using)
- Create base layout components
- Setup GSAP and particles

### **Phase 2: Core Sections** (Day 3-5)
- Build HeroSection with animations
- Create AboutSection with profile card
- Implement ProjectsSection with filtering
- Build SkillsSection with categories

### **Phase 3: Experience & Contact** (Day 6-7)
- Create ExperienceSection timeline
- Build ContactSection with form validation
- Add loading screen animation

### **Phase 4: Animations & Effects** (Day 8-9)
- Add scroll-triggered animations
- Implement particle background
- Add hover effects and micro-interactions
- Create page transitions
- Add smooth scroll behavior

### **Phase 5: Polish & Optimize** (Day 10-12)
- Mobile responsiveness
- Performance optimization (lazy loading, code splitting)
- SEO meta tags
- Accessibility improvements
- Cross-browser testing
- Add resume download functionality

### **Phase 6: Deployment** (Day 13-14)
- Build production bundle
- Deploy to Vercel/Netlify
- Configure custom domain (if needed)
- Setup analytics (Google Analytics or Plausible)

---

## Performance Targets

- **Lighthouse Score**: 90+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

---

## SEO & Meta Tags Strategy

```html
<title>Ankit Chhetri | Full Stack Developer & AI Tools Engineer</title>
<meta name="description" content="Portfolio of Ankit Chhetri - Associate Software Engineer at WebMD specializing in AI-powered developer tools, Vue.js, FastAPI, and VSCode extensions">
<meta name="keywords" content="Full Stack Developer, Vue.js, FastAPI, AI Tools, Software Engineer">
<meta property="og:image" content="/og-image.jpg">
```

---

## Deployment Options

### **Recommended: Vercel**
- Zero-config Vue support
- Automatic HTTPS
- Git integration
- Free tier sufficient
- Fast global CDN

### **Alternative: Netlify**
- Similar features to Vercel
- Drag-and-drop deployment
- Form handling built-in

---

## Estimated Timeline

**Part-time (2-3 hours/day)**: 2-3 weeks
**Full-time focus (6-8 hours/day)**: 1-1.5 weeks

---

## Why This Stack Works For You

1. **Immediate productivity**: You already know Vue 3 from WebMD
2. **Fast development**: Vite's HMR = instant feedback
3. **Modern & performant**: Latest Vue 3 Composition API
4. **Easy to maintain**: Simple structure, clear separation of concerns
5. **Impressive results**: Smooth animations + anime aesthetic = memorable portfolio
6. **Future-proof**: Can easily add blog, project detail pages, etc.

---

**Ready to start building?** Tell me which phase you want to begin with and I'll generate the complete starter template with all configurations and base components as an artifact.