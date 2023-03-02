import React, { useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Brand } from '../../types/Brand'
import { regexOptions } from '../../enums/regexOptions'
interface Props {
  currentBrand: Brand
  action: (brand: Brand) => void
  errors?: string[]
}

const BrandForm = ({ currentBrand, action, errors }: Props) => {
  const [brand, setBrand] = useState<Brand>(currentBrand)
  const submitText = currentBrand?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setBrand({ ...brand, [name]: value })
  }

  const handleSubmit = () => {
    action(brand)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={brand.name}
          customInputText={
            {
              label: 'Nombre de marca', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default BrandForm