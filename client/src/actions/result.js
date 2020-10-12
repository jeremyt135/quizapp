import ActionTypes from './types'
import { parseError } from './parse-error'
import { createAlert } from '../store/alerts/thunks'

const fetchResult = async (quizId, userId) => {
  let result = null
  let error = null
  const response = await fetch(`/api/results?quiz=${quizId}&user=${userId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  if (response.ok) {
    result = await response.json()
  } else {
    error = await parseError(response)
  }
  return [result, error]
}

const fetchUser = async userId => {
  let user = null
  let error = null
  const response = await fetch(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  if (response.ok) {
    user = await response.json()
  } else {
    error = await parseError(response)
  }
  return [user, error]
}

export const getResult = (quizId, userId) => async dispatch => {
  const [result, resultError] = await fetchResult(quizId, userId)
  if (resultError) {
    return dispatch({
      type: ActionTypes.Result.LOAD_RESULT_ERROR,
      data: resultError
    })
  }
  const [user, userError] = await fetchUser(userId)
  if (userError) {
    dispatch({
      type: ActionTypes.Result.LOAD_RESULT_ERROR,
      data: userError
    })
    dispatch(
      createAlert({
        msg: "We couldn't load your quiz results right now.",
        type: 'danger'
      })
    )
    return
  }
  result.username = user.username
  dispatch({
    type: ActionTypes.Result.LOAD_RESULT,
    data: result
  })
}

export const clearResult = () => dispatch => {
  dispatch({
    type: ActionTypes.Result.CLEAR_RESULT
  })
}
