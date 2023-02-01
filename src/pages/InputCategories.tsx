import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteInputCategory from '../containers/inputCategories/DeleteInputCategory'
import InputCategoryFormContainer from '../containers/inputCategories/InputCategoryFormContainer'
import { useGetList } from '../hooks/useAPI'
import { InputCategory } from '../types/InputCategory'

const InputCategories = () => {
  const initialInputCategory: InputCategory = {
    id: 0,
    name: '',
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [inputCategories, setInputCategories] = useState<InputCategory[]>([])
  const [inputCategory, setInputCategory] = useState<InputCategory>(initialInputCategory)

  const addInputCategory = () => {
    setInputCategory(initialInputCategory)
    setShow(true)
  }

  const editInputCategory = (id: number) => {
    const editInputCategory = inputCategories.find(inputCategory => inputCategory.id === id)
    if (editInputCategory) {
      setInputCategory(editInputCategory)
      setShow(true)
    }
  }

  const refreshInputCategories = async () => {
    const response = await useGetList<InputCategory[]>('inputCategories')
    if (!response.error) {
      setInputCategories(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getInputCategories = async () => {
      await refreshInputCategories()
    }
    getInputCategories()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Insumos</h1>
      <InputCategoryFormContainer refreshInputCategories={refreshInputCategories} inputCategory={inputCategory}
        addInputCategory={addInputCategory} show={show} setShow={setShow} />
      {
        inputCategories.length > 0 &&
        <Table headers={['#', 'Nombre', '']} darkMode={true}>
          {
            inputCategories.map((inputCategory, index) => (
              <TableRow key={index} tableData={[inputCategory.id.toString(), inputCategory.name]}>
                <button className="btn btn-white my-1 mx-2" onClick={(() => editInputCategory(inputCategory.id))}>Editar</button>
                <DeleteInputCategory id={inputCategory.id} refreshInputCategories={refreshInputCategories} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default InputCategories