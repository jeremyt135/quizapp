import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class='navbar navbar-expand-md navbar-light bg-light'>
      <Link class='navbar-brand' to='/'>
        Quiz Maker
      </Link>
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navMenu'>
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navMenu'>
        <div class='navbar-nav ml-auto'>
          <Link class='nav-item nav-link' to='/quiz/public'>
            Browse
          </Link>
          <Link class='nav-item nav-link' to='/login'>
            Login
          </Link>
          <Link class='nav-item nav-link' to='/register'>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
