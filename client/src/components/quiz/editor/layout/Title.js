import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ value, onChange }) => {
  const isValid = value.length !== 0
  return (
    <>
      <div className='row'>
        <div className='col'>
          <label htmlFor='quizTitle'>Quiz Title:</label>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <input
            type='text'
            className={
              'form-control form-control-lg mb-0 ' +
              (!isValid ? ' is-invalid' : '')
            }
            id='quizTitle'
            value={value}
            onChange={onChange}
            minLength={1}
          />
          {!isValid ? (
            <div className='invalid-feedback'>
              Please enter at least one character.
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

Title.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Title
