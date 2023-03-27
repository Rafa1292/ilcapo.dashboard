import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteModifierGroup from '../containers/modifierGroups/DeleteModifierGroup'
import ModifierElements from '../containers/modifierGroups/ModifierElements'
import ModifierGroupFormContainer from '../containers/modifierGroups/ModifierGroupFormContainer'
import { useGetList } from '../hooks/useAPI'
import { ModifierGroup } from '../types/ModifierGroup'
import { ModifierElementUpgrade } from '../types/ModifierElementUpgrade'

const ModifierGroups = () => {
  const initialModifierGroup: ModifierGroup = {
    id: 0,
    name: '',
    minSelectable: 0,
    maxSelectable: 0,
    isRequired: false,
    label: '',
    elements: [],
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>([])
  const [modifierGroup, setModifierGroup] = useState<ModifierGroup>(initialModifierGroup)

  const addModifierGroup = () => {
    setModifierGroup(initialModifierGroup)
    setShow(true)
  }

  const editModifierGroup = (id: number) => {
    const editModifierGroup = modifierGroups.find(modifierGroup => modifierGroup.id === id)
    if (editModifierGroup) {
      setModifierGroup(editModifierGroup)
      setShow(true)
    }
  }

  const refreshModifierGroups = async () => {
    const response = await useGetList<ModifierGroup[]>('modifierGroups')
    if (!response.error) {
      setModifierGroups(response.data)
      console.log(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getModifierGroups = async () => {
      await refreshModifierGroups()
    }
    getModifierGroups()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Grupos modificadores</h1>
      <ModifierGroupFormContainer modifierGroups={modifierGroups} refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup}
        addModifierGroup={addModifierGroup} show={show} setShow={setShow} />
      {
        modifierGroups.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            modifierGroups.map((modifierGroup, index) => (
              <TableRow key={index} tableData={[modifierGroup.id.toString(), modifierGroup.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editModifierGroup(modifierGroup.id))}>Editar</button>
                <DeleteModifierGroup id={modifierGroup.id} refreshModifierGroups={refreshModifierGroups} />
                <ModifierElements modifierGroups={modifierGroups.filter(x => x.id !== modifierGroup.id)} refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default ModifierGroups