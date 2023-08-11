import React, { useState } from 'react'
import MeasureForm from '../../components/measures/MeasureForm'
import { usePost } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'
import { PayMethod } from '../../types/PayMethod'
import PayMethodForm from '../../components/payMethods/PayMethod'

interface Props {
  payMethod: PayMethod
  refreshPayMethods: () => void
}

const CreatePayMethod = ({ payMethod, refreshPayMethods }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newPayMethod: PayMethod) => {
    const response = await usePost<PayMethod>('paymethods', newPayMethod, true)
    if (!response.error) {
      refreshPayMethods()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <PayMethodForm errors={errors} currentPayMethod={payMethod} action={handleSubmit} />
  )
}

export default CreatePayMethod