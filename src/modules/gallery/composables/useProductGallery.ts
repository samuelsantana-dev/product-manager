import { computed } from 'vue'
import { ProductsStore } from '@/shared/stores/product/products.store'
import type { ProductStatus } from '@/modules/Dashboard/types/product'

interface GalleryProps {
  search: string
  status: ProductStatus | 'ALL'
  onlyWithImage: boolean
}

export function useProductGallery(props: GalleryProps) {
  const store = ProductsStore()

  const filteredProducts = computed(() => {
    const searchValue = props.search.toLowerCase()

    return store.products.filter(product => {
      const matchesSearch =
        product.Name.toLowerCase().includes(searchValue) ||
        product.EAN.includes(searchValue) ||
        String(product.ID).includes(searchValue)

      const matchesStatus =
        props.status === 'ALL' || product.Status === props.status

      const matchesImage =
        !props.onlyWithImage || !!product.Mirakl_Image

      return matchesSearch && matchesStatus && matchesImage
    })
  })

  return {
    filteredProducts
  }
}