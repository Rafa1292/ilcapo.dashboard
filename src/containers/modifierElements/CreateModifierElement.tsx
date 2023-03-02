import React, { useState } from 'react'
import Loader from '../../components/generics/loader'
import ModifierElementForm from '../../components/modifierElements/ModifierElementForm'
import { usePost } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'


const initialModifierElement: ModifierElement = {
  id: 0,
  name: '',
  price: 0,
  quantity: 0,
  isProduct: false,
  productReferenceId: 0,
  delete: false,
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  modifierGroupId: number
  refreshModifierGroups: () => void
}

const CreateModifierElement = ({ modifierGroupId, refreshModifierGroups }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [modifierElement, setModifierElement] = useState<ModifierElement>(initialModifierElement)

  const addModifierElement = async (modifierElement: ModifierElement) => {
    setLoading(true)
    const response = await usePost<ModifierElement>(`modifierElements/${modifierGroupId}`, modifierElement)
    if (response.error) {
      setErrors(response.message)
    }
    else{
      refreshModifierGroups()
      setModifierElement(initialModifierElement)
    }
    setLoading(false)
    setModifierElement(modifierElement)
  }

  return (
    <div className='col-12 d-flex flex-wrap p-2 rounded shadow-sm mb-3' style={{minHeight: '350px'}}>
      {
        !loading &&
        <ModifierElementForm action={addModifierElement} currentModifierElement={modifierElement} errors={errors} />
        ||
        <Loader/>
      }
    </div>
  )
}

export default CreateModifierElement