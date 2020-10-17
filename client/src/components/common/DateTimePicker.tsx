import React, { useEffect, useRef, useState } from 'react'

import flatpickr from 'flatpickr'

import moment from 'moment'

// Format string accepted by flatpickr for displaying the date
const flatpickrFormat = 'm-d-Y h:i K'
// Moment format string that is analogous to the flatpickr format
const momentFormat = 'MM-DD-YYYY h:mm A'

type Props = {
  id: string
  defaultValue: string
  minValue: string
  onChange: (date: string) => void
  validate: (date: string) => boolean
  errorStr: string
}

/**
 * Displays an input for the user to select a date and time.
 */
const DateTimePicker = React.memo(
  ({ id, defaultValue, minValue, onChange, validate, errorStr }: Props) => {
    const [dateTime, setDateTime] = useState(
      moment(defaultValue).format(momentFormat)
    )

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
      const datePicker = flatpickr(inputRef.current!, {
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
          type="text"
          className={
            'form-control date-time-picker' + (!isValid ? ' is-invalid' : '')
          }
          id={id}
          placeholder="Select date and time"
          ref={inputRef}
          readOnly={true}
        />
        {!isValid ? (
          <div className="invalid-feedback">
            {errorStr || 'Date is invalid.'}
          </div>
        ) : null}
      </>
    )
  }
)

export default DateTimePicker
