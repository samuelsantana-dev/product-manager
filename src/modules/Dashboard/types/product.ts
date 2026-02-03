

export enum ProductStatus {
  OK = 'OK',
  INDISPONIVEL = 'INDISPONIVEL',
  ERRO = 'ERRO',
  ALL = 'ALL'
}
export interface IProduct {
  ID: string
  EAN: string
  Name: string
  Status: string
  Score: number
  Mirakl_Image: string
  BB_Image_Url: string
}

export type ProductForm = Omit<IProduct, 'ID'>

