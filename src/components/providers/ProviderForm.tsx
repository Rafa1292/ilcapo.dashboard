import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Provider } from '../../types/Provider'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputCheck from '../generics/CustomInputChecbox'

interface Props {
  currentProvider?: Provider
  handleSubmit: () => void
}

const initialProvider: Provider = {
  id: 0,
  name: '',
  phone: 0,
  fixedExpense: true
}

const ProviderForm = ({ currentProvider, handleSubmit }: Props) => {
  const [provider, setProvider] = useState<Provider>(currentProvider ? currentProvider : initialProvider)
  const submitText = currentProvider?.id === 0 ? 'Agregar' : 'Editar'
  
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setProvider({ ...provider, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setProvider({ ...provider, [name]: checked })
  }

  return (
    <>
      <GenericForm submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={provider.name}
          customInputText={
            {
              label: 'Nombre del proveedor', name: 'name',
              handleChange: handleChange, pattern: '^[a-zA-Z0-9 ]+$',
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={provider.phone} customInputNumber={
          {
            label: 'Teléfono', name: 'phone',
            handleChange: handleChange, pattern: '[0-9]{8}',
            validationMessage: 'Ingrese un teléfono válido'
          }
        } />

        <CustomInputCheck value={provider.fixedExpense} customInputCheck={{
          label: 'Gasto fijo', name: 'fixedExpense', pattern: '',
          validationMessage: '', handleChange: handleCheck
        }} />
      </GenericForm>
    </>
  )
}

export default ProviderForm