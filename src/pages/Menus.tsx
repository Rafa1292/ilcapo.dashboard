import React, { useEffect, useState } from 'react'
import { Menu } from '../types/Menu'
import { useGetList } from '../hooks/useAPI'
import MenuFormContainer from '../containers/menus/MenuFormContainer'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteMenu from '../containers/menus/DeleteMenu'

const initialMenu: Menu = {
  id: 0,
  name: '',
  delete: false,
  comissionPercentage: 0,
  createdBy: 0,
  updatedBy: 0,
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
}

const Menus = () => {
  const [show, setShow] = useState<boolean>(false)
  const [menus, setMenus] = useState<Menu[]>([])
  const [menu, setMenu] = useState<Menu>(initialMenu)

  const addMenu = () => {
    setMenu(initialMenu)
    setShow(true)
  }

  const editMenu = (id: number) => {
    const editMenu = menus.find((menu) => menu.id === id)
    if (editMenu) {
      setMenu(editMenu)
      setShow(true)
    }
  }

  const refreshMenus = async () => {
    const response = await useGetList<Menu[]>('menus')
    if (!response.error) {
      setMenus(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getMenus = async () => {
      await refreshMenus()
    }
    getMenus()
  }, [])

  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Menus</h1>
      <MenuFormContainer
        refreshMenus={refreshMenus}
        menu={menu}
        addMenu={addMenu}
        show={show}
        setShow={setShow}
      />
      {menus.length > 0 && (
        <Table headers={['#', 'Nombre', '']}>
          {menus.map((menu, index) => (
            <TableRow key={index} tableData={[menu.id.toString(), menu.name]}>
              <button
                className='btn btn-outline-secondary m-2'
                onClick={() => editMenu(menu.id)}
              >
                Editar
              </button>
              <DeleteMenu id={menu.id} refreshMenus={refreshMenus} />
            </TableRow>
          ))}
        </Table>
      )}
    </div>
  )
}

export default Menus
