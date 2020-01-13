import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Parses allowed users from a comma-separated string.
 * @param {string} str Comma-separated string of valid usernames
 */
const parseAllowedUsers = str => {
  const users = str.split(/\s*,+\s*,*/).filter(s => s)
  if (
    users.length > 0 &&
    users.every(username => /^[a-zA-Z0-9]{5,}$/.test(username))
  ) {
    return users
  }
  return null
}

/**
 * Displays a text input for the user to input a list of allowed users
 */
const AllowedUsers = ({ setQuizData }) => {
  const [input, handleChange] = useFormData({ value: '' })

  const onChange = e => {
    handleChange(e)
    const inputString = e.target.value
    const allowedUsers = parseAllowedUsers(e.target.value)
    if (inputString) {
      if (allowedUsers) {
        setQuizData({ allowedUsers })
      } else {
        // some warning
      }
    } else {
      setQuizData({ allowedUsers: [] })
    }
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
              className='form-control'
              type='text'
              placeholder='User1, User2, ...'
              name='value'
              id='allowedUsersInput'
              value={input.value}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

AllowedUsers.propTypes = {
  setQuizData: PropTypes.func.isRequired
}

export default AllowedUsers
