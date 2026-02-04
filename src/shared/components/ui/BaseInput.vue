<script setup lang="ts">
defineProps<{ modelValue: string; placeholder?: string, type?: string | number }>()
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    type="text"
    :placeholder="placeholder"
    class="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all w-64 text-sm"
  />
</template>