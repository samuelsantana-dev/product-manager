import * as XLSX from 'xlsx'
import type { IProduct } from '@/modules/Dashboard/types/product'

export const ExcelService = {
  readFile(file: File): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = e.target?.result
          if (!data) return resolve([])

          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          if (!sheetName) return resolve([])

          const sheet = workbook.Sheets[sheetName]
          if (!sheet) return resolve([])

          const json = XLSX.utils.sheet_to_json<Record<string, any>>(sheet)

          const products: IProduct[] = json.map((row, index) => ({
            ID: row.ID ?? index + 1,
            EAN: row.EAN ? String(row.EAN) : '',
            Name: row.Name ?? '',
            Status: String(row.Status ?? '').trim(), // ← valor real
            Score: Number(row.Score) || 0,
            Mirakl_Image: row.Mirakl_Image ?? '',
            BB_Image_Url: row.BB_Image_Url ?? ''
          }))

          resolve(products)
        } catch (err) {
          reject(err)
        }
      }

      reader.onerror = () => reject(new Error('Erro ao ler arquivo Excel'))
      reader.readAsBinaryString(file)
    })
  }
}

export function ExportToExcel(products: IProduct[]) {
  const worksheet = XLSX.utils.json_to_sheet(products);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

  XLSX.writeFile(workbook, `produtos_exportados_${new Date().getTime()}.xlsx`);
};