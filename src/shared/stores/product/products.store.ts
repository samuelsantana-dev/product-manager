import { defineStore } from 'pinia'
import type { IProduct } from '@/modules/Dashboard/types/product'

export const ProductsStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[]
  }),
  
  actions: {
    setProducts(products: IProduct[]) {
      this.products = products
    },
    addProduct(product: IProduct) {
      this.products.push(product);
    },

    updateProduct(updated: IProduct) {
      const index = this.products.findIndex(p => p.ID === updated.ID);
      if (index !== -1) {
        this.products[index] = { ...updated };
      }
    },

    removeProduct(id: string) {
      this.products = this.products.filter(p => p.ID !== id);
    },
  }
})