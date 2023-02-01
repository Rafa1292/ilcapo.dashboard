import React, { useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { InputCategory } from '../../types/InputCategory'

interface Props {
  currentInputCategory: InputCategory
  action: (input: InputCategory) => void
  errors?: string[]
}

const InputCategoryForm = ({ currentInputCategory, action, errors }: Props) => {
  const [inputCategory, setInputCategory] = useState<InputCategory>(currentInputCategory)
  const submitText = currentInputCategory?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setInputCategory({ ...inputCategory, [name]: value })
  }

  const handleSubmit = () => {
    action(inputCategory)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={inputCategory.name}
          customInputText={
            {
              label: 'Nombre de categoria', name: 'name',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default InputCategoryForm