import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteBrand from '../containers/brands/DeleteBrand'
import BrandFormContainer from '../containers/brands/BrandFormContainer'
import { useGetList } from '../hooks/useAPI'
import { Brand } from '../types/Brand'

const Brands = () => {
  const initialBrand: Brand = {
    id: 0,
    name: '',
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [brands, setBrands] = useState<Brand[]>([])
  const [brand, setBrand] = useState<Brand>(initialBrand)

  const addBrand = () => {
    setBrand(initialBrand)
    setShow(true)
  }

  const editBrand = (id: number) => {
    const editBrand = brands.find(brand => brand.id === id)
    if (editBrand) {
      setBrand(editBrand)
      setShow(true)
    }
  }

  const refreshBrands = async () => {
    const response = await useGetList<Brand[]>('brands')
    if (!response.error) {
      setBrands(response.data.sort((a, b) => a.id - b.id))
      setShow(false)
    }
  }

  useEffect(() => {
    const getBrands = async () => {
      await refreshBrands()
    }
    getBrands()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Marcas</h1>
      <BrandFormContainer refreshBrands={refreshBrands} brand={brand}
        addBrand={addBrand} show={show} setShow={setShow} />
      {
        brands.length > 0 &&
        <Table headers={['#', 'Nombre', '']}>
          {
            brands.map((brand, index) => (
              <TableRow key={index} tableData={[brand.id.toString(), brand.name]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editBrand(brand.id))}>Editar</button>
                <DeleteBrand id={brand.id} refreshBrands={refreshBrands} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Brands