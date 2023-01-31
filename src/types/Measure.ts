import { Magnitude } from './Magnitude'

export interface Measure {
  id: number
  name: string
  principalMeasure: boolean
  value: number
  magnitudeId: number
  abbreviation: string
  magnitude?: Magnitude
  delete: boolean
  createdBy?: number
  updatedBy?: number
}