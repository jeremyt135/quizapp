import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

type Props = {
  id: string
  defaultValue: string
  validate: boolean
  onChange: (text: string) => void
}

const QuestionText = ({ id, defaultValue, validate, onChange }: Props) => {
  const [text, setText] = useState(defaultValue)
  const isInvalid = validate && text.length === 0
  return (
    <Row className="mb-2">
      <Col>
        <Form.Control
          type="text"
          className={isInvalid ? ' is-invalid' : ''}
          id={id}
          onChange={e => {
            setText(e.target.value)
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const text = e.target.value
            setText(text)
            onChange(text)
          }}
          value={text}
          placeholder={'Question text...'}
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

export default QuestionText
