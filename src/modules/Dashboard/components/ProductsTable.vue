<script setup lang="ts">
import type { IProduct } from '@/modules/Dashboard/types/product'

defineProps<{
  products: IProduct[]
}>()

</script>

<template>
  <div class="bg-white rounded shadow overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">Nome</th>
          <th class="p-3">Preço</th>
          <th class="p-3">Status</th>
          <th class="p-3">Id</th>
          <th class="p-3">Hean</th>
          <th class="p-3">Foto</th>
          <th class="p-3">Foto Fornecedor</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="product in products"
          :key="product.ID"
          class="border-t"
        >
          <td class="p-3">{{ product.Name }}</td>
          <td class="p-3">R$ {{ product.Score }}</td>
          <td class="p-3">
            <span
              :class="product.Status === 'OK' ? 'text-green-600' : 'text-red-600'"
            >
             {{ product.Status === 'OK' ? 'OK' : 'Indisponível' }}
            </span>
          </td>
          <td>{{ product.ID }}</td>
          <td>{{ product.EAN }}</td>
         <td>
            <img
              :src="product.BB_Image_Url"
              alt=""
              class="h-12 w-auto object-contain"
            />
          </td>
          <td>
            <img
              :src="product.Mirakl_Image"
              alt=""
              class="h-12 w-auto object-contain"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
