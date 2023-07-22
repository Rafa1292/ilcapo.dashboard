import React, { useState } from 'react'
import { Menu } from '../../types/Menu'
import { usePost } from '../../hooks/useAPI'
import MenuForm from '../../components/menus/MenuForm'

interface Props {
  menu: Menu
  refreshMenus: () => void
}

const CreateMenu = ({ menu, refreshMenus }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newMenu: Menu) => {
    const response = await usePost<Menu>('menus', newMenu)
    if (!response.error) {
      refreshMenus()
    } else {
      setErrors(response.message)
    }
  }
  return <MenuForm errors={errors} currentMenu={menu} action={handleSubmit} />
}

export default CreateMenu
