import React, { useState } from 'react'
import { regexOptions } from '../../enums/regexOptions'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Menu } from '../../types/Menu'
import CustomInputNumber from '../generics/CustomInputNumber'

interface Props {
  currentMenu: Menu
  action: (menu: Menu) => void
  errors?: string[]
}

const MenuForm = ({ currentMenu, action, errors }: Props) => {
  const [menu, setMenu] = useState<Menu>(currentMenu)
  const submitText = currentMenu?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setMenu({ ...menu, [name]: value })
  }

  const handleSubmit = () => {
    action(menu)
  }

  return (
    <GenericForm
      errors={errors}
      submitText={submitText}
      handleSubmit={handleSubmit}
    >
      <CustomInputText
        value={menu.name}
        customInputText={{
          label: 'Nombre de menu',
          name: 'name',
          handleChange: handleChange,
          pattern: regexOptions.text,
          validationMessage: 'Ingrese un nombre válido',
        }}
      />
      <CustomInputNumber
        showLabel={false}
        value={menu.comissionPercentage}
        customInputNumber={{
          label: 'Comision',
          name: 'comissionPercentage',
          handleChange: handleChange,
          pattern: regexOptions.integer,
          validationMessage: 'Ingrese un monto valido',
        }}
      />
    </GenericForm>
  )
}

export default MenuForm
