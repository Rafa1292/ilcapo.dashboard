import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import { Measure } from '../../types/Measure'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import CustomInputNumber from '../generics/CustomInputNumber'
import { Brand } from '../../types/Brand'
import { ProviderInput } from '../../types/ProviderInput'
import { Provider } from '../../types/Provider'

interface Props {
  currentProviderInput: ProviderInput
  action: (providerInput: ProviderInput) => void
  errors?: string[]
  cancelAction?: () => void
  getRestringedBrandsId: (providerId: number) => number[]
}

const ProviderInputForm = ({ currentProviderInput, cancelAction, action, errors, getRestringedBrandsId }: Props) => {
  const [providerInput, setProviderInput] = useState<ProviderInput>(currentProviderInput)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const submitText = currentProviderInput?.id === 0 ? 'Agregar' : 'Editar'
  const [tempBrands, setTempBrands] = useState<Brand[]>([])
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setProviderInput({ ...providerInput, [name]: value })
  }

  const handleSubmit = () => {
    action(providerInput)
  }

  const HandleProviderChange = async (event: any) => {
    const { name, value } = event.target
    setProviderInput({ ...providerInput, [name]: value })
    const restringedBrandsId = await getRestringedBrandsId(value)
    const allowedBrands = brands.filter(brand => !restringedBrandsId.includes(brand.id))
    setTempBrands(allowedBrands)
  }
  useEffect(() => {
    const getMeasures = async () => {
      const response = await useGetList<Measure[]>('measures')
      if (!response.error) {
        setMeasures(response.data)
      }
    }
    const getBrands = async () => {
      const response = await useGetList<Brand[]>('brands')
      if (!response.error) {
        setBrands(response.data)
        setTempBrands(response.data)
      }
    }
    const getProviders = async () => {
      const response = await useGetList<Provider[]>('providers')
      if (!response.error) {
        setProviders(response.data)
      }
    }
    getProviders()
    getMeasures()
    getBrands()
  }, [])

  return (
    <>
      <GenericForm cancel={cancelAction} errors={errors} submitText={submitText} handleSubmit={handleSubmit}>

        <CustomInputSelect value={providerInput.providerId}
          customInputSelect={
            {
              label: 'Proveedor', name: 'providerId',
              handleChange: HandleProviderChange, pattern: '', validationMessage: 'Seleccione un proveedor'
            }}
          data={providers.map(provider => { return { value: provider.id, label: provider.name } })}
          defaultLegend={'Seleccione un proveedor'}
        />

        <CustomInputNumber value={providerInput.presentation} customInputNumber={
          {
            label: 'Presentacion', name: 'presentation',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una presentacion valida'
          }
        } />

        <CustomInputSelect value={providerInput.measureId}
          customInputSelect={
            {
              label: 'Medida', name: 'measureId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
            }}
          data={measures.map(measure => { return { value: measure.id, label: measure.name } })}
          defaultLegend={'Seleccione una medida'}
        />

        <CustomInputSelect value={providerInput.brandId}
          customInputSelect={
            {
              label: 'Brand', name: 'brandId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una marca'
            }}
          data={tempBrands.map(brand => { return { value: brand.id, label: brand.name } })}
          defaultLegend={'Seleccione una marca'}
        />

        <CustomInputNumber value={providerInput.expectedPrice} customInputNumber={
          {
            label: 'Precio esperado', name: 'expectedPrice',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese un precio válido'
          }
        } />


      </GenericForm>
    </>
  )
}

export default ProviderInputForm