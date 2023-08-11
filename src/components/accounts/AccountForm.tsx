import React, { useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { regexOptions } from '../../enums/regexOptions'
import { Account } from '../../types/Account'
import CustomInputCheck from '../generics/CustomInputChecbox'

interface Props {
  currentAccount: Account
  action: (account: Account) => void
  errors?: string[]
}

const BrandForm = ({ currentAccount, action, errors }: Props) => {
  const [account, setAccount] = useState<Account>(currentAccount)
  const submitText = currentAccount?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setAccount({ ...account, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setAccount({ ...account, [name]: checked })
  }

  const handleSubmit = () => {
    action(account)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={account.name}
          customInputText={
            {
              label: 'Nombre de cuenta', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
        <CustomInputCheck value={account.active}
          customInputCheck={
            {
              label: 'Activa', name: 'active',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />          
        <CustomInputCheck value={account.cash}
          customInputCheck={
            {
              label: 'Efectivo', name: 'cash',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />          
      </GenericForm>
    </>
  )
}

export default BrandForm