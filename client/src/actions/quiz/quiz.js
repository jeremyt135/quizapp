import ActionTypes from '../types'

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
