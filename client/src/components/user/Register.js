import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../../styles/register.css'

import { register } from '../../actions/auth'

/**
 * Handles user registration through a form.
 */
const Register = ({ isAuthenticated, register }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    passwordConfirm: ''
  })
  const [formError, setFormError] = useState(null)

  const { password, passwordConfirm } = passwordInput

  const handleUsernameChange = e => {
    setFormError(prev => ({ ...prev, username: undefined }))
    setUsername(e.target.value)
  }

  const handleEmailChange = e => {
    setFormError(prev => ({ ...prev, email: undefined }))
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setFormError(prev => ({ ...prev, password: undefined }))
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const handleFailure = error => {
    console.log(error)
    if (error && (error.status === 400 || error.status === 409)) {
      for (const error of error.errors) {
        setFormError(prev => ({
          ...prev,
          ...error
        }))
      }
    }
  }

  const submitForm = e => {
    e.preventDefault()
    if (password === passwordConfirm) {
      setFormError({ password: undefined })
      register(username, email, password, handleFailure)
    } else {
      setFormError({
        password: 'Passwords do not match.'
      })
    }
  }

  return (
    <div className='register container-fluid'>
      <div className='col-md-6 mx-auto'>
        <div className='register__form'>
          <h2 className='text-center mb-4'>Register an account:</h2>
          <form className='mb-3' onSubmit={submitForm}>
            <fieldset className='form-group'>
              <input
                type='text'
                className={
                  'form-control mb-2' +
                  (formError && formError.username ? ' is-invalid' : '')
                }
                name='username'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username'
                minLength={5}
                required
              />
              {formError && formError.username ? (
                <div className='invalid-feedback'>
                  {formError && formError.username}
                </div>
              ) : null}
              <input
                type='text'
                className={
                  'form-control mb-2' +
                  (formError && formError.email ? ' is-invalid' : '')
                }
                name='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Email'
                required
              />
              {formError && formError.email ? (
                <div className='invalid-feedback'>
                  {formError && formError.email}
                </div>
              ) : null}
              <input
                type='password'
                className={
                  'form-control mb-2' +
                  (formError && formError.password ? ' is-invalid' : '')
                }
                name='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
                required
              />
              <input
                type='password'
                className={
                  'form-control' +
                  (formError && formError.password ? ' is-invalid' : '')
                }
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={handlePasswordChange}
                placeholder='Confirm Password'
                required
              />
              {formError && formError.password ? (
                <div className='invalid-feedback'>
                  {formError && formError.password}
                </div>
              ) : null}
            </fieldset>
            <input className='btn btn-primary' type='submit' value='Register' />
          </form>
          <p>
            Already have an account? <Link to='/login'>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  register
})(Register)
