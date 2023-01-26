import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { CustomInputAttributes } from '../../types/customInputAttributes'

interface option {
  value: number
  label: string
}

interface Props {
  customInputSelect: CustomInputAttributes
  value: number
  data: option[]
  defaultLegend: string
}

const CustomInputSelect = ({defaultLegend, customInputSelect, value, data }: Props) => {
  return (
    <>
      <Form.Group className='my-2' as={Col} md="12">
        <Form.Label className='m-0'>{customInputSelect.label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Select onChange={customInputSelect.handleChange} defaultValue={value} required>
            <option value={''}>{defaultLegend}</option>
            {data.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {customInputSelect.validationMessage}a
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  )
}

export default CustomInputSelect