import { Thunk } from '../store'
import { parseError } from '../../actions/parse-error'
import { createAlert } from '../alerts/thunks'
import {
  loadDashboard as loadDashboardAction,
  clearDashboard as clearDashboardAction,
  loadDashboardError
} from './actions'

/**
 * Loads user's list of quizzes
 */
const getQuizList = async () => {
  let quizzes = null
  let error = null
  const response = await fetch(`/api/users/me/quizzes?format=listing`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (response.ok) {
    quizzes = await response.json()
  } else {
    error = await parseError(response)
  }
  return [quizzes, error]
}

/**
 * Loads user's list of quiz results
 */
const getResultList = async () => {
  let results = null
  let error = null
  const response = await fetch(`/api/users/me/results?format=listing`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (response.ok) {
    results = await response.json()
  } else {
    error = await parseError(response)
  }
  return [results, error]
}

/**
 * Get the dashboard data for a user
 */
export function loadDashboard(): Thunk {
  return async dispatch => {
    try {
      const [quizzes, quizError] = await getQuizList()
      if (quizError) {
        dispatch(loadDashboardError(quizError))
        dispatch(
          createAlert({
            msg: "We couldn't load your quizzes right now.",
            type: 'danger'
          })
        )
        return
      }
      const [results, resultError] = await getResultList()
      if (resultError) {
        dispatch(loadDashboardError(resultError))
        dispatch(
          createAlert({
            msg: "We couldn't load your quiz results right now.",
            type: 'danger'
          })
        )
        return
      }
      dispatch(loadDashboardAction(quizzes, results))
    } catch (err) {
      console.error(err)
    }
  }
}
/**
 * Clear dashboard data
 */
export const clearDashboard = (): Thunk => dispatch =>
  dispatch(clearDashboardAction())
