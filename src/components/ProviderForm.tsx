import React, { useState } from 'react'
import CustomInputText from './generics/CustomInputText'
import GenericForm from './generics/GenericForm'
import { Provider } from '../types/Provider'
import CustomInputNumber from './generics/CustomInputNumber'
import CustomInputSelect from './generics/CustomInputSelect'
import CustomInputCheck from './generics/CustomInputChecbox'


const ProviderForm = () => {
  const initialProvider: Provider = {
    id: 0,
    name: '',
    phone: 0,
    spent: true
  }
  const [provider, setProvider] = useState<Provider>(initialProvider)

  const handleSubmit = async () => {
    console.log('submit')
  }

  const handleChange = (event: any) => {
    console.log(event.target.checked)
    const name = event.target.name
    const value = event.target.value
    setProvider({ ...provider, [name]: value })
  }

  const products = [
    { value: 1, label: 'Producto 1' },
    { value: 2, label: 'Producto 2' },
    { value: 3, label: 'Producto 3' },
    { value: 4, label: 'Producto 4' },
  ]

  const providerProduct = 0

  return (
    <>
      <GenericForm submitText='Agregar' handleSubmit={handleSubmit}>
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
            handleChange: handleChange, pattern: '[0-9]{8,9}',
            validationMessage: 'Ingrese un teléfono válido'
          }
        } />
        <CustomInputSelect value={providerProduct} data={products}
          defaultLegend={'Seleccione un producto'} customInputSelect={
            {
              label: 'Producto', name: 'product', handleChange: handleChange,
              pattern: '', validationMessage: 'Seleccione un producto válido'
            }}
        />
        <CustomInputCheck value={provider.spent} customInputCheck={{
          label: 'Gasto fijo', name: 'spentCheck', pattern: '',
          validationMessage: '', handleChange: handleChange
        }} />
      </GenericForm>
    </>
  )
}

export default ProviderForm