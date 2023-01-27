import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import ProviderFormContainer from '../containers/providers/ProviderFormContainer'
import { useGetList } from '../hooks/useAPI'
import { Provider } from '../types/Provider'

const Providers = () => {
  const initialProvider: Provider = {
    id: 0,
    name: '',
    phone: 0,
    fixedExpense: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [providers, setProviders] = useState<Provider[]>([])
  const [provider, setProvider] = useState<Provider>(initialProvider)

  const addProvider = () => {
    setProvider(initialProvider)
    setShow(true)
  }

  const editProvider = (id: number) => {
    const editProvider = providers.find(provider => provider.id === id)
    if (editProvider) {
      setProvider(editProvider)
      setShow(true)
    }
  }

  const refreshProviders = async () => {
    const response = await useGetList<Provider[]>('providers')
    if (response.error) {
      console.log(response.error)
    } else {
      setProviders(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      await refreshProviders()
    }
    getProducts()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Proveedores</h1>
      <ProviderFormContainer refreshProviders={refreshProviders} provider={provider} addProvider={addProvider} show={show} setShow={setShow} />
      {
        providers.length > 0 &&
        <Table headers={['#', 'Nombre', 'Telefono', 'Gasto', '']} darkMode={true}>
          {
            providers.map((provider, index) => (
              <TableRow key={index} tableData={[provider.id.toString(), provider.name, provider.phone.toString(), provider.fixedExpense ? 'si' : 'no']}>
                <button className="btn btn-white" onClick={(()=>editProvider(provider.id))}>Editar</button>
                <button className="btn btn-outline-danger">Eliminar</button>
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Providers