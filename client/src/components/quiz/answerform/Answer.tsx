import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

type Props = {
  questionIndex: number
  index: number
  text: string
  selected: boolean
  /**
   * Callback for when the user selects this Answer
   */
  onChecked: () => void
}

/**
 * Displays one answer for a question.
 */
const Answer = ({ questionIndex, index, text, selected, onChecked }: Props) => {
  const question = `question${questionIndex}`
  const answer = `${question}answer${index}`
  return (
    <Row className="mb-2 px-3">
      <Col>
        <div
          data-testid={`answer-choice-${index}`}
          className={
            'mb-0 pt-1 answer' + (selected ? ' answer--selected' : '')
          }>
          <Form.Check
            className="form-control-lg"
            type="radio"
            name={question}
            id={answer}
            value={index}
            onChange={onChecked}
            checked={selected}
            label={`${index + 1}. ${text}`}
          />
        </div>
      </Col>
    </Row>
  )
}

export default Answer
