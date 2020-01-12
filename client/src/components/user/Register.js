import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/register.css'

import { useFormData } from '../util/useFormData'

const Register = () => {
  const [formData, handleChange] = useFormData({
    username: '',
    password: ''
  })

  return (
    <section className='register container-fluid'>
      <div className='col-md-6 mx-auto'>
        <div className='register__form'>
          <h2 className='text-center mb-4'>Register an account:</h2>
          <form className='mb-3'>
            <fieldset className='form-group'>
              <input
                type='text'
                className='form-control mb-2'
                id='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
                required
              />
              <input
                type='password'
                className='form-control mb-2'
                id='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
              <input
                type='password'
                className='form-control'
                id='confirm-password'
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

export default Register
