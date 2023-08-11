import React, { useState } from 'react'
import BrandForm from '../../components/brands/BrandForm'
import { usePost } from '../../hooks/useAPI'
import { Account } from '../../types/Account'
import AccountForm from '../../components/accounts/AccountForm'

interface Props {
  account: Account
  refreshAccounts: () => void
}

const CreateAccount = ({ account, refreshAccounts }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newAccount: Account) => {
    const response = await usePost<Account>('accounts', newAccount, true)
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

export default CreateAccount