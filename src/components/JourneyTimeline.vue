<template>
    <div class="journey-wrapper">
        <!-- Background matching homepage -->
        <div class="journey-bg"></div>

        <!-- Gradient Overlay -->
        <div class="gradient-overlay"></div>

        <!-- Content -->
        <div class="journey-content">
            <!-- Header -->
            <div class="journey-header">
                <h1 class="journey-title">My Journey</h1>
                <p class="journey-subtitle">From 2020 to Present</p>
            </div>

            <!-- Timeline Container -->
            <div class="timeline-container">
                <!-- Central Line -->
                <div class="timeline-line"></div>

                <!-- Timeline Items -->
                <div class="timeline-items">
                    <!-- 2020-2024 Education -->
                    <div class="timeline-item" data-year="2020-2024">
                        <div class="timeline-marker">
                            <div class="marker-dot"></div>
                            <div class="marker-ring"></div>
                        </div>
                        <div class="timeline-card">
                            <div class="card-icon">🎓</div>
                            <h3 class="card-title">Education Foundation</h3>
                            <p class="card-period">2020 - 2024</p>
                            <p class="card-subtitle">
                                B.Tech Information Technology
                            </p>
                            <p class="card-location">
                                Sikkim Manipal Institute of Technology
                            </p>
                            <div class="card-detail">
                                <span class="detail-label">CGPA:</span>
                                <span class="detail-value">8.6</span>
                            </div>
                            <div class="card-tags">
                                <span class="tag">Python</span>
                                <span class="tag">Java</span>
                                <span class="tag">DBMS</span>
                                <span class="tag">Data Structures</span>
                            </div>
                        </div>
                    </div>

                    <!-- May 2023 Research -->
                    <div class="timeline-item" data-year="2023">
                        <div class="timeline-marker">
                            <div class="marker-dot"></div>
                            <div class="marker-ring"></div>
                        </div>
                        <div class="timeline-card">
                            <div class="card-icon">🔬</div>
                            <h3 class="card-title">Research Internship</h3>
                            <p class="card-period">May 2023 - June 2023</p>
                            <p class="card-subtitle">NIT Raipur</p>
                            <p class="card-description">
                                Comparative Analysis on Transformer Models using
                                Sentiment Analysis
                            </p>
                            <div class="card-tags">
                                <span class="tag">Transformers</span>
                                <span class="tag">NLP</span>
                                <span class="tag">Sentiment Analysis</span>
                                <span class="tag">Research</span>
                            </div>
                        </div>
                    </div>

                    <!-- Jan 2024 NIC -->
                    <div class="timeline-item" data-year="2024">
                        <div class="timeline-marker">
                            <div class="marker-dot"></div>
                            <div class="marker-ring"></div>
                        </div>
                        <div class="timeline-card">
                            <div class="card-icon">💼</div>
                            <h3 class="card-title">
                                Full Stack Developer Intern
                            </h3>
                            <p class="card-period">January 2024 - May 2024</p>
                            <p class="card-subtitle">
                                National Informatics Centre
                            </p>
                            <p class="card-description">
                                Developed eService web applications with Angular
                                & Django, focusing on data integrity and
                                security
                            </p>
                            <div class="card-tags">
                                <span class="tag">Angular</span>
                                <span class="tag">Django</span>
                                <span class="tag">PostgreSQL</span>
                                <span class="tag">JWT Auth</span>
                            </div>
                        </div>
                    </div>

                    <!-- Aug 2024 WebMD - Current -->
                    <div class="timeline-item current" data-year="2024-Present">
                        <div class="timeline-marker">
                            <div class="marker-dot current-marker"></div>
                            <div class="marker-ring current-ring"></div>
                            <div class="marker-pulse"></div>
                        </div>
                        <div class="timeline-card current-card">
                            <div class="card-icon">🚀</div>
                            <h3 class="card-title">
                                Associate Software Engineer
                            </h3>
                            <p class="card-period">August 2024 - Present</p>
                            <p class="card-subtitle">WebMD</p>
                            <p class="card-description">
                                Building AI-powered tools to enhance developer
                                efficiency by 40%
                            </p>

                            <!-- Projects -->
                            <div class="projects-section">
                                <div class="project-item">
                                    <div class="project-icon">🌐</div>
                                    <div class="project-content">
                                        <h4 class="project-title">
                                            AI Gateway Service
                                        </h4>
                                        <p class="project-desc">
                                            Multi-provider AI service with cost
                                            tracking & rate limiting
                                        </p>
                                    </div>
                                </div>
                                <div class="project-item">
                                    <div class="project-icon">💻</div>
                                    <div class="project-content">
                                        <h4 class="project-title">AI SDLC</h4>
                                        <p class="project-desc">
                                            AI-Powered IDE & Agile Story
                                            Generator for rapid development
                                        </p>
                                    </div>
                                </div>
                                <div class="project-item">
                                    <div class="project-icon">📊</div>
                                    <div class="project-content">
                                        <h4 class="project-title">
                                            Productivity Metrics System
                                        </h4>
                                        <p class="project-desc">
                                            Org-level dashboard tracking
                                            developer productivity & AI usage
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-tags">
                                <span class="tag">Vue 3</span>
                                <span class="tag">FastAPI</span>
                                <span class="tag">React</span>
                                <span class="tag">Python</span>
                                <span class="tag">AWS</span>
                                <span class="tag">Agentic AI</span>
                                <span class="tag">LangChain</span>
                            </div>
                        </div>
                    </div>

                    <!-- Future -->
                    <div class="timeline-item future" data-year="2025-2026">
                        <div class="timeline-marker">
                            <div class="marker-dot future-marker"></div>
                            <div class="marker-ring"></div>
                        </div>
                        <div class="timeline-card future-card">
                            <div class="card-icon">✨</div>
                            <h3 class="card-title">The Future Ahead</h3>
                            <p class="card-period">2025 - 2026</p>
                            <p class="card-description">
                                Continuing to build innovative AI-powered
                                solutions and expanding expertise in agentic AI
                                systems
                            </p>
                            <div class="card-tags">
                                <span class="tag future-tag"
                                    >AI Innovation</span
                                >
                                <span class="tag future-tag">Leadership</span>
                                <span class="tag future-tag">Scale</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom blur matching homepage -->
        <div class="bottom-blur"></div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 },
    );

    document.querySelectorAll(".timeline-item").forEach((item) => {
        observer.observe(item);
    });
});
</script>

<style scoped>
.journey-wrapper {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background: #000;
    padding-top: 5rem;
}

/* Background matching homepage */
.journey-bg {
    position: fixed;
    inset: 0;
    background: url("/src/assets/bckground_image.svg") center/cover;
    z-index: 0;
}

.gradient-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: 1;
}

.journey-content {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
}

/* Header */
.journey-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.journey-title {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
}

.journey-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
}

/* Timeline */
.timeline-container {
    position: relative;
    padding: 2rem 0;
}

.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
        to bottom,
        rgba(99, 102, 241, 0.3),
        rgba(99, 102, 241, 0.6),
        rgba(99, 102, 241, 0.3)
    );
    transform: translateX(-50%);
}

.timeline-items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

/* Timeline Item */
.timeline-item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
}

.timeline-item:nth-child(odd) .timeline-card {
    grid-column: 1;
}

.timeline-item:nth-child(even) .timeline-card {
    grid-column: 3;
}

.timeline-marker {
    grid-column: 2;
    position: relative;
    width: 24px;
    height: 24px;
    z-index: 10;
}

.marker-dot {
    width: 16px;
    height: 16px;
    background: #6366f1;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.marker-ring {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(99, 102, 241, 0.4);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Current marker animation */
.current-marker {
    background: #10b981;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
}

.current-ring {
    border-color: rgba(16, 185, 129, 0.6);
    animation: ring-pulse 2s ease-in-out infinite;
}

.marker-pulse {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(16, 185, 129, 0.3);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes ring-pulse {
    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.8;
    }
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

.future-marker {
    background: rgba(99, 102, 241, 0.4);
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

/* Cards */
.timeline-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.timeline-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
}

.current-card {
    background: rgba(16, 185, 129, 0.05);
    border-color: rgba(16, 185, 129, 0.3);
}

.current-card:hover {
    box-shadow: 0 12px 40px rgba(16, 185, 129, 0.2);
}

.future-card {
    background: rgba(255, 255, 255, 0.03);
    border-style: dashed;
    border-color: rgba(255, 255, 255, 0.2);
}

.card-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
}

.card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
}

.card-period {
    font-size: 0.875rem;
    color: #6366f1;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.current-card .card-period {
    color: #10b981;
}

.card-subtitle {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.card-location {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.75rem;
}

.card-description {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.card-detail {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.9375rem;
}

.detail-label {
    color: rgba(255, 255, 255, 0.6);
}

.detail-value {
    color: #6366f1;
    font-weight: 600;
}

/* Projects Section */
.projects-section {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.project-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.project-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(16, 185, 129, 0.3);
}

.project-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.project-content {
    flex: 1;
}

.project-title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.25rem;
}

.project-desc {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.4;
}

/* Tags */
.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.tag {
    padding: 0.375rem 0.875rem;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 9999px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    transition: all 0.3s ease;
}

.tag:hover {
    background: rgba(99, 102, 241, 0.25);
    border-color: rgba(99, 102, 241, 0.5);
    transform: translateY(-2px);
}

.current-card .tag {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.3);
}

.current-card .tag:hover {
    background: rgba(16, 185, 129, 0.25);
    border-color: rgba(16, 185, 129, 0.5);
}

.future-tag {
    opacity: 0.6;
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);
}

/* Bottom Blur */
.bottom-blur {
    position: fixed;
    bottom: 0;
    left: -10%;
    width: 24rem;
    height: 24rem;
    background: rgba(0, 0, 0, 0.75);
    filter: blur(50px);
    z-index: 5;
}

/* Responsive */
@media (max-width: 1024px) {
    .timeline-line {
        left: 2rem;
    }

    .timeline-item {
        grid-template-columns: auto 1fr;
        gap: 1.5rem;
    }

    .timeline-item:nth-child(odd) .timeline-card,
    .timeline-item:nth-child(even) .timeline-card {
        grid-column: 2;
    }

    .timeline-marker {
        grid-column: 1;
    }
}

@media (max-width: 768px) {
    .journey-title {
        font-size: 2rem;
    }

    .journey-subtitle {
        font-size: 1rem;
    }

    .timeline-line {
        left: 1rem;
    }

    .timeline-item {
        gap: 1rem;
    }

    .card-title {
        font-size: 1.25rem;
    }

    .projects-section {
        gap: 0.75rem;
    }

    .project-item {
        flex-direction: column;
        text-align: center;
    }
}
</style>
