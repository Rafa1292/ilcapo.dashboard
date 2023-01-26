import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { CustomInputAttributes } from '../../types/customInputAttributes'

interface Props {
  customInputText: CustomInputAttributes
  value: string
}

const CustomInputText = ({customInputText, value}: Props) => {
  
  return (
    <>
      <Form.Group className='my-2' as={Col} md="12" controlId="validationCustomUsername">
        <Form.Label className='m-0'>{customInputText.label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder={customInputText.label}
            name={customInputText.name}
            value={value}
            onChange={customInputText.handleChange}
            required
            pattern={customInputText.pattern}
          />
          <Form.Control.Feedback type="invalid">
            {customInputText.validationMessage}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  )
}

export default CustomInputText