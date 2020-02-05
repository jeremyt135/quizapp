import { Alerts } from '../actions/types'

/**
 * Alerts reducer
 * @param {[{ id: string, msg: string, type: string }]} state Array of alert objects
 */
export const alerts = (state = [], action) => {
  switch (action.type) {
    case Alerts.SET_ALERT:
      return [...state, action.data]
    case Alerts.CLEAR_ALERT:
      return state.filter(alert => alert.id !== action.data)
    default:
      return state
  }
}
