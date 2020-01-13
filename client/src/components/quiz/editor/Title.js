import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Displays a form for user to input title of a quiz
 */
const Title = ({ defaultValue, setQuizData }) => {
  const [title, handleChange] = useFormData({ text: defaultValue })
  const onChange = e => {
    handleChange(e)
    setQuizData({ title: e.target.value })
  }
  return (
    <>
      <div className='row'>
        <div className='col'>
          <label htmlFor='title'>Quiz title:</label>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <input
            type='text'
            className='form-control form-control-lg mb-0'
            name='text'
            value={title.text}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  )
}

Title.propTypes = {
  defaultValue: PropTypes.string.isRequired
}

export default Title
