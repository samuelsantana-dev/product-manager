<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  color?: string
}>()
</script>

<template>
  <div class="bg-white p-5 rounded-xl border border-gray-200 min-w-[180px]">
    <p class="text-sm text-gray-500">{{ label }}</p>
    <p
      class="text-2xl font-bold"
      :class="color ?? 'text-gray-800'"
    >
      {{ value }}
    </p>
  </div>
</template>
