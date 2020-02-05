import React from 'react'
import Question from './Question'

import PropTypes from 'prop-types'

/**
 * Displays the questions to the quiz answer form
 * @param {object} props
 * @param {{status: number, errors: [any]}} props.error Quiz error state
 * @param {{ questions: [{text: string}]}} props.questions List of questions in quiz
 * @param {function} onChange Function to call when user has selected an answer
 */
const QuestionList = ({ error, questions, onChange }) => {
  return (
    <>
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          text={question.text}
          answers={question.answers}
          onChange={onChange}
          highlightMissing={error && error.status === 400}
        />
      ))}
    </>
  )
}

QuestionList.propTypes = {
  error: PropTypes.object,
  questions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default QuestionList
