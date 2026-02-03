<script setup lang="ts">
    const model = defineModel<boolean>()

    defineProps<{
      label?: string
    }>()
</script>
<template>
    <label class="flex items-center gap-3 text-sm font-medium text-gray-600 cursor-pointer group">
      <input
        v-model="model"
        type="checkbox"
        class="peer appearance-none w-5 h-5 rounded border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"      />
      <span class="group-hover:text-gray-900 transition-colors">{{ label }}</span>
    </label>
</template>