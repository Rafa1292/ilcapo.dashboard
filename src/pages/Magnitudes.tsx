import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteMagnitude from '../containers/magnitudes/DeleteMagnitude'
import MagnitudeFormContainer from '../containers/magnitudes/MagnitudeFormContainer'
import { useGetList } from '../hooks/useAPI'
import { Magnitude } from '../types/Magnitude'

const initialMagnitude: Magnitude = {
  id: 0,
  name: '',
  delete: false,
  createdBy: 0,
  updatedBy: 0
}

const Magnitudes = () => {
  const [show, setShow] = useState<boolean>(false)
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>(initialMagnitude)

  const addMagnitude = () => {
    setMagnitude(initialMagnitude)
    setShow(true)
  }

  const editMagnitude = (id: number) => {
    const editMagnitude = magnitudes.find(magnitude => magnitude.id === id)
    if (editMagnitude) {
      setMagnitude(editMagnitude)
      setShow(true)
    }
  }

  const refreshMagnitudes = async () => {
    const response = await useGetList<Magnitude[]>('magnitudes')
    if (!response.error) {
      setMagnitudes(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      await refreshMagnitudes()
    }
    getMagnitudes()
  }, [])



  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Magnitudes</h1>
      <MagnitudeFormContainer refreshMagnitudes={refreshMagnitudes} magnitude={magnitude} addMagnitude={addMagnitude} show={show} setShow={setShow} />
      {
        magnitudes.length > 0 &&
        <Table headers={['#', 'Nombre','']} darkMode={true}>
          {
            magnitudes.map((magnitude, index) => (
              <TableRow key={index} tableData={[magnitude.id.toString(), magnitude.name]}>
                <button className="btn btn-white my-1 mx-2" onClick={(() => editMagnitude(magnitude.id))}>Editar</button>
                <DeleteMagnitude id={magnitude.id} refreshMagnitudes={refreshMagnitudes} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Magnitudes