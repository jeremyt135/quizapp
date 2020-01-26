import { Quiz } from './types'
import { parseError } from './parse-error'
import { loadUser } from './user'
export const getQuiz = quizId => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quizId}/form`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    if (response.ok) {
      const quiz = await response.json()
      dispatch({
        type: Quiz.LOAD_QUIZ,
        data: quiz
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: Quiz.LOAD_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const postQuizAnswers = (
  quizId,
  answers,
  onSuccess
) => async dispatch => {
  try {
    const response = await fetch(`/api/results?quiz=${quizId}`, {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    })
    if (response.ok) {
      dispatch({
        type: Quiz.POST_ANSWERS
      })
      // load the updated user data
      dispatch(loadUser())
      onSuccess()
    } else {
      const error = await parseError(response)
      dispatch({
        type: Quiz.POST_ANSWERS_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const clearQuiz = () => dispatch => {
  dispatch({
    type: Quiz.CLEAR_QUIZ
  })
}
