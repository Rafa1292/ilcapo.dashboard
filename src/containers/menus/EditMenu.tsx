import React, { useState } from 'react'
import { Menu } from '../../types/Menu'
import { usePatch } from '../../hooks/useAPI'
import MenuForm from '../../components/menus/MenuForm'

interface Props {
  refreshMenus: () => void
  menu: Menu
}

const EditMenu = ({ refreshMenus, menu }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editMenu: Menu) => {
    const response = await usePatch<Menu>(`menus/${editMenu.id}`, editMenu)
    if (!response.error) {
      refreshMenus()
    } else {
      setErrors(response.message)
    }
  }

  return <MenuForm errors={errors} currentMenu={menu} action={handleSubmit} />
}

export default EditMenu
