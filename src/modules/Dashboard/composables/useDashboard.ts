import { ProductsStore } from "@/shared/stores/product/products.store";
import { computed, ref } from "vue";
import { ProductStatus, type IProduct } from "@/modules/Dashboard/types/product";
type ProductFormMode = "create" | "edit";

export function useProducCreatetEdit() {
  const store = ProductsStore();

  const editingProduct = ref<IProduct | null>(null);
  const isEditModalOpen = ref(false);
  const mode = ref<ProductFormMode>("edit");

  const handleEdit = (product: IProduct) => {
     mode.value = "edit";
    editingProduct.value = { ...product };
    isEditModalOpen.value = true;
  };

  const handleCreate = () => {
    mode.value = "create";
    editingProduct.value = {
      ID: `NEW-${Date.now()}`,
      EAN: "",
      Name: "",
      Status: ProductStatus.OK,
      Score: 0,
      Mirakl_Image: "",
      BB_Image_Url: ""
    };

    isEditModalOpen.value = true;
  };

  const handleSaveProduct = (product: IProduct) => {
    const isNew = String(product.ID).startsWith("NEW-");

    if (isNew) {
      store.addProduct(product);
    } else {
      store.updateProduct(product);
    }

    isEditModalOpen.value = false;
    editingProduct.value = null;
  };

  return {
    editingProduct,
    isEditModalOpen,
    handleEdit,
    handleCreate,
    handleSaveProduct,
    mode
  };
}


export function useProductsDashboard() {
  const store = ProductsStore();

  const search = ref("");
  const statusFilter = ref<ProductStatus | "ALL">("ALL");
  const onlyWithImage = ref(false);

  const totalWithImage = computed(
    () => store.products.filter(p => !!p.Mirakl_Image).length
  );

  const totalUnavailable = computed(
    () => store.products.filter(p => p.Status === ProductStatus.INDISPONIVEL).length
  );

  const totalOk = computed(
    () =>
      store.products.filter(
        p => p.Status === ProductStatus.OK && p.Mirakl_Image && p.Score > 0
      ).length
  );

  const totalErr = computed(
    () => store.products.filter(p => p.Status === ProductStatus.ERRO).length
  );

  const averageScore = computed(() => {
    if (!store.products.length) return 0;
    const total = store.products.reduce((sum, p) => sum + p.Score, 0);
    return Number((total / store.products.length).toFixed(2));
  });

  const filteredProducts = computed(() => {
    return store.products.filter((product) => {
      const searchValue = search.value.toLowerCase();

      const matchesSearch =
        product.Name.toLowerCase().includes(searchValue) ||
        product.EAN.includes(searchValue) ||
        String(product.ID).includes(searchValue);

      const matchesStatus =
        statusFilter.value === "ALL" ||
        product.Status === statusFilter.value;

      const matchesImage =
        !onlyWithImage.value || !!product.Mirakl_Image;

      return matchesSearch && matchesStatus && matchesImage;
    });
  });

  return {
    store,
    search,
    statusFilter,
    onlyWithImage,
    filteredProducts,
    totalWithImage,
    totalUnavailable,
    totalOk,
    totalErr,
    averageScore
  };
}
