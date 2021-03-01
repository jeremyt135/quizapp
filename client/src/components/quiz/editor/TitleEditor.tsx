import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

type Props = {
  defaultValue: string
  onChange: (title: string) => void
  validate: boolean
}

const TitleEditor = ({ defaultValue, onChange, validate }: Props) => {
  const [text, setText] = useState(defaultValue)
  const isInvalid = validate && text.length === 0

  return (
    <>
      <Row>
        <Col>
          <label htmlFor="quizTitle">Quiz Title:</label>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            size="lg"
            className={'mb-0 ' + (isInvalid ? ' is-invalid' : '')}
            id="quizTitle"
            value={text}
            placeholder={'Quiz Title...'}
            onChange={e => {
              const text = e.target.value
              setText(text)
              onChange(text)
            }}
            minLength={1}
          />
          {isInvalid ? (
            <div className="invalid-feedback">
              Please enter at least one character.
            </div>
          ) : null}
        </Col>
      </Row>
    </>
  )
}

export default TitleEditor
