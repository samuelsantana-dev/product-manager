<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  src?: string | null
  alt?: string
  variant?: 'table' | 'card' | 'default'
  class?: string
}>()

const isLoaded = ref(false)
const hasError = ref(false)

const onLoad = () => {
  isLoaded.value = true
}

const onError = () => {
  hasError.value = true
}

watch(() => props.src, () => {
  isLoaded.value = false
  hasError.value = false
})

const variantClasses = {
  table: 'h-12 w-auto object-contain',
  card: 'object-contain h-full w-full p-4 transform group-hover:scale-110 transition-transform duration-500',
  default: 'object-contain h-full w-full p-2'
}

const imageClasses = computed(() => [
  'transition-opacity duration-300',
  variantClasses[props.variant ?? 'default'],
  props.class,
  isLoaded.value ? 'opacity-100' : 'opacity-0'
])
</script>

<template>
  <img
    v-if="src && !hasError"
    :src="src"
    :alt="alt"
    loading="lazy"
    @load="onLoad"
    @error="onError"
    :class="imageClasses"
  />
</template>
