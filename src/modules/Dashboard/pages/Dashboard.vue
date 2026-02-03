<script setup lang="ts">
import ProductsTable from "@/modules/Dashboard/components/ProductsTable.vue";
import MetricsCards from "@/modules/Dashboard/components/MetricCard.vue";
import ProductsFilters from "@/modules/Dashboard/components/ProductsFilters.vue";
import { ref, computed } from "vue";
import { ProductStatus, type IProduct } from "@/modules/Dashboard/types/product";
import { useProductsStore } from "@/modules/Dashboard/stores/products.store";

const search = ref("");
const statusFilter = ref<ProductStatus | "ALL">("ALL");
const onlyWithImage = ref(false);

const store = useProductsStore();

const totalWithImage = computed(
  () => store.products.filter((p) => !!p.Mirakl_Image).length,
);

const totalUnavailable = computed(
  () =>
    store.products.filter((p) => p.Status === ProductStatus.INDISPONIVEL)
      .length,
);

const totalOk = computed(
  () =>
    store.products.filter(
      (p) => p.Status === ProductStatus.OK && p.Mirakl_Image && p.Score > 0,
    ).length,
);

const totalErr = computed(
  () => store.products.filter((p) => p.Status === ProductStatus.ERRO).length,
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

const handleEdit = (product: IProduct) => {
  const newName = prompt("Novo nome do produto:", product.Name);

  if (newName) {
    store.updateProduct({
      ...product,
      Name: newName,
    });
  }
};


</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <div class="flex gap-4 flex-wrap">
      <MetricsCards label="Produtos com imagem" :value="totalWithImage" />
      <MetricsCards
        label="Indisponíveis"
        :value="totalUnavailable"
        color="text-red-600"
      />
      <MetricsCards
        label="Produtos OK"
        :value="totalOk"
        color="text-green-600"
      />
      <MetricsCards
        label="Score médio"
        :value="averageScore"
        color="text-blue-600"
      />
      <MetricsCards
        label="Produtos com erro"
        :value="totalErr"
        color="text-red-600"
      />
    </div>
    <div>
      <ProductsFilters :search="search" :status="statusFilter" :onlyWithImage="onlyWithImage"
        @update:search="search = $event" @update:status="statusFilter = $event"
        @update:onlyWithImage="onlyWithImage = $event" />
    </div>
    </div>
     <div>
    <ProductsTable
      :products="filteredProducts"
      @edit="handleEdit"
      @delete="store.removeProduct"
    />
  </div>
  
</template>
