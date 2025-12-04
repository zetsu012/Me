<template>
  <nav class="fixed top-0 left-0 w-full h-16 sm:h-20 bg-white/5 border-b border-white/20 backdrop-blur-md z-50">
    <div class="w-full h-full flex items-center justify-between px-4 sm:px-6 lg:justify-center">
      <!-- Logo/Brand (Mobile) -->
      <div class="text-white text-lg font-semibold lg:hidden">
        AC
      </div>

      <!-- Desktop Navigation Menu -->
      <div class="hidden lg:flex items-center gap-8 xl:gap-12">
        <a href="#home" class="text-white text-lg xl:text-xl font-medium hover:text-indigo-400 transition-colors">
          Home
        </a>
        <span class="text-white/30">•</span>
        <a href="#projects" class="text-white text-lg xl:text-xl font-medium hover:text-indigo-400 transition-colors">
          Projects
        </a>
        <span class="text-white/30">•</span>
        <a href="#about" class="text-white text-lg xl:text-xl font-medium hover:text-indigo-400 transition-colors">
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

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMenu"
        class="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-indigo-400 transition-colors"
        aria-label="Toggle menu"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide-fade">
      <div 
        v-if="isMenuOpen"
        class="fixed inset-0 top-16 sm:top-20 bg-black/95 backdrop-blur-lg lg:hidden z-40"
        @click="closeMenu"
      >
        <div class="flex flex-col items-center justify-center h-full gap-8 px-6">
          <a 
            href="#home" 
            @click="closeMenu"
            class="text-white text-3xl font-medium hover:text-indigo-400 transition-colors w-full text-center py-4"
          >
            Home
          </a>
          <a 
            href="#projects" 
            @click="closeMenu"
            class="text-white text-3xl font-medium hover:text-indigo-400 transition-colors w-full text-center py-4"
          >
            Projects
          </a>
          <a 
            href="#about" 
            @click="closeMenu"
            class="text-white text-3xl font-medium hover:text-indigo-400 transition-colors w-full text-center py-4"
          >
            About Me
          </a>
          
          <!-- Search Button (Mobile) -->
          <button class="mt-4 w-12 h-12 flex items-center justify-center text-white hover:text-indigo-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Close menu on escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Slide and fade animation for mobile menu */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
