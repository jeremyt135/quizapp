import React from 'react'

import { ApiError, FormQuestion } from 'api'

import Question from './Question'

type Props = {
  /**
   * Possible error from submitting quiz
   */
  error?: ApiError

  questions: FormQuestion[]

  /**
   * Callback for when the answer choice for a question changes.
   */
  onChange: (answerIndex: number, questionIndex: number) => void
}

/**
 * Displays the questions to the quiz answer form
 */
const QuestionList = ({ error, questions, onChange }: Props) => {
  return (
    <div data-testid="questionlist">
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          text={question.text}
          answers={question.answers}
          onChange={onChange}
          highlightMissing={!!error && error.status === 400}
        />
      ))}
    </div>
  )
}

export default QuestionList
