export interface ModifierElement {
  id: number
  name: string
  price: number
  quantity: number
  isProduct: boolean
  productReferenceId: number
  delete: boolean
  updatedBy?: number
  createdBy?: number
}
