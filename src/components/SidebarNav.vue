<template>
    <!-- Desktop Sidebar Navigation -->
    <nav
        class="sidebar-nav hidden md:flex"
        :class="{ 'sidebar-hidden': isPlaying }"
    >
        <div class="sidebar-content">
            <button
                @click="navigateTo('home')"
                class="nav-item"
                :class="{ active: currentView === 'home' }"
                @mouseenter="hoveredItem = 'home'"
                @mouseleave="hoveredItem = null"
            >
                <svg
                    class="nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>

                <!-- Tooltip -->
                <transition name="tooltip">
                    <div v-if="hoveredItem === 'home'" class="tooltip">
                        <span class="tooltip-text">Home</span>
                        <div class="tooltip-arrow"></div>
                    </div>
                </transition>
            </button>

            <button
                @click="navigateTo('macos')"
                class="nav-item"
                :class="{ active: currentView === 'macos' }"
                @mouseenter="hoveredItem = 'macos'"
                @mouseleave="hoveredItem = null"
            >
                <svg
                    class="nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <transition name="tooltip">
                    <div v-if="hoveredItem === 'macos'" class="tooltip">
                        <span class="tooltip-text">macOS</span>
                        <div class="tooltip-arrow"></div>
                    </div>
                </transition>
            </button>

        </div>
    </nav>

    <!-- Mobile Bottom Navigation -->
    <nav
        class="mobile-nav md:hidden"
        :class="{ 'mobile-nav-hidden': isPlaying }"
    >
        <div class="mobile-nav-content">
            <button
                @click="navigateTo('home')"
                class="mobile-nav-item"
                :class="{ active: currentView === 'home' }"
            >
                <svg
                    class="mobile-nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                <span class="mobile-nav-label">Home</span>
            </button>

            <button
                @click="navigateTo('macos')"
                class="mobile-nav-item"
                :class="{ active: currentView === 'macos' }"
            >
                <svg
                    class="mobile-nav-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <span class="mobile-nav-label">macOS</span>
            </button>

        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "home",
    },
    isPlaying: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const hoveredItem = ref(null);
const currentView = computed(() => props.modelValue);

const navigateTo = (view) => {
    emit("update:modelValue", view);
};
</script>

<style scoped>
/* Desktop Sidebar Navigation */
.sidebar-nav {
    position: fixed;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-hidden {
    opacity: 0;
    transform: translateY(-50%) translateX(-100%);
    pointer-events: none;
}

.sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.nav-item {
    position: relative;
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
    opacity: 0.9;
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
}

.nav-item.active {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
}

.nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: white;
}

/* Tooltip */
.tooltip {
    position: absolute;
    left: calc(100% + 1rem);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    pointer-events: none;
    z-index: 60;
}

.tooltip-text {
    display: block;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.tooltip-arrow {
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
}

.tooltip-enter-active,
.tooltip-leave-active {
    transition: all 0.2s ease;
}

.tooltip-enter-from {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px);
}

.tooltip-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px);
}

/* Mobile Bottom Navigation */
.mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 0 1rem 1rem;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-hidden {
    opacity: 0;
    transform: translateY(100%);
    pointer-events: none;
}

.mobile-nav-content {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    max-width: 24rem;
    margin: 0 auto;
}

.mobile-nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem;
    background: transparent;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.6);
}

.mobile-nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
}

.mobile-nav-item.active {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.mobile-nav-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.mobile-nav-label {
    font-size: 0.75rem;
    font-weight: 500;
}
</style>
