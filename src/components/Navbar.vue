<template>
    <nav
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        :class="{
            'opacity-0 pointer-events-none -translate-y-full': isPlaying,
        }"
    >
        <!-- Nav Container -->
        <div class="nav-container">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="flex items-center justify-center h-20">
                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-2">
                        <button
                            @click="navigateTo('home')"
                            class="nav-button"
                            :class="{
                                'nav-button-active': currentView === 'home',
                            }"
                        >
                            <svg
                                class="w-5 h-5 mr-2"
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
                            <span>Home</span>
                        </button>
                        <button
                            @click="navigateTo('journey')"
                            class="nav-button"
                            :class="{
                                'nav-button-active': currentView === 'journey',
                            }"
                        >
                            <svg
                                class="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <span>Journey</span>
                        </button>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button
                        @click="toggleMobile"
                        class="md:hidden mobile-menu-btn"
                    >
                        <div
                            class="hamburger"
                            :class="{ 'hamburger-open': mobileMenuOpen }"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="mobile-menu">
            <div v-if="mobileMenuOpen" class="mobile-menu md:hidden">
                <div class="mobile-menu-content">
                    <button
                        @click="navigateTo('home')"
                        class="mobile-nav-item"
                        :class="{ 'mobile-nav-active': currentView === 'home' }"
                    >
                        <svg
                            class="w-6 h-6"
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
                        <span>Home</span>
                    </button>
                    <button
                        @click="navigateTo('journey')"
                        class="mobile-nav-item"
                        :class="{
                            'mobile-nav-active': currentView === 'journey',
                        }"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <span>Journey</span>
                    </button>
                </div>
            </div>
        </transition>
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

const mobileMenuOpen = ref(false);
const currentView = computed(() => props.modelValue);

const navigateTo = (view) => {
    emit("update:modelValue", view);
    mobileMenuOpen.value = false;
};

const toggleMobile = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<style scoped>
/* Navigation Container */
.nav-container {
    background: rgb(124 124 124 / 6%);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Navigation Buttons */
.nav-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    border: none;
    border-radius: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.nav-button::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.1),
        rgba(118, 75, 162, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 1rem;
}

.nav-button:hover::before {
    opacity: 1;
}

.nav-button:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
}

.nav-button-active {
    color: rgba(255, 255, 255, 1);
}

/* Mobile Menu Button */
.mobile-menu-btn {
    padding: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
}

.hamburger {
    width: 24px;
    height: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger-open span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
}

.hamburger-open span:nth-child(2) {
    opacity: 0;
}

.hamburger-open span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.mobile-menu-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.mobile-nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    border: none;
    border-radius: 1rem;
    font-size: 1.125rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.mobile-nav-item:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(102, 126, 234, 0.1);
}

.mobile-nav-active {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.2),
        rgba(118, 75, 162, 0.2)
    );
    border-left: 3px solid #667eea;
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
