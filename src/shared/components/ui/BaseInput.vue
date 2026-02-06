<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  placeholder?: string
  label?: String 
  error?: string
  type?: 'text' | 'number' | 'email' | 'password'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value

  emit(
    'update:modelValue',
    props.type === 'number' ? Number(value) : value
  )
}
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <input
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      @input="onInput"
      :class="[
        'border rounded-lg px-4 py-2 text-sm w-full transition-colors',
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
      ]"
    />

    <span v-if="error" class="text-xs text-red-500 h-4">
      {{ error }}
    </span>
  </div>
</template>
