<script setup lang="ts">
import ImportFile from '@/modules/Files/components/ImportFile.vue'
import { ProductsStore } from '@/shared/stores/product/products.store'

const store = ProductsStore()
</script>
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Importar Planilha</h1>
    <ImportFile />
    
    <div v-if="store.products.length > 0" class="mt-6">
      <p>✅ Importados {{ store.products.length }} produtos</p>
    </div>
  </div>
</template>

