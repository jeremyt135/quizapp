import {
  CHANGE_USER_EMAIL,
  CHANGE_USER_INFO_ERROR,
  CHANGE_USER_PASSWORD,
  DELETE_QUIZ,
  DELETE_USER_ERROR,
  LOAD_USER,
  LOAD_USER_ERROR,
  LOGOUT,
  UserActionTypes,
  UserState
} from './types'

const initialState: UserState = {
  loading: true,
  user: null,
  error: null
}

export function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case LOAD_USER:
      return {
        user: { ...action.payload },
        loading: false,
        error: null
      }
    case DELETE_QUIZ:
      const quizzes = state.user!.quizzes.filter(id => id !== action.payload)
      return {
        loading: false,
        error: null,
        user: { ...state.user!, quizzes }
      }
    case CHANGE_USER_EMAIL:
      return {
        loading: false,
        error: null,
        user: { ...state.user!, email: action.payload }
      }
    case CHANGE_USER_PASSWORD:
      return {
        loading: false,
        error: null,
        user: { ...state.user! }
      }
    case CHANGE_USER_INFO_ERROR:
    case DELETE_USER_ERROR:
    case LOAD_USER_ERROR:
      return { loading: true, user: null, error: action.payload }
    case LOGOUT:
      return { loading: true, user: null, error: null }
    default:
      return state
  }
}
