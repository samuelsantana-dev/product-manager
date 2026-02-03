<script setup lang="ts">
import type { ProductStatus } from '@/modules/Dashboard/types/product'

defineProps<{ status: ProductStatus }>()
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
    :class="status === 'OK' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
  >
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="status === 'OK' ? 'bg-emerald-500' : 'bg-rose-500'"></span>
    {{ status }}
  </span>
</template>