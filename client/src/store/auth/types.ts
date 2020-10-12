export type Token = string

export interface AuthState {
  token: Token | null
  isAuthenticated: boolean
}

export interface UserRegistration {
  username: string
  email: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}

// User has successfully registered or logged in and is authenticated
export const AUTH_USER = 'AUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'

// Catch-all clear current auth data (usually after user logout/delete)
export const CLEAR_AUTH = 'CLEAR_AUTH'

interface SetAuthAction {
  type: typeof AUTH_USER | typeof AUTH_ERROR
  payload?: Token
}

interface ClearAuthAction {
  type: typeof CLEAR_AUTH
}

export type AuthActionTypes = SetAuthAction | ClearAuthAction
