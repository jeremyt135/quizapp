import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import DateTimePicker from './DateTimePicker'
import moment from 'moment'

const momentFormat = 'MM-DD-YYYY h:mm A'

describe('DateTimePicker', () => {
  const now = moment().toISOString()
  const changeMock = jest.fn()
  const validateMock = jest.fn(() => true)
  const props = {
    defaultValue: now,
    minValue: now,
    onChange: changeMock,
    validate: validateMock,
    errorStr: 'The date is invalid'
  }

  beforeEach(() => {
    changeMock.mockClear()
    validateMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<DateTimePicker {...props} />)
  })

  it('calls the validate function', () => {
    render(<DateTimePicker {...props} />)
    expect(validateMock).toHaveBeenCalled()
  })

  it('displays the errorStr if date is invalid', () => {
    validateMock.mockReturnValueOnce(false)
    render(<DateTimePicker {...props} />)
    expect(screen.queryByText(props.errorStr)).not.toBeNull()
  })
})
