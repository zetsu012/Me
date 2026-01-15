<template>
    <div class="relative w-full px-4 sm:px-6 lg:px-0">
        <!-- Hero Text -->
        <h1
            class="hero-title text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight tracking-wide sm:tracking-widest"
            style="
                text-shadow: 0px 0px 23px rgba(0, 0, 0, 0.25);
                font-family: &quot;Istok Web&quot;, sans-serif;
            "
        >
            Hi My Name is Ankit Chhetri
        </h1>

        <!-- Action Buttons Row -->
        <div
            class="hero-actions flex flex-col sm:flex-row items-center gap-4 sm:gap-6 action-buttons"
        >
            <!-- Software Engineer Badge -->
            <div
                class="w-full sm:w-auto sm:min-w-[18rem] lg:w-72 h-14 sm:h-16 bg-white/10 backdrop-blur-[5px] rounded-[55px] border border-white flex items-center justify-center px-4"
            >
                <span
                    class="text-white text-xl sm:text-2xl font-medium leading-7"
                    >Software Engineer</span
                >
            </div>

            <!-- Play Button -->
            <button
                @click="$emit('start-slideshow')"
                class="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
                <div
                    class="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <span
                    class="text-white/75 text-base sm:text-lg font-medium leading-5"
                    >Watch About me</span
                >
            </button>
        </div>
    </div>
</template>

<script setup>
defineEmits(["start-slideshow"]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap");

/* Hero Animations */
.hero-title {
    opacity: 0;
    animation: fadeInUp 1s ease-out forwards;
}

.hero-actions {
    opacity: 0;
    animation: fadeInUp 1s ease-out 0.3s forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.action-buttons {
    margin-top: 1.5rem;
}

.bottom-section {
    margin-top: 3rem;
}

@media (min-width: 640px) {
    .action-buttons {
        margin-top: 2rem;
    }

    .bottom-section {
        margin-top: 4rem;
    }
}

@media (min-width: 1024px) {
    .bottom-section {
        margin-top: 5rem;
    }
}

/* Ensure touch targets are accessible on mobile */
.touch-target {
    min-width: 44px;
    min-height: 44px;
}
</style>
