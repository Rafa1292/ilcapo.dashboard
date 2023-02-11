import { PreparationStepInput } from './PreparationStepInput'

export interface PreparationStep {
  id: number
  stepNumber: number
  description: string
  cost: number
  minutesOfPreparation: number
  ingredientId: number
  preparationStepInputs: PreparationStepInput[]
  delete: boolean
  createdBy?: number
  updatedBy?: number
}