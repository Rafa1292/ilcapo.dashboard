import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteSaleItemCategory from '../containers/saleItemCategories/DeleteSaleItemCategory'
import SaleItemCategoryFormContainer from '../containers/saleItemCategories/SaleItemCategoryFormContainer'
import { useGetList } from '../hooks/useAPI'
import { SaleItemCategory } from '../types/SaleItemCategory'

const SaleItemCategories = () => {
  const initialSaleItemCategory: SaleItemCategory = {
    id: 0,
    name: '',
    delete: false,
    saleItems: [],
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [saleItemCategories, setSaleItemCategories] = useState<SaleItemCategory[]>([])
  const [saleItemCategory, setSaleItemCategory] = useState<SaleItemCategory>(initialSaleItemCategory)

  const addSaleItemCategory = () => {
    setSaleItemCategory(initialSaleItemCategory)
    setShow(true)
  }

  const editSaleItemCategory = (id: number) => {
    const editSaleItemCategory = saleItemCategories.find(saleItemCategory => saleItemCategory.id === id)
    if (editSaleItemCategory) {
      setSaleItemCategory(editSaleItemCategory)
      setShow(true)
    }
  }

  const refreshSaleItemCategories = async () => {
    const response = await useGetList<SaleItemCategory[]>('saleItemCategories')
    if (!response.error) {
      setSaleItemCategories(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getSaleItemCategories = async () => {
      await refreshSaleItemCategories()
    }
    getSaleItemCategories()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Categorias de item de venta</h1>
      <SaleItemCategoryFormContainer refreshSaleItemCategories={refreshSaleItemCategories} saleItemCategory={saleItemCategory}
        addSaleItemCategory={addSaleItemCategory} show={show} setShow={setShow} />
      {
        saleItemCategories.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            saleItemCategories.map((saleItemCategory, index) => (
              <TableRow key={index} tableData={[saleItemCategory.id.toString(), saleItemCategory.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editSaleItemCategory(saleItemCategory.id))}>Editar</button>
                <DeleteSaleItemCategory id={saleItemCategory.id} refreshSaleItemCategories={refreshSaleItemCategories} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default SaleItemCategories