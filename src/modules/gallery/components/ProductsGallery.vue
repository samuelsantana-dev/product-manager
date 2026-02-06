<script setup lang="ts">
import { ref } from 'vue'
import GalleryEmptyState from '@/modules/gallery/components/GalleryEmptyState.vue'
import ProductCard from '@/shared/components/product/ProductCard.vue'
import GalleryFilters from '@/modules/gallery/components/GalleryFilters.vue'
import ProductEditModal from "@/shared/components/product/ProductEditModal.vue";
import type { IProduct, ProductStatus } from '@/modules/Dashboard/types/product'
import { useProductGallery } from '@/modules/gallery/composables/useProductGallery';
import { ProductsStore } from '@/shared/stores/product/products.store'

const store = ProductsStore();
const props = defineProps<{
  search: string
  status: ProductStatus | 'ALL'
  onlyWithImage: boolean
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:status', value: ProductStatus | 'ALL'): void
  (e: 'update:onlyWithImage', value: boolean): void
  (e: 'edit', product: IProduct): void
}>()

const { filteredProducts } = useProductGallery(props)

const editingProduct = ref<IProduct | null>(null)
const isEditModalOpen = ref(false)

const handleOpenEdit = (product: IProduct) => {
  editingProduct.value = { ...product } 
  isEditModalOpen.value = true
}

const handleSaveProduct = (updatedProduct: IProduct) => {
  store.updateProduct(updatedProduct)
  isEditModalOpen.value = false
  editingProduct.value = null
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 sticky top-4 z-10">
      <GalleryFilters
        :search="props.search"
        :status="props.status"
        :onlyWithImage="props.onlyWithImage"
        @update:search="emit('update:search', $event)"
        @update:status="emit('update:status', $event)"
        @update:onlyWithImage="emit('update:onlyWithImage', $event)"
      />
    </div>

    <div 
      v-if="filteredProducts.length > 0" 
      class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
    >
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.ID" 
        :product="product" 
        @edit="handleOpenEdit" 
      />
    </div>

    <GalleryEmptyState v-else class="py-20" />

    <ProductEditModal
      v-if="isEditModalOpen"
      :open="isEditModalOpen"
      :product="editingProduct"
      @close="isEditModalOpen = false"
      @save="handleSaveProduct"
    />
  </div>
</template>