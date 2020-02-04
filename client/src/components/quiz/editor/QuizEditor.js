import React, { useState, useRef, useReducer } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import moment from 'moment'

import Footer from '../common/Footer'
import AllowedUsersInput from './AllowedUsersInput'
import PublicCheckbox from './PublicCheckbox'
import Title from './Title'
import ExpirationPicker from './ExpirationPicker'
import QuestionList from './QuestionList'
import ErrorPage from '../../errors/ErrorPage'
import { postQuiz, postEditedQuiz } from '../../../actions/editor'

import '../../../styles/quiz.scss'

/**
 * Parses allowed users from a comma-separated string.
 * @param {string} str Comma-separated string of valid usernames
 */
const parseAllowedUsers = str => {
  const users = str.split(/\s*,+\s*,*/).filter(s => s)
  if (
    users.length > 0 &&
    users.every(username => /^[a-zA-Z0-9]{5,}$/.test(username))
  ) {
    return users
  }
  return null
}

/**
 * Determines if the questions state should be updated
 * @param {Array} questions Current questions state
 * @param {Object} action Action to determine if state will update
 */
const questionsReducer = (questions, action) => {
  switch (action.type) {
    case 'add':
    case 'remove':
    case 'change':
      return [...action.questions]
    default:
      return [...questions]
  }
}

/**
 * Creates a redux action to post the quiz to the server
 *
 * @callback postQuiz
 * @param {object} quiz Quiz data
 * @param {function} onSuccess action to take on success
 */

/**
 * Creates a redux action to put the edit quiz to server
 *
 * @callback editQuiz
 * @param {object} quiz Quiz data
 * @param {function} onSuccess action to take on success
 */

/**
 * Displays subforms for editing a quiz and directly handles submission of the quiz.
 * @param {object} props Component props
 * @param {postQuiz} props.postEditedQuiz Function to call when submitting the quiz to server
 * @param {object} error Error state from attempting to post quiz
 */
const QuizEditor = ({ postQuiz, postEditedQuiz, error }) => {
  // The default expiration date of a quiz
  const defaultExpiration = moment()
    .add(1, 'day')
    .set('hours', 23)
    .set('minutes', 59)
    .toISOString()

  const browserHistory = useHistory()
  const browserLocation = useLocation()
  const { quiz, editing } = browserLocation.state || {
    quiz: {},
    editing: false
  }

  const [title, setTitle] = useState(quiz.title || 'My Quiz')
  const [isPublic, setIsPublic] = useState(quiz.isPublic || true)
  const [allowedUsers, setAllowedUsers] = useState(
    editing ? quiz.allowedUsers : []
  )
  const expiresIn = useRef(
    editing ? moment(quiz.expiresIn).toISOString() : defaultExpiration
  )

  const [questions, questionDispatch] = useReducer(
    questionsReducer,
    editing ? quiz.questions : []
  )
  const questionsRef = useRef(editing ? quiz.questions : [])

  const changeTitle = e => {
    setTitle(e.target.value)
  }

  const changeIsPublic = e => {
    setIsPublic(e.target.checked)
  }

  /**
   *  Sets allowedUsers array if e.target.value is a valid comma separated list
   *  of usernames
   */
  const changeAllowedUsers = e => {
    const userStr = e.target.value
    const userList = parseAllowedUsers(userStr)
    if (userList) {
      setAllowedUsers(userList)
    } else {
      setAllowedUsers([])
    }
  }

  const changeExpiresIn = dateStr => {
    expiresIn.current = dateStr
  }

  /**
   * Adds a question to both questionsRef and questions
   */
  const addQuestion = () => {
    questionsRef.current.push({
      text: '',
      correctAnswer: 0,
      answers: []
    })
    questionDispatch({
      type: 'add',
      questions: questionsRef.current
    })
  }

  /**
   * Removes a question from both questionsRef and questions
   */
  const removeQuestion = questionIndex => {
    questionsRef.current.splice(questionIndex, 1)
    questionDispatch({
      type: 'remove',
      questions: questionsRef.current
    })
  }

  /**
   * Changes the properties of a question in questionsRef, also updating
   * it in questions if the answers length has changed
   */
  const changeQuestion = (updatedQuestion, questionIndex) => {
    // console.log('editor updated question: ', updatedQuestion)
    const currentAnswers = questionsRef.current[questionIndex].answers
    questionsRef.current[questionIndex] = updatedQuestion
    if (updatedQuestion.answers.length !== currentAnswers.length) {
      questionDispatch({
        type: 'change',
        questions: questionsRef.current
      })
    }
  }

  const goBackToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  const submitNewQuiz = () => {
    postQuiz(
      {
        title,
        isPublic,
        expiresIn: expiresIn.current,
        allowedUsers,
        questions: questionsRef.current
      },
      goBackToDashboard
    )
  }

  const submitEditedQuiz = () => {
    postEditedQuiz(
      {
        _id: quiz._id,
        title,
        isPublic,
        expiresIn: expiresIn.current,
        allowedUsers,
        questions: questionsRef.current
      },
      goBackToDashboard
    )
  }

  if (error && error.status !== 400) {
    return <ErrorPage status={error.status} />
  }

  return (
    <div className='content'>
      <div className='quiz-editor container-fluid'>
        <div className='row'>
          <div className='quiz-editor__block col-sm-8 mx-auto'>
            <Title value={title} onChange={changeTitle} />
            <PublicCheckbox value={isPublic} onChange={changeIsPublic} />
            {!isPublic ? (
              <AllowedUsersInput
                defaultValue={allowedUsers}
                onChange={changeAllowedUsers}
                isValid={allowedUsers.length > 0}
              />
            ) : null}
            <ExpirationPicker
              defaultValue={expiresIn.current}
              onChange={changeExpiresIn}
            />
            <QuestionList
              editing={editing}
              questions={questions}
              onChangeQuestion={changeQuestion}
              addQuestion={addQuestion}
              removeQuestion={removeQuestion}
            />
          </div>
        </div>
      </div>
      <Footer>
        <Button
          variant='secondary'
          className='ml-1'
          onClick={goBackToDashboard}>
          Cancel
        </Button>
        <Button
          variant='success'
          className='ml-1'
          onClick={editing ? submitEditedQuiz : submitNewQuiz}>
          {editing ? 'Confirm edits' : 'Submit'}
        </Button>
      </Footer>
    </div>
  )
}

QuizEditor.propTypes = {
  postQuiz: PropTypes.func.isRequired,
  postEditedQuiz: PropTypes.func.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => ({
  error: state.editor.error
})

export default connect(mapStateToProps, { postQuiz, postEditedQuiz })(
  QuizEditor
)
