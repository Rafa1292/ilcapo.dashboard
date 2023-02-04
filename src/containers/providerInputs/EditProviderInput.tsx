import React, { useEffect, useState } from 'react'
import Content from '../../components/generics/Content'
import ProviderInputForm from '../../components/providerInputs/ProviderInputForm'

import { usePatch } from '../../hooks/useAPI'
import { ProviderInput } from '../../types/ProviderInput'

interface Props {
  providerInput: ProviderInput
  refreshProviderInputs: () => void
  cancelAction: () => void
  getRestringedBrandsId: (providerId: number) => number[]
  showProviders?: boolean
}

const EditProviderInput = ({ providerInput, refreshProviderInputs, cancelAction, getRestringedBrandsId, showProviders }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editProviderInput, setCreateProviderInput] = useState<ProviderInput>(providerInput)

  const handleSubmit = async (currentProviderInput: ProviderInput) => {
    setIsLoading(true)
    const response = await usePatch<ProviderInput>(`providerInputs/${currentProviderInput.id}`, currentProviderInput)
    if (!response.error) {
      refreshProviderInputs()
      setErrors([])
    }
    else{
      setCreateProviderInput(currentProviderInput)
      setErrors(response.message)
    }
    setIsLoading(false)
  }
  return (
    <Content isLoading={isLoading} minHeight='400px'>
      <ProviderInputForm showProviders={showProviders} getRestringedBrandsId={getRestringedBrandsId} cancelAction={cancelAction} errors={errors} currentProviderInput={editProviderInput} action={handleSubmit} />
    </Content>
  )
}

export default EditProviderInput