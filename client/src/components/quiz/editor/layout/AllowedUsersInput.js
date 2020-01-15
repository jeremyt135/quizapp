import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a text input for the user to input a list of allowed users
 */
const AllowedUsersInput = ({ defaultValue, onChange, isValid }) => {
  const allowedUserStr = defaultValue.join(',')
  const [value, setValue] = useState(allowedUserStr || '')

  const onInputChange = e => {
    setValue(e.target.value)
    onChange(e)
  }

  return (
    <div className='row mb-4'>
      <div className='col'>
        <div className='row'>
          <div className='col'>
            <label htmlFor='allowedUsersInput'>Allowed users:</label>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input
              className={'form-control' + (!isValid ? ' border-danger' : '')}
              type='text'
              placeholder='User1, User2, ...'
              name='value'
              id='allowedUsersInput'
              value={value}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

AllowedUsersInput.propTypes = {
  defaultValue: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired
}

export default AllowedUsersInput
