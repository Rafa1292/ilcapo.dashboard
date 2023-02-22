import { Measure } from './Measure'

export interface Input {
  id: number
  name: string
  lowerPrice: number
  currentPrice: number
  upperPrice: number
  lastPrice: number
  expectedPrice: number
  stock: number
  presentation: number
  suggestedStock: number
  currentProviderId: number
  measureId: number
  measure: Measure
  inputCategoryId: number
  delete: boolean
  createdBy?: number
  updatedBy?: number
}