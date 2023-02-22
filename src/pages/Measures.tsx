import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteMeasure from '../containers/measures/DeleteMeasure'
import MeasureFormContainer from '../containers/measures/MeasureFormContainer'
import { useGetList } from '../hooks/useAPI'
import { Measure } from '../types/Measure'

const initialMeasure: Measure = {
  id: 0,
  name: '',
  value: 0,
  principalMeasure: false,
  magnitudeId: 0,
  abbreviation: '',
  delete: false,
  createdBy: 0,
  updatedBy: 0
}

const Measures = () => {
  const [show, setShow] = useState<boolean>(false)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [measure, setMeasure] = useState<Measure>(initialMeasure)

  const addMeasure = () => {
    setMeasure(initialMeasure)
    setShow(true)
  }

  const editMeasure = (id: number) => {
    const editMeasure = measures.find(measure => measure.id === id)
    if (editMeasure) {
      setMeasure(editMeasure)
      setShow(true)
    }
  }

  const refreshMeasures = async () => {
    const response = await useGetList<Measure[]>('measures')
    if (!response.error) {
      setMeasures(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getMeasures = async () => {
      await refreshMeasures()
    }
    getMeasures()
  }, [])



  return (
    <div className='col-lg-8 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Medidas</h1>
      <MeasureFormContainer refreshMeasures={refreshMeasures} measure={measure} addMeasure={addMeasure} show={show} setShow={setShow} />
      {
        measures.length > 0 &&
        <Table headers={['#', 'Nombre', 'Medida principal', 'Valor', 'Magnitud', 'Abreviatura', '']}>
          {
            measures.sort(function (a, b) { return (a.id + (a.magnitudeId * 10)) - (b.id + (b.magnitudeId * 10)) }).map((measure, index) => (
              <TableRow key={index} tableData={[measure.id.toString(), measure.name,
                measure.principalMeasure ? 'Si' : 'No', measure.value.toString(), measure.magnitude ? measure.magnitude.name : '' , measure.abbreviation
              ]}>
                <button className="btn btn-outline-secondary my-1 mx-2" onClick={(() => editMeasure(measure.id))}>Editar</button>
                <DeleteMeasure id={measure.id} refreshMeasures={refreshMeasures} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Measures