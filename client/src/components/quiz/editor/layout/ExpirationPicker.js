import React from 'react'
import PropTypes from 'prop-types'

import DateTimePicker from '../../../common/DateTimePicker'

const ExpirationPicker = ({ defaultValue, onChange }) => {
  return (
    <>
      <div className='row'>
        <div className='col'>
          <label htmlFor='expirationPicker'>Expires on:</label>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <DateTimePicker
            label={'Expires on:'}
            id={'expirationPicker'}
            defaultValue={defaultValue}
            minValue={new Date().toISOString()}
            onChange={onChange}
          />
          <small className='text-muted'>Click to change date and time</small>
        </div>
      </div>
    </>
  )
}

ExpirationPicker.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ExpirationPicker
