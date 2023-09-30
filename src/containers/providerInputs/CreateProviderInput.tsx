import React, { useState } from 'react'
import Content from '../../components/generics/Content'
import ProviderInputForm from '../../components/providerInputs/ProviderInputForm'
import { usePost } from '../../hooks/useAPI'
import { ProviderInput } from '../../types/ProviderInput'

interface Props {
  providerInput: ProviderInput
  refreshProviderInputs: () => void
  getRestringedBrandsId: (providerId: number) => number[]
  showProviders?: boolean
}

const CreateProviderInput = ({ providerInput, refreshProviderInputs, getRestringedBrandsId, showProviders }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [createProviderInput, setCreateProviderInput] = useState<ProviderInput>(providerInput)

  const handleSubmit = async (newProviderInput: ProviderInput) => {
    setIsLoading(true)
    const response = await usePost<ProviderInput>('providerInputs', newProviderInput)
    if (!response.error) {
      refreshProviderInputs()
      setErrors([])
    }
    else {
      setCreateProviderInput(newProviderInput)
      setErrors(response.message)
    }
    setIsLoading(false)
  }

  return (
    <Content  isLoading={isLoading}>
      <ProviderInputForm showProviders={showProviders} getRestringedBrandsId={getRestringedBrandsId} errors={errors} currentProviderInput={createProviderInput} action={handleSubmit} />
    </Content>
  )
}

export default CreateProviderInput