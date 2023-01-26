import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { CustomInputAttributes } from '../../types/customInputAttributes'



interface Props {
  customInputCheck: CustomInputAttributes
  value: boolean
}

const CustomInputCheck = ({customInputCheck, value }: Props) => {
  return (
    <>
      <Form.Group className='my-2' as={Col} md="12">
        <Form.Label htmlFor={customInputCheck.name} className='m-0 user-select-none'>{customInputCheck.label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Check id={customInputCheck.name} name={customInputCheck.name} type='checkbox' onChange={customInputCheck.handleChange}/>
          <Form.Control.Feedback type="invalid">
            {customInputCheck.validationMessage}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  )
}

export default CustomInputCheck