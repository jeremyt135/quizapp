import ActionTypes from '../types'
import { loadUser } from '../user/user'
import { parseError } from '../parse-error'

export const getQuizForm = quizId => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quizId}/form`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const quiz = await response.json()
      dispatch({
        type: ActionTypes.Quiz.LOAD_QUIZ,
        data: quiz
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Quiz.LOAD_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    // network failure or other error
    dispatch({
      type: ActionTypes.Quiz.LOAD_QUIZ_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}

export const clearQuiz = () => dispatch => {
  dispatch({
    type: ActionTypes.Quiz.CLEAR_QUIZ
  })
}

export const postQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.CREATE_QUIZ
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Quiz.CREATE_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.Quiz.CREATE_QUIZ_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}

export const postEditedQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quiz._id}/edit`, {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.POST_EDITED_QUIZ
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}

export const goToQuizEditor = (quizId, browserHistory) => async dispatch => {
  try {
    // get the corresponding quiz
    const response = await fetch(`/api/quizzes/${quizId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    let quiz = null
    if (response.ok) {
      quiz = await response.json()
    }
    browserHistory.push(`/quizzes/${quiz._id}/edit`, { quiz, editing: true })
  } catch (error) {
    dispatch({
      type: ActionTypes.User.LOAD_QUIZ_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}

export const deleteQuiz = quiz => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quiz._id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.DELETE_QUIZ
      })
      // load the updated user data with quiz list
      dispatch(loadUser())
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Quiz.DELETE_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.DELETE_QUIZ_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}

export const postQuizAnswers = (
  quizId,
  answers,
  onSuccess
) => async dispatch => {
  try {
    const response = await fetch(`/api/results?quiz=${quizId}`, {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.POST_ANSWERS
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Quiz.POST_ANSWERS_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.POST_ANSWERS_ERROR,
      data: { status: 500, errors: [error.message] }
    })
  }
}
