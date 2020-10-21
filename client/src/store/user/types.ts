import { ID } from 'api'

export type UserError = { status: number; errors: any[] }

export interface User {
  _id: string
  date: string
  username: string
  email: string
  quizzes: ID[]
  results: ID[]
}

export interface UserState {
  loading: boolean
  user: User | null
  error: UserError | null
}

// User data received from server, contained in action data
export const LOAD_USER = 'LOAD_USER'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'
// User has changed their email or password
export const CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL'
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD'
export const CHANGE_USER_INFO_ERROR = 'CHANGE_USER_INFO_ERROR'
// User deleted
export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR'
// User deletes one of their quizzes
export const DELETE_QUIZ = 'DELETE_QUIZ'
export const DELETE_QUIZ_ERROR = 'DELETE_QUIZ_ERROR'
// Log the user out
export const LOGOUT = 'LOGOUT'

interface LoadUserAction {
  type: typeof LOAD_USER
  payload: User
}

interface LoadUserErrorAction {
  type: typeof LOAD_USER_ERROR
  payload: UserError
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface DeleteQuizAction {
  type: typeof DELETE_QUIZ
  payload: ID
}

interface DeleteQuizErrorAction {
  type: typeof DELETE_QUIZ_ERROR
  payload: UserError
}

interface ChangeUserPasswordAction {
  type: typeof CHANGE_USER_PASSWORD
}

interface ChangeUserEmailAction {
  type: typeof CHANGE_USER_EMAIL
  payload: string
}

interface ChangeUserInfoErrorAction {
  type: typeof CHANGE_USER_INFO_ERROR
  payload: UserError
}

interface DeleteUserAction {
  type: typeof DELETE_USER
}

interface DeleteUserErrorAction {
  type: typeof DELETE_USER_ERROR
  payload: UserError
}

export type UserActionTypes =
  | LoadUserAction
  | LoadUserErrorAction
  | LogoutAction
  | DeleteQuizAction
  | DeleteQuizErrorAction
  | ChangeUserEmailAction
  | ChangeUserPasswordAction
  | ChangeUserInfoErrorAction
  | DeleteUserAction
  | DeleteUserErrorAction
