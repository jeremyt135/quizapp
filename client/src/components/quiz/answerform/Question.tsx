import React, { useState } from 'react'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import { FormAnswer } from 'api'
import { Col, Row } from 'react-bootstrap'

import Answer from './Answer'

type Props = {
  index: number
  text: string
  answers: FormAnswer[]
  highlightMissing: boolean

  /**
   * Callback for when the answer choice for a question changes.
   */
  onChange: (answerIndex: number, questionIndex: number) => void
}

/**
 * Displays one Question from a quiz.
 */
const Question = ({
  index: questionIndex,
  text,
  answers,
  highlightMissing,
  onChange
}: Props) => {
  const [answerIndex, setAnswerIndex] = useState<number>()

  const selectAnswer = (index: number) => {
    setAnswerIndex(index)
    onChange(index, questionIndex)
  }
  return (
    <Row>
      <Col>
        <Row className="mb-2">
          <Col>
            <h2 className="mb-0">
              {questionIndex + 1}. {text}{' '}
            </h2>
          </Col>
        </Row>
        {answerIndex == null && highlightMissing ? (
          <Row className="mb-2">
            <Col className="d-flex align-items-center">
              <h5 className="text-danger mb-0">Please select an answer. </h5>
              <Icon path={mdiAlertCircle} size={1} color="red" />
            </Col>
          </Row>
        ) : null}
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionIndex={questionIndex}
            index={index}
            text={answer.text}
            selected={answerIndex !== null && answerIndex === index}
            onChecked={() => selectAnswer(index)}
          />
        ))}
      </Col>
    </Row>
  )
}

export default Question
