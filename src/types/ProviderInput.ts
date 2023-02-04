import { Brand } from './Brand'
import { Input } from './Input'
import { Measure } from './Measure'
import { Provider } from './Provider'

export interface ProviderInput {
  id: number
  inputId: number
  providerId: number
  lowerPrice: number
  upperPrice: number
  currentPrice: number
  lastPrice: number
  expectedPrice: number
  presentation: number
  measureId: number
  brandId: number
  provider?: Provider
  input?: Input
  brand?: Brand
  measure?: Measure
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}