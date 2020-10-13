import { loadUser } from '../user/thunks'
import { parseError } from '../../actions/parse-error'
import { createAlert } from '../alerts/thunks'
import { setAuthUser, clearAuthUser } from './actions'
import { Token, UserLogin, UserRegistration } from './types'
import { Thunk } from '../store'

/**
 * Registers a new User with the server.
 * @param { UserRegistration } userRegistration Registration info for a new user
 * @param {function(object)} callback Function called with error after all dispatches fired
 */
export function register(
  { username, email, password }: UserRegistration,
  callback: (error: {} | null) => void
): Thunk {
  return async dispatch => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      if (response.ok) {
        const json: { token: Token } = await response.json()
        dispatch(setAuthUser(json.token))
        dispatch(loadUser())
        dispatch(
          createAlert({
            msg: 'Welcome to QuizNow!',
            type: 'success'
          })
        )
        callback(null)
      } else {
        const error = await parseError(response)
        dispatch(clearAuthUser())
        callback(error)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * Logs a User in, fetching their JWT
 * Dispatches an action of type LOGIN_USER on success and LOGIN_ERROR otherwise.
 * @param { UserLogin } userLogin Login info for an existing user
 * @param {function(object)} callback  Function called with error after all dispatches fired
 */
export function login(
  { username, password }: UserLogin,
  callback: (error: {} | null) => void
): Thunk {
  return async dispatch => {
    try {
      const response = await fetch('/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (response.ok) {
        const json: { token: Token } = await response.json()
        dispatch(setAuthUser(json.token))
        dispatch(loadUser())
        dispatch(
          createAlert({
            msg: 'Welcome back!',
            type: 'success'
          })
        )
        callback(null)
      } else {
        const error = await parseError(response)
        dispatch(clearAuthUser())
        callback(error)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * Clears the auth data (token, isAuthenticated)
 */
export const clearAuth = (): Thunk => dispatch => dispatch(clearAuthUser())
