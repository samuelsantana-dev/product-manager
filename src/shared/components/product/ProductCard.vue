<script setup lang="ts">
import type { IProduct, ProductStatus } from '@/modules/Dashboard/types/product';
import ProductBadge from '@/shared/components/product/ProductBadge.vue'
import BaseButton  from "@/shared/components/ui/BaseButton.vue";

const props = defineProps<{ product: IProduct }>()

const emit = defineEmits<{
  (e: 'edit', product: IProduct): void
}>()
</script>

<template>
  <div 
    class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    @click="emit('edit', props.product)"
  >
    <div class="relative w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-gray-50 group-hover:border-blue-100 transition-colors">
      <img
        v-if="product.BB_Image_Url"
        :src="product.BB_Image_Url"
        :alt="product.Name"
        class="object-contain h-full w-full p-2 transform group-hover:scale-110 transition-transform duration-500"
      />
      <div v-else class="flex flex-col items-center gap-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-xs font-medium">Sem imagem</span>
      </div>
      <div class="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm border border-gray-100 text-[10px] font-bold text-gray-700">
        ⭐ {{ product.Score }}
      </div>
    </div>

    <div class="flex flex-col flex-1">
      <div class="mb-2">
        <ProductBadge :status="product.Status as ProductStatus" />
      </div>
      <h3 class="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ product.Name }}
      </h3>
      
      <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <span class="text-[11px] text-gray-400 font-mono">ID: {{ product.ID }}</span>
        <BaseButton size="sm" variant="secondary" @click.stop="emit('edit', props.product)">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </BaseButton>
      </div>
    </div>
  </div>
</template>