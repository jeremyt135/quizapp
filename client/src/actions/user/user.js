import ActionTypes from '../types'

/**
 * Loads data for the User represented by the current JWT.
 * Dispatches an action of type LOAD_USER on success and
 * LOAD_USER_ERROR otherwise.
 */
export const loadUser = () => async dispatch => {
  try {
    const response = await fetch('/api/user/me', {
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
 * Changes a User's login info. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param {string} email New email to replace current
 * @param {string} password New password to replace current
 */
export const changeUserInfo = (email, password) => async dispatch => {
  try {
    const response = await fetch('/api/user/me', {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
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
