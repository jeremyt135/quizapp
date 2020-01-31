import { QuizResults } from './types'
import { parseError } from './parse-error'
import { setAlert } from './alerts'

const fetchResults = async quizId => {
  let results = null
  let error = null
  const response = await fetch(`/api/results?quiz=${quizId}&format=listing`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  if (response.ok) {
    const data = await response.json()
    results = data.results
  } else {
    error = await parseError(response)
  }
  return [results, error]
}

export const getQuizResults = quizId => async dispatch => {
  try {
    const [results, error] = await fetchResults(quizId)
    if (error) {
      dispatch({
        type: QuizResults.LOAD_RESULT_LIST_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: "We couldn't load your quiz results right now.",
          type: 'danger'
        })
      )
    } else {
      dispatch({
        type: QuizResults.LOAD_RESULT_LIST,
        data: results
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export const clearQuizResults = () => dispatch => {
  dispatch({
    type: QuizResults.CLEAR_RESULT_LIST
  })
}
