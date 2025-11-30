<template>
  <nav class="fixed top-0 left-0 w-full h-20 bg-white/5 border-b border-white/20 backdrop-blur-md z-50">
    <div class="w-full h-full flex items-center justify-center">
      <!-- Navigation Menu -->
      <div class="flex items-center gap-12">
        <a href="#home" class="text-white text-xl font-medium hover:text-indigo-400 transition-colors">
          Home
        </a>
        <span class="text-white/30">•</span>
        <a href="#projects" class="text-white text-xl font-medium hover:text-indigo-400 transition-colors">
          Projects
        </a>
        <span class="text-white/30">•</span>
        <a href="#about" class="text-white text-xl font-medium hover:text-indigo-400 transition-colors">
          About Me
        </a>
        <span class="text-white/30">•</span>
        
        <!-- Search Icon -->
        <button class="w-5 h-5 text-white hover:text-indigo-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
</style>
