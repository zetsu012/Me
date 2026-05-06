<script setup>
import { ref } from "vue";
import bgImage from "./assets/bckground_image.svg";
import SidebarNav from "./components/SidebarNav.vue";
import MacOSView from "./components/MacOSView.vue";
import HeroSection from "./components/HeroSection.vue";
import JourneySlide from "./components/JourneySlide.vue";
import NavigationDots from "./components/NavigationDots.vue";
import { useJourneySlideshow } from "./composables/useJourneySlideshow";

// View management
const currentView = ref("home");

// Initialize journey slideshow
const {
    currentSlide,
    isPlaying,
    isPaused,
    totalSlides,
    slides,
    startSlideshow,
    pauseSlideshow,
    stopSlideshow,
    nextSlide,
    previousSlide,
} = useJourneySlideshow();

const handleStartSlideshow = () => {
    startSlideshow();
};
</script>

<template>
    <div class="min-h-screen w-full relative overflow-hidden">
        <!-- Sidebar Navigation -->
        <SidebarNav v-if="currentView !== 'macos'" v-model="currentView" :is-playing="isPlaying" />
        <!-- macOS exit button (shown when in macOS view) -->
        <button v-if="currentView === 'macos'" class="macos-exit-btn" @click="currentView = 'home'" title="Back to Home">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
        </button>

        <!-- macOS View -->
        <MacOSView v-if="currentView === 'macos'" />

        <!-- Home View -->
        <div v-if="currentView === 'home'" class="home-view">
            <!-- Background Image Layer (this will be blurred) -->
            <div
                class="bg-image fixed inset-0 bg-cover bg-center -z-10"
                :style="{ backgroundImage: `url(${bgImage})` }"
            ></div>

            <!-- Gradient Overlay (becomes solid dark during slideshow) -->
            <div
                class="bg-overlay absolute inset-0 bg-gradient-to-l from-black/60 to-black/10 pointer-events-none z-0"
            ></div>

            <!-- Hero Text Backdrop for Enhanced Readability -->
            <div
                class="hero-text-backdrop absolute right-0 top-0 bottom-0 w-full lg:w-[80%] pointer-events-none z-5"
            ></div>

            <!-- Solid Dark Overlay for Slideshow -->
            <div
                class="slideshow-overlay fixed inset-0 bg-black/95 pointer-events-none z-15 opacity-0 transition-opacity duration-800"
            ></div>

            <!-- Navigation Dots -->
            <div class="nav-dots">
                <NavigationDots />
            </div>

            <!-- Main Content -->
            <div
                class="relative lg:absolute lg:right-[8%] lg:top-1/2 lg:-translate-y-1/2 z-10 w-full lg:w-[45%] pt-20 lg:pt-0"
            >
                <!-- Hero Section -->
                <div class="hero-section">
                    <HeroSection @start-slideshow="handleStartSlideshow" />
                </div>
            </div>

            <!-- Journey Slideshow - Pre-rendered but hidden -->
            <JourneySlide
                :current-slide="currentSlide"
                :total-slides="totalSlides"
                :slides="slides"
            />

            <!-- Elegant Slideshow Controls (when playing) -->
            <div v-if="isPlaying" class="slideshow-controls">
                <!-- Main Control Container -->
                <div class="control-container">
                    <!-- Progress Indicators -->
                    <div class="progress-dots">
                        <div
                            v-for="index in totalSlides"
                            :key="index"
                            class="progress-dot"
                            :class="{ active: currentSlide === index - 1 }"
                        >
                            <span class="dot-inner"></span>
                        </div>
                    </div>

                    <!-- Control Buttons -->
                    <div class="control-buttons">
                        <!-- Previous Button -->
                        <button
                            @click="previousSlide"
                            class="control-btn"
                            :class="{
                                'opacity-50 cursor-not-allowed':
                                    currentSlide === 0,
                            }"
                            :disabled="currentSlide === 0"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="btn-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <!-- Pause/Play Button -->
                        <button
                            @click="pauseSlideshow"
                            class="control-btn"
                            :aria-label="
                                isPaused
                                    ? 'Resume slideshow'
                                    : 'Pause slideshow'
                            "
                        >
                            <svg
                                v-if="!isPaused"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="btn-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="btn-icon ml-0.5"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <!-- Next Button -->
                        <button
                            @click="nextSlide"
                            class="control-btn"
                            :class="{
                                'opacity-50 cursor-not-allowed':
                                    currentSlide === totalSlides - 1,
                            }"
                            :disabled="currentSlide === totalSlides - 1"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="btn-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>

                        <!-- Divider -->
                        <div class="control-divider"></div>

                        <!-- Close Button -->
                        <button
                            @click="stopSlideshow"
                            class="control-btn"
                            aria-label="Close slideshow"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="btn-icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bottom Left Blur -->
            <div
                class="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 absolute left-[-10%] bottom-0 bg-black/75 blur-[50px]"
            ></div>
        </div>

    </div>
</template>

<style scoped>
.macos-exit-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: background 0.2s, transform 0.2s;
}
.macos-exit-btn:hover {
    background: rgba(76, 110, 245, 0.7);
    transform: scale(1.08);
}

.hero-section,
.nav-dots,
.bg-overlay,
.bg-image {
    will-change: opacity, transform, filter, backdrop-filter;
    transition: opacity 0.5s ease-in-out;
}

.bg-overlay {
    transition:
        opacity 0.5s ease-in-out,
        backdrop-filter 0.5s ease-in-out;
}

/* Hero Text Backdrop */
.hero-text-backdrop {
    background: radial-gradient(
        ellipse at center right,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.4) 40%,
        transparent 70%
    );
    transition: opacity 0.5s ease-in-out;
}

/* Elegant Slideshow Controls */
.slideshow-controls {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.control-container {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    padding: 0.875rem 1.5rem;
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;
}

.control-container:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 4px 12px rgba(99, 102, 241, 0.2);
    transform: translateY(-2px);
}

/* Progress Dots */
.progress-dots {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 0.5rem;
}

.progress-dot {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    background: transparent;
    border: none;
    border-radius: 9999px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.dot-inner {
    width: 0.5rem;
    height: 0.5rem;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 9999px;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
}

.progress-dot.active .dot-inner {
    width: 2rem;
    background: white;
    box-shadow:
        0 0 12px rgba(255, 255, 255, 0.5),
        0 0 24px rgba(99, 102, 241, 0.3);
}

/* Control Buttons */
.control-buttons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.control-divider {
    width: 1px;
    height: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
}

.control-btn {
    width: 2.75rem;
    height: 2.75rem;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.control-btn:active {
    transform: scale(0.95);
}

.btn-icon {
    width: 1.125rem;
    height: 1.125rem;
    color: white;
    transition: all 0.3s ease;
}

.control-btn:hover .btn-icon {
    color: rgba(129, 140, 248, 1);
}

/* Responsive */
@media (min-width: 640px) {
    .slideshow-controls {
        bottom: 2rem;
    }

    .control-container {
        gap: 1.5rem;
        padding: 1rem 1.75rem;
    }

    .progress-dots {
        gap: 1rem;
    }

    .control-btn {
        width: 3rem;
        height: 3rem;
    }

    .btn-icon {
        width: 1.25rem;
        height: 1.25rem;
    }
}
</style>
