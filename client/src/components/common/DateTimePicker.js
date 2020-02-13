import React, { useEffect, useRef, useState } from 'react'

import flatpickr from 'flatpickr'
import PropTypes from 'prop-types'

import moment from 'moment'

// Format string accepted by flatpickr for displaying the date
const flatpickrFormat = 'm-d-Y h:i K'
// Moment format string that is analogous to the flatpickr format
const momentFormat = 'MM-DD-YYYY h:mm A'

/**
 * Displays an input for the user to select a date and time.
 * @param {object} props
 * @param {string} props.id String to use as HTML id value
 * @param {string} props.defaultValue Default date to display
 * @param {string} props.minValue Minimum allowed date
 * @param {function} props.onChange Function to call with updated date
 */
const DateTimePicker = React.memo(
  ({ id, defaultValue, minValue, onChange, validate, errorStr }) => {
    const [dateTime, setDateTime] = useState(
      moment(defaultValue).format(momentFormat)
    )

    const inputRef = useRef(null)
    useEffect(() => {
      const datePicker = flatpickr(inputRef.current, {
        dateFormat: flatpickrFormat,
        defaultDate: dateTime,
        minDate: moment(minValue).format(momentFormat),
        enableTime: true,
        time_24hr: false,
        minuteIncrement: 1,
        onClose: (_, dateStr) => {
          setDateTime(dateStr)
          onChange(moment(dateStr, momentFormat).toISOString())
        }
      })
      return () => datePicker.destroy()
    }, [])

    const isValid = validate(moment(dateTime, momentFormat).toISOString())
    return (
      <>
        <input
          type='text'
          className={
            'form-control date-time-picker' + (!isValid ? ' is-invalid' : '')
          }
          id={id}
          placeholder='Select date and time'
          ref={inputRef}
          readOnly={true}
        />
        {!isValid ? (
          <div className='invalid-feedback'>
            {errorStr || 'Date is invalid.'}
          </div>
        ) : null}
      </>
    )
  }
)

DateTimePicker.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  minValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  errorStr: PropTypes.string
}

export default DateTimePicker
