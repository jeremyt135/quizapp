import React, { memo } from 'react'
import { Col, Row } from 'react-bootstrap'

type Props = {
  value: number
}

const CorrectAnswerDisplay = ({ value }: Props) => {
  return (
    <>
      <Row className="mb-0">
        <Col>
          <h6 className="px-2 mb-0">Correct Answer: {value}</h6>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
          <small className="px-2 text-muted">
            Click an answer's radio box to change the correct answer
          </small>
        </Col>
      </Row>
    </>
  )
}

export default memo(CorrectAnswerDisplay)
