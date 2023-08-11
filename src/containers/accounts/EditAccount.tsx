import React, { useState } from 'react'
import BrandForm from '../../components/brands/BrandForm'
import { usePatch } from '../../hooks/useAPI'
import { Account } from '../../types/Account'
import AccountForm from '../../components/accounts/AccountForm'

interface Props {
  account: Account
  refreshAccounts: () => void
}

const EditAccount = ({ account, refreshAccounts }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editAccount: Account) => {
    const response = await usePatch<Account>(`accounts/${editAccount.id}`, editAccount)
    if (!response.error) {
      refreshAccounts()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <AccountForm errors={errors} currentAccount={account} action={handleSubmit} />
  )
}

export default EditAccount