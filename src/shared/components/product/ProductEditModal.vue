<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseModal from '@/shared/components/ui/BaseModal.vue'
import BaseInput from '@/shared/components/ui/BaseInput.vue'
import BaseSelect from '@/shared/components/ui/BaseSelect.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import { ProductStatus, type IProduct, type ProductForm } from '../../../modules/Dashboard/types/product'
import { productSchema } from '@/modules/Dashboard/validators/product.schema'

const errors = reactive<Record<string, string>>({})

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

  const result = productSchema.safeParse(form)

  // Limpa erros anteriores
  Object.keys(errors).forEach(key => delete errors[key])

  if (!result.success) {
    result.error.issues.forEach(issue => {
      const field = issue.path[0] as string
      errors[field] = issue.message
    })
    return
  }

  emit('save', { ...props.product, ...form })
}
</script>

<template>
  <BaseModal :open="open" title="Editar Produto" @close="$emit('close')">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <div class="sm:col-span-2">
        <BaseInput
          v-model="form.Name"
          label="Nome"
          :error="errors.Name"
        />
      </div>

      <BaseInput
        v-model="form.EAN"
        label="EAN"
        :error="errors.EAN"
      />

      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium">Status</label>
        <BaseSelect v-model="form.Status" class="w-full">
          <option :value="ProductStatus.OK">OK</option>
          <option :value="ProductStatus.INDISPONIVEL">Indisponível</option>
          <option :value="ProductStatus.ERRO">Erro</option>
        </BaseSelect>
      </div>

      <BaseInput
        v-model="form.Score"
        label="Score"
        type="number"
        :error="errors.Score"
      />

      <BaseInput
        v-model="form.BB_Image_Url"
        label="Imagem BB"
        :error="errors.BB_Image_Url"
      />

      <div class="sm:col-span-2">
        <BaseInput
          v-model="form.Mirakl_Image"
          label="Imagem Fornecedor"
          :error="errors.Mirakl_Image"
        />
      </div>

      <div class="sm:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
        <BaseButton class="w-full sm:w-auto" variant="secondary" @click="$emit('close')">
          Cancelar
        </BaseButton>
        <BaseButton class="w-full sm:w-auto" variant="success" @click="handleSave">
          Salvar
        </BaseButton>
      </div>

    </div>
  </BaseModal>
</template>
