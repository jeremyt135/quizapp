import ActionTypes from '../types'

export const loadUser = () => async dispatch => {
  try {
    const response = await fetch('/api/auth', {
      method: 'GET',
      heaers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const data = response.json()
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

export const register = (username, password) => async dispatch => {
  try {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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
