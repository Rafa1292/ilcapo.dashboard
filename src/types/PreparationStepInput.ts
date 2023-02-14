import { Input } from './Input'
import { Measure } from './Measure'

export interface PreparationStepInput {
  id: number
  inputId: number
  preparationStepId: number
  quantity: number
  measureId: number
  measure: Measure,
  input: Input
  delete: boolean
  createdBy?: number
  updatedBy?: number
}