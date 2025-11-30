<template>
  <div class="absolute top-[20vh] w-full overflow-hidden pb-20">
    <div class="relative">
      <!-- Left Arrow -->
      <button 
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        :class="{ 'opacity-50 cursor-not-allowed': isAtStart }"
        :disabled="isAtStart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Carousel Container -->
      <div 
        ref="carouselContainer"
        @scroll="handleScroll"
        class="flex gap-9 items-center overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-16"
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
            <div class="w-80 h-52 rounded-3xl shadow-[inset_0px_0px_17.4px_21px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 flex items-center justify-center relative overflow-hidden">
              <!-- GitHub Icon -->
              <svg class="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-colors duration-300"></div>
            </div>
            <!-- Project Title -->
            <div class="mt-4 text-white text-xl font-medium" 
                 style="text-shadow: 0px 4px 11px rgba(0, 0, 0, 0.5);">
              {{ project.title }}
            </div>
            <!-- Project Description -->
            <div class="mt-2 text-white/70 text-sm">
              {{ project.description }}
            </div>
          </div>
        </a>
      </div>

      <!-- Right Arrow -->
      <button 
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"
        :disabled="isAtEnd"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center gap-2 mt-8">
      <button
        v-for="(project, index) in projects"
        :key="'dot-' + index"
        @click="scrollToCard(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const projects = ref([
  { 
    title: 'Virtual Assistant Jerry',
    url: 'https://github.com/zetsu012/virtual-assistant-jerry',
    description: 'AI-powered virtual assistant'
  },
  { 
    title: 'Deep Learning Models',
    url: 'https://github.com/zetsu012/Deep-learning-models',
    description: 'Collection of deep learning models'
  },
  { 
    title: 'MCP Generator',
    url: 'https://github.com/zetsu012/MCP-generator',
    description: 'Model Context Protocol generator'
  },
  { 
    title: 'News Wrapper',
    url: 'https://github.com/zetsu012/newsWrapper',
    description: 'News API wrapper service'
  }
])

const carouselContainer = ref(null)
const currentIndex = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)

const scrollLeft = () => {
  if (carouselContainer.value) {
    const scrollAmount = 350 // Width of card + gap
    carouselContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carouselContainer.value) {
    const scrollAmount = 350 // Width of card + gap
    carouselContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

const scrollToCard = (index) => {
  if (carouselContainer.value) {
    const scrollAmount = index * 350 // Width of card + gap
    carouselContainer.value.scrollTo({ left: scrollAmount, behavior: 'smooth' })
  }
}

const handleScroll = () => {
  if (carouselContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = carouselContainer.value
    
    // Update navigation button states
    isAtStart.value = scrollLeft === 0
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 1
    
    // Update current index for pagination dots
    currentIndex.value = Math.round(scrollLeft / 350)
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    scrollLeft()
  } else if (e.key === 'ArrowRight') {
    scrollRight()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  handleScroll() // Initialize scroll state
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
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
