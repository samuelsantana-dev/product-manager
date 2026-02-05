import { ProductsStore } from "@/shared/stores/product/products.store";
import { computed } from "vue";
import type { ProductStatus } from "../types/product";

interface IProductsDashboard {
  search: string;
  statusFilter: ProductStatus | "ALL";
  onlyWithImage: boolean;
}
export function useProductsDashboard(props: IProductsDashboard) {
  const store = ProductsStore();
  const filteredProducts = computed(() => {
    return store.products.filter((product) => {
      const searchValue = props.search.toLowerCase();

      const matchesSearch =
        product.Name.toLowerCase().includes(searchValue) ||
        product.EAN.includes(searchValue) ||
        String(product.ID).includes(searchValue);

      const matchesStatus =
        props.statusFilter === "ALL" || product.Status === props.statusFilter;

      const matchesImage = !props.onlyWithImage || !!product.Mirakl_Image;

      return matchesSearch && matchesStatus && matchesImage;
    });
  });

  return {
    filteredProducts,
  };
}
