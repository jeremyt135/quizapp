import {
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
    case DELETE_USER_ERROR:
    case LOAD_USER_ERROR:
      return { loading: true, user: null, error: action.payload }
    case LOGOUT:
      return { loading: true, user: null, error: null }
    default:
      return state
  }
}
