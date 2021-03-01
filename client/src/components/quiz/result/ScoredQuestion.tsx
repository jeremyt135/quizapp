import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { Answer as QuizAnswer, ResultAnswer } from 'api'

import Answer from './Answer'

type Props = {
  index: number
  text: string
  result: ResultAnswer
  answers: QuizAnswer[]
}

/**
 * Displays a single scored question from a quiz
 */
const ScoredQuestion = ({
  index: questionIndex,
  text,
  answers,
  result
}: Props) => {
  return (
    <Row className="mb-4">
      <Col>
        <h3 className="mb-2">
          {questionIndex + 1}. {text}
        </h3>
        {result.correctAnswer !== undefined ? (
          <Row className="mb-4">
            <Col className="d-flex align-items-center">
              <h5 className="mb-0">
                Correct answer: {result.correctAnswer + 1}
              </h5>
            </Col>
          </Row>
        ) : null}
        {answers.map((answer, index) => {
          let isCorrect: boolean
          const selected = result.choice === index
          if (result.correctAnswer !== undefined) {
            isCorrect = result.correctAnswer === index
          } else {
            isCorrect = result.isCorrect && selected
          }
          return (
            <Answer
              key={index}
              index={index}
              text={answer.text}
              correct={isCorrect}
              selected={selected}
            />
          )
        })}
      </Col>
    </Row>
  )
}

export default ScoredQuestion
