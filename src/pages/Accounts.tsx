import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import { useGetList } from '../hooks/useAPI'
import { Account } from '../types/Account'
import AccountFormContainer from '../containers/accounts/AccountFormContainer'
import DeleteAccount from '../containers/accounts/DeleteAccount'

const Accounts = () => {
  const initialAccount: Account = {
    id: 0,
    name: '',
    active: true,
    cash: false,
    delete: false,
    payMethods: [],
    balance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [account, setAccount] = useState<Account>(initialAccount)

  const addAccount = () => {
    setAccount(initialAccount)
    setShow(true)
  }

  const editAccount = (id: number) => {
    const editAccount = accounts.find(account => account.id === id)
    if (editAccount) {
      setAccount(editAccount)
      setShow(true)
    }
  }

  const refreshAccounts = async () => {
    const response = await useGetList<Account[]>('accounts')
    if (!response.error) {
      setAccounts(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getAccounts = async () => {
      await refreshAccounts()
    }
    getAccounts()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Cuentas</h1>
      <AccountFormContainer refreshAccounts={refreshAccounts} account={account}
        addAccount={addAccount} show={show} setShow={setShow} />
      {
        accounts.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            accounts.map((account, index) => (
              <TableRow key={index} tableData={[account.id.toString(), account.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editAccount(account.id))}>Editar</button>
                <DeleteAccount id={account.id} refreshAccounts={refreshAccounts} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Accounts