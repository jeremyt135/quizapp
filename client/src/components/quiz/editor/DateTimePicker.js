import React, { useEffect, useRef, useState } from 'react'

import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import PropTypes from 'prop-types'

import '../../../styles/datepicker.css'
import moment from 'moment'

// Format string accepted by flatpickr for displaying the date
const flatpickrFormat = 'm-d-Y h:i K'
// Moment format string that is analogous to the flatpickr format
const momentFormat = 'MM-DD-YYYY h:mm A'

/**
 * Displays an input for the user to select a date and time.
 */
const DateTimePicker = ({ label, defaultValue, minValue, setQuizData }) => {
  const [dateTime, setDateTime] = useState(moment(defaultValue))

  const inputRef = useRef(null)

  useEffect(() => {
    const datePicker = flatpickr(inputRef.current, {
      dateFormat: flatpickrFormat,
      defaultDate: dateTime.format(momentFormat).toString(),
      minDate: moment(minValue)
        .format(momentFormat)
        .toString(),
      enableTime: true,
      minuteIncrement: 1,
      onClose: (_, dateStr) => {
        setQuizData({ expiresIn: moment(dateStr, momentFormat).toISOString() })
        setDateTime(moment(dateStr, momentFormat))
      }
    })
    return () => datePicker.destroy()
  })
  return (
    <div className='row mb-4'>
      <div className='col'>
        <div className='row'>
          <div className='col'>
            <label htmlFor='dateTimePicker'>
              {(label || 'Pick a date and time') + ':'}
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input
              type='text'
              className='form-control'
              id='dateTimePicker'
              placeholder='Select date and time'
              ref={inputRef}
              readOnly={true}
            />
            <small className='text-muted'>Click to change date and time</small>
          </div>
        </div>
      </div>
    </div>
  )
}

DateTimePicker.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  minValue: PropTypes.string.isRequired,
  setQuizData: PropTypes.func.isRequired
}

export default DateTimePicker
