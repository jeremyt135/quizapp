import ActionTypes from '../../actions/types'

export const quizList = (state = { loading: true, quizzes: [] }, action) => {
  switch (action.type) {
    case ActionTypes.Quiz.LOAD_QUIZ_LIST:
      return {
        loading: false,
        quizzes: [...action.data]
      }
    case ActionTypes.Quiz.LOAD_QUIZ_LIST_ERROR:
    case ActionTypes.Quiz.CLEAR_QUIZLIST:
      return {
        loading: true,
        quizzes: []
      }
    default:
      return state
  }
}
