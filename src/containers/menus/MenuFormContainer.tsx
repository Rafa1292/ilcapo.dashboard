import React from 'react'
import { Menu } from '../../types/Menu'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import CreateMenu from './CreateMenu'
import EditMenu from './EditMenu'

interface Props {
  menu: Menu
  addMenu: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshMenus: () => void
}
const MenuFormContainer = ({ menu, addMenu, show, setShow, refreshMenus }: Props) => {
  const title = menu.id === 0 ? 'Agregar menu' : 'Editar menu'

  return (
    <>
      <Button variant={'outline-light'} className='my-2' onClick={addMenu}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={() => setShow(false)}>
        {menu.id === 0 ? (
          <CreateMenu refreshMenus={refreshMenus} menu={menu} />
        ) : (
          <EditMenu refreshMenus={refreshMenus} menu={menu} />
        )}
      </CustomModal>
    </>
  )
}

export default MenuFormContainer
