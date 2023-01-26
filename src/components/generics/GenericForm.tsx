import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface Props {
  children: React.ReactNode
  handleSubmit: () => void
  submitText: string
}

const GenericForm = ({ children, submitText, handleSubmit }: Props) => {
  const [validated, setValidated] = useState(false)

  const validateForm = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
    const form = event.target
    if (form.checkValidity() === true) {
      await handleSubmit()
    }
  }

  return (
    <Form noValidate onSubmit={validateForm} validated={validated} className='col-12 p-4 shadow'>
      {children}
      <Button className='btn btn-dark col-12' type="submit">{submitText}</Button>

    </Form>
  )
}

export default GenericForm
