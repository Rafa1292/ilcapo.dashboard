import { Measure } from './Measure'

export interface Magnitude {
  id: number
  name: string
  measures: Measure[]
  delete: boolean
  createdBy?: number
  updatedBy?: number  
}
