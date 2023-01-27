import React from 'react'
import { Provider } from '../../types/Provider'
import CreateProvider from './CreateProvider'
import EditProvider from './EditProvider'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  provider: Provider
  addProvider: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshProviders: () => void
}

const ProviderFormContainer = ({ refreshProviders, provider, addProvider, show, setShow }: Props) => {
  const title = provider.id === 0 ? 'Agregar proovedor' : 'Editar proveedor'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addProvider}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {provider.id === 0 ?
          <CreateProvider refreshProviders={refreshProviders} provider={provider} /> :
          <EditProvider provider={provider} />}
      </CustomModal>
    </>
  )
}

export default ProviderFormContainer