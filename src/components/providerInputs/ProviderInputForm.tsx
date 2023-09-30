import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import { Measure } from '../../types/Measure'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import CustomInputNumber from '../generics/CustomInputNumber'
import { Brand } from '../../types/Brand'
import { ProviderInput } from '../../types/ProviderInput'
import { Provider } from '../../types/Provider'
import { Input } from '../../types/Input'
import { Magnitude } from '../../types/Magnitude'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentProviderInput: ProviderInput
  action: (providerInput: ProviderInput) => void
  errors?: string[]
  cancelAction?: () => void
  getRestringedBrandsId: (providerId: number) => number[]
  showProviders?: boolean
}

const ProviderInputForm = ({ currentProviderInput, cancelAction, action, errors, getRestringedBrandsId, showProviders = false }: Props) => {
  const [providerInput, setProviderInput] = useState<ProviderInput>(currentProviderInput)
  const [brands, setBrands] = useState<Brand[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [inputs, setInputs] = useState<Input[]>([])
  const submitText = currentProviderInput?.id === 0 ? 'Agregar' : 'Editar'
  const [tempBrands, setTempBrands] = useState<Brand[]>([])
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setProviderInput({ ...providerInput, [name]: Number(value) })
  }

  const handleChangeMagnitude = (event: any) => {
    const { value } = event.target
    setProviderInput({ ...providerInput, measure: { magnitudeId: Number(value) } as Measure, measureId: 0 })
    setMagnitude(magnitudes.find(magnitude => magnitude.id === Number(value)))
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

  const setMeasuresForEdit = (magnitudes: Magnitude[]) => {
    if (providerInput.measureId) {
      const magnitude = magnitudes.find(input => input.id === providerInput.measure?.magnitudeId)
      setMagnitude(magnitude)
    }
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Magnitude[]>('magnitudes')
      if (!response.error) {
        setMeasuresForEdit(response.data)
        setMagnitudes(response.data)
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
    const getinputs = async () => {
      const response = await useGetList<Input[]>('inputs')
      if (!response.error) {
        setInputs(response.data)
      }
    }
    getProviders()
    getMagnitudes()
    getBrands()
    getinputs()
  }, [])

  return (
    <>
      <GenericForm cancel={cancelAction} errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        {
          showProviders ?
            <CustomInputSelect value={providerInput.providerId}
              customInputSelect={
                {
                  label: 'Proveedor', name: 'providerId',
                  handleChange: HandleProviderChange, pattern: '', validationMessage: 'Seleccione un proveedor'
                }}
              data={providers.map(provider => { return { value: provider.id, label: provider.name } })}
              defaultLegend={'Seleccione un proveedor'}
            />
            :
            <CustomInputSelect value={providerInput.inputId}
              customInputSelect={
                {
                  label: 'Insumo', name: 'inputId',
                  handleChange: HandleProviderChange, pattern: '', validationMessage: 'Seleccione un insumo'
                }}
              data={inputs.map(input => { return { value: input.id, label: input.name } })}
              defaultLegend={'Seleccione un insumo'}
            />
        }

        <CustomInputNumber value={providerInput.presentation} customInputNumber={
          {
            label: 'Presentacion', name: 'presentation',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese una presentacion valida'
          }
        } />

        <CustomInputSelect value={providerInput.measure.magnitudeId}
          customInputSelect={
            {
              label: 'Magnitud', name: 'measureId',
              handleChange: handleChangeMagnitude, pattern: '', validationMessage: 'Seleccione una magnitud'
            }}
          data={magnitudes.map(magnitud => { return { value: magnitud.id, label: magnitud.name } })}
          defaultLegend={'Magnitudes...'}
        />

        {
          magnitude?.measures &&
          <CustomInputSelect value={providerInput.measureId}
            customInputSelect={
              {
                label: 'Medida', name: 'measureId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
              }}
            data={magnitude.measures.map(measure => { return { value: measure.id, label: measure.name } })}
            defaultLegend={'Medidas...'}
          />
        }

        <CustomInputSelect value={providerInput.brandId}
          customInputSelect={
            {
              label: 'Brand', name: 'brandId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una marca'
            }}
          data={tempBrands.map(brand => { return { value: brand.id, label: brand.name } })}
          defaultLegend={'Marcas...'}
        />

        <CustomInputNumber value={providerInput.expectedPrice} customInputNumber={
          {
            label: 'Precio esperado', name: 'expectedPrice',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese un precio válido'
          }
        } />


      </GenericForm>
    </>
  )
}

export default ProviderInputForm