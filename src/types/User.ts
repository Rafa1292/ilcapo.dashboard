import { UserInfo } from "./UserInfo"

export interface User {
    id: number
    email: string
    password: string
    userInfo: UserInfo
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }