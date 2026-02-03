<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'excel'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false
})

const variants = {
  primary: 'bg-gray-900 text-white hover:bg-black',
  secondary: 'bg-blue-600 text-white hover:bg-blue-700',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900',
  excel: 'bg-green-700 text-white hover:bg-green-800'
}

const sizes = {
 sm: 'px-2 py-1 text-[11px] uppercase tracking-wider', 
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm'
}
</script>

<template>
  <button
    :class="[
      'items-center justify-center font-semibold rounded-md transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
      variants[variant],
      sizes[size]
    ]"
    :disabled="loading"
  >
    <slot v-if="!loading" />
    <span v-else class="animate-spin text-lg">⌛</span>
  </button>
</template>