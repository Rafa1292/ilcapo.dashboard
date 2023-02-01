import React, { useState } from 'react'
import MagnitudeForm from '../../components/magnitudes/MagntudeForm'
import { usePatch } from '../../hooks/useAPI'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  magnitude: Magnitude
  refreshMagnitudes: () => void
}

const EditMagnitude = ({ magnitude, refreshMagnitudes }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editMagnitude: Magnitude) => {
    const response = await usePatch<Magnitude>(`magnitudes/${editMagnitude.id}`, editMagnitude)
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

export default EditMagnitude