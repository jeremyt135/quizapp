import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'

import PropTypes from 'prop-types'

import Spinner from '../common/Spinner'
import { clearAuth } from '../../actions/auth'

const tokenIsExpired = token => {
  const decoded = jwt.decode(token)
  if (!decoded) {
    return true
  }
  const { exp: expiration } = decoded
  const now = Math.floor(new Date().getTime() / 1000)
  return expiration < now
}

const PrivateRoute = ({
  auth,
  user,
  clearAuth,
  component: Component,
  ...rest
}) => {
  let isAuthenticated = auth.isAuthenticated

  if (tokenIsExpired(auth.token)) {
    clearAuth()
    isAuthenticated = false
  }
  const render = props => {
    if (!isAuthenticated) {
      return <Redirect to='/login' />
    } else if (user.loading) {
      return <Spinner />
    } else {
      return <Component {...props} />
    }
  }
  return <Route {...rest} render={render} />
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
  clearAuth: PropTypes.func.isRequired,
  component: PropTypes.elementType.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, { clearAuth })(PrivateRoute)
