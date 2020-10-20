import React from 'react'
import Answer from './Answer'
import { Answer as QuizAnswer, ResultAnswer } from 'api'

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
    <div className="row mb-4">
      <div className="col">
        <h3 className="mb-2">
          {questionIndex + 1}. {text}
        </h3>
        {result.correctAnswer !== undefined ? (
          <div className="row mb-4">
            <div className="col d-flex align-items-center">
              <h5 className="mb-0">
                Correct answer: {result.correctAnswer + 1}
              </h5>
            </div>
          </div>
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
      </div>
    </div>
  )
}

export default ScoredQuestion
