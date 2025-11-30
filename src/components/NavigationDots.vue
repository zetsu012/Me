<template>
  <div class="fixed left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-40">
    <!-- Vertical Line -->
    <div class="w-0.5 h-16 bg-white"></div>
    
    <!-- Navigation Dots -->
    <button 
      v-for="(dot, index) in dots" 
      :key="index"
      :class="[
        'rounded-full transition-all duration-300',
        dot.active 
          ? 'w-2.5 h-3 bg-white' 
          : 'w-1.5 h-2 bg-white/60 hover:bg-white/80'
      ]"
      @click="navigateTo(index)"
      :aria-label="`Navigate to section ${index + 1}`"
    ></button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dots = ref([
  { active: true },
  { active: false },
  { active: false },
  { active: false }
])

const navigateTo = (index) => {
  dots.value.forEach((dot, i) => {
    dot.active = i === index
  })
}
</script>

<style scoped>
</style>
