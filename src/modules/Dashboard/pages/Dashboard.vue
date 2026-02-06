<template>
  <div class="p-4 md:p-6 space-y-6">
    <h1 class="text-xl md:text-2xl font-bold text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricsCards label="Produtos com imagem" :value="totalWithImage" />
      <MetricsCards label="Indisponíveis" :value="totalUnavailable" color="text-red-600" />
      <MetricsCards label="Produtos OK" :value="totalOk" color="text-green-600" />
      <MetricsCards label="Score médio" :value="averageScore" color="text-blue-600" />
      <MetricsCards label="Produtos com erro" :value="totalErr" color="text-red-600" />
    </div>

    <div class="flex flex-col lg:flex-row justify-between gap-4">
      
      <div class="w-full lg:w-auto">
        <ProductsFilters 
          :search="search" 
          :status="statusFilter" 
          :onlyWithImage="onlyWithImage"
          @update:search="search = $event" 
          @update:status="statusFilter = $event"
          @update:onlyWithImage="onlyWithImage = $event" 
        />
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <BaseButton size="sm" variant="success" @click="addNewProduct" class="w-full sm:w-auto">
          + Novo Produto
        </BaseButton>

        <div class="flex gap-2 border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-2">
          <BaseButton size="sm" variant="secondary" @click="jsonExportDownload(store.products)" class="flex-1">
            📥 JSON
          </BaseButton>

          <BaseButton size="sm" variant="excel" @click="ExportToExcel(store.products)" class="flex-1">
            📊 Excel
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg border border-gray-100">
      <ProductsTable
        :products="filteredProducts"
        @edit="handleEdit"
        @delete="store.removeProduct"
      />
    </div>

    <ProductEditModal
      :open="isEditModalOpen"
      :product="editingProduct"
      @close="isEditModalOpen = false"
      @save="handleSaveProduct"
    />
  </div>
</template>

<script setup lang="ts">
import ProductsTable from "@/modules/Dashboard/components/ProductsTable.vue";
import MetricsCards from "@/modules/Dashboard/components/MetricCard.vue";
import ProductsFilters from "@/modules/Dashboard/components/ProductsFilters.vue";
import { ref, computed } from "vue";
import { ProductStatus, type IProduct } from "@/modules/Dashboard/types/product";
import {ProductsStore} from "@/shared/stores/product/products.store";
import BaseButton  from "@/shared/components/ui/BaseButton.vue";
import { jsonExportDownload } from "@/shared/utils";
import { ExportToExcel } from "@/shared/utils/excel";
import ProductEditModal from "@/shared/components/product/ProductEditModal.vue";
const search = ref("");
const statusFilter = ref<ProductStatus | "ALL">("ALL");
const onlyWithImage = ref(false);
const editingProduct = ref<IProduct | null>(null)
const isEditModalOpen = ref(false)


const store = ProductsStore();

const totalWithImage = computed(
  () => store.products.filter((p) => !!p.Mirakl_Image).length,
);

const totalUnavailable = computed(
  () =>
    store.products.filter((p) => p.Status === ProductStatus.INDISPONIVEL)
      .length,
);

const totalOk = computed(
  () =>
    store.products.filter(
      (p) => p.Status === ProductStatus.OK && p.Mirakl_Image && p.Score > 0,
    ).length,
);

const totalErr = computed(
  () => store.products.filter((p) => p.Status === ProductStatus.ERRO).length,
);

const averageScore = computed(() => {
  if (!store.products.length) return 0;
  const total = store.products.reduce((sum, p) => sum + p.Score, 0);
  return Number((total / store.products.length).toFixed(2));
});

const filteredProducts = computed(() => {
  return store.products.filter((product) => {
    const searchValue = search.value.toLowerCase();

    const matchesSearch =
      product.Name.toLowerCase().includes(searchValue) ||
      product.EAN.includes(searchValue) ||
      String(product.ID).includes(searchValue);

    const matchesStatus =
      statusFilter.value === "ALL" ||
      product.Status === statusFilter.value;

    const matchesImage =
      !onlyWithImage.value || !!product.Mirakl_Image;

    return matchesSearch && matchesStatus && matchesImage;
  });
});

const handleEdit = (product: IProduct) => {
  editingProduct.value = product
  isEditModalOpen.value = true
}


const handleSaveProduct = (product: IProduct) => {
  const exists = store.products.find(p => p.ID === product.ID)
  if (exists) {
    store.updateProduct(product)
  } else {
    store.addProduct(product)
  }

  isEditModalOpen.value = false
  editingProduct.value = null
}


const addNewProduct = () => {
  editingProduct.value = {
    ID: `NEW-${Date.now()}`,
    EAN: "",
    Name: "",
    Status: ProductStatus.OK,
    Score: 0,
    Mirakl_Image: "",
    BB_Image_Url: ""
  }

  isEditModalOpen.value = true
}


</script>