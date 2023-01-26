import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { CustomInputAttributes } from '../../types/customInputAttributes'

interface Props {
  customInputNumber: CustomInputAttributes
  value: number
}

const CustomInputNumber = ({customInputNumber, value}: Props) => {  
  return (
    <>
      <Form.Group className='my-2' as={Col} md="12">
        <Form.Label className='m-0'>{customInputNumber.label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="string"
            placeholder={customInputNumber.label}
            name={customInputNumber.name}
            value={value}
            onChange={customInputNumber.handleChange}
            required
            pattern={customInputNumber.pattern}
          />
          <Form.Control.Feedback type="invalid">
            {customInputNumber.validationMessage}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  )
}

export default CustomInputNumber