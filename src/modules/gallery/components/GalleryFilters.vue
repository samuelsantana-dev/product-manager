<script setup lang="ts">
import { ProductStatus } from "@/modules/Dashboard/types/product";

defineProps<{
  search: string;
  status: ProductStatus | "ALL";
  onlyWithImage: boolean;
}>();

defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:status", value: ProductStatus |  "ALL"): void;
  (e: "update:onlyWithImage", value: boolean): void;
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-xl border flex flex-wrap gap-4">
    <input
      :value="search"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Buscar por nome, EAN ou ID"
      class="border rounded px-3 py-2 w-64"
    />

    <select
      :value="status"
      @change="$emit('update:status', ($event.target as HTMLSelectElement).value as any)"
      class="border rounded px-3 py-2"
    >
      <option value="ALL">Todos</option>
      <option :value="ProductStatus.OK">OK</option>
      <option :value="ProductStatus.INDISPONIVEL">Indisponível</option>
      <option :value="ProductStatus.ERRO">Erro</option>
    </select>

    <label class="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        :checked="onlyWithImage"
        @change="$emit('update:onlyWithImage', ($event.target as HTMLInputElement).checked)"
      />
      Apenas com imagem
    </label>
  </div>
</template>
