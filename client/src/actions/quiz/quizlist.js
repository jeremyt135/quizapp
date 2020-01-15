import ActionTypes from '../types'

/**
 * Loads a list of quiz info from the server for displaying a user's list
 * of quizzes.
 * @param {[string]} quizIds list of quiz ids
 */
export const getQuizList = quizIds => async dispatch => {
  const quizzes = []
  try {
    for (const id of quizIds) {
      const response = await fetch(`/api/quiz/${id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      })
      if (response.ok) {
        quizzes.push(await response.json())
      } else {
        // failed loading quiz
        console.log(response)
      }
    }

    dispatch({
      type: ActionTypes.Quiz.LOAD_QUIZ_LIST,
      data: quizzes
    })
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
