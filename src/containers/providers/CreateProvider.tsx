import React from 'react'
import ProviderForm from '../../components/providers/ProviderForm'
import { usePost } from '../../hooks/useAPI'
import { Provider } from '../../types/Provider'

interface Props {
  provider: Provider
  refreshProviders: () => void
}

const CreateProvider = ({ provider, refreshProviders }: Props) => {

  const handleSubmit = async (newProvider: Provider) => {
    console.log(newProvider)
    const response = await usePost<Provider>('providers', newProvider)
    if (response.error) {
      console.log(response.error)
    } else {
      refreshProviders()
    }
  }

  return (
    <ProviderForm currentProvider={provider} action={handleSubmit} />
  )
}

export default CreateProvider