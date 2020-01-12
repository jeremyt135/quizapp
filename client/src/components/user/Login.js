import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../styles/login.css'

import PropTypes from 'prop-types'

import { login } from '../../actions/user/auth'
import { useFormData } from '../util/useFormData'

const Login = ({ isAuthenticated, login }) => {
  const [formData, handleChange] = useFormData({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onSubmit = e => {
    e.preventDefault()
    login(username, password)
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='login container-fluid'>
      <div className='col-md-6 mx-auto'>
        <div className='login__form'>
          <h2 className='text-center mb-4'>Sign in:</h2>
          <form className='mb-3' onSubmit={onSubmit}>
            <fieldset className='form-group'>
              <input
                type='text'
                className='form-control mb-2'
                name='username'
                value={username}
                onChange={handleChange}
                placeholder='Username'
                required
              />
              <input
                type='password'
                className='form-control'
                name='password'
                value={password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
            </fieldset>
            <input className='btn btn-primary' type='submit' value='Login' />
          </form>
          <p>
            Don't have an account? <Link to='register'>Register</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
