<template>
    <div
        class="hidden lg:flex fixed left-[5%] top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-40"
    >
        <!-- Vertical Line -->
        <div class="w-0.5 h-16 bg-white/40"></div>

        <!-- Navigation Dots with Tooltips -->
        <div
            v-for="(dot, index) in dots"
            :key="index"
            class="relative dot-wrapper"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
        >
            <button
                :class="[
                    'rounded-full transition-all duration-300 relative z-10',
                    dot.active
                        ? 'w-2.5 h-3 bg-white'
                        : 'w-1.5 h-2 bg-white/60 hover:bg-white/80',
                ]"
                @click="navigateTo(index)"
                :aria-label="dot.label"
            ></button>

            <!-- Tooltip -->
            <transition name="tooltip">
                <div v-if="hoveredIndex === index" class="tooltip">
                    <span class="tooltip-text">{{ dot.label }}</span>
                    <div class="tooltip-arrow"></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const dots = ref([
    { active: true, label: "Overview" },
    { active: false, label: "Experience" },
    { active: false, label: "Projects" },
    { active: false, label: "Contact" },
]);

const hoveredIndex = ref(null);

const navigateTo = (index) => {
    dots.value.forEach((dot, i) => {
        dot.active = i === index;
    });
};
</script>

<style scoped>
.dot-wrapper {
    position: relative;
}

/* Tooltip Styling */
.tooltip {
    position: absolute;
    left: calc(100% + 1rem);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    pointer-events: none;
    z-index: 50;
}

.tooltip-text {
    display: block;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.025em;
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

/* Tooltip Transitions */
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
</style>
