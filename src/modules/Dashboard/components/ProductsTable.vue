<script setup lang="ts">
import type { IProduct } from '@/modules/Dashboard/types/product'

defineProps<{
  products: IProduct[]
}>()

defineEmits<{
  (e: 'edit', product: IProduct): void
  (e: "delete", id: string | number): void;
}>();

</script>

<template>
  <div class="bg-white rounded shadow overflow-x-auto">
   <div class="max-h-[500px] overflow-x-auto overflow-y-auto">
      <table class="w-full text-sm min-w-[1000px]">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th class="p-3 text-left">Nome</th>
          <th class="p-3">Preço</th>
          <th class="p-3">Status</th>
          <th class="p-3">Id</th>
          <th class="p-3">Hean</th>
          <th class="p-3">Foto</th>
          <th class="p-3">Foto Fornecedor</th>
          <th class="p-3">Ações</th>
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
          <td class="p-3 flex gap-2">
            <button
              class="px-3 py-1 text-sm rounded bg-blue-500 text-white"
              @click="$emit('edit', product)"
            >
              Editar
            </button>

            <button
              class="px-3 py-1 text-sm rounded bg-red-500 text-white"
              @click="$emit('delete', product.ID)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
     </div>
  </div>
</template>
