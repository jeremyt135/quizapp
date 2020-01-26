import ActionTypes from './types'
import { parseError } from './parse-error'

/**
 * Loads user's list of quizzes
 */
const getQuizList = async () => {
  let quizzes = null
  let error = null
  const response = await fetch(`/api/users/me/quizzes?format=listing`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token')
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
      'x-auth-token': localStorage.getItem('token')
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
export const loadDashboard = () => async dispatch => {
  try {
    const [quizzes, quizError] = await getQuizList()
    if (quizError) {
      dispatch({
        type: ActionTypes.Dashboard.LOAD_DASHBOARD_ERROR,
        data: quizError
      })
      return
    }
    const [results, resultError] = await getResultList()
    if (resultError) {
      dispatch({
        type: ActionTypes.Dashboard.LOAD_DASHBOARD_ERROR,
        data: resultError
      })
      return
    }
    dispatch({
      type: ActionTypes.Dashboard.LOAD_DASHBOARD,
      data: {
        quizzes,
        results
      }
    })
  } catch (err) {
    throw err
  }
}

/**
 * Clear dashboard data
 */
export const clearDashboard = () => dispatch => {
  dispatch({
    type: ActionTypes.Dashboard.CLEAR_DASHBOARD
  })
}
