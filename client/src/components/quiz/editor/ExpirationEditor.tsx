import React from 'react'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'

import { isDateInFuture } from 'util/date'

import DateTimePicker from 'components/common/DateTimePicker'

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
        <Row>
          <Col>
            <label htmlFor="expirationEditor">Expires on:</label>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <DateTimePicker
              id={'expirationEditor'}
              defaultValue={defaultValue}
              minValue={minExpiration}
              onChange={onChange}
              validate={isDateValid}
              errorStr={'Expiration date must be in the future.'}
            />
            <small className="text-muted">Click to change date and time</small>
          </Col>
        </Row>
      </>
    )
  },
  () => true
)

export default ExpirationEditor
