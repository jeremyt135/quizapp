import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import Question from './Question'
import { addQuestion, removeQuestion } from '../../../actions/editor'

/**
 * Presentational component that displays a list of Question components
 * @param {object} props Component props
 * @param {boolean} props.editing True if questions are being edited
 * @param {number} props.questionCount Number of questions in quiz
 * @param {function} props.addQuestion function to invoke when a Question is added
 * @param {status: number, errors: [object]} props.error Editor error state
 */
const QuestionList = ({ editing, error, questionCount, addQuestion }) => {
  return (
    <>
      {error && error.status === 400 && questionCount === 0 ? (
        <div className='row mb-2'>
          <div className='col d-flex align-items-center '>
            <h5 className='text-danger mb-0'>
              Please add at least one question.
            </h5>
            <Icon path={mdiAlertCircle} size={1} color='red' />
          </div>
        </div>
      ) : null}
      {Array.from({ length: questionCount }, (_, index) => (
        <Question key={index} index={index} />
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
  questionCount: state.editor.quiz.questions.length,
  editing: state.editor.editing,
  error: state.editor.error
})

QuestionList.propTypes = {
  editing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  questionCount: PropTypes.number.isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addQuestion, removeQuestion })(
  QuestionList
)
