import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const QuestionText = ({ text, error, id, placeholder, onChange }) => {
  const isValid = text.length !== 0
  const shouldDisplayWarning = error && error.status === 400 && !isValid
  return (
    <div className='row mb-2'>
      <div className='col'>
        <input
          type='text'
          className={
            'form-control' + (shouldDisplayWarning ? ' is-invalid' : '')
          }
          id={id}
          onChange={onChange}
          value={text}
          placeholder={placeholder}
          minLength={1}
        />
        {shouldDisplayWarning ? (
          <div className='invalid-feedback'>
            Please enter at least one character.
          </div>
        ) : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.editor.error
})

QuestionText.propTypes = {
  text: PropTypes.string.isRequired,
  error: PropTypes.object,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(QuestionText)
