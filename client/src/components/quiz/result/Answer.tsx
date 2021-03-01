import React from 'react'
import { Row, Col } from 'react-bootstrap'

type Props = {
  index: number
  text: string
  selected: boolean
  correct: boolean
}

/**
 * Displays a single answer with appropriate border
 */
const Answer = ({ index, text, selected, correct }: Props) => {
  let border = ''

  if (correct) {
    border = 'answer--correct'
  } else if (selected) {
    border = 'answer--incorrect'
  }
  return (
    <Row className="mb-2">
      <Col>
        <p className={'answer answer__text py-1 ' + border}>
          {index + 1}. {text}
        </p>
      </Col>
    </Row>
  )
}

export default Answer
