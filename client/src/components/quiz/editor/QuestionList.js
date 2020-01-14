import React from 'react'
import PropTypes from 'prop-types'

import Question from './Question'

const QuestionList = ({ questions, onChange }) => {
  const addQuestion = () => {
    onChange([
      ...questions,
      {
        text: '',
        correctAnswer: 0,
        answers: []
      }
    ])
  }

  const removeQuestion = questionIndex => {
    onChange(questions.filter((v, index) => questionIndex !== index))
  }

  const changeQuestion = (updatedQuestion, index) => {
    questions[index] = { ...updatedQuestion }
    onChange(questions)
  }

  return (
    <>
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          value={question}
          onChange={changeQuestion}
          remove={removeQuestion}
        />
      ))}
      <div className='row mt-4'>
        <div className='col d-flex align-items-center justify-content-start'>
          <button className='btn btn-primary btn-sm' onClick={addQuestion}>
            Add Question
          </button>
        </div>
      </div>
    </>
  )
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default QuestionList
