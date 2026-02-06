import { z } from 'zod'
import { ProductStatus } from '../types/product'

export const productSchema = z.object({
  Name: z
    .string()
    .min(3, 'Nome precisa ter pelo menos 3 caracteres'),

  EAN: z
    .string()
    .min(3, 'EAN precisa ter pelo menos 3 caracteres'),

  Status: z.nativeEnum(ProductStatus),

  Score: z
    .number()
    .min(0, 'Score mínimo é 0')
    .max(100, 'Score máximo é 100'),

  BB_Image_Url: z
    .url('URL inválida')
    .optional()
    .or(z.literal('')),

  Mirakl_Image: z
   .url('URL inválida')
    .optional()
    .or(z.literal(''))
})

export type ProductSchema = z.infer<typeof productSchema>
