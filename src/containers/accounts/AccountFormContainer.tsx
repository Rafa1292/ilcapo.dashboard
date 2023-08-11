import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { Account } from '../../types/Account'
import CreateAccount from './CreateAccount'
import EditAccount from './EditAccount'

interface Props {
  account: Account
  addAccount: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshAccounts: () => void
}

const AccountFormContainer = ({ refreshAccounts, account, addAccount, show, setShow }: Props) => {
  const title = account.id === 0 ? 'Agregar' : 'Editar'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addAccount}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {account.id === 0 ?
          <CreateAccount refreshAccounts={refreshAccounts} account={account} /> :
          <EditAccount refreshAccounts={refreshAccounts} account={account} />}
      </CustomModal>
    </>
  )
}

export default AccountFormContainer