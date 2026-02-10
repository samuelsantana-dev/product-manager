<script setup lang="ts">
import type { IProduct } from '@/modules/Dashboard/types/product'
import BaseButton from '@/shared/components/ui/BaseButton.vue'; 
import BaseImage from '@/shared/components/ui/BaseImage.vue'; 
defineProps<{
  products: IProduct[]
}>()

defineEmits<{
  (e: 'edit', product: IProduct): void
  (e: "delete", id: string ): void;
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
             {{ product.Status }}
            </span>
          </td>
          <td>{{ product.ID }}</td>
          <td>{{ product.EAN }}</td>
         <td>
            <BaseImage
              :src="product.BB_Image_Url"
              :alt="product.Name"
              variant="table"
            />

          </td>
          <td>
            <BaseImage
              :src="product.Mirakl_Image"
              :alt="product.Name"
              variant="table"
            />

          </td>
          <td class="p-3 flex gap-2">
            <BaseButton size="sm" variant="secondary" @click="$emit('edit', product)">
              Editar
            </BaseButton>

            <BaseButton size="sm" variant="danger" @click="$emit('delete', product.ID)">
              Excluir
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
     </div>
  </div>
</template>
