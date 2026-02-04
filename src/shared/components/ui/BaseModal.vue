<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">
            {{ title }}
          </h2>

          <button
            class="text-gray-400 hover:text-gray-600"
            @click="$emit('close')"
          >
            ✕
          </button>
        </div>

        <slot />
      </div>
    </div>
  </Teleport>
</template>
