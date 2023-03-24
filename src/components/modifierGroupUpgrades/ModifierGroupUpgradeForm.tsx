import React, { useState } from 'react'
import { regexOptions } from '../../enums/regexOptions'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputText from '../generics/CustomInputText'

interface Props {
  modifierGroupUpgrade: ModifierGroupUpgrade
  modifierGroups: ModifierGroup[]
  handleChange : (event: any) => void
}

const ModifierGroupUpgrdeForm = ({ modifierGroupUpgrade, modifierGroups, handleChange }: Props) => {

  return (
    <div className='col-12 p-0 d-flex flex-wrap'>
      <div className="col-4 p-1">
        <CustomInputNumber showLabel={false} value={modifierGroupUpgrade.price} customInputNumber={
          {
            label: 'Precio', name: 'price',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un precio válido'
          }
        } />
      </div>
      <div className="col-4 p-1">
        <CustomInputText showLabel={false} value={modifierGroupUpgrade.label}
          customInputText={
            {
              label: 'Etiqueta', name: 'label',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </div>
      <div className="col-4 p-1">
        <CustomInputSelect showLabel={false} value={modifierGroupUpgrade.newModifierGroupId}
          customInputSelect={
            {
              label: 'Modificadores', name: 'newModifierGroupId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione un grupo'
            }}
          data={modifierGroups.map(modifierGroup => { return { value: modifierGroup.id, label: modifierGroup.name } })}
          defaultLegend={'Modificadores'}
        />
      </div>
    </div>
  )
}

export default ModifierGroupUpgrdeForm