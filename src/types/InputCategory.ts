import { Input } from './Input'

export interface InputCategory {
  id: number
  name: string
  inputs?: Input[]
  delete: boolean
  createdBy?: number
  updatedBy?: number
}