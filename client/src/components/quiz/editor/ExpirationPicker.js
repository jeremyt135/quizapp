import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DateTimePicker from '../../common/DateTimePicker'
import { changeExpiration } from '../../../store/editor/thunks'

import moment from 'moment'

/**
 * Determines if date is in the future or the same as the default value
 * @param {string} dateTimeStr
 * @param {string} defaultDateTime
 * @returns {boolean}
 */
const isDateInFuture = dateTimeStr => moment(dateTimeStr).diff(moment()) >= 0

const ExpirationPicker = React.memo(
  ({ defaultExpiration, changeExpiration, editing }) => {
    const minExpiration = !editing
      ? new Date().toISOString()
      : defaultExpiration

    const isDateValid = dateStr =>
      (editing && dateStr === defaultExpiration) || isDateInFuture(dateStr)

    const onChange = dateStr => {
      changeExpiration(dateStr)
    }

    return (
      <>
        <div className="row">
          <div className="col">
            <label htmlFor="expirationPicker">Expires on:</label>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <DateTimePicker
              label={'Expires on:'}
              id={'expirationPicker'}
              defaultValue={defaultExpiration}
              minValue={minExpiration}
              onChange={onChange}
              validate={isDateValid}
              errorStr={'Expiration date must be in the future.'}
            />
            <small className="text-muted">Click to change date and time</small>
          </div>
        </div>
      </>
    )
  },
  () => true
)

ExpirationPicker.propTypes = {
  defaultExpiration: PropTypes.string,
  changeExpiration: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  defaultExpiration: state.editor.quiz.expiration,
  editing: state.editor.editing
})

export default connect(mapStateToProps, { changeExpiration })(ExpirationPicker)
