import React, { useEffect, useRef } from 'react'

import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import PropTypes from 'prop-types'

import '../../../styles/datepicker.css'
import moment from 'moment'

/**
 * Displays an input for the user to select a date and time.
 */
const DateTimePicker = ({ defaultDate, setDate }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    const date = moment(defaultDate)
    const dateDisplayFormat = 'm-d-Y h:i K'
    const dateValueFormat = 'MM-DD-YYYY h:mm A'
    const datePicker = flatpickr(inputRef.current, {
      dateFormat: dateDisplayFormat,
      defaultDate: date.format(dateValueFormat).toString(),
      defaultHour: date.hours(),
      defaultMinute: date.minutes(),
      enableTime: true,
      onClose: (_, dateStr) => {
        setDate(moment(dateStr, dateValueFormat).toISOString())
      }
    })
    return () => datePicker.destroy()
  })
  return (
    <>
      <input
        type='text'
        className='form-control'
        id='expirationPicker'
        placeholder='Select date and time'
        ref={inputRef}
        readOnly={true}
      />
      <small className='text-muted'>Click to change date and time</small>
    </>
  )
}

DateTimePicker.propTypes = {
  defaultDate: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired
}

export default DateTimePicker
