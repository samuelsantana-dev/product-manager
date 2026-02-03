<script setup lang="ts">
import { ProductStatus } from "@/modules/Dashboard/types/product";
import BaseInput from "@/shared/components/ui/BaseInput.vue";
import BaseSelect from "@/shared/components/ui/BaseSelect.vue";
import BaseCheckBox from "@/shared/components/ui/BaseCheckBox.vue";
defineProps<{
  search: string;
  status: ProductStatus | "ALL";
  onlyWithImage: boolean;
}>();

const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:status", value: ProductStatus | "ALL"): void;
  (e: "update:onlyWithImage", value: boolean): void;
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-6 shadow-sm">
    <BaseInput
      :model-value="search"
      @update:model-value="emit('update:search', $event)"
      placeholder="Buscar por nome, EAN ou ID..."
    />

    <BaseSelect
      :model-value="status"
      @update:model-value="emit('update:status', $event)"
    >
      <option value="ALL">Todos os status</option>
      <option :value="ProductStatus.OK">Disponível (OK)</option>
      <option :value="ProductStatus.INDISPONIVEL">Indisponível</option>
      <option :value="ProductStatus.ERRO">Com Erro</option>
    </BaseSelect>

    <BaseCheckBox 
      label="Apenas com imagem" 
      :model-value="onlyWithImage"
      @update:model-value="emit('update:onlyWithImage', $event)"
    />
  </div>
</template>