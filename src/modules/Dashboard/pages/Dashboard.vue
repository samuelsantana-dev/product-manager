<script setup lang="ts">
import ProductsTable from "@/modules/Dashboard/components/ProductsTable.vue";
import MetricsCards from "@/modules/Dashboard/components/MetricCard.vue";
import ProductsFilters from "@/modules/Dashboard/components/ProductsFilters.vue";
import BaseButton  from "@/shared/components/ui/BaseButton.vue";
import { jsonExportDownload } from "@/shared/utils";
import { ExportToExcel } from "@/shared/utils/excel";
import ProductEditModal from "@/shared/components/product/ProductEditModal.vue";
import {  useProductsDashboard } from "@/modules/Dashboard/composables/useDashboard";
import { useProducCreatetEdit } from "../composables/useDashboard";

const {
  store,
  search,
  statusFilter,
  onlyWithImage,
  filteredProducts,
  totalWithImage,
  totalUnavailable,
  totalOk,
  totalErr,
  averageScore
} = useProductsDashboard();


const {
  editingProduct,
  isEditModalOpen,
  mode,
  handleEdit,
  handleSaveProduct,
  handleCreate,
} = useProducCreatetEdit();


</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <div class="flex gap-4 flex-wrap">
      <MetricsCards label="Produtos com imagem" :value="totalWithImage" />
      <MetricsCards
        label="Indisponíveis"
        :value="totalUnavailable"
        color="text-red-600"
      />
      <MetricsCards
        label="Produtos OK"
        :value="totalOk"
        color="text-green-600"
      />
      <MetricsCards
        label="Score médio"
        :value="averageScore"
        color="text-blue-600"
      />
      <MetricsCards
        label="Produtos com erro"
        :value="totalErr"
        color="text-red-600"
      />
    </div>
    <div class="flex justify-between">
      <div class="flex gap-4 flex-wrap">
        <ProductsFilters :search="search" :status="statusFilter" :onlyWithImage="onlyWithImage"
          @update:search="search = $event" @update:status="statusFilter = $event"
          @update:onlyWithImage="onlyWithImage = $event" />
      </div>
     <div class="flex items-center gap-2 flex-wrap">
        <BaseButton size="sm" variant="success" @click="handleCreate">
          + Novo Produto
        </BaseButton>

        <div class="flex gap-2 border-l pl-2 ml-2">
          <BaseButton size="sm" variant="secondary" @click="jsonExportDownload(store.products)">
            📥 Exportar JSON
          </BaseButton>

          <BaseButton size="sm" variant="excel" @click="ExportToExcel(store.products)">
            📊 Exportar Excel
          </BaseButton>
        </div>
      </div>

    </div>
    </div>
     <div>
    <ProductsTable
      :products="filteredProducts"
      @edit="handleEdit"
      @delete="store.removeProduct"
    />

    <ProductEditModal
      :open="isEditModalOpen"
      :product="editingProduct"
      :mode="mode"
      @close="isEditModalOpen = false"
      @save="handleSaveProduct"
    />

  </div>
  
</template>