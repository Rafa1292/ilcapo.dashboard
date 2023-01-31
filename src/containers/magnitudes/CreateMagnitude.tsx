import React, { useState } from 'react'
import MagnitudeForm from '../../components/magnitudes/MagntudeForm'
import { usePost } from '../../hooks/useAPI'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  magnitude: Magnitude
  refreshMagnitudes: () => void
}

const CreateMagnitude = ({ magnitude, refreshMagnitudes }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newMagnitude: Magnitude) => {
    const response = await usePost<Magnitude>('magnitudes', newMagnitude)
    if (!response.error) {
      refreshMagnitudes()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <MagnitudeForm errors={errors} currentMagnitude={magnitude} action={handleSubmit} />
  )
}

export default CreateMagnitude