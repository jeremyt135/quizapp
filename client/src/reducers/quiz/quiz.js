import ActionTypes from '../../actions/types'

export const quiz = (
  state = { data: null, error: null, loading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.Quiz.CREATE_QUIZ:
    case ActionTypes.Quiz.POST_EDITED_QUIZ:
    case ActionTypes.Quiz.POST_ANSWERS:
      return {
        data: null,
        error: null,
        loading: true
      }
    case ActionTypes.Quiz.CREATE_QUIZ_ERROR:
    case ActionTypes.Quiz.POST_EDITED_QUIZ_ERROR:
    case ActionTypes.Quiz.EDIT_QUIZ_ERROR:
    case ActionTypes.Quiz.LOAD_QUIZ_ERROR:
      return {
        data: null,
        error: { ...action.data },
        loading: false
      }
    case ActionTypes.Quiz.LOAD_QUIZ:
      return {
        data: { ...action.data },
        error: null,
        loading: false
      }
    case ActionTypes.Quiz.CLEAR_QUIZ:
      return {
        data: null,
        error: null,
        loading: true
      }
    case ActionTypes.Quiz.POST_ANSWERS_ERROR:
      return {
        data: state.data,
        error: { ...action.data },
        loading: false
      }
    default:
      return state
  }
}
