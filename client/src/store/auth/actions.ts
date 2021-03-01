import { AuthActionTypes, AUTH_USER, CLEAR_AUTH, Token } from './types'

export function setAuthUser(token: Token): AuthActionTypes {
  return {
    type: AUTH_USER,
    payload: token
  }
}

export function clearAuthUser(): AuthActionTypes {
  return {
    type: CLEAR_AUTH
  }
}
