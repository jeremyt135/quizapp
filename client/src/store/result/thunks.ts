import { parseError } from '../../actions/parse-error'
import { createAlert } from '../alerts/thunks'
import { QuizId } from '../quiz/types'
import { Thunk } from '../store'
import {
  loadResult,
  loadResultError,
  clearResult as clearResultAction
} from './actions'

type UserId = string

const fetchResult = async (quizId: QuizId, userId: UserId) => {
  let result = null
  let error = null
  const response = await fetch(`/api/results?quiz=${quizId}&user=${userId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (response.ok) {
    result = await response.json()
  } else {
    error = await parseError(response)
  }
  return [result, error]
}

const fetchUser = async (userId: UserId) => {
  let user = null
  let error = null
  const response = await fetch(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (response.ok) {
    user = await response.json()
  } else {
    error = await parseError(response)
  }
  return [user, error]
}

export function getResult(quizId: QuizId, userId: UserId): Thunk {
  return async dispatch => {
    const [result, resultError] = await fetchResult(quizId, userId)
    if (resultError) {
      return dispatch(loadResultError(resultError))
    }
    const [user, userError] = await fetchUser(userId)
    if (userError) {
      dispatch(loadResultError(userError))
      dispatch(
        createAlert({
          msg: "We couldn't load your quiz results right now.",
          type: 'danger'
        })
      )
      return
    }
    result.username = user.username
    dispatch(loadResult(result))
  }
}

export const clearResult = (): Thunk => dispatch =>
  dispatch(clearResultAction())
