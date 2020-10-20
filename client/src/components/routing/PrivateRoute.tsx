import React from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import Spinner from '../common/Spinner'
import { clearAuth } from '../../store/auth/thunks'

import { tokenIsExpired } from 'util/jwt'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  auth: state.auth,
  user: state.user
})

const mapDispatch = {
  clearAuth
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector> &
  RouteProps & {
    component: React.ComponentType
    render?: never
  }

const PrivateRoute = function ({
  auth,
  user,
  clearAuth,
  component: Component,
  ...rest
}: Props) {
  const location = useLocation()
  let isAuthenticated = auth.isAuthenticated

  if (auth.token == null || tokenIsExpired(auth.token)) {
    clearAuth()
    isAuthenticated = false
  }

  const render = (props: any) => {
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{ pathname: '/login', state: { referrer: location.pathname } }}
        />
      )
    } else if (user.loading) {
      return <Spinner />
    } else {
      return <Component {...props} />
    }
  }
  return <Route {...rest} render={render} />
}

export default connector(PrivateRoute)
