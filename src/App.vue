<script setup>
import bgImage from './assets/bckground_image.svg'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectCarousel from './components/ProjectCarousel.vue'
import NavigationDots from './components/NavigationDots.vue'
</script>

<template>
    <div class="min-h-screen w-full relative overflow-hidden bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Gradient Overlay -->
    <div class="absolute right-0 top-0 w-[52%] h-full bg-gradient-to-l from-black/50 to-black/0 pointer-events-none"></div>
    
    <!-- Navigation Dots -->
    <NavigationDots />
    
    <!-- Navbar -->
    <Navbar />
    
    <!-- Left Side Action Buttons -->
    <div class="absolute left-[10%] top-[27vh] flex flex-col gap-4 z-20">
      <!-- Learn About Journey Button -->
      <button class="w-80 h-14 bg-black/20 backdrop-blur-sm rounded-[38px] flex items-center justify-center gap-3 hover:bg-black/30 transition-colors">
        <span class="text-white text-xl font-medium">Learn about my Journey</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </button>
      
      <button class="w-80 h-14 bg-black/20 backdrop-blur-sm rounded-[38px] flex items-center justify-center gap-3 hover:bg-black/30 transition-colors">
        <span class="text-white text-xl font-medium">Scroll through my projects</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </button>
    </div>
    
    <!-- Right Side Content -->
    <div class="absolute right-[8%] top-0 z-10 w-[45%]">
      <!-- Project Carousel -->
      <ProjectCarousel />
      
      <!-- Hero Section -->
      <HeroSection />
    </div>
    
    <!-- Bottom Left Blur -->
    <div class="w-96 h-96 absolute left-[-10%] bottom-0 bg-black/75 blur-[50px]"></div>
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
