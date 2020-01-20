import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../../actions/user/user'

const Navbar = ({ isAuthenticated, logout }) => {
  const history = useHistory()

  const logoutToHome = () => {
    logout()
    history.push('/')
  }
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
        <ul className='navbar-nav ml-auto'>
          {isAuthenticated ? (
            <>
              <li>
                <Link className='nav-item nav-link' to='/quizzes/create'>
                  Create
                </Link>
              </li>
              <li>
                <Link className='nav-item nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className='btn btn-link nav-item nav-link text-left'
                  onClick={logoutToHome}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className='nav-item nav-link' to='/login'>
                  Login
                </Link>
              </li>
              <li>
                <Link className='nav-item nav-link' to='/register'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)
