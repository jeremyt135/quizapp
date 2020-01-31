import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AnswerText = ({ text, error, placeholder, onChange }) => {
  const isValid = text.length !== 0
  const shouldDisplayWarning = error && error.status === 400 && !isValid
  return (
    <div className='row mb-1'>
      <div className='col'>
        <input
          type='text'
          className={
            'form-control form-control-sm' +
            (shouldDisplayWarning ? ' is-invalid' : '')
          }
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

AnswerText.propTypes = {
  text: PropTypes.string.isRequired,
  error: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(AnswerText)
