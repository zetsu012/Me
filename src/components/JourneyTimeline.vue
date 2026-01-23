<template>
    <div class="journey-wrapper">
        <!-- Exact Background Match from App.vue -->
        <div
            class="bg-image fixed inset-0 bg-cover bg-center -z-10"
            :style="{ backgroundImage: `url(${bgImage})` }"
        ></div>

        <!-- 80% Opaque Overlay requested by user -->
        <div class="bg-overlay fixed inset-0 bg-black/80 pointer-events-none z-0"></div>

        <div class="journey-content">
            <div class="journey-header">
                <h1 class="journey-title">My Journey</h1>
                <p class="journey-subtitle">Dev Log & Professional Milestones</p>
            </div>

            <div class="timeline-container">
                <div class="timeline-axis"></div>

                <div 
                    v-for="(item, index) in journeyItems" 
                    :key="index"
                    class="timeline-row"
                    :class="{ 'animate-in': visibleItems.has(index), 'is-expanded': expandedItems.has(index) }"
                    :ref="el => { if (el) itemRefs[index] = el }"
                >
                    <div class="date-col">
                        <span class="year-text" :class="{ 'highlight-green': item.isCurrent }">{{ item.date }}</span>
                        <span v-if="item.subDate" class="month-text">{{ item.subDate }}</span>
                    </div>

                    <div class="marker-col">
                        <div class="timeline-dot" :class="{ 'current-dot': item.isCurrent, 'future-dot': item.isFuture }">
                            <div v-if="item.isCurrent" class="pulse-ring"></div>
                        </div>
                    </div>

                    <div class="content-col glass-card" @click="toggleExpand(index)">
                        <div class="flex items-center justify-between gap-4">
                            <h3 class="role-title" :class="{ 'text-emerald-300': item.isCurrent }">{{ item.title }}</h3>
                            <button class="expand-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-300" :class="{ 'rotate-180': expandedItems.has(index) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        
                        <p v-if="item.company" class="company-name">{{ item.company }}</p>
                        
                        <div class="description-container">
                            <p class="role-desc">
                                {{ expandedItems.has(index) ? item.fullContent : item.description }}
                            </p>
                            
                            <div v-if="expandedItems.has(index)" class="expanded-content-area">
                                <div v-if="item.projects" class="projects-mini-list mt-6">
                                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Key Projects & Contributions</h4>
                                    <div v-for="(project, pIdx) in item.projects" :key="pIdx" class="project-mini-item">
                                        <span class="project-mini-title">{{ project.title }}</span>
                                        <p class="project-mini-desc">{{ project.desc }}</p>
                                    </div>
                                </div>

                                <div v-if="item.logs" class="diary-entries mt-8">
                                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Daily Learning Logs</h4>
                                    <div v-for="(log, lIdx) in item.logs" :key="lIdx" class="diary-item">
                                        <div class="diary-date">{{ log.date }}</div>
                                        <div class="diary-text">{{ log.text }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tags-row mt-4">
                            <span v-for="tag in item.tags" :key="tag" class="tag" :class="{ 'current-tag': item.isCurrent }">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bottom-blur"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import bgImage from "../assets/bckground_image.svg";

const expandedItems = ref(new Set());
const visibleItems = ref(new Set());
const itemRefs = ref([]);

const toggleExpand = (index) => {
    if (expandedItems.value.has(index)) {
        expandedItems.value.delete(index);
    } else {
        expandedItems.value.add(index);
    }
};

const journeyItems = ref([
    {
        date: "Jan 2026",
        subDate: "The Diary Begins",
        title: "Personal Learning Log",
        description: "Started a digital diary to track daily AI breakthroughs and project milestones...",
        fullContent: "Maintaining a daily log helps in reflecting on complex problems solved during the development of Agentic AI systems. It serves as a personal knowledge base and a public commitment to continuous growth.",
        isCurrent: true,
        tags: ["Learning", "Reflection", "Growth"],
        logs: [
            { date: "Jan 22, 2026", text: "Successfully refactored the portfolio into a data-driven architecture. Implemented expandable entries for better storytelling." },
            { date: "Jan 21, 2026", text: "Explored advanced Vue 3 transition patterns for smooth height expansion in vertical lists." }
        ]
    },
    {
        date: "2025 - 2026",
        title: "The Future Ahead",
        description: "Focusing on building innovative AI-powered solutions and expanding expertise in agentic AI...",
        fullContent: "My goal is to push the boundaries of how developers interact with AI. This includes creating more autonomous agents that can handle end-to-end SDLC tasks with minimal supervision, while maintaining high code quality and safety standards.",
        isFuture: true,
        tags: ["AI Innovation", "Leadership", "Scale"]
    },
    {
        date: "Present",
        subDate: "Aug 2024",
        title: "Associate Software Engineer",
        company: "WebMD",
        description: "Building AI-powered tools to enhance developer efficiency by 40%...",
        fullContent: "Working at the intersection of healthcare and tech, I focus on automating repetitive developer tasks. This involves fine-tuning LLMs for code generation, building custom CLI tools, and integrating AI into the core development workflow to reduce friction.",
        isCurrent: true,
        projects: [
            { title: "AI Gateway Service", desc: "A unified API for multiple LLM providers with built-in cost management." },
            { title: "AI SDLC", desc: "Integrating AI agents directly into the IDE to automate unit testing and story generation." }
        ],
        tags: ["Vue 3", "FastAPI", "Agentic AI", "AWS"]
    },
    {
        date: "2024",
        subDate: "Jan - May",
        title: "Full Stack Developer Intern",
        company: "National Informatics Centre",
        description: "Developed eService web applications with Angular & Django. Focused on security...",
        fullContent: "Collaborated on high-stakes government projects, ensuring robust data handling and secure user authentication. I learned the importance of scalable architecture and thorough testing in production environments with millions of users.",
        tags: ["Angular", "Django", "PostgreSQL", "JWT"]
    },
    {
        date: "2023",
        subDate: "May - Jun",
        title: "Research Internship",
        company: "NIT Raipur",
        description: "Conducted comparative analysis on Transformer Models using Sentiment Analysis...",
        fullContent: "Deep-dived into the mechanics of attention mechanisms and transformer blocks. I fine-tuned various models (BERT, RoBERTa) and analyzed their performance on specialized datasets, eventually contributing to a published research paper.",
        tags: ["NLP", "PyTorch", "Transformers"]
    },
    {
        date: "2020 - 2024",
        title: "Education Foundation",
        company: "Sikkim Manipal Institute of Technology",
        description: "B.Tech in Information Technology. Graduated with a CGPA of 8.6...",
        fullContent: "Explored the fundamentals of Computer Science, focusing heavily on Algorithms, Data Structures, and Software Engineering principles. Participated in various hackathons and built several full-stack side projects.",
        tags: ["Data Structures", "Algorithms", "Java"]
    }
]);

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = itemRefs.value.indexOf(entry.target);
                    if (index !== -1) visibleItems.value.add(index);
                }
            });
        },
        { threshold: 0.1 }
    );

    itemRefs.value.forEach(el => {
        if (el) observer.observe(el);
    });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

.journey-wrapper {
    position: relative;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background: #0b0b0f;
    padding-top: 6rem;
    padding-bottom: 6rem;
    font-family: 'Inter', sans-serif;
}

.journey-content {
    position: relative;
    z-index: 10;
    padding: 0 1.5rem;
}

.journey-header {
    text-align: center;
    margin-bottom: 5rem;
}

.journey-title {
    font-family: 'Istok Web', sans-serif;
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
}

.journey-subtitle {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.timeline-container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.timeline-axis {
    position: absolute;
    left: 140px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    transform: translateX(-50%);
}

.timeline-row {
    display: flex;
    gap: 2rem;
    position: relative;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.timeline-row.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.date-col {
    width: 140px;
    flex-shrink: 0;
    text-align: right;
    padding-top: 0.25rem;
    display: flex;
    flex-direction: column;
}

.year-text {
    font-family: 'Istok Web', sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
}

.month-text {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 600;
}

.highlight-green {
    color: #10b981;
}

.marker-col {
    position: relative;
    display: flex;
    justify-content: center;
}

.timeline-dot {
    width: 14px;
    height: 14px;
    background: #1f2937;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    z-index: 5;
    position: absolute;
    top: 0.6rem;
}

.current-dot {
    background: #10b981;
    border-color: #10b981;
}

.pulse-ring {
    position: absolute;
    inset: -6px;
    border: 2px solid rgba(16, 185, 129, 0.3);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
}

.future-dot {
    border-style: dotted;
    background: transparent;
}

/* Simplified Glass Card Style */
.content-col.glass-card {
    flex: 1;
    background: rgba(30, 30, 35, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.75rem;
    cursor: pointer;
    transition: border-color 0.2s ease;
}

.content-col.glass-card:hover {
    border-color: rgba(99, 102, 241, 0.3);
}

.is-expanded .content-col.glass-card {
    border-color: rgba(99, 102, 241, 0.4);
}

.role-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
}

.expand-btn {
    color: rgba(255, 255, 255, 0.3);
}

.company-name {
    font-size: 0.9375rem;
    color: rgba(129, 140, 248, 0.9); /* Company color from sidebar theme */
    margin-top: 0.125rem;
    margin-bottom: 0.75rem;
    font-weight: 500;
}

.role-desc {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.85); /* Improved contrast like bulletin list */
    line-height: 1.6;
}

.expanded-content-area {
    margin-top: 1rem;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.projects-mini-list, .diary-entries {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1.5rem;
}

.project-mini-item {
    margin-bottom: 1rem;
}

.project-mini-title {
    color: white;
    font-size: 1rem;
    font-weight: 600;
}

.project-mini-desc {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 0.25rem;
}

.diary-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.diary-date {
    font-family: 'Istok Web', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: #6366f1;
    width: 100px;
    flex-shrink: 0;
}

.diary-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
}

.tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: 0.5rem;
    color: white;
    font-weight: 500;
}

.current-tag {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.1);
}

.bottom-blur {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 40rem;
    height: 40rem;
    background: radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.1), transparent 70%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 5;
}

@media (max-width: 768px) {
    .timeline-axis { left: 0; }
    .date-col { width: 100%; text-align: left; margin-bottom: 1rem; }
    .timeline-row { flex-direction: column; gap: 0; }
    .timeline-dot { left: 0; }
    .content-col.glass-card { margin-left: 1rem; }
}
</style>

