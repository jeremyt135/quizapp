import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/login.css'

const Login = () => {
  return (
    <section class='login container-fluid'>
      <div class='col-md-6 mx-auto'>
        <div className='login__form'>
          <h2 class='text-center mb-4'>Sign in:</h2>
          <form class='mb-3'>
            <fieldset class='form-group'>
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
            <input class='btn btn-primary' type='submit' value='Login' />
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
