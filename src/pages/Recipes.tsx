import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteRecipe from '../containers/recipes/DeleteRecipe'
import RecipeFormContainer from '../containers/recipes/RecipeFormContainer'
import RecipeSteps from '../containers/recipes/RecipeSteps'
import { useGetList } from '../hooks/useAPI'
import { Recipe } from '../types/Recipe'

const Recipes = () => {
  const initialRecipe: Recipe = {
    id: 0,
    name: '',
    cost: 0,
    recipeSteps: [],
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe)

  const addRecipe = () => {
    setRecipe(initialRecipe)
    setShow(true)
  }

  const editRecipe = (id: number) => {
    const editRecipe = recipes.find(recipe => recipe.id === id)
    if (editRecipe) {
      setRecipe(editRecipe)
      setShow(true)
    }
  }

  const refreshRecipes = async () => {
    const response = await useGetList<Recipe[]>('recipes')
    if (!response.error) {
      // order by name
      console.log(response.data.sort((a, b) => a.name.localeCompare(b.name)))
      setRecipes(response.data.sort((a, b) => a.name.localeCompare(b.name)))
      setShow(false)
    }
  }

  useEffect(() => {
    const getRecipes = async () => {
      await refreshRecipes()
    }
    getRecipes()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Recetas</h1>
      <RecipeFormContainer refreshRecipes={refreshRecipes} recipe={recipe}
        addRecipe={addRecipe} show={show} setShow={setShow} />
      {
        recipes.length > 0 &&
        <Table headers={['Nombre', '']}>
          {
            recipes.map((recipe, index) => (
              <TableRow key={index} tableData={[recipe.name]}>
                <RecipeSteps refreshRecipes={refreshRecipes} recipe={recipe}/>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editRecipe(recipe.id))}>Editar</button>
                <DeleteRecipe id={recipe.id} refreshRecipes={refreshRecipes} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Recipes