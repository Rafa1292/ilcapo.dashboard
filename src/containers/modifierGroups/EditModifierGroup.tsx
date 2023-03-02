import React, { useState } from 'react'
import ModifierGroupForm from '../../components/modifierGroups/ModifierGroupForm'
import { usePatch } from '../../hooks/useAPI'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  modifierGroup: ModifierGroup
  refreshModifierGroups: () => void
}

const EditModifierGroup = ({ modifierGroup, refreshModifierGroups }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editModifierGroup: ModifierGroup) => {
    const response = await usePatch<ModifierGroup>(`modifierGroups/${editModifierGroup.id}`, editModifierGroup)
    if (!response.error) {
      refreshModifierGroups()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <ModifierGroupForm errors={errors} currentModifierGroup={modifierGroup} action={handleSubmit} />
  )
}

export default EditModifierGroup