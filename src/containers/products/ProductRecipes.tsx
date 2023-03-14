import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useGetList } from '../../hooks/useAPI'
import { Product } from '../../types/Product'
import { Recipe } from '../../types/Recipe'
import '../../scss/productRecipes.scss'
import EditProductModifier from '../productModifiers/EditProductModifier'
import CreateProductModifier from '../productModifiers/CreateProductModifier'

interface Props {
  product: Product
  refreshProducts: () => void
}

const ProductRecipes = ({ product, refreshProducts }: Props) => {
  const [show, setShow] = React.useState<boolean>(false)
  const [recipes, setRecipes] = React.useState<Recipe[]>([])

  useEffect(() => {
    const getRecipes = async () => {
      const response = await useGetList<Recipe[]>('recipes')
      if (!response.error) {
        setRecipes(response.data)
      }
    }

    getRecipes()
  }, [])
  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Modificadores
      </Button>
      <CustomModal title={product.name} show={show} handleClose={(() => setShow(false))}>
        <CreateProductModifier refreshProducts={refreshProducts} productId={product.id}/>
        <div className='col-12 d-flex flex-wrap'>
          {
            product.productModifiers.map((productModifier, indexGroup) => (
              <div key={indexGroup} className='col-lg-6 col-12 p-4 my-2'>
                <EditProductModifier productModifier={productModifier} productId={product.id} recipes={recipes} />
              </div>
            ))
          }
        </div>
      </CustomModal>
    </>
  )
}

export default ProductRecipes