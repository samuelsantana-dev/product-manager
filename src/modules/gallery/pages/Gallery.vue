<script setup lang="ts">
import type { IProduct, ProductStatus } from '@/modules/Dashboard/types/product';
import ProductsGallery from '@/modules/gallery/components/ProductsGallery.vue'
import { ref } from 'vue';
const search = ref('')
const status = ref<ProductStatus | 'ALL'>('ALL')
const onlyWithImage = ref(false)
const editingProduct = ref<IProduct | null>(null)
const isEditModalOpen = ref(false)

const handleEdit = (product: IProduct) => {
  editingProduct.value = product
  isEditModalOpen.value = true
}


</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Galeria</h1>

    <ProductsGallery 
      v-model:search="search"
      v-model:status="status"
      v-model:onlyWithImage="onlyWithImage"
        @edit="handleEdit"

    />
  </div>
</template>
