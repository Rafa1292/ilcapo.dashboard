import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteIngredient from '../containers/ingredients/DeleteIngredient'
import IngredientFormContainer from '../containers/ingredients/IngredientFormContainer'
import IngredientPreparation from '../containers/ingredients/IngredientPreparation'
import { useGetList } from '../hooks/useAPI'
import { Ingredient } from '../types/Ingredient'
import { Measure } from '../types/Measure'

const Ingredients = () => {
  const initialIngredient: Ingredient = {
    id: 0,
    name: '',
    price: 0,
    cost: 0,
    presentation: 0,
    measureId: 0,
    measure: { magnitudeId: 0 } as Measure,
    ingredientCategoryId: 0,
    preparationSteps: [],
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [ingredient, setIngredient] = useState<Ingredient>(initialIngredient)

  const addIngredient = () => {
    setIngredient(initialIngredient)
    setShow(true)
  }

  const editIngredient = (id: number) => {
    const editIngredient = ingredients.find(ingredient => ingredient.id === id)
    if (editIngredient) {
      setIngredient(editIngredient)
      setShow(true)
    }
  }

  const refreshIngredients = async () => {
    const response = await useGetList<Ingredient[]>('ingredients')
    if (!response.error) {
      setIngredients(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getIngredients = async () => {
      await refreshIngredients()
    }
    getIngredients()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Ingredientes</h1>
      <IngredientFormContainer refreshIngredients={refreshIngredients} ingredient={ingredient}
        addIngredient={addIngredient} show={show} setShow={setShow} />
      {
        ingredients.length > 0 &&
        <Table headers={['Nombre', '']}>
          {
            ingredients.map((ingredient, index) => (
              <TableRow key={index} tableData={[ingredient.name]}>
                <IngredientPreparation refreshIngredients={refreshIngredients} ingredient={ingredient}/>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editIngredient(ingredient.id))}>Editar</button>
                <DeleteIngredient id={ingredient.id} refreshIngredients={refreshIngredients} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Ingredients