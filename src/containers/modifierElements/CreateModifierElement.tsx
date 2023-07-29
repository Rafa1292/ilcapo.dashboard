import React, { useState } from 'react'
import Loader from '../../components/generics/loader'
import ModifierElementForm from '../../components/modifierElements/ModifierElementForm'
import { usePost } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ProductReference } from '../../types/ProductReference'


const initialModifierElement: ModifierElement = {
  id: 0,
  name: '',
  prices: [],
  quantity: 0,
  defaultRecipeId: 0,
  combinable: false,
  combinableModifierGroupId: 0,
  modifierGroupId: 0,
  numberOfParts: 0,
  modifierUpgrade: { } as ModifierElementUpgrade,
  productReference: {} as ProductReference,
  delete: false,
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  modifierGroupId: number
  refreshModifierGroups: () => void
  modifierGroups: ModifierGroup[]
}

const CreateModifierElement = ({ modifierGroupId, modifierGroups, refreshModifierGroups }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [modifierElement, setModifierElement] = useState<ModifierElement>({...initialModifierElement, modifierGroupId})

  const addModifierElement = async (modifierElement: ModifierElement) => {
    setLoading(true)
    const response = await usePost<ModifierElement>(`modifierElements/${modifierGroupId}`, modifierElement)
    if (response.error) {
      setErrors(response.message)
      setModifierElement(modifierElement)
    }
    else{
      refreshModifierGroups()
      setErrors([])
      setModifierElement({...initialModifierElement, modifierGroupId})
    }
    setLoading(false)
  }

  return (
    <div className='col-12 d-flex flex-wrap p-2 rounded shadow-sm mb-3' style={{minHeight: '350px'}}>
      {
        !loading &&
        <ModifierElementForm modifierGroups={modifierGroups} action={addModifierElement} currentModifierElement={modifierElement} errors={errors} />
        ||
        <Loader/>
      }
    </div>
  )
}

export default CreateModifierElement