import ActionTypes from '../types'
import { loadUser } from '../user/user'

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
      // some validation error from server
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.CREATE_QUIZ_ERROR
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
      // some validation error from server
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR
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
    if (response.ok) {
      const quiz = await response.json()
      // go to quiz editor
      dispatch({
        type: ActionTypes.Quiz.EDIT_QUIZ
      })
      browserHistory.push(`/quiz/${quiz._id}/edit`, { quiz, editing: true })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.User.EDIT_QUIZ_ERROR
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
      // some error from server
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.DELETE_QUIZ_ERROR
    })
  }
}
