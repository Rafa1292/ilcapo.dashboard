import React, { useEffect, useState } from 'react'
import Table from '../../components/generics/Table'
import TableRow from '../../components/generics/TableRow'
import { useGetList } from '../../hooks/useAPI'
import { Input } from '../../types/Input'
import { Measure } from '../../types/Measure'
import { ProviderInput } from '../../types/ProviderInput'
import ProviderInputFormContainer from '../providerInputs/ProviderInputFormContainer'

interface Props {
  id?: number
}

const initialProviderInput: ProviderInput = {
  id: 0,
  inputId: 0,
  providerId: 0,
  expectedPrice: 0,
  upperPrice: 0,
  lowerPrice: 0,
  currentPrice: 0,
  lastPrice: 0,
  presentation: 0,
  brandId: 0,
  measureId: 0,
  measure: {magnitudeId: 0} as Measure,
  delete: false,
  createdBy: 0,
  updatedBy: 0,
}

const AddProviderToInput = ({ id }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [providerInputs, setProviderInputs] = useState<ProviderInput[]>([])
  const [providerInput, setProviderInput] = useState<ProviderInput>({ ...initialProviderInput, inputId: id ? id : 0 })
  const setInitialProviderInput = () => setProviderInput({ ...initialProviderInput, inputId: id ? id : 0 })

  const refreshProviderInputs = async () => {
    const response = await useGetList<ProviderInput[]>(`providerInputs/providerInputsByInputId/${id}`)
    if (!response.error) {
      setProviderInputs(response.data)
      setInitialProviderInput()
    }
  }

  const getRestringedBrandsId = (providerId: number) => {
    const providerInputBrandsIdByProvider = providerInputs.filter(x => x.providerId == providerId).map(x => x.brandId)
    return providerInputBrandsIdByProvider
  }

  const editProviderInput = (id: number) => {
    const providerInput = providerInputs.find(providerInput => providerInput.id === id)
    if (providerInput) {
      setProviderInput(providerInput)
    }
  }

  useEffect(() => {
    const getProviderInputs = async () => {
      await refreshProviderInputs()
    }
    const getInput = async () => {
      if (id) {
        const response = await useGetList<Input>(`inputs/${id}`)
        console.log(response)
        if (!response.error) {
          setTitle(response.data.name)
        }
      }
    }
    getProviderInputs()
    setInitialProviderInput()
    getInput()
  }, [])

  return (
    <div className='d-flex flex-wrap justify-content-center col-12'>
      <h2 className='col-12 text-center'>{title}</h2>
      <div className="col-lg-3 d-flex justify-content-center">
        <ProviderInputFormContainer showProviders={true} getRestringedBrandsId={getRestringedBrandsId} cancelAction={setInitialProviderInput} refreshProviderInputs={refreshProviderInputs} providerInput={providerInput} />
      </div>
      <div className="col-9 p-2">

        {
          providerInputs.length > 0 &&
          <Table headers={['#', 'Precio espereado', 'Precio anterior', 'Precio actual', 'Precio bajo', 'Precio alto',
            'Presentacion', 'Medida', 'Proveedor', 'Marca', '']}>
            {
              providerInputs.map((providerInput, index) => (
                <TableRow key={index} tableData={[providerInput.id.toString(), providerInput.expectedPrice.toString(),
                  providerInput.lastPrice.toString(), providerInput.currentPrice.toString(), providerInput.lowerPrice.toString(),
                  providerInput.upperPrice.toString(), providerInput.presentation.toString(),
                  providerInput.measure ? providerInput.measure.name : 'Medida',
                  providerInput.provider ? providerInput.provider.name : 'Proveedor',
                  providerInput.brand ? providerInput.brand.name : 'Marca'
                ]}>
                  <button className="btn btn-outline-secondary my-1 mx-2" onClick={(() => editProviderInput(providerInput.id))}>Editar</button>
                  {/* <button className="btn btn-white my-1 mx-2" onClick={(() => editMeasure(providerInput.id))}>Editar</button> */}
                  {/* <DeleteMeasure id={providerInput.id} refreshMeasures={refreshMeasures} /> */}
                </TableRow>
              ))
            }
          </Table>
        }
      </div>
    </div>
  )
}

export default AddProviderToInput