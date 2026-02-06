<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  placeholder?: string
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
  <input
    :value="modelValue"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    @input="onInput"
    class="border border-gray-200 rounded-lg px-4 py-2 w-64 text-sm"
  />
</template>
