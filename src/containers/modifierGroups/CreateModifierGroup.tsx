import React, { useState } from 'react'
import ModifierGroupForm from '../../components/modifierGroups/ModifierGroupForm'
import { usePost } from '../../hooks/useAPI'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  modifierGroup: ModifierGroup
  refreshModifierGroups: () => void
  modifierGroups: ModifierGroup[]
}

const CreateModifierGroup = ({ modifierGroup, modifierGroups, refreshModifierGroups }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newModifierGroup: ModifierGroup) => {
    const response = await usePost<ModifierGroup>('modifierGroups', newModifierGroup)
    if (!response.error) {
      refreshModifierGroups()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <ModifierGroupForm modifierGroups={modifierGroups} errors={errors} currentModifierGroup={modifierGroup} action={handleSubmit} />
  )
}

export default CreateModifierGroup