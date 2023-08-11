import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import { useGetList } from '../hooks/useAPI'
import { Account } from '../types/Account'
import AccountFormContainer from '../containers/accounts/AccountFormContainer'
import DeleteAccount from '../containers/accounts/DeleteAccount'
import { PayMethod } from '../types/PayMethod'
import PayMethodFormContainer from '../containers/payMethods/PayMethodFormContainer'
import DeletePayMethod from '../containers/payMethods/DeletePayMethod'

const PayMethods = () => {
  const initialPayMethod: PayMethod = {
    id: 0,
    name: '',
    comision: 0,
    isPublic: false,
    isSemiPublic: false,
    active: true,
    delete: false,
    accountHistories: [],
    accountId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [payMethods, setPayMethods] = useState<PayMethod[]>([])
  const [payMethod, setPayMethod] = useState<PayMethod>(initialPayMethod)

  const addPayMethod = () => {
    setPayMethod(initialPayMethod)
    setShow(true)
  }

  const editPayMethod = (id: number) => {
    const editPayMethod = payMethods.find(pm => pm.id === id)
    if (editPayMethod) {
      setPayMethod(editPayMethod)
      setShow(true)
    }
  }

  const refreshPayMethods = async () => {
    const response = await useGetList<PayMethod[]>('paymethods',true)
    if (!response.error) {
      setPayMethods(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getPayMethods = async () => {
      await refreshPayMethods()
    }
    getPayMethods()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Metodos de pago</h1>
      <PayMethodFormContainer refreshPayMethods={refreshPayMethods} payMethod={payMethod}
        addPayMethod={addPayMethod} show={show} setShow={setShow} />
      {
        payMethods.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            payMethods.map((account, index) => (
              <TableRow key={index} tableData={[account.id.toString(), account.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editPayMethod(account.id))}>Editar</button>
                <DeletePayMethod id={account.id} refreshPayMethods={refreshPayMethods} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default PayMethods