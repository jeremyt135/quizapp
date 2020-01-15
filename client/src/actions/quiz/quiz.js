import ActionTypes from '../types'
import { loadUser } from '../user/user'

export const postQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch('/api/quiz', {
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
      // load the updated user data with quiz list
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

export const editQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch(`/api/quiz/${quiz._id}/edit`, {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.EDIT_QUIZ
      })
      // load the updated user data with quiz list
      dispatch(loadUser())
      onSuccess()
    } else {
      // some validation error from server
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.EDIT_QUIZ_ERROR
    })
  }
}

export const deleteQuiz = quiz => async dispatch => {
  try {
    const response = await fetch(`/api/quiz/${quiz._id}`, {
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
