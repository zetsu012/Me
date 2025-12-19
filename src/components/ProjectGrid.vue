<template>
  <div class="project-grid fixed inset-0 flex items-center justify-center opacity-0 pointer-events-none z-20 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
    <div class="w-full max-w-7xl">
      <!-- Elegant Title with Homepage Style -->
      <h2 class="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-center mb-8 sm:mb-12 lg:mb-16 tracking-wide sm:tracking-widest leading-tight"
          style="text-shadow: 0px 0px 23px rgba(0, 0, 0, 0.25); font-family: 'Istok Web', sans-serif;">
        Featured Projects
      </h2>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
        <a
          v-for="(project, index) in projects"
          :key="index"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card group cursor-pointer opacity-0 relative"
        >
          <!-- Minimal Solid Card -->
          <div class="relative h-52 sm:h-56 lg:h-64 rounded-2xl transition-all duration-300 ease-out
                      bg-[rgba(30,30,35,0.95)] border border-white/10
                      group-hover:border-indigo-500/40 group-hover:scale-[1.01]
                      group-hover:shadow-xl group-hover:shadow-black/40
                      flex flex-col justify-between p-6 sm:p-8 overflow-hidden">

            <!-- Top Section: Icon & Link -->
            <div class="flex items-start justify-between">
              <!-- GitHub Icon -->
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600/15 rounded-xl border border-indigo-500/30
                          flex items-center justify-center transition-all duration-300
                          group-hover:bg-indigo-600/25 group-hover:border-indigo-400/50">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>

              <!-- External Link Icon -->
              <div class="w-10 h-10 sm:w-11 sm:h-11 bg-transparent rounded-xl border border-transparent
                          flex items-center justify-center transition-all duration-300
                          group-hover:bg-white/5 group-hover:border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
                     class="w-5 h-5 text-white/0 group-hover:text-white/90 transition-all duration-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>

            <!-- Bottom Section: Title & Description -->
            <div class="space-y-3">
              <!-- Project Title -->
              <h3 class="text-white text-xl sm:text-2xl lg:text-2xl font-medium leading-tight tracking-wide"
                  style="text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);">
                {{ project.title }}
              </h3>

              <!-- Project Description -->
              <p class="text-white/75 text-sm sm:text-base leading-relaxed font-normal">
                {{ project.description }}
              </p>
            </div>

            <!-- Subtle Accent on Hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-transparent
                        group-hover:from-indigo-600/5
                        transition-all duration-300 rounded-2xl pointer-events-none"></div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  { 
    title: 'Virtual Assistant Jerry',
    url: 'https://github.com/zetsu012/virtual-assistant-jerry',
    description: 'AI-powered virtual assistant with natural language processing'
  },
  { 
    title: 'Deep Learning Models',
    url: 'https://github.com/zetsu012/Deep-learning-models',
    description: 'Collection of neural network implementations and experiments'
  },
  { 
    title: 'MCP Generator',
    url: 'https://github.com/zetsu012/MCP-generator',
    description: 'Model Context Protocol generator for AI integrations'
  },
  { 
    title: 'News Wrapper',
    url: 'https://github.com/zetsu012/newsWrapper',
    description: 'REST API wrapper for aggregating news from multiple sources'
  }
])
</script>

<style scoped>
.project-grid {
  will-change: opacity, transform;
}

.project-card {
  will-change: opacity, transform;
}
</style>
