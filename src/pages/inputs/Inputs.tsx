import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/generics/Table'
import TableRow from '../../components/generics/TableRow'
import DeleteInput from '../../containers/inputs/DeleteInput'
import InputFormContainer from '../../containers/inputs/InputFormContainer'
import { useGetList } from '../../hooks/useAPI'
import { Input } from '../../types/Input'
import { Measure } from '../../types/Measure'

const Inputs = () => {
  const initialInput: Input = {
    id: 0,
    name: '',
    lowerPrice: 0,
    upperPrice: 0,
    currentPrice: 0,
    lastPrice: 0,
    expectedPrice: 0,
    stock: 0,
    presentation: 0,
    suggestedStock: 0,
    currentProviderId: 0,
    measureId: 0,
    inputCategoryId: 0,
    measure: { magnitudeId:0 } as Measure,
    delete: false,
    createdBy: 0,
    updatedBy: 0
  }
  const [show, setShow] = useState<boolean>(false)
  const [inputs, setInputs] = useState<Input[]>([])
  const [input, setInput] = useState<Input>(initialInput)

  const addInput = () => {
    setInput(initialInput)
    setShow(true)
  }

  const editInput = (id: number) => {
    const editInput = inputs.find(input => input.id === id)
    if (editInput) {
      setInput(editInput)
      setShow(true)
    }
  }

  const refreshInputs = async () => {
    const response = await useGetList<Input[]>('inputs')
    if (!response.error) {
      setInputs(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getInputs = async () => {
      await refreshInputs()
    }
    getInputs()
  }, [])



  return (
    <div className='col-12 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Insumos</h1>
      <InputFormContainer refreshInputs={refreshInputs} input={input}
        addInput={addInput} show={show} setShow={setShow} />
      {
        inputs.length > 0 &&
        <Table headers={['#', 'Nombre', 'Precio bajo', 'Precio alto',
          'Precio actual', 'Precio anterior', 'Precio esperado', 'Stock',
          'Presentacion', 'Stock sugerido', 'Proveedor actual', 'Medida', 'Categoria',
          '']}>
          {
            inputs.map((input, index) => (
              <TableRow key={index} tableData={
                [
                  input.id.toString(), input.name, input.lowerPrice.toString(), input.upperPrice.toString(),
                  input.currentPrice.toString(), input.lastPrice.toString(), input.expectedPrice.toString(), input.stock.toString(),
                  input.presentation.toString(), input.suggestedStock.toString(), input.currentProviderId.toString(), input.measureId.toString(),
                  input.inputCategoryId.toString()
                ]}>
                <button className="btn btn-outline-secondary m-2" onClick={(() => editInput(input.id))}>Editar</button>
                <Link to={`/Inputs/AddProvider/${input.id}`} className="btn btn-outline-success m-2">Proveedores</Link>
                <DeleteInput id={input.id} refreshInputs={refreshInputs} />
              </TableRow>
            ))
          }
        </Table>
      }
    </div>
  )
}

export default Inputs