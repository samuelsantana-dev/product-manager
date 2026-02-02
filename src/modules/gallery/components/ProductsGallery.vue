<script setup lang="ts">
import { useProductsStore } from '@/modules/Dashboard/stores/products.store'

const store = useProductsStore()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="product in store.products"
      :key="product.ID"
      class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
    >
      <div class="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        <img
          v-if="product.Mirakl_Image"
          :src="product.Mirakl_Image"
          :alt="product.Name"
          class="object-contain h-full"
        />
        <span v-else class="text-gray-400 text-sm">Sem imagem</span>
      </div>

      <h3 class="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
        {{ product.Name }}
      </h3>

      <span
        class="inline-block px-2 py-1 text-xs rounded-full mb-2"
        :class="product.Status === 'OK'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'"
      >
        {{ product.Status === 'OK' ? 'Disponível' : 'Indisponível' }}
      </span>

      <!-- Score -->
      <div class="text-sm text-gray-600 mt-2">
        <strong>Score:</strong> {{ product.Score }}
      </div>
    </div>
  </div>
</template>
