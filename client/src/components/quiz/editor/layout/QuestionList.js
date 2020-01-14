import React from 'react'
import PropTypes from 'prop-types'

import uuidv4 from 'uuid/v4'

import Question from '../Question'

/**
 * Callback for changing Question data in QuizEditor
 *
 * @callback onChangeQuestion
 * @param {{text: string, correctAnswer: number, answers: Array}} question Question data
 * @param {number} questionIndex
 */

/**
 * Callback for removing a Question
 * @callback remove
 * @param {number} questionIndex
 */

/**
 * Callback for adding a Question
 * @callback add
 * @param {number} questionIndex
 */

/**
 * Presentational component that displays a list of Question components
 * @param {object} props Component props
 * @param {Array} props.questions Array of Question objects to display
 * @param {{text: string, correctAnswer: number, answers: Array}} props.defaultValue Default Question data
 * @param {onChange} props.onChangeQuestion function to invoke when Question data changes
 * @param {add} props.addQuestion function to invoke when a Question is added
 * @param {remove} props.remove function to invoke when Question should be removed
 */
const QuestionList = ({
  questions,
  onChangeQuestion,
  addQuestion,
  removeQuestion
}) => {
  return (
    <>
      {questions.map((question, index) => (
        <Question
          key={uuidv4()}
          index={index}
          defaultValue={question}
          onChange={onChangeQuestion}
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
  onChangeQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired
}

export default QuestionList
