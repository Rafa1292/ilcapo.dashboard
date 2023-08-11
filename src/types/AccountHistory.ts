import { PayMethod } from "./PayMethod"

export interface AccountHistory {
    id: number
    amount: number
    previousBalance: number
    currentBalance: number
    pay: boolean
    payMethodId: number
    payMethod: PayMethod
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }