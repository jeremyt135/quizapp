import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/register.css'

const Register = () => {
  return (
    <section class='register container-fluid'>
      <div class='col-md-6 mx-auto'>
        <div className='register__form'>
          <h2 class='text-center mb-4'>Register an account:</h2>
          <form class='mb-3'>
            <fieldset class='form-group'>
              <input
                type='text'
                className='form-control mb-2'
                id='registerUsername'
                placeholder='Username'
                required
              />
              <input
                type='password'
                className='form-control mb-2'
                id='registerPassword'
                placeholder='Password'
                required
              />
              <input
                type='password'
                className='form-control'
                id='registerConfirmPassword'
                placeholder='Confirm Password'
                required
              />
            </fieldset>
            <input class='btn btn-primary' type='submit' value='Register' />
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
