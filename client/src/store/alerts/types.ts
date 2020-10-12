export type AlertId = string

export interface Alert {
  id?: AlertId
  msg: string
  type: string // success, failure, etc - not to be confused with reducer types
}

export type AlertState = Alert[]

export const SET_ALERT = 'SET_ALERT'
export const CLEAR_ALERT = 'CLEAR_ALERT'

interface SetAlertAction {
  type: typeof SET_ALERT
  payload: Alert
}

interface ClearAlertAction {
  type: typeof CLEAR_ALERT
  id: AlertId
}

export type AlertActionTypes = SetAlertAction | ClearAlertAction
