import React, { useState } from 'react'
import MeasureForm from '../../components/measures/MeasureForm'
import { usePatch } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  measure: Measure
  refreshMeasures: () => void
  magnitudes: Magnitude[]
}

const CreateMeasure = ({ measure, refreshMeasures, magnitudes }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editMeasure: Measure) => {
    const response = await usePatch<Measure>(`measures/${editMeasure.id}`, editMeasure)
    if (!response.error) {
      refreshMeasures()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <MeasureForm magnitudes={magnitudes} errors={errors} currentMeasure={measure} action={handleSubmit} />
  )
}

export default CreateMeasure