import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import { logout } from 'store/user/thunks'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatch = {
  logout
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays the top navigation bar for the site, which is persistent across pages
 * @param {object} props
 * @param {bool} props.isAuthenticated True if user is logged in and authenticated
 * @param {function} props.logout Function to call to log user out
 */
const Navbar = ({ isAuthenticated, logout }: Props) => {
  const history = useHistory()

  const logoutToHome = () => {
    logout()
    history.push('/')
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <Link className="navbar-brand" to="/">
        QuizNow
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navMenu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li>
                <Link className="nav-item nav-link" to="/quizzes/create">
                  Create
                </Link>
              </li>
              <li>
                <Link className="nav-item nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-link nav-item nav-link text-left"
                  onClick={logoutToHome}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-item nav-link" to="/register">
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

export default connector(Navbar)
