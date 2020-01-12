import ActionTypes from '../types'

/**
 * Loads data for the User represented by the current JWT.
 * Dispatches an action of type AUTH_USER on success and AUTH_ERROR otherwise.
 */
export const loadUser = () => async dispatch => {
  try {
    const response = await fetch('/api/auth', {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const data = await response.json()
      dispatch({
        type: ActionTypes.Auth.AUTH_USER,
        data
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Auth.AUTH_ERROR
    })
  }
}

/**
 * Registers a new User with the server. Dispatches an action of type
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
export const register = (username, email, password) => async dispatch => {
  try {
    const response = await fetch('/api/user', {
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
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Auth.AUTH_ERROR
    })
  }
}

/**
 * Logs a User in, fetching their JWT
 * Dispatches an action of type LOGIN_USER on success and LOGIN_ERROR otherwise.
 * @param {string} username
 * @param {string} password
 */
export const login = (username, password) => async dispatch => {
  try {
    const response = await fetch('/api/auth', {
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
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Auth.LOGIN_ERROR
    })
  }
}
