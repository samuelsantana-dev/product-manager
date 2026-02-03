<script setup lang="ts">
import type { IProduct, ProductStatus } from '@/modules/Dashboard/types/product';
import ProductBadge from './ProductBadge.vue'

defineProps<{ product: IProduct }>()
</script>

<template>
  <div class="group bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
    <div class="relative w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-gray-50 group-hover:border-blue-100 transition-colors">
      <img
        v-if="product.BB_Image_Url"
        :src="product.BB_Image_Url"
        :alt="product.Name"
        class="object-contain h-full w-full p-2 transform group-hover:scale-110 transition-transform duration-500"
      />
      <div v-else class="flex flex-col items-center gap-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor text-current">
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
        <button class="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>