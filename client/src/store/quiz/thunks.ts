import { parseError } from '../../util/parse-error'
import { loadUser } from '../user/thunks'
import { createAlert } from '../alerts/thunks'
import { Thunk } from '../store'
import {
  loadQuiz,
  loadQuizError,
  postAnswers,
  postAnswersError,
  clearQuiz as clearQuizAction
} from './actions'
import { QuizAnswers, QuizId } from './types'

export function getQuiz(quizId: QuizId): Thunk {
  return async dispatch => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}/form`, {
        method: 'GET',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? ''
        }
      })
      if (response.ok) {
        const quiz = await response.json()
        dispatch(loadQuiz(quiz))
      } else {
        const error = await parseError(response)
        dispatch(loadQuizError(error))
        dispatch(
          createAlert({
            msg: "We couldn't load the requested quiz.",
            type: 'danger'
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export function postQuizAnswers(
  quizId: QuizId,
  answers: QuizAnswers,
  onSuccess: () => void
): Thunk {
  return async dispatch => {
    try {
      const response = await fetch(`/api/results?quiz=${quizId}`, {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      })
      if (response.ok) {
        dispatch(postAnswers())
        // load the updated user data
        dispatch(loadUser())
        dispatch(
          createAlert({
            msg: 'Quiz answers submitted successfully',
            type: 'success'
          })
        )
        onSuccess()
      } else {
        const error = await parseError(response)
        dispatch(postAnswersError(error))
        dispatch(
          createAlert({
            msg:
              'Failed to submit answers - are there invalid or missing answers?',
            type: 'danger'
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export const clearQuiz = (): Thunk => dispatch => dispatch(clearQuizAction())
