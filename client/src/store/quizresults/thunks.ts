import { parseError } from '../../actions/parse-error'
import { createAlert } from '../alerts/thunks'
import { QuizId } from '../quiz/types'
import { Thunk } from '../store'
import {
  clearResultListings,
  loadResultListingError,
  loadResultListings
} from './actions'

const fetchResultListings = async (quizId: QuizId) => {
  let results = null
  let error = null
  const response = await fetch(`/api/results?quiz=${quizId}&format=listing`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
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

export function getQuizResults(quizId: QuizId): Thunk {
  return async dispatch => {
    try {
      const [resultListings, error] = await fetchResultListings(quizId)
      if (error) {
        dispatch(loadResultListingError(error))
        dispatch(
          createAlert({
            msg: "We couldn't load your quiz results right now.",
            type: 'danger'
          })
        )
      } else {
        dispatch(loadResultListings(resultListings))
      }
    } catch (err) {
      console.error(err)
    }
  }
}
export const clearQuizResults = (): Thunk => dispatch =>
  dispatch(clearResultListings())
