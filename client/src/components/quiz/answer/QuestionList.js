import React from 'react'
import Question from './Question'

import PropTypes from 'prop-types'

/**
 * Displays the questions to the quiz answer form
 * @param {object} props
 * @param {{status: number, errors: Array<any>}} props.error Quiz error state
 * @param {Array<{text: string, answers: Array<{text: string}>}>} props.questions List of questions in quiz
 * @param {function} onChange Function to call when user has selected an answer
 */
const QuestionList = ({ error, questions, onChange }) => {
  return (
    <div data-testid='questionlist'>
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

QuestionList.propTypes = {
  error: PropTypes.object,
  questions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default QuestionList
