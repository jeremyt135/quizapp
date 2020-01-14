import ActionTypes from '../../actions/types'

export const quizList = (state = { loading: true, quizzes: null }, action) => {
  switch (action.type) {
    case ActionTypes.Quiz.LOAD_QUIZ_LIST:
      return {
        loading: false,
        quizzes: [...action.data]
      }
    case ActionTypes.Quiz.LOAD_QUIZ_LIST_ERROR:
      return {
        loading: true,
        quizzes: null
      }
    default:
      return state
  }
}
