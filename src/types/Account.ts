import { PayMethod } from "./PayMethod"

export interface Account {
    id: number
    name: string
    active: boolean
    cash: boolean
    payMethods: PayMethod[]
    balance?: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }