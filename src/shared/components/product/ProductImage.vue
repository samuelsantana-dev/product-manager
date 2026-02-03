<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src?: string | null
  alt: string
}>()

const isLoaded = ref(false)
const hasError = ref(false)

const onImageLoad = () => {
  isLoaded.value = true
}

const onImageError = () => {
  hasError.value = false
  hasError.value = true
}
</script>

<template>
  <div class="relative w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-50 group-hover:border-blue-100 transition-colors">
    
    <div 
      v-if="src && !isLoaded && !hasError" 
      class="absolute inset-0 bg-gray-200 animate-pulse"
    ></div>

    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      @load="onImageLoad"
      @error="onImageError"
      class="object-contain h-full w-full p-2 transform group-hover:scale-110 transition-transform duration-500"
      :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
    />

    <div v-else class="flex flex-col items-center gap-2 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-[10px] font-medium uppercase tracking-wider">
        {{ hasError ? 'Erro ao carregar' : 'Sem imagem' }}
      </span>
    </div>

    <slot name="overlay"></slot>
  </div>
</template>