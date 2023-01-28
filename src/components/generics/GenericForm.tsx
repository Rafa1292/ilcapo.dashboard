import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface Props {
  children: React.ReactNode
  handleSubmit: () => void
  submitText: string
  errors?: string[]
}

const GenericForm = ({ children, submitText, handleSubmit, errors }: Props) => {
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
    <>
      {
        errors &&
          <div className="col-12 d-flex justify-content-center">
            <ul className="list-group list-group-flush">
              {
                errors.map((error, index) => (
                  <li key={index} className="list-group-item text-danger">{error}</li>
                ))
              }
            </ul>
          </div>
      }
      <Form noValidate onSubmit={validateForm} validated={validated} className='col-12 rounded p-4 shadow'>
        {children}
        <Button className='btn btn-dark col-12' type="submit">{submitText}</Button>
      </Form>
    </>
  )
}

export default GenericForm
