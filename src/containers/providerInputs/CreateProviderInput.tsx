import React, { useEffect, useState } from 'react'
import Content from '../../components/generics/Content'
import ProviderInputForm from '../../components/providerInputs/ProviderInputForm'
import { usePost } from '../../hooks/useAPI'
import { ProviderInput } from '../../types/ProviderInput'

interface Props {
  providerInput: ProviderInput
  refreshProviderInputs: () => void
  getRestringedBrandsId: (providerId: number) => number[]
}

const CreateProviderInput = ({ providerInput, refreshProviderInputs, getRestringedBrandsId }: Props) => {
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
    <Content minHeight='400px' isLoading={isLoading}>
      <ProviderInputForm getRestringedBrandsId={getRestringedBrandsId} errors={errors} currentProviderInput={createProviderInput} action={handleSubmit} />
    </Content>
  )
}

export default CreateProviderInput