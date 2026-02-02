import { defineStore } from 'pinia'
import type { IProduct } from '@/modules/Dashboard/types/product'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[]
  }),
  
  actions: {
    setProducts(products: IProduct[]) {
      this.products = products
    }
  }
})