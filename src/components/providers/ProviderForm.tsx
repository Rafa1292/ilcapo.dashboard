import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Provider } from '../../types/Provider'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentProvider: Provider
  action: (provider: Provider) => void
  errors?: string[]
}

const ProviderForm = ({ currentProvider, action, errors }: Props) => {
  const [provider, setProvider] = useState<Provider>(currentProvider)
  const submitText = currentProvider?.id === 0 ? 'Agregar' : 'Editar'
  
  const handleChangeName = (event: any) => {
    const { name, value } = event.target
    setProvider({ ...provider, [name]: value })
  }

  const handleChangePhone = (event: any) => {
    const { name, value } = event.target
    setProvider({ ...provider, [name]: Number(value) })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setProvider({ ...provider, [name]: checked })
  }

  const handleSubmit = () => {
    action(provider)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={provider.name}
          customInputText={
            {
              label: 'Nombre del proveedor', name: 'name',
              handleChange: handleChangeName, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={provider.phone} customInputNumber={
          {
            label: 'Teléfono', name: 'phone',
            handleChange: handleChangePhone, pattern: regexOptions.phone,
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