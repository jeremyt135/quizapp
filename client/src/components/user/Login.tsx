import React, { useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'

import { Redirect, Link, useHistory } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import { login } from 'store/auth/thunks'
import { RootState } from 'store/store'
import { ApiError } from 'api'

const mapState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatch = {
  login
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const colSize = {
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4
}

const Login = ({ isAuthenticated, login }: Props) => {
  const history = useHistory<{ referrer: string }>()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError(null)
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(null)
    setPassword(e.target.value)
  }

  const handleFailure = (error: ApiError | null) => {
    if (error && error.status === 400) {
      for (const err of error.errors) {
        if (err.username) {
          setUsernameError(err.username)
        }
        if (err.password) {
          setPasswordError(err.password)
        }
      }
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsernameError(null)
    setPasswordError(null)
    login({ username, password }, handleFailure as (error: {} | null) => void)
  }

  if (isAuthenticated) {
    const { location } = history
    if (location.state && location.state.referrer) {
      return <Redirect to={location.state.referrer} />
    }
    return <Redirect to="/dashboard" />
  }

  return (
    <Container fluid className="login">
      <Col {...colSize} className="mx-auto">
        <div className="login__form">
          <h2 className="text-center mb-4">Sign in:</h2>
          <Form className="mb-3" onSubmit={onSubmit}>
            <fieldset>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={'my-2' + (usernameError ? ' is-invalid' : '')}
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  required
                />
                {usernameError ? (
                  <div className="invalid-feedback">{usernameError}</div>
                ) : null}
                <Form.Control
                  type="password"
                  className={'my-2' + (passwordError ? ' is-invalid' : '')}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                />
                {passwordError ? (
                  <div className="invalid-feedback">{passwordError}</div>
                ) : null}
              </Form.Group>
            </fieldset>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p>
            Don't have an account? <Link to="register">Register</Link>
          </p>
        </div>
      </Col>
    </Container>
  )
}

export default connector(Login)
