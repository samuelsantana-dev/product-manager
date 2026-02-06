<script setup lang="ts">
import type { IProduct, ProductStatus } from '@/modules/Dashboard/types/product';
import ProductBadge from '@/shared/components/product/ProductBadge.vue'


const props = defineProps<{ product: IProduct }>()

const emit = defineEmits<{
  (e: 'edit', product: IProduct): void
}>()
</script>

<template>
  <div 
    class="group bg-white rounded-2xl border border-gray-100 p-3 md:p-4 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col cursor-pointer"
    @click="emit('edit', props.product)"
  >
    <div class="relative aspect-square w-full bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-transparent group-hover:border-blue-50 transition-colors">
      <img
        v-if="product.BB_Image_Url"
        :src="product.BB_Image_Url"
        :alt="product.Name"
        class="object-contain h-full w-full p-4 transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div v-else class="flex flex-col items-center gap-2 text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div class="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-gray-100 flex items-center gap-1">
        <span class="text-[10px] font-bold text-gray-700">{{ product.Score }}</span>
        <span class="text-yellow-500 text-[10px]">⭐</span>
      </div>
    </div>

    <div class="flex flex-col flex-1">
      <div class="flex items-center justify-between mb-2">
        <ProductBadge :status="product.Status as ProductStatus" class="scale-90 origin-left" />
        <span class="text-[10px] text-gray-400 font-mono hidden sm:block">#{{ product.ID.toString().slice(-4) }}</span>
      </div>

      <h3 class="font-semibold text-gray-800 text-sm leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
        {{ product.Name }}
      </h3>
      
      <div class="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider">EAN</span>
          <span class="text-[11px] text-gray-600 font-medium">{{ product.EAN }}</span>
        </div>
        
        <button 
          @click.stop="emit('edit', props.product)"
          class="bg-gray-50 text-gray-400 group-hover:bg-blue-600 group-hover:text-white p-2 rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>