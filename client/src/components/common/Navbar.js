import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light'>
      <Link className='navbar-brand' to='/'>
        Quiz Maker
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navMenu'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navMenu'>
        <div className='navbar-nav ml-auto'>
          <Link className='nav-item nav-link' to='/quiz/public'>
            Browse
          </Link>
          {isAuthenticated ? (
            <Link className='nav-item nav-link' to='/dashboard'>
              Dashboard
            </Link>
          ) : (
            <>
              <Link className='nav-item nav-link' to='/login'>
                Login
              </Link>
              <Link className='nav-item nav-link' to='/register'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Navbar)
