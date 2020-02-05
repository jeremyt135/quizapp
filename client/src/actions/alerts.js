import { Alerts } from './types'
import uuidv4 from 'uuid/v4'

const SECONDS_TO_MS = 1000
const TIME_ON_SCREEN = 3 * SECONDS_TO_MS

export const setAlert = ({ msg, type }) => dispatch => {
  const id = uuidv4()
  dispatch({
    type: Alerts.SET_ALERT,
    data: {
      id,
      msg,
      type
    }
  })
  setTimeout(
    () =>
      dispatch({
        type: Alerts.CLEAR_ALERT,
        data: id
      }),
    TIME_ON_SCREEN
  )
}
