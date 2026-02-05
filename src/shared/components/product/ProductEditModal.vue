<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseModal from '@/shared/components/ui/BaseModal.vue'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import BaseSelect from '@/shared/components/ui/BaseSelect.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import { ProductStatus, type IProduct, type ProductForm } from '../../../modules/Dashboard/types/product'

const props = defineProps<{
  open: boolean
  product: IProduct | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', product: IProduct): void
}>()

const form = reactive<ProductForm>({
  Name: '',
  EAN: '',
  Status: ProductStatus.OK,
  Score: 0,
  Mirakl_Image: '',
  BB_Image_Url: ''
})

watch(
  () => props.product,
  (product) => {
    if (!product) return
    Object.assign(form, {
      Name: product.Name,
      EAN: product.EAN,
      Status: product.Status,
      Score: product.Score,
      Mirakl_Image: product.Mirakl_Image,
      BB_Image_Url: product.BB_Image_Url
    })
  },
  { immediate: true }
)

const handleSave = () => {
  if (!props.product) return

  emit('save', {
    ...props.product,
    ...form
  })
}
</script>

<template>
  <BaseModal :open="open" title="Editar Produto" @close="$emit('close')">
    <div class="space-y-4">
      <BaseInput v-model="form.Name" label="Nome" />
      <BaseInput v-model="form.EAN" label="EAN" />

      <BaseSelect v-model="form.Status">
        <option :value="ProductStatus.OK">OK</option>
        <option :value="ProductStatus.INDISPONIVEL">Indisponível</option>
        <option :value="ProductStatus.ERRO">Erro</option>
      </BaseSelect>

      <BaseInput :model-value="String(form.Score)" label="Score" />
      <BaseInput v-model="form.BB_Image_Url" label="Imagem BB" />
      <BaseInput v-model="form.Mirakl_Image" label="Imagem Fornecedor" />

      <div class="flex justify-end gap-2 pt-4">
        <BaseButton variant="secondary" @click="$emit('close')">
          Cancelar
        </BaseButton>

        <BaseButton variant="success" @click="handleSave">
          Salvar
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
