import ActionTypes from '../types'

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
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.User.LOAD_USER_ERROR
    })
  }
}

/**
 * Changes a User's email. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} email New email to replace current
 */
export const changeUserEmail = email => async dispatch => {
  try {
    const response = await fetch('/api/users/me/email', {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.CHANGE_USER_INFO
      })
      dispatch(loadUser())
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.User.CHANGE_USER_INFO_ERROR
    })
  }
}

/**
 * Changes a User's login password. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} password New password to replace current
 */
export const changeUserPassword = password => async dispatch => {
  try {
    const response = await fetch('/api/users/me/password', {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(password)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.User.CHANGE_USER_INFO
      })
      dispatch(loadUser())
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.User.CHANGE_USER_INFO_ERROR
    })
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
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.User.DELETE_USER_INFO
    })
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
