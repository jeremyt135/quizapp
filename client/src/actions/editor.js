import { Editor } from './types'
import { loadUser } from './user'
import { parseError } from './parse-error'
import { setAlert } from './alerts'

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
      dispatch(
        setAlert({
          msg: 'Quiz created successfully',
          type: 'success'
        })
      )
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.CREATE_QUIZ_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      )
    }
  } catch (error) {
    console.error(error)
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
      dispatch(
        setAlert({
          msg: 'Quiz edited successfully',
          type: 'success'
        })
      )
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.POST_EDITED_QUIZ_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      )
    }
  } catch (error) {
    console.error(error)
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
    console.error(error)
  }
}
