import React from 'react'
import { Product } from '../../types/Product'
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  product: Product
  addProduct: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshProducts: () => void
}

const ProductFormContainer = ({ refreshProducts, product, addProduct, show, setShow }: Props) => {
  const title = product.id === 0 ? 'Agregar insumo' : 'Editar insumo'
  return (
    <>
      <Button variant={'outline-light'} className='my-2' onClick={addProduct}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {product.id === 0 ?
          <CreateProduct refreshProducts={refreshProducts} product={product} /> :
          <EditProduct refreshProducts={refreshProducts} product={product} />}
      </CustomModal>
    </>
  )
}

export default ProductFormContainer