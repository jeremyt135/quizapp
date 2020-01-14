import ActionTypes from '../types'
import { loadUser } from '../user/user'

export const postQuiz = (quiz, browserHistory) => async dispatch => {
  try {
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      dispatch({
        type: ActionTypes.Quiz.CREATE_QUIZ
      })
      // load the updated user data with quiz list
      dispatch(loadUser())
      browserHistory.push('/dashboard')
    } else {
      // some validation error from server
    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ActionTypes.Quiz.CREATE_QUIZ_ERROR
    })
  }
}
