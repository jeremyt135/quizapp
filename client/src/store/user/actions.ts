import {
  CHANGE_USER_INFO,
  CHANGE_USER_INFO_ERROR,
  DELETE_QUIZ,
  DELETE_QUIZ_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  LOAD_USER,
  LOAD_USER_ERROR,
  LOGOUT,
  User,
  UserActionTypes,
  UserError
} from './types'

export function loadUser(user: User): UserActionTypes {
  return {
    type: LOAD_USER,
    payload: user
  }
}

export function loadUserError(error: UserError): UserActionTypes {
  return {
    type: LOAD_USER_ERROR,
    payload: error
  }
}

export function logoutUser(): UserActionTypes {
  return {
    type: LOGOUT
  }
}

export function deleteQuiz(): UserActionTypes {
  return {
    type: DELETE_QUIZ
  }
}

export function deleteQuizError(error: UserError): UserActionTypes {
  return {
    type: DELETE_QUIZ_ERROR,
    payload: error
  }
}

export function changeUserInfo(): UserActionTypes {
  return {
    type: CHANGE_USER_INFO
  }
}

export function changeUserInfoError(error: UserError): UserActionTypes {
  return {
    type: CHANGE_USER_INFO_ERROR,
    payload: error
  }
}

export function deleteUser(): UserActionTypes {
  return {
    type: DELETE_USER
  }
}

export function deleteUserError(error: UserError): UserActionTypes {
  return {
    type: DELETE_USER_ERROR,
    payload: error
  }
}
