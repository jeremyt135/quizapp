import React, { useState, useRef, useReducer } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import moment from 'moment'

import Footer from '../common/Footer'
import AllowedUsersInput from './layout/AllowedUsersInput'
import PublicCheckbox from './layout/PublicCheckbox'
import Title from './layout/Title'
import ExpirationPicker from './layout/ExpirationPicker'
import QuestionList from './layout/QuestionList'

import { postQuiz, editQuiz } from '../../../actions/quiz/quiz'

import '../../../styles/quiz.css'

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
 * @param {postQuiz} props.postQuiz Function to call when submitting the quiz to server
 */
const QuizEditor = ({ postQuiz, editQuiz }) => {
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
  const [isPublic, setIsPublic] = useState(quiz.isPublic || false)
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

  const submitNewQuiz = () => {
    postQuiz(
      {
        title,
        isPublic,
        expiresIn: expiresIn.current,
        allowedUsers,
        questions: questionsRef.current
      },
      () => browserHistory.push('/dashboard')
    )
  }

  const submitEditedQuiz = () => {
    console.log(allowedUsers)
    editQuiz(
      {
        _id: quiz._id,
        title,
        isPublic,
        expiresIn: expiresIn.current,
        allowedUsers,
        questions: questionsRef.current
      },
      () => browserHistory.push('/dashboard')
    )
  }

  return (
    <>
      <section className='container'>
        <section className='content col-md-8 mx-auto mt-3'>
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
            defaultValue={defaultExpiration}
            onChange={changeExpiresIn}
          />
          <QuestionList
            questions={questions}
            onChangeQuestion={changeQuestion}
            addQuestion={addQuestion}
            removeQuestion={removeQuestion}
          />
        </section>
      </section>
      <Footer
        text='Create'
        onClick={editing ? submitEditedQuiz : submitNewQuiz}
      />
    </>
  )
}

QuizEditor.propTypes = {
  postQuiz: PropTypes.func.isRequired,
  editQuiz: PropTypes.func.isRequired
}

export default connect(null, { postQuiz, editQuiz })(QuizEditor)
