import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/login.css'

const Login = () => {
  return (
    <section className='login container-fluid'>
      <div className='col-md-6 mx-auto'>
        <div className='login__form'>
          <h2 className='text-center mb-4'>Sign in:</h2>
          <form className='mb-3'>
            <fieldset className='form-group'>
              <input
                type='text'
                className='form-control mb-2'
                id='loginUsername'
                placeholder='Username'
                required
              />
              <input
                type='password'
                className='form-control'
                id='loginPassword'
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

export default Login
