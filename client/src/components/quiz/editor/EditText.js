import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Displays and controls editing of a text input.
 */
const EditText = ({ editName, displayName, text, handleChange }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className='row mb-2'>
        <div className='col'>
          <input
            type='text'
            className='form-control form-control-lg mb-0'
            name={editName}
            value={text}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
      <div className='row mb-4'>
        {isEditing ? (
          <>
            <div className='col d-flex align-items-center justify-content-start'>
              <button
                type='button'
                className='btn btn-success btn-sm text-capitalize'
                onClick={() => setIsEditing(false)}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          <div className='col d-flex align-items-center justify-content-start'>
            <button
              type='button'
              className='btn btn-info btn-sm text-capitalize'
              onClick={() => setIsEditing(true)}>
              Edit {displayName}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

EditText.propTypes = {
  editName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default EditText
