import ActionTypes from '../types'

/**
 * Loads a list of quiz results
 */
export const getResultList = () => async dispatch => {
  try {
    const response = await fetch(`/api/users/me/results?format=listing`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const results = await response.json()
      dispatch({
        type: ActionTypes.Quiz.LOAD_RESULT_LIST,
        data: results
      })
    } else {
      // failed loading quiz
      console.log(response)
      dispatch({
        type: ActionTypes.Quiz.LOAD_RESULT_LIST_ERROR
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.LOAD_RESULT_LIST_ERROR
    })
  }
}

export const clearResultList = () => dispatch => {
  dispatch({
    type: ActionTypes.Quiz.CLEAR_RESULT_LIST
  })
}
