import React, { useState } from 'react'
import ProviderForm from '../../components/providers/ProviderForm'
import { usePatch } from '../../hooks/useAPI'
import { Provider } from '../../types/Provider'

interface Props {
  provider: Provider
  refreshProviders: () => void
}

const EditProvider = ({ provider, refreshProviders }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editProvider: Provider) => {
    const response = await usePatch<Provider>(`providers/${editProvider.id}`, editProvider)
    if (!response.error) {
      refreshProviders()
    }
    else {
      setErrors(response.message)
    }
  }

  return (
    <ProviderForm errors={errors} currentProvider={provider} action={handleSubmit} />
  )
}

export default EditProvider