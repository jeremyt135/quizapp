import ActionTypes from '../types'

/**
 * Loads a list of quiz info from the server for displaying a user's list
 * of quizzes.
 */
export const getQuizList = () => async dispatch => {
  try {
    const response = await fetch(`/api/users/me/quizzes?format=listing`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const quizzes = await response.json()
      dispatch({
        type: ActionTypes.Quiz.LOAD_QUIZ_LIST,
        data: quizzes
      })
    } else {
      // failed loading quiz
      console.log(response)
      dispatch({
        type: ActionTypes.Quiz.LOAD_QUIZ_LIST_ERROR
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.LOAD_QUIZ_LIST_ERROR
    })
  }
}

export const clearQuizList = () => dispatch => {
  dispatch({
    type: ActionTypes.Quiz.CLEAR_QUIZLIST
  })
}
