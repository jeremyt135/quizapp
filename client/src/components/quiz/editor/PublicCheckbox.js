import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Displays a checkbox for user to toggle isPublic value of the quiz.
 */
const PublicCheckbox = ({ defaultValue, setQuizData }) => {
  const [checked, handleChange] = useFormData({ value: defaultValue })
  const onChange = e => {
    handleChange(e)
    setQuizData({ isPublic: e.target.checked })
  }

  return (
    <div className='row mb-4'>
      <div className='col d-flex align-items-center'>
        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            name='value'
            id='isPublicCheckbox'
            checked={checked.value}
            onChange={onChange}
          />
          <label className='custom-control-label' htmlFor='isPublicCheckbox'>
            Public Quiz
          </label>
        </div>
      </div>
    </div>
  )
}

PublicCheckbox.propTypes = {
  defaultValue: PropTypes.bool.isRequired,
  setQuizData: PropTypes.func.isRequired
}

export default PublicCheckbox
