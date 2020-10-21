import React from 'react'
import DateTimePicker from 'components/common/DateTimePicker'
import { isDateInFuture } from 'util/date'
import moment from 'moment'

type Props = {
  defaultValue: string
  onChange: (exp: string) => void
  editing: boolean
}

const ExpirationEditor = React.memo(
  ({ defaultValue, onChange, editing }: Props) => {
    const minExpiration = !editing ? moment().toISOString() : defaultValue

    const isDateValid = (date: string) =>
      (editing && date === defaultValue) || isDateInFuture(date)

    return (
      <>
        <div className="row">
          <div className="col">
            <label htmlFor="expirationEditor">Expires on:</label>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <DateTimePicker
              id={'expirationEditor'}
              defaultValue={defaultValue}
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

export default ExpirationEditor
