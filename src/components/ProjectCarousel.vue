<template>
  <div class="absolute top-[27vh] w-full overflow-hidden">
    <div class="flex gap-9 items-center overflow-x-auto scrollbar-hide pb-4">
      <!-- Project Cards -->
      <img v-for="(project, index) in [1, 2, 3, 4, 5]" 
           :key="'img-' + index"
           class="w-80 h-52 rounded-3xl shadow-[inset_0px_0px_17.4px_21px_rgba(0,0,0,0.25)] flex-shrink-0" 
           src="https://placehold.co/327x211" />
      <div v-for="(project, index) in projects" 
           :key="'title-' + index"
           class="text-white text-xl font-medium flex-shrink-0" 
           style="text-shadow: 0px 4px 11px rgba(0, 0, 0, 0.5);">
        Anime Show Name
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  { title: 'Project Alpha', placeholder: 'Project Image' },
  { title: 'Web Application', placeholder: 'Project Image' },
  { title: 'Mobile App', placeholder: 'Project Image' },
  { title: 'Dashboard UI', placeholder: 'Project Image' },
  { title: 'E-commerce Site', placeholder: 'Project Image' }
])
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
