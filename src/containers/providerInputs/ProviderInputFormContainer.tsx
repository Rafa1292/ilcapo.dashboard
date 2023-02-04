import React from 'react'
import { ProviderInput } from '../../types/ProviderInput'
import CreateProviderInput from './CreateProviderInput'
import EditProviderInput from './EditProviderInput'

interface Props {
  providerInput: ProviderInput
  refreshProviderInputs: () => void
  cancelAction: () => void
  getRestringedBrandsId: (providerId: number) => number[]
  showProviders?: boolean
}

const ProviderInputFormContainer = ({ refreshProviderInputs, providerInput, cancelAction, getRestringedBrandsId, showProviders }: Props) => {
  return (
    <>
      {providerInput.id === 0 ?
        <CreateProviderInput showProviders={showProviders} getRestringedBrandsId={getRestringedBrandsId} refreshProviderInputs={refreshProviderInputs} providerInput={providerInput} /> :
        <EditProviderInput showProviders={showProviders} getRestringedBrandsId={getRestringedBrandsId} cancelAction={cancelAction} refreshProviderInputs={refreshProviderInputs} providerInput={providerInput} />}
    </>
  )
}

export default ProviderInputFormContainer