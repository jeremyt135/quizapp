import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

type Props = {
  defaultValue: boolean
  onChange: (checked: boolean) => void
  validate: boolean
}

const PublicCheckbox = ({ defaultValue, onChange, validate }: Props) => {
  const [checked, setChecked] = useState(defaultValue)

  return (
    <Row className="mb-4">
      <Col className="d-flex align-items-center">
        <Form.Switch
          id="publicCheckbox"
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked
            setChecked(checked)
            onChange(checked)
          }}
          label={'Public'}
        />
      </Col>
    </Row>
  )
}

export default PublicCheckbox
