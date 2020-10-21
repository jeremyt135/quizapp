import { parseError } from 'util/parse-error'
import { createAlert } from '../alerts/thunks'
import { Thunk } from '../store'
import { User } from './types'
import {
  changeUserPassword as changePasswordAction,
  changeUserEmail as changeEmailAction,
  loadUser as loadUserAction,
  loadUserError,
  deleteUser as deleteUserAction,
  logoutUser,
  deleteUserError,
  deleteQuiz as deleteQuizAction,
  deleteQuizError
} from './actions'
import { clearAuth } from '../auth/thunks'
import { ApiError, ID } from 'api'
/**
 * Loads data for the User represented by the current JWT.
 * Dispatches an action of type LOAD_USER on success and
 * LOAD_USER_ERROR otherwise.
 */
export function loadUser(): Thunk<Promise<void>> {
  return async dispatch => {
    try {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? ''
        }
      })
      if (response.ok) {
        const data: User = await response.json()
        dispatch(loadUserAction(data))
      } else {
        const error = await parseError(response)
        dispatch(loadUserError(error))
        dispatch(
          createAlert({
            msg: "We couldn't load your account right now.",
            type: 'danger'
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * Changes a User's email. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} email New email to replace current
 * @param {function(object)} callback Callback when action completed, potentially with error
 */
export function changeUserEmail(
  email: string
): Thunk<Promise<ApiError | undefined>> {
  return async dispatch => {
    try {
      const response = await fetch('/api/users/me/email', {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      if (response.ok) {
        dispatch(changeEmailAction(email))

        dispatch(
          createAlert({
            msg: 'Your email was changed successfully',
            type: 'success'
          })
        )
        dispatch(loadUser())
        return undefined
      } else {
        const error = await parseError(response)
        return error
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * Changes a User's login password. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} password New password to replace current
 * @param {function(object)} callback Callback when action completed, possibly with error
 */
export function changeUserPassword(
  password: string
): Thunk<Promise<ApiError | undefined>> {
  return async dispatch => {
    try {
      const response = await fetch('/api/users/me/password', {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      if (response.ok) {
        dispatch(changePasswordAction())

        dispatch(
          createAlert({
            msg: 'Your pssword was changed successfully',
            type: 'success'
          })
        )
        return undefined
      } else {
        const error = await parseError(response)
        return error
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * Deletes the user's account (irreversable) and clears auth.
 */
export function deleteUser(): Thunk {
  return async dispatch => {
    try {
      const response = await fetch('/api/users/me', {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? ''
        }
      })
      if (response.ok) {
        dispatch(deleteUserAction())
        dispatch(clearAuth())
      } else {
        const error = await parseError(response)
        dispatch(deleteUserError(error))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function logout(): Thunk {
  return dispatch => {
    dispatch(logoutUser())
    dispatch(clearAuth())
  }
}

/**
 * Deletes a user's quiz
 */
export function deleteQuiz(quizId: ID): Thunk {
  return async dispatch => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? ''
        }
      })
      if (response.ok) {
        dispatch(deleteQuizAction(quizId))
      } else {
        const error = await parseError(response)
        dispatch(deleteQuizError(error))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
