import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import { PayMethod } from '../../types/PayMethod'
import { Account } from '../../types/Account'

interface Props {
  currentPayMethod: PayMethod
  action: (payMethod: PayMethod) => void
  errors?: string[]
}

const PayMethodForm = ({ currentPayMethod, action, errors }: Props) => {
  const [payMethod, setPayMethod] = useState<PayMethod>(currentPayMethod)
  const [accounts, setAccounts] = useState<Account[]>([])
  const submitText = currentPayMethod?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setPayMethod({ ...payMethod, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setPayMethod({ ...payMethod, [name]: checked })
  }

  const handleSubmit = () => {
    action(payMethod)
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Account[]>('accounts', true)
      if (!response.error) {
        setAccounts(response.data)
      }
    }
    getMagnitudes()
  }, [])

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={payMethod.name}
          customInputText={
            {
              label: 'Nombre de medida', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputCheck value={payMethod.active}
          customInputCheck={
            {
              label: 'Activo', name: 'active',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />

        <CustomInputCheck value={payMethod.isPublic}
          customInputCheck={
            {
              label: 'Publico', name: 'isPublic',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />

        <CustomInputCheck value={payMethod.isSemiPublic}
          customInputCheck={
            {
              label: 'semi publico', name: 'isSemiPublic',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />

        <CustomInputNumber value={payMethod.comision} customInputNumber={
          {
            label: 'Comision', name: 'comision',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Debe asignar un valor entre 0 y 1 con dos decimales ej: 0.01'
          }
        } />

        <CustomInputSelect value={payMethod.accountId}
          customInputSelect={
            {
              label: 'Cuenta', name: 'accountId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una cuenta'
            }}
          data={accounts.map(account => { return { value: account.id, label: account.name } })}
          defaultLegend={'Seleccione una cuenta'}
        />

      </GenericForm>
    </>
  )
}

export default PayMethodForm