import React from 'react'
import {
  Redirect,
  Route,
  RouteProps,
  useLocation,
  useParams
} from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import QuizAnswerForm from 'components/quiz/answerform/QuizAnswerForm'
import QuizResultList from 'components/quiz/result/QuizResultList'

import { RootState } from 'store/store'
import { UserState } from 'store/user/types'
import { clearAuth } from 'store/auth/thunks'
import { tokenIsExpired } from 'util/jwt'
import Spinner from 'components/common/Spinner'

const mapState = (state: RootState) => ({
  user: state.user,
  auth: state.auth
})

const mapDispatch = {
  clearAuth
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector> &
  RouteProps & {
    component?: never
    render?: never
  }

const Component: React.FC<{ user: UserState; isAuthenticated: boolean }> = ({
  user,
  isAuthenticated
}) => {
  const location = useLocation()
  const { id: quizId } = useParams<{ id: string }>()

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { referrer: location.pathname } }}
      />
    )
  } else if (user.loading) {
    return <Spinner />
  } else if (user.user && user.user.quizzes.some(id => id === quizId)) {
    return <QuizResultList />
  } else {
    return <QuizAnswerForm />
  }
}

/**
 * Handles redirection to a Quiz answer form or the results page depending
 * on the logged in user
 */
const QuizRoute = ({ user, auth, clearAuth, ...rest }: Props) => {
  let isAuthenticated = auth.isAuthenticated

  if (auth.token == null || tokenIsExpired(auth.token)) {
    clearAuth()
    isAuthenticated = false
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} user={user} isAuthenticated={isAuthenticated} />
      )}
    />
  )
}

export default connector(QuizRoute)
