import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteProduct from '../containers/products/DeleteProduct'
import ProductFormContainer from '../containers/products/ProductFormContainer'
import ProductRecipes from '../containers/products/ProductRecipes'
import { useGetList } from '../hooks/useAPI'
import { Product } from '../types/Product'

const Products = () => {
  const initialProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    productModifiers: [],
    allowsModify: false,
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [product, setProduct] = useState<Product>(initialProduct)

  const addProduct = () => {
    setProduct(initialProduct)
    setShow(true)
  }

  const editProduct = (id: number) => {
    const editProduct = products.find(product => product.id === id)
    if (editProduct) {
      setProduct(editProduct)
      setShow(true)
    }
  }

  const refreshProducts = async () => {
    const response = await useGetList<Product[]>('products')
    if (!response.error) {
      setProducts(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      await refreshProducts()
    }
    getProducts()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Productos</h1>
      <ProductFormContainer refreshProducts={refreshProducts} product={product}
        addProduct={addProduct} show={show} setShow={setShow} />
      {
        products.length > 0 &&
        <Table headers={['Nombre', 'Precio', 'Modificable', '']}>
          {
            products.map((product, index) => (
              <TableRow key={index} tableData={[product.name, product.price.toString(), product.allowsModify ? 'Si': 'No']}>
                <ProductRecipes refreshProducts={refreshProducts} product={product}/>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editProduct(product.id))}>Editar</button>
                <DeleteProduct id={product.id} refreshProducts={refreshProducts} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Products