import type { IProduct } from "@/modules/Dashboard/types/product";

export const jsonExportDownload = (product: IProduct[]) => {
  const data = JSON.stringify(product, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'produtos_atualizados.json';
  link.click();
};