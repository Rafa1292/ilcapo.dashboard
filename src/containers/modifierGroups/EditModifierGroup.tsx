import React, { useState } from 'react'
import ModifierGroupForm from '../../components/modifierGroups/ModifierGroupForm'
import { usePatch } from '../../hooks/useAPI'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  modifierGroup: ModifierGroup
  refreshModifierGroups: () => void
  modifierGroups: ModifierGroup[]
}

const EditModifierGroup = ({ modifierGroup, modifierGroups, refreshModifierGroups }: Props) => {
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
    <ModifierGroupForm modifierGroups={modifierGroups} errors={errors} currentModifierGroup={modifierGroup} action={handleSubmit} />
  )
}

export default EditModifierGroup