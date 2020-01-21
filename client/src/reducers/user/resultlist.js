import ActionTypes from '../../actions/types'

export const resultList = (state = { loading: true, results: [] }, action) => {
  switch (action.type) {
    case ActionTypes.Quiz.LOAD_RESULT_LIST:
      return {
        loading: false,
        results: [...action.data]
      }
    case ActionTypes.Quiz.LOAD_RESULT_LIST_ERROR:
    case ActionTypes.Quiz.CLEAR_RESULT_LIST:
      return {
        loading: true,
        results: []
      }
    default:
      return state
  }
}
