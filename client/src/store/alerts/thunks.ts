import { Thunk } from '../store'
import { setAlert, clearAlert } from './actions'
import { Alert } from './types'
import { v4 as uuidv4 } from 'uuid'

const SECONDS_TO_MS = 1000
const TIME_ON_SCREEN = 3 * SECONDS_TO_MS

export function createAlert(alert: Alert): Thunk<Promise<void>> {
  return async dispatch => {
    const id = uuidv4()
    dispatch(setAlert({ id, ...alert }))
    setTimeout(() => dispatch(clearAlert(id)), TIME_ON_SCREEN)
  }
}
