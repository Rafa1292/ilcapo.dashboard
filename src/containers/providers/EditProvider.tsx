import React from 'react'
import ProviderForm from '../../components/providers/ProviderForm'
import { Provider } from '../../types/Provider'

interface Props {
  provider: Provider
}

const EditProvider = ({ provider }: Props) => {

  const handleSubmit = () => {
    console.log('Submit')
  }

  return (
    <ProviderForm currentProvider={provider} handleSubmit={handleSubmit}/>
  )
}

export default EditProvider