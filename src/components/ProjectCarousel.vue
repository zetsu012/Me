<template>
    <div
        class="relative lg:absolute lg:top-[15vh] w-full overflow-hidden pb-8 sm:pb-12 lg:pb-16"
    >
        <div class="relative px-4 sm:px-6 lg:px-0">
            <!-- Left Arrow -->
            <button
                @click="scrollLeft"
                class="hidden sm:flex absolute left-0 sm:left-2 lg:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all"
                :class="{ 'opacity-50 cursor-not-allowed': isAtStart }"
                :disabled="isAtStart"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 text-white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </button>

            <!-- Carousel Container -->
            <div
                ref="carouselContainer"
                @scroll="handleScroll"
                class="flex gap-4 sm:gap-6 lg:gap-9 items-center overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-2 sm:px-12 lg:px-16"
            >
                <!-- Project Cards -->
                <a
                    v-for="(project, index) in projects"
                    :key="index"
                    :href="project.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-shrink-0 group cursor-pointer"
                >
                    <div class="relative">
                        <!-- Project Image -->
                        <div
                            class="w-64 h-40 sm:w-72 sm:h-48 lg:w-80 lg:h-52 rounded-2xl sm:rounded-3xl shadow-[inset_0px_0px_17.4px_21px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 flex items-center justify-center relative overflow-hidden"
                        >
                            <!-- Project Image -->
                            <img
                                :src="project.image"
                                :alt="project.title"
                                class="w-full h-full object-cover"
                            />
                            <!-- Hover Overlay -->
                            <div
                                class="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors duration-300"
                            ></div>
                        </div>
                        <!-- Project Title -->
                        <div
                            class="mt-3 sm:mt-4 text-white text-lg sm:text-xl font-medium"
                            style="text-shadow: 0px 4px 11px rgba(0, 0, 0, 0.5)"
                        >
                            {{ project.title }}
                        </div>
                        <!-- Project Description -->
                        <div class="mt-2 text-white/70 text-xs sm:text-sm">
                            {{ project.description }}
                        </div>
                    </div>
                </a>
            </div>

            <!-- Right Arrow -->
            <button
                @click="scrollRight"
                class="hidden sm:flex absolute right-0 sm:right-2 lg:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-all"
                :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"
                :disabled="isAtEnd"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 text-white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-6 sm:mt-8">
            <button
                v-for="(project, index) in projects"
                :key="'dot-' + index"
                @click="scrollToCard(index)"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="
                    currentIndex === index
                        ? 'bg-white w-8'
                        : 'bg-white/40 hover:bg-white/60'
                "
            ></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const projects = ref([
    {
        title: "AI Gateway Service",
        url: "#",
        description:
            "Multi-provider AI service with cost tracking & rate limiting",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
        title: "AI SDLC",
        url: "#",
        description:
            "AI-Powered IDE & Agile Story Generator for rapid development",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    },
    {
        title: "Productivity Metrics",
        url: "#",
        description:
            "Org-level dashboard tracking developer productivity & AI usage",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
        title: "Virtual Assistant Jerry",
        url: "https://github.com/zetsu012/virtual-assistant-jerry",
        description: "AI-powered virtual assistant",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
]);

const carouselContainer = ref(null);
const currentIndex = ref(0);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const scrollLeft = () => {
    if (carouselContainer.value) {
        const scrollAmount = 350; // Width of card + gap
        carouselContainer.value.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });
    }
};

const scrollRight = () => {
    if (carouselContainer.value) {
        const scrollAmount = 350; // Width of card + gap
        carouselContainer.value.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    }
};

const scrollToCard = (index) => {
    if (carouselContainer.value) {
        const scrollAmount = index * 350; // Width of card + gap
        carouselContainer.value.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }
};

const handleScroll = () => {
    if (carouselContainer.value) {
        const { scrollLeft, scrollWidth, clientWidth } =
            carouselContainer.value;

        // Update navigation button states
        isAtStart.value = scrollLeft === 0;
        isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 1;

        // Update current index for pagination dots
        currentIndex.value = Math.round(scrollLeft / 350);
    }
};

// Keyboard navigation
const handleKeydown = (e) => {
    if (e.key === "ArrowLeft") {
        scrollLeft();
    } else if (e.key === "ArrowRight") {
        scrollRight();
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    handleScroll(); // Initialize scroll state
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
