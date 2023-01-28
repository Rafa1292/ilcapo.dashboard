import React, { useState } from 'react'
import ProviderForm from '../../components/providers/ProviderForm'
import { usePost } from '../../hooks/useAPI'
import { Provider } from '../../types/Provider'
interface Props {
  provider: Provider
  refreshProviders: () => void
}

const CreateProvider = ({ provider, refreshProviders }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newProvider: Provider) => {
    const response = await usePost<Provider>('providers', newProvider)
    if (!response.error) {
      refreshProviders()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <ProviderForm errors={errors} currentProvider={provider} action={handleSubmit} />
  )
}

export default CreateProvider