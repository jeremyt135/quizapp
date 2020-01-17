import ActionTypes from '../../actions/types'

export const quiz = (state = { quiz: null, errors: null }, action) => {
  switch (action.type) {
    case ActionTypes.Quiz.CREATE_QUIZ:
    case ActionTypes.Quiz.POST_EDITED_QUIZ:
      return {
        quiz: null,
        errors: null
      }
    case ActionTypes.Quiz.CREATE_QUIZ_ERROR:
    case ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR:
    case ActionTypes.Quiz.EDIT_QUIZ_ERROR:
      return {
        quiz: null,
        errors: [] // TODO
      }
    case ActionTypes.Quiz.EDIT_QUIZ:
      return {
        quiz: { ...action.data },
        errors: null
      }
    default:
      return state
  }
}
