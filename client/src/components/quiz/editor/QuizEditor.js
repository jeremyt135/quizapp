import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import Footer from '../common/Footer'
import AllowedUsersInput from './AllowedUsersInput'
import PublicCheckbox from './PublicCheckbox'
import Title from './Title'
import ExpirationPicker from './ExpirationPicker'
import QuestionList from './QuestionList'
import ErrorPage from '../../errors/ErrorPage'
import Spinner from '../../common/Spinner'
import {
  postQuiz,
  postEditedQuiz,
  clearEditor
} from '../../../store/editor/thunks'

/**
 * Displays subforms for editing a quiz and directly handles submission of the quiz.
 * @param {object} props Component props
 * @param {object} props.quiz Quiz data (from redux - either default or from edited quiz)
 * @param {boolean} props.editing True if editing a quiz or false if creating new quiz
 * @param {boolean} props.loading True if loading a quiz to edit
 * @param {object} props.error Error state from attempting to post quiz
 * @param {function} props.postQuiz Function to submit a new quiz
 * @param {function} props.postEditedQuiz Function to call when submitting the quiz to server
 * @param {function} props.clearEditor Clears the quiz data from the editor
 */
const QuizEditor = ({
  quiz,
  loading,
  editing,
  postQuiz,
  postEditedQuiz,
  clearEditor,
  error
}) => {
  const browserHistory = useHistory()

  const handleBeforeUnload = e => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    // Clear editor when leaving the page
    const unlisten = browserHistory.listen(() => {
      clearEditor()
    })
    return unlisten
  }, [])

  const goBackToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  const submitNewQuiz = () => {
    postQuiz(quiz, goBackToDashboard)
  }

  const submitEditedQuiz = () => {
    postEditedQuiz(quiz, goBackToDashboard)
  }

  if (loading && editing) {
    return <Spinner />
  }

  if (error && error.status !== 400) {
    return <ErrorPage status={error.status} />
  }

  return (
    <>
      <div className="content">
        <div className="quiz-editor container-fluid">
          <div className="row">
            <div className="quiz-editor__block col-sm-8 mx-auto">
              <Title />
              <PublicCheckbox />
              {!quiz.isPublic ? <AllowedUsersInput /> : null}
              <ExpirationPicker />
              <QuestionList />
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Button
          variant="secondary"
          className="ml-1"
          onClick={goBackToDashboard}>
          Cancel
        </Button>
        <Button
          variant="success"
          className="ml-1"
          onClick={editing ? submitEditedQuiz : submitNewQuiz}>
          {editing ? 'Confirm edits' : 'Submit'}
        </Button>
      </Footer>
    </>
  )
}

QuizEditor.propTypes = {
  quiz: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  postQuiz: PropTypes.func.isRequired,
  postEditedQuiz: PropTypes.func.isRequired,
  clearEditor: PropTypes.func.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => ({
  quiz: state.editor.quiz,
  loading: state.editor.loading,
  editing: state.editor.editing,
  error: state.editor.error
})

export default connect(mapStateToProps, {
  postQuiz,
  postEditedQuiz,
  clearEditor
})(QuizEditor)
