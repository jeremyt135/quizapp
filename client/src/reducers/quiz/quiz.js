import ActionTypes from '../../actions/types'

export const quiz = (
  state = { data: null, errors: null, loading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.Quiz.CREATE_QUIZ:
    case ActionTypes.Quiz.POST_EDITED_QUIZ:
      return {
        data: null,
        errors: null,
        loading: true
      }
    case ActionTypes.Quiz.CREATE_QUIZ_ERROR:
    case ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR:
    case ActionTypes.Quiz.EDIT_QUIZ_ERROR:
    case ActionTypes.Quiz.LOAD_QUIZ_ERROR:
    case ActionTypes.Quiz.CLEAR_QUIZ:
      return {
        data: null,
        errors: [], // TODO
        loading: true
      }
    case ActionTypes.Quiz.LOAD_QUIZ:
    case ActionTypes.Quiz.EDIT_QUIZ:
      return {
        data: { ...action.data },
        errors: null,
        loading: false
      }
    default:
      return state
  }
}
