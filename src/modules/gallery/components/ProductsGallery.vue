<script setup lang="ts">
import  GalleryEmptyState  from '@/modules/gallery/components/GalleryEmptyState.vue'
import ProductCard from '@/shared/components/product/ProductCard.vue'
import type { ProductStatus } from '@/modules/Dashboard/types/product'
import GalleryFilters from '@/modules/gallery/components/GalleryFilters.vue'
import { useProductGallery } from '../composables/useProductGallery';

const props = defineProps<{
  search: string
  status: ProductStatus | 'ALL'
  onlyWithImage: boolean
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:status', value: ProductStatus | 'ALL'): void
  (e: 'update:onlyWithImage', value: boolean): void
}>()

const { filteredProducts } = useProductGallery(props)
</script>

<<template>
  <div class="flex flex-col gap-8">
    <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <GalleryFilters
        :search="props.search"
        :status="props.status"
        :onlyWithImage="props.onlyWithImage"
        @update:search="emit('update:search', $event)"
        @update:status="emit('update:status', $event)"
        @update:onlyWithImage="emit('update:onlyWithImage', $event)"
      />
    </div>

    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.ID" 
        :product="product" 
      />
    </div>

    <GalleryEmptyState v-else />
  </div>
</template>