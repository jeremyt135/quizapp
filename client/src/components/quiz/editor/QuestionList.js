import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import uuidv4 from 'uuid/v4'

import Question from './Question'

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
 * @param {boolean} props.editing True if questions are being edited
 * @param {Array} props.questions Array of Question objects to display
 * @param {{text: string, correctAnswer: number, answers: Array}} props.defaultValue Default Question data
 * @param {onChange} props.onChangeQuestion function to invoke when Question data changes
 * @param {add} props.addQuestion function to invoke when a Question is added
 * @param {remove} props.remove function to invoke when Question should be removed
 */
const QuestionList = ({
  editing,
  error,
  questions,
  onChangeQuestion,
  addQuestion,
  removeQuestion
}) => {
  return (
    <>
      {error && error.status === 400 && questions.length === 0 ? (
        <div className='row mb-2'>
          <div className='col d-flex align-items-center '>
            <h5 className='text-danger mb-0'>
              Please add at least one question.
            </h5>
            <Icon path={mdiAlertCircle} size={1} color='red' />
          </div>
        </div>
      ) : null}
      {questions.map((question, index) => (
        <Question
          key={uuidv4()}
          editing={editing}
          index={index}
          defaultValue={question}
          onChange={onChangeQuestion}
          remove={removeQuestion}
        />
      ))}
      <div className='row mt-4'>
        <div className='col d-flex align-items-center justify-content-start'>
          <button
            className='btn btn-primary btn-sm'
            onClick={addQuestion}
            disabled={editing}>
            Add Question
          </button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  error: state.editor.error
})

QuestionList.propTypes = {
  editing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  questions: PropTypes.array.isRequired,
  onChangeQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(QuestionList)
