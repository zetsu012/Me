<template>
  <div class="about-section">
    <div class="about-container">
      <!-- Compact Header -->
      <div class="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 class="text-white text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide leading-tight mb-2"
            style="text-shadow: 0px 0px 23px rgba(0, 0, 0, 0.25); font-family: 'Istok Web', sans-serif;">
          Ankit Chhetri
        </h2>
        <p class="text-white/80 text-sm sm:text-base font-normal">
          Software Engineer · 1.5 Years Experience
        </p>
      </div>

      <!-- Glassmorphism Content Cards -->
      <div class="about-grid">
        <!-- Left Column -->
        <div class="about-column">
          <!-- Current Role Card -->
          <div class="glass-card">
            <div class="card-header">
              <div class="icon-badge">
                <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="section-title">Associate Software Engineer</h3>
                <p class="company-name">WebMD</p>
              </div>
            </div>
            <p class="date-text">August 2024 - Present</p>
            <ul class="bullet-list">
              <li>Building AI-powered tools to enhance developer efficiency by 40%</li>
              <li>Developing AI code editor and agile story creation tools</li>
            </ul>
          </div>

          <!-- Current Projects Card -->
          <div class="glass-card">
            <div class="card-header">
              <div class="icon-badge">
                <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="section-title">Current Projects</h3>
            </div>
            <div class="projects-list">
              <div class="project-item">
                <p class="project-title">AI-Powered IDE Development</p>
                <p class="project-desc">Forked VSCode/Cline with custom AI workflow automation</p>
              </div>
              <div class="project-item">
                <p class="project-title">Agile Story Generator Platform</p>
                <p class="project-desc">Vue.js frontend + FastAPI backend for automated ticket generation</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="about-column">
          <!-- Tech Stack Card -->
          <div class="glass-card">
            <div class="card-header">
              <div class="icon-badge">
                <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z"/>
                  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="section-title">Tech Stack</h3>
            </div>
            <div class="tech-badges">
              <span class="badge">Vue 3</span>
              <span class="badge">React</span>
              <span class="badge">Angular</span>
              <span class="badge">FastAPI</span>
              <span class="badge">Django</span>
              <span class="badge">Flask</span>
              <span class="badge">Python</span>
              <span class="badge">TypeScript</span>
              <span class="badge">AWS</span>
              <span class="badge">VSCode Ext</span>
            </div>
          </div>

          <!-- Experience Card -->
          <div class="glass-card">
            <div class="card-header">
              <h3 class="section-title">Previous Experience</h3>
            </div>
            <div class="experience-list">
              <div class="experience-item">
                <p class="experience-title">Full Stack Developer Intern</p>
                <p class="experience-desc">National Informatics Centre</p>
                <p class="experience-date">Jan-May 2024</p>
              </div>
              <div class="experience-item">
                <p class="experience-title">Research Intern</p>
                <p class="experience-desc">NIT Raipur</p>
                <p class="experience-date">May-June 2023</p>
              </div>
            </div>
          </div>

          <!-- Education & Contact Card -->
          <div class="glass-card">
            <div class="card-header">
              <h3 class="section-title">Education</h3>
            </div>
            <p class="education-degree">B.Tech Information Technology</p>
            <p class="education-details">Sikkim Manipal Institute</p>
            <p class="education-details">CGPA: 8.6</p>

            <div class="contact-info">
              <a href="mailto:ankitchhetri712@gmail.com" class="contact-link">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>ankitchhetri712@gmail.com</span>
              </a>
              <a href="tel:+919474835712" class="contact-link">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>(+91) 9474835712</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

/* Base Layout */
.about-section {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  z-index: 20;
  overflow-y: auto;
  padding: 5.5rem 1rem 4rem;
  will-change: opacity, transform;
}

/* Account for navbar height */
@media (min-width: 640px) {
  .about-section {
    padding: 6.5rem 1.5rem 5rem;
  }
}

.about-container {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
}

/* Grid Layout */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.about-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Minimal Solid Cards */
.glass-card {
  background: rgba(30, 30, 35, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.75rem;
  transition: all 0.3s ease;
  will-change: transform, border;
}

.glass-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.icon-badge {
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.glass-card:hover .icon-badge {
  background: rgba(99, 102, 241, 0.3);
  border-color: rgba(129, 140, 248, 0.5);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(129, 140, 248, 1);
}

/* Typography */
.section-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.015em;
}

.company-name {
  color: rgba(129, 140, 248, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.125rem;
}

.date-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 400;
}

/* Lists */
.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bullet-list li {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9375rem;
  line-height: 1.6;
  padding-left: 1.25rem;
  position: relative;
}

.bullet-list li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: rgba(129, 140, 248, 0.8);
  font-size: 1rem;
}

/* Projects */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-item {
  margin: 0;
}

.project-title {
  color: white;
  font-weight: 600;
  font-size: 1.0625rem;
  margin-bottom: 0.375rem;
  line-height: 1.4;
}

.project-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

/* Tech Badges */
.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.badge {
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.2);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(129, 140, 248, 0.3);
  transition: all 0.2s ease;
  letter-spacing: 0.01em;
}

.badge:hover {
  background: rgba(99, 102, 241, 0.35);
  border-color: rgba(129, 140, 248, 0.5);
}

/* Experience */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.experience-item {
  margin: 0;
}

.experience-title {
  color: white;
  font-weight: 600;
  font-size: 1.0625rem;
  margin-bottom: 0.375rem;
  line-height: 1.4;
}

.experience-desc {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.experience-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin: 0;
}

/* Education */
.education-degree {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  font-size: 1.0625rem;
  margin-bottom: 0.375rem;
  line-height: 1.4;
}

.education-details {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9375rem;
  margin-bottom: 0.375rem;
}

/* Contact Info */
.contact-info {
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 0.5rem;
}

.contact-link:hover {
  color: rgba(129, 140, 248, 1);
  background: rgba(99, 102, 241, 0.1);
  transform: translateX(4px);
}

.contact-link svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.contact-link:hover svg {
  transform: scale(1.1);
}

/* Responsive Design */
@media (min-width: 640px) {
  .about-grid {
    gap: 1.75rem;
  }

  .about-column {
    gap: 1.75rem;
  }

  .glass-card {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .about-section {
    padding: 6.5rem 2rem 5rem;
  }

  .about-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .about-column {
    gap: 2rem;
  }

  .glass-card {
    padding: 2.25rem;
  }

  .section-title {
    font-size: 1.375rem;
  }
}

@media (min-width: 1280px) {
  .glass-card {
    padding: 2.5rem;
  }
}

/* Smooth Scrolling */
.about-section {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.about-section::-webkit-scrollbar {
  width: 6px;
}

.about-section::-webkit-scrollbar-track {
  background: transparent;
}

.about-section::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.about-section::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
