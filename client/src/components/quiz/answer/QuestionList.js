import React from 'react'
import Question from './Question'

import PropTypes from 'prop-types'

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
