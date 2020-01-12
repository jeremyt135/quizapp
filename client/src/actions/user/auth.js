import ActionTypes from '../types'

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
