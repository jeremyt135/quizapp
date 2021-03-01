import React, { useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'

import { connect, ConnectedProps } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { ApiError } from 'api'

import { register } from 'store/auth/thunks'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatch = {
  register
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

type FormError = {
  username?: string
  email?: string
  password?: string
}

const colSize = {
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4
}
/**
 * Handles user registration through a form.
 */
const Register = ({ isAuthenticated, register }: Props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    passwordConfirm: ''
  })
  const [formError, setFormError] = useState<FormError | null>(null)

  const { password, passwordConfirm } = passwordInput

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(prev => ({ ...prev, username: undefined }))
    setUsername(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(prev => ({ ...prev, email: undefined }))
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(prev => ({ ...prev, password: undefined }))
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const handleFailure = (error: ApiError | null) => {
    if (error && (error.status === 400 || error.status === 409)) {
      for (const err of error.errors) {
        setFormError(prev => ({
          ...prev,
          ...err
        }))
      }
    }
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === passwordConfirm) {
      setFormError({ password: undefined })
      register(
        { username, email, password },
        handleFailure as (error: {} | null) => void
      )
    } else {
      setFormError({
        password: 'Passwords do not match.'
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Container fluid className="register">
      <Col {...colSize} className="mx-auto">
        <div className="register__form">
          <h2 className="text-center mb-4">Register an account:</h2>
          <Form className="mb-3" onSubmit={submitForm}>
            <fieldset>
              <Form.Group>
                <Form.Control
                  type="text"
                  className={
                    'mb-2' +
                    (formError && formError.username ? ' is-invalid' : '')
                  }
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  minLength={5}
                  maxLength={12}
                  required
                />
                {formError && formError.username ? (
                  <div className="invalid-feedback">
                    {formError && formError.username}
                  </div>
                ) : null}
                <Form.Control
                  type="text"
                  className={
                    'mb-2' + (formError && formError.email ? ' is-invalid' : '')
                  }
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  required
                />
                {formError && formError.email ? (
                  <div className="invalid-feedback">
                    {formError && formError.email}
                  </div>
                ) : null}
                <Form.Control
                  type="password"
                  className={
                    'mb-2' +
                    (formError && formError.password ? ' is-invalid' : '')
                  }
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  minLength={8}
                  maxLength={20}
                  required
                />
                <Form.Control
                  type="password"
                  className={
                    formError && formError.password ? ' is-invalid' : ''
                  }
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm Password"
                  minLength={8}
                  maxLength={20}
                  required
                />
                {formError && formError.password ? (
                  <div className="invalid-feedback">
                    {formError && formError.password}
                  </div>
                ) : null}
              </Form.Group>
            </fieldset>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </Col>
    </Container>
  )
}

export default connector(Register)
