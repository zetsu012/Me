<template>
  <div class="absolute top-[49vh] w-full">
    <!-- Hero Text -->
    <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-widest" 
        style="text-shadow: 0px 0px 23px rgba(0, 0, 0, 0.25); font-family: 'Istok Web', sans-serif;">
      Hi My Name is Ankit Chhetri
    </h1>
    
    <!-- Action Buttons Row -->
    <div class="flex items-center gap-6 action-buttons">
      <!-- Software Engineer Badge -->
      <div class="w-72 h-16 bg-white/10 backdrop-blur-[5px] rounded-[55px] border border-white flex items-center justify-center">
        <span class="text-white text-2xl font-medium leading-7">Software Engineer</span>
      </div>
      
      <!-- Play Button -->
      <button class="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-white ml-1">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-white/75 text-lg font-medium leading-5">Watch About me</span>
      </button>
    </div>
    
    <!-- Bottom Section -->
    <div class="flex items-center gap-8 bottom-section">
      <!-- Resume Link -->
      <div class="flex items-center gap-4">
        <a href="#resume" class="text-white text-xl font-semibold leading-6 tracking-[3.20px] hover:text-indigo-400 transition-colors" 
           style="text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.5);">
          RESUME
        </a>
        <div class="w-44 h-0.5 bg-white"></div>
      </div>
      
      <!-- Social Icons -->
      <div class="flex items-center gap-6">
        <!-- GitHub -->
        <a href="#" class="w-7 h-7 hover:opacity-80 transition-opacity">
          <img class="w-full h-full" src="https://placehold.co/29x29" alt="GitHub" />
        </a>
        <!-- LinkedIn -->
        <a href="#" class="w-7 h-7 hover:opacity-80 transition-opacity">
          <img class="w-full h-full" src="https://placehold.co/29x29" alt="LinkedIn" />
        </a>
        <!-- Twitter/X -->
        <a href="#" class="w-7 h-7 hover:opacity-80 transition-opacity">
          <img class="w-full h-full" src="https://placehold.co/29x29" alt="Twitter" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap');

.action-buttons {
  margin-top: 2rem;
}

.bottom-section {
  margin-top: 5em;
}
</style>
