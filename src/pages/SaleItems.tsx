import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteSaleItem from '../containers/saleItems/DeleteSaleItem'
import SaleItemFormContainer from '../containers/saleItems/SaleItemFormContainer'
import { useGetList } from '../hooks/useAPI'
import { SaleItem } from '../types/SaleItem'
import { SaleItemCategory } from '../types/SaleItemCategory'

const SaleItems = () => {
  const initialSaleItem: SaleItem = {
    id: 0,
    name: '',
    description: '',
    pictureUrl: '',
    price: 0,
    saleItemCategoryId: 0,
    saleItemCategory: { id: 0 } as SaleItemCategory,
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [saleItems, setSaleItems] = useState<SaleItem[]>([])
  const [saleItem, setSaleItem] = useState<SaleItem>(initialSaleItem)

  const addSaleItem = () => {
    setSaleItem(initialSaleItem)
    setShow(true)
  }

  const editSaleItem = (id: number) => {
    const editSaleItem = saleItems.find(saleItem => saleItem.id === id)
    if (editSaleItem) {
      setSaleItem(editSaleItem)
      setShow(true)
    }
  }

  const refreshSaleItems = async () => {
    const response = await useGetList<SaleItem[]>('saleItems')
    if (!response.error) {
      setSaleItems(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getSaleItems = async () => {
      await refreshSaleItems()
    }
    getSaleItems()
  }, [])



  return (
    <div className='col-lg-9 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Items de venta</h1>
      <SaleItemFormContainer refreshSaleItems={refreshSaleItems} saleItem={saleItem}
        addSaleItem={addSaleItem} show={show} setShow={setShow} />
      {
        saleItems.length > 0 &&
        <Table headers={['#', 'Nombre', 'Precio', 'Categoria', '']}>
          {
            saleItems.map((saleItem, index) => (
              <TableRow key={index} tableData={[
                saleItem.id.toString(), 
                saleItem.name, 
                saleItem.price.toString(),
                saleItem.saleItemCategory?.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editSaleItem(saleItem.id))}>Editar</button>
                <DeleteSaleItem id={saleItem.id} refreshSaleItems={refreshSaleItems} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default SaleItems