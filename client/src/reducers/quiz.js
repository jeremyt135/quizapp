import { Quiz } from '../actions/types'

export const quiz = (
  state = { error: null, quiz: null, loading: true },
  action
) => {
  switch (action.type) {
    case Quiz.POST_ANSWERS:
      return {
        error: null,
        loading: true,
        quiz: null
      }
    case Quiz.LOAD_QUIZ:
      return {
        error: null,
        loading: false,
        quiz: action.data
      }
    case Quiz.LOAD_QUIZ_ERROR:
    case Quiz.POST_ANSWERS_ERROR:
      return {
        error: action.data,
        loading: false,
        quiz: null
      }

    case Quiz.CLEAR_QUIZ:
      return {
        error: null,
        loading: true,
        quiz: null
      }
    default:
      return state
  }
}
