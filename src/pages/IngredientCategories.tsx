import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteIngredientCategory from '../containers/ingredientCategories/DeleteIngredientCategory'
import IngredientCategoryFormContainer from '../containers/ingredientCategories/IngredientCategoryFormContainer'
import { useGetList } from '../hooks/useAPI'
import { IngredientCategory } from '../types/IngredientCategory'

const IngredientCategories = () => {
  const initialIngredientCategory: IngredientCategory = {
    id: 0,
    name: '',
    delete: false,
    ingredients: [],
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([])
  const [ingredientCategory, setIngredientCategory] = useState<IngredientCategory>(initialIngredientCategory)

  const addIngredientCategory = () => {
    setIngredientCategory(initialIngredientCategory)
    setShow(true)
  }

  const editIngredientCategory = (id: number) => {
    const editIngredientCategory = ingredientCategories.find(ingredientCategory => ingredientCategory.id === id)
    if (editIngredientCategory) {
      setIngredientCategory(editIngredientCategory)
      setShow(true)
    }
  }

  const refreshIngredientCategories = async () => {
    const response = await useGetList<IngredientCategory[]>('ingredientCategories')
    if (!response.error) {
      //sort by name
      setIngredientCategories(response.data.sort((a, b) => a.name.localeCompare(b.name)))
      setShow(false)
    }
  }

  useEffect(() => {
    const getIngredientCategories = async () => {
      await refreshIngredientCategories()
    }
    getIngredientCategories()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Categorias de ingrediente</h1>
      <IngredientCategoryFormContainer refreshIngredientCategories={refreshIngredientCategories} ingredientCategory={ingredientCategory}
        addIngredientCategory={addIngredientCategory} show={show} setShow={setShow} />
      {
        ingredientCategories.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            ingredientCategories.map((ingredientCategory, index) => (
              <TableRow key={index} tableData={[ingredientCategory.id.toString(), ingredientCategory.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editIngredientCategory(ingredientCategory.id))}>Editar</button>
                <DeleteIngredientCategory id={ingredientCategory.id} refreshIngredientCategories={refreshIngredientCategories} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default IngredientCategories