import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

type Props = {
  defaultValue: string
  validate: boolean
  onChange: (text: string) => void
}

const AnswerText = ({ defaultValue, validate, onChange }: Props) => {
  const [text, setText] = useState(defaultValue)
  const isInvalid = validate && text.length === 0

  return (
    <Row className="mb-1">
      <Col>
        <Form.Control
          type="text"
          size="sm"
          className={isInvalid ? ' is-invalid' : ''}
          onChange={e => {
            setText(e.target.value)
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const text = e.target.value
            setText(text)
            onChange(text)
          }}
          value={text}
          placeholder={`Answer text...`}
          minLength={1}
        />
        {isInvalid ? (
          <div className="invalid-feedback">
            Please enter at least one character.
          </div>
        ) : null}
      </Col>
    </Row>
  )
}

export default AnswerText
