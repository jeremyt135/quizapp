import {
  Alert,
  SET_ALERT,
  CLEAR_ALERT,
  AlertActionTypes,
  AlertId
} from './types'

export function setAlert(alert: Alert): AlertActionTypes {
  return {
    type: SET_ALERT,
    payload: alert
  }
}
export function clearAlert(alertId: AlertId): AlertActionTypes {
  return {
    type: CLEAR_ALERT,
    id: alertId
  }
}
