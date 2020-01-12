import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../../styles/register.css'

import { register } from '../../actions/user/auth'
import { useFormData } from '../util/useFormData'

/**
 * Handles user registration through a form.
 */
const Register = ({ isAuthenticated, register }) => {
  const [formData, handleChange] = useFormData({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const { username, email, password, passwordConfirm } = formData

  const submitForm = e => {
    e.preventDefault()
    if (password === passwordConfirm) {
      register(username, email, password)
    }
  }

  return (
    <section className='register container-fluid'>
      <div className='col-md-6 mx-auto'>
        <div className='register__form'>
          <h2 className='text-center mb-4'>Register an account:</h2>
          <form className='mb-3' onSubmit={submitForm}>
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
                type='text'
                className='form-control mb-2'
                name='email'
                value={email}
                onChange={handleChange}
                placeholder='Email'
                required
              />
              <input
                type='password'
                className='form-control mb-2'
                name='password'
                value={password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
              <input
                type='password'
                className='form-control'
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={handleChange}
                placeholder='Confirm Password'
                required
              />
            </fieldset>
            <input className='btn btn-primary' type='submit' value='Register' />
          </form>
          <p>
            Already have an account? <Link to='/login'>Sign in</Link>
          </p>
        </div>
      </div>
    </section>
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
