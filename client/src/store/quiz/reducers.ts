import {
  CLEAR_QUIZ,
  LOAD_QUIZ,
  LOAD_QUIZ_ERROR,
  POST_ANSWERS,
  POST_ANSWERS_ERROR,
  QuizActionTypes,
  QuizState
} from './types'

const initialState: QuizState = {
  loading: true,
  quiz: null,
  error: null
}

export function quizReducer(state = initialState, action: QuizActionTypes) {
  switch (action.type) {
    case POST_ANSWERS:
      return {
        error: null,
        loading: true,
        quiz: null
      }
    case POST_ANSWERS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case LOAD_QUIZ:
      return {
        error: null,
        loading: false,
        quiz: action.payload
      }
    case LOAD_QUIZ_ERROR:
      return {
        error: action.payload,
        loading: false,
        quiz: null
      }

    case CLEAR_QUIZ:
      return {
        error: null,
        loading: true,
        quiz: null
      }
    default:
      return state
  }
}
