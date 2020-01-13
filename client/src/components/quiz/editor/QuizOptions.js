import React from 'react'
import PropTypes from 'prop-types'

const QuizOptions = ({ options, handleChange }) => {
  const { isPublic, allowedUsers, expiration } = options
  return (
    <form>
      <div className='row mb-4'>
        <div className='col d-flex align-items-center'>
          <div className='custom-control custom-switch'>
            <input
              type='checkbox'
              className='custom-control-input'
              name='isPublic'
              id='isPublicCheckbox'
              checked={isPublic}
              onChange={handleChange}
            />
            <label className='custom-control-label' htmlFor='isPublicCheckbox'>
              Public Quiz
            </label>
          </div>
        </div>
      </div>
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
                name='allowedUsers'
                id='allowedUsersInput'
                value={allowedUsers}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <label htmlFor='expirationPicker'>Expires on:</label>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <input
                className='form-control'
                type='datetime-local'
                name='expiration'
                id='expirationPicker'
                value={expiration}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

QuizOptions.propTypes = {
  options: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default QuizOptions
