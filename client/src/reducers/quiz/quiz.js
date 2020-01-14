import ActionTypes from '../../actions/types'

export const quiz = (state = { errors: null }, action) => {
  switch (action.type) {
    case ActionTypes.Quiz.CREATE_QUIZ:
      return {
        errors: null
      }
    default:
      return state
  }
}