import ActionTypes from './types'
import { loadUser } from './user'
import { parseError } from './parse-error'
/**
 * Registers a new User with the server. Dispatches an action of type REGISTER_USER on success
 * and REGISTER_ERROR otherwise.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {function(object)} callback Function called with action has dispatched
 */
export const register = (
  username,
  email,
  password,
  callback
) => async dispatch => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    if (response.ok) {
      const data = await response.json()
      dispatch({
        type: ActionTypes.Auth.REGISTER_USER,
        data
      })
      dispatch(loadUser())
      callback(null)
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Auth.REGISTER_ERROR
      })
      callback(error)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Logs a User in, fetching their JWT
 * Dispatches an action of type LOGIN_USER on success and LOGIN_ERROR otherwise.
 * @param {string} username
 * @param {string} password
 * @param {function(object)} callback Function called with action has dispatched
 */
export const login = (username, password, callback) => async dispatch => {
  try {
    const response = await fetch('/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    if (response.ok) {
      const data = await response.json()
      dispatch({
        type: ActionTypes.Auth.LOGIN_USER,
        data
      })
      dispatch(loadUser())
      callback(null)
    } else {
      const error = await parseError(response)
      dispatch({
        type: ActionTypes.Auth.LOGIN_ERROR
      })
      callback(error)
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Clears the auth data (token, isAuthenticated)
 */
export const clearAuth = () => dispatch => {
  dispatch({
    type: ActionTypes.Auth.CLEAR_AUTH
  })
}
