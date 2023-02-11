import { Input } from './Input'

export interface PreparationStepInput {
  id: number
  inputId: number
  preparationStepId: number
  quantity: number
  measureId: number
  input: Input
  delete: boolean
  createdBy?: number
  updatedBy?: number
}