import { AccountHistory } from "./AccountHistory"

export interface PayMethod {
    id: number
    name: string
    accountId: number
    active: boolean
    comision: number
    accountHistories: AccountHistory[]
    isPublic: boolean
    isSemiPublic: boolean
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }
  