import React from 'react'
import PropTypes from 'prop-types'

const PublicCheckbox = ({ value, onChange }) => {
  return (
    <div className='row mb-4'>
      <div className='col d-flex align-items-center'>
        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='publicCheckbox'
            checked={value}
            onChange={onChange}
          />
          <label className='custom-control-label' htmlFor='publicCheckbox'>
            Public
          </label>
        </div>
      </div>
    </div>
  )
}

PublicCheckbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PublicCheckbox
