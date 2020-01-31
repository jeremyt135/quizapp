import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/login.scss'

import PropTypes from 'prop-types'

import { login } from '../../actions/auth'

const Login = ({ isAuthenticated, login }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const handleUsernameChange = e => {
    setUsernameError(null)
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPasswordError(null)
    setPassword(e.target.value)
  }

  const handleFailure = error => {
    if (error && error.status === 400) {
      for (const err of error.errors) {
        if (err.username) {
          setUsernameError(err.username)
        }
        if (err.password) {
          setPasswordError(err.password)
        }
      }
    }
  }
  const onSubmit = e => {
    e.preventDefault()
    setUsernameError(null)
    setPasswordError(null)
    login(username, password, handleFailure)
  }

  return (
    <div className='login container-fluid'>
      <div className='col-sm-8 mx-auto'>
        <div className='login__form'>
          <h2 className='text-center mb-4'>Sign in:</h2>
          <form className='mb-3' onSubmit={onSubmit}>
            <fieldset className='form-group'>
              <input
                type='text'
                className={
                  'form-control my-2' + (usernameError ? ' is-invalid' : '')
                }
                name='username'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Username'
                required
              />
              {usernameError ? (
                <div className='invalid-feedback'>{usernameError}</div>
              ) : null}
              <input
                type='password'
                className={
                  'form-control my-2' + (passwordError ? ' is-invalid' : '')
                }
                name='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Password'
                required
              />
              {passwordError ? (
                <div className='invalid-feedback'>{passwordError}</div>
              ) : null}
            </fieldset>
            <input className='btn btn-primary' type='submit' value='Login' />
          </form>
          <p>
            Don't have an account? <Link to='register'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loginError: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.error
})

export default connect(mapStateToProps, { login })(Login)
