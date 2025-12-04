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
    <div class="absolute right-0 top-0 w-full sm:w-[60%] lg:w-[52%] h-full bg-gradient-to-l from-black/50 to-black/0 pointer-events-none"></div>
    
    <!-- Navigation Dots -->
    <NavigationDots />
    
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <div class="relative lg:absolute lg:right-[8%] lg:top-0 z-10 w-full lg:w-[45%] pt-16 sm:pt-20 lg:pt-0">
      <!-- Project Carousel -->
      <ProjectCarousel />
      
      <!-- Hero Section -->
      <HeroSection />
    </div>
    
    <!-- Bottom Left Blur -->
    <div class="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 absolute left-[-10%] bottom-0 bg-black/75 blur-[50px]"></div>
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
