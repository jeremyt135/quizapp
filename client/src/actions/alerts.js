import { Alerts } from './types'
import uuidv4 from 'uuid/v4'

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
    5 * 1000 // remove after a few seconds
  )
}
