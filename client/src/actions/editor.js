import { Editor } from './types'
import { loadUser } from './user'
import { parseError } from './parse-error'

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
        type: Editor.CREATE_QUIZ
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.CREATE_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: Editor.CREATE_QUIZ_ERROR,
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
        type: Editor.POST_EDITED_QUIZ
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.POST_EDITED_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    dispatch({
      type: Editor.POST_EDITED_QUIZ_ERROR,
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
    console.log(error)
  }
}
