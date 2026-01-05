<template>
  <div class="journey-slide-container fixed inset-0 flex items-center justify-center z-20 opacity-0 pointer-events-none">
    <!-- Journey Overlay -->
    <div class="journey-overlay fixed inset-0 bg-black/90 pointer-events-none opacity-0"></div>

    <!-- Slide Content -->
    <div class="journey-slide relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="journey-content text-center">
        <!-- Slide Number Indicator -->
        <div class="slide-indicator mb-6 sm:mb-8">
          <span class="text-white/40 text-sm sm:text-base font-light tracking-widest">
            {{ String(currentSlide + 1).padStart(2, '0') }} / {{ String(totalSlides).padStart(2, '0') }}
          </span>
        </div>

        <!-- Main Title -->
        <h1 class="slide-title text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6 tracking-wide leading-tight"
            style="text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5); font-family: 'Istok Web', sans-serif;">
          {{ currentSlideData.title }}
        </h1>

        <!-- Subtitle -->
        <p class="slide-subtitle text-white/85 text-lg sm:text-xl lg:text-2xl font-light tracking-wide leading-relaxed max-w-3xl mx-auto"
           style="text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);">
          {{ currentSlideData.subtitle }}
        </p>

        <!-- Description -->
        <p class="slide-description text-white/65 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-6"
           style="text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);">
          {{ currentSlideData.description }}
        </p>

        <!-- Decorative Line -->
        <div class="decorative-line mt-8 sm:mt-10 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentSlide: {
    type: Number,
    required: true
  },
  totalSlides: {
    type: Number,
    required: true
  },
  slides: {
    type: Array,
    required: true
  }
})

const currentSlideData = computed(() => {
  return props.slides[props.currentSlide] || { title: '', subtitle: '', description: '' }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

.journey-slide-container {
  will-change: opacity, transform;
}

.journey-overlay {
  will-change: opacity;
}

.journey-slide {
  will-change: opacity, transform;
}

.journey-content > * {
  will-change: opacity, transform;
  opacity: 0;
}
</style>
