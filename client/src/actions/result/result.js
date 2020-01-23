import ActionTypes from '../types'

const fetchResult = async (quizId, userId) => {
  let result = null
  const errors = []
  try {
    const response = await fetch(`/api/results?quiz=${quizId}&user=${userId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      result = await response.json()
    } else {
      const contentType = response.headers.get('Content-Type')
      const error =
        contentType && contentType.startsWith('application/json')
          ? await response.json()
          : response.status
      errors.push(error)
    }
  } catch (error) {
    errors.push(error)
  }
  return [result, errors]
}

const fetchUser = async userId => {
  let user = null
  const errors = []
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      user = await response.json()
    } else {
      const error = response.headers
        .get('Content-Type')
        .startsWith('application/json')
        ? await response.json()
        : response.status
      errors.push(error)
    }
  } catch (error) {
    errors.push(error)
  }
  return [user, errors]
}

export const getResult = (quizId, userId) => async dispatch => {
  try {
    const [result, resultErrors] = await fetchResult(quizId, userId)
    if (result) {
      const [user, userErrors] = await fetchUser(userId)
      if (user) {
        result.username = user.username
        dispatch({
          type: ActionTypes.Result.LOAD_RESULT,
          data: result
        })
      } else {
        dispatch({
          type: ActionTypes.Result.LOAD_RESULT_ERROR
        })
      }
    } else {
      dispatch({
        type: ActionTypes.Result.LOAD_RESULT_ERROR
      })
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.Result.LOAD_RESULT_ERROR
    })
  }
}

export const clearResult = () => dispatch => {
  dispatch({
    type: ActionTypes.Result.CLEAR_RESULT
  })
}
