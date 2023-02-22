import React, { useState } from 'react'
import MeasureForm from '../../components/measures/MeasureForm'
import { usePost } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'

interface Props {
  measure: Measure
  refreshMeasures: () => void
}

const CreateMagnitude = ({ measure, refreshMeasures }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newMeasure: Measure) => {
    const response = await usePost<Measure>('measures', newMeasure)
    if (!response.error) {
      refreshMeasures()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <MeasureForm errors={errors} currentMeasure={measure} action={handleSubmit} />
  )
}

export default CreateMagnitude