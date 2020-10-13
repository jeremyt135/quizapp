import { loadUser } from '../user/thunks'
import { parseError } from '../../actions/parse-error'
import { createAlert } from '../alerts/thunks'
import { Thunk } from '../store'
import {
  createQuiz,
  createQuizError,
  editQuiz,
  loadQuiz,
  loadQuizError,
  postEditedQuiz as postEditedQuizAction,
  postEditedQuizError,
  addQuestion as addQuestionAction,
  removeQuestion as removeQuestionAction,
  addAnswer as addAnswerAction,
  removeAnswer as removeAnswerAction,
  changeIsPublic as changeIsPublicAction,
  changeExpiration as changeExpirationAction,
  changeAllowedUsers as changeAllowedUsersAction,
  changeTitle as changeTitleAction,
  changeQuestion as changeQuestionAction,
  clearEditor as clearEditorAction
} from './actions'
import { QuestionAnswer, Quiz } from './types'
import { QuizId } from '../quiz/types'

export function postQuiz(quiz: Quiz, onSuccess: () => void): Thunk {
  return async dispatch => {
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
      })
      if (response.ok) {
        // load the updated user data
        dispatch(loadUser()).then(() => {
          onSuccess()
          dispatch(createQuiz())

          dispatch(
            createAlert({
              msg: 'Quiz created successfully',
              type: 'success'
            })
          )
        })
      } else {
        const error = await parseError(response)
        dispatch(createQuizError(error))

        dispatch(
          createAlert({
            msg: 'Failed to create quiz - are there invalid fields?',
            type: 'danger'
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export function postEditedQuiz(quiz: Quiz, onSuccess: () => void): Thunk {
  return async dispatch => {
    try {
      const response = await fetch(`/api/quizzes/${quiz._id!}/edit`, {
        method: 'PUT',
        headers: {
          'x-auth-token': localStorage.getItem('token') ?? '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quiz)
      })
      if (response.ok) {
        // load the updated user data
        dispatch(loadUser()).then(() => {
          onSuccess()
          dispatch(postEditedQuizAction())

          dispatch(
            createAlert({
              msg: 'Quiz edited successfully',
              type: 'success'
            })
          )
        })
      } else {
        const error = await parseError(response)
        dispatch(postEditedQuizError(error))
        dispatch(
          createAlert({
            msg: 'Failed to create quiz - are there invalid fields?',
            type: 'danger'
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
export function goToQuizEditor(quizId: QuizId, browserHistory: any): Thunk {
  return dispatch => {
    dispatch(editQuiz())
    dispatch(getQuiz(quizId))
    browserHistory.push(`/quizzes/${quizId}/edit`)
  }
}
export function getQuiz(quizId: QuizId): Thunk {
  return async dispatch => {
    try {
      // get the corresponding quiz
      const response = await fetch(`/api/quizzes/${quizId}`, {
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
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function addQuestion(): Thunk {
  return dispatch => {
    dispatch(addQuestionAction())
  }
}
export function removeQuestion(index: number): Thunk {
  return dispatch => {
    dispatch(removeQuestionAction(index))
  }
}

export function addAnswer(questionIndex: number): Thunk {
  return dispatch => {
    dispatch(addAnswerAction(questionIndex))
  }
}

export function removeAnswer(
  questionIndex: number,
  answerIndex: number
): Thunk {
  return dispatch => {
    dispatch(removeAnswerAction(questionIndex, answerIndex))
  }
}
export function changeIsPublic(isPublic: boolean): Thunk {
  return dispatch => {
    dispatch(changeIsPublicAction(isPublic))
  }
}

export function changeExpiration(expiration: string): Thunk {
  return dispatch => {
    dispatch(changeExpirationAction(expiration))
  }
}

export function changeAllowedUsers(users: string[]): Thunk {
  return dispatch => {
    dispatch(changeAllowedUsersAction(users))
  }
}

export function changeTitle(title: string): Thunk {
  return dispatch => {
    dispatch(changeTitleAction(title))
  }
}

export function changeQuestion(
  questionIndex: number,
  questionData: {
    text?: string
    correctAnswer?: number
    answers?: QuestionAnswer[]
  }
): Thunk {
  return dispatch => {
    dispatch(changeQuestionAction(questionIndex, questionData))
  }
}

export function clearEditor(): Thunk {
  return dispatch => {
    dispatch(clearEditorAction())
  }
}
