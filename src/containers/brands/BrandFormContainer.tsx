import React from 'react'
import { Brand } from '../../types/Brand'
import CreateBrand from './CreateBrand'
import EditBrand from './EditBrand'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  brand: Brand
  addBrand: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshBrands: () => void
}

const InputBrandFormContainer = ({ refreshBrands, brand, addBrand, show, setShow }: Props) => {
  const title = brand.id === 0 ? 'Agregar marca' : 'Editar marca'
  return (
    <>
      <Button variant={'outline-light'} className='my-2' onClick={addBrand}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {brand.id === 0 ?
          <CreateBrand refreshBrands={refreshBrands} brand={brand} /> :
          <EditBrand refreshBrands={refreshBrands} brand={brand} />}
      </CustomModal>
    </>
  )
}

export default InputBrandFormContainer