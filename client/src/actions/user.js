import ActionTypes from './types'
import { parseError } from './parse-error'
import { loadDashboard } from './dashboard'
import { setAlert } from './alerts'

/**
 * Loads data for the User represented by the current JWT.
 * Dispatches an action of type LOAD_USER on success and
 * LOAD_USER_ERROR otherwise.
 */
export const loadUser = () => async dispatch => {
  try {
    const response = await fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const data = await response.json()
      dispatch({
        type: ActionTypes.User.LOAD_USER,
        data
      })
      dispatch(loadDashboard())
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.User.LOAD_USER_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: "We couldn't load your account right now.",
          type: 'danger'
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Changes a User's email. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} email New email to replace current
 * @param {function(object)} callback Callback when action completed
 */
export const changeUserEmail = (email, callback) => async dispatch => {
  try {
    const response = await fetch('/api/users/me/email', {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.CHANGE_USER_INFO
      })
      dispatch(
        setAlert({
          msg: 'Your email was changed successfully',
          type: 'success'
        })
      )
      dispatch(loadUser())
      callback(null)
    } else {
      const error = await parseError(response)
      callback(error)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Changes a User's login password. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} password New password to replace current
 * @param {function(object)} callback Callback when action completed
 */
export const changeUserPassword = (password, callback) => async dispatch => {
  try {
    const response = await fetch('/api/users/me/password', {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.CHANGE_USER_INFO
      })
      dispatch(loadUser())
      dispatch(
        setAlert({
          msg: 'Your pssword was changed successfully',
          type: 'success'
        })
      )
      callback(null)
    } else {
      const error = await parseError(response)
      callback(error)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Deletes the user's account (irreversable) and clears auth.
 */
export const deleteUser = () => async dispatch => {
  try {
    const response = await fetch('/api/users/me', {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.DELETE_USER
      })
      dispatch({
        type: ActionTypes.Auth.CLEAR_AUTH
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.User.DELETE_USER_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: ActionTypes.User.LOGOUT
  })
  dispatch({
    type: ActionTypes.Auth.CLEAR_AUTH
  })
}

/**
 * Deletes a user's quiz
 */
export const deleteQuiz = quiz => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quiz}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.DELETE_QUIZ
      })
      // load the updated user data with quiz list
      dispatch(loadUser())
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.User.DELETE_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
  }
}
