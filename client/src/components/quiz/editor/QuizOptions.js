import React from 'react'
import PropTypes from 'prop-types'

import DateTimePicker from './DateTimePicker'

import { useFormData } from '../../util/useFormData'

/**
 * Displays and controls editing of quiz options.
 */
const QuizOptions = ({ defaultOptions, setOptions }) => {
  const [formData, handleChange] = useFormData({ ...defaultOptions })
  const { isPublic, allowedUsers, expiresIn } = formData

  const setDate = dateStr => {
    setOptions({ ...formData, expiresIn: dateStr })
  }

  const onChange = e => {
    handleChange(e)
    setOptions({ ...formData })
  }

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
              onChange={onChange}
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
                onChange={onChange}
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
              <DateTimePicker defaultDate={expiresIn} setDate={setDate} />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

QuizOptions.propTypes = {
  defaultOptions: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired
}

export default QuizOptions
