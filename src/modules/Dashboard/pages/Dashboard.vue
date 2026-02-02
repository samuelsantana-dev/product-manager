<script setup lang="ts">
import ProductsTable from "@/modules/Dashboard/components/ProductsTable.vue";
import MetricsCards from "@/modules/Dashboard/components/MetricCard.vue";
import { computed } from "vue";
import { ProductStatus } from "@/modules/Dashboard/types/product";
import { useProductsStore } from "@/modules/Dashboard/stores/products.store";

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

const filteredProducts = computed(() => store.products);
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
    <ProductsTable
      :products="filteredProducts"
      @edit="store.products.find((p) => p.ID === $event.ID)"
    />
  </div>
</template>
