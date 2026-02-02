<script setup lang="ts">
import { useProductsStore } from '@/modules/Dashboard/stores/products.store'
import { ExcelService } from '@/shared/utils/excel'

const store = useProductsStore()

const handleFile = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  const products = await ExcelService.readFile(file)
  store.setProducts(products)
  
  input.value = ''
}
</script>

<template>
  <div class="p-6">
    <input 
      type="file" 
      accept=".xlsx,.xls"
      @change="handleFile"
      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>
</template>

