import React, { useCallback, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { ApiError } from 'api'
import { useConfirmModal } from 'hooks/useconfirmmodal'

type Props = {
  changePassword: (password: string) => Promise<ApiError | undefined>
}

/**
 * Displays and controls a form for the user to change their password.
 */
const PasswordForm = ({ changePassword }: Props) => {
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = passwordInput

  const [isOpen, setIsOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const closeForm = () => {
    setPasswordInput({ password: '', confirmPassword: '' })
    setIsOpen(false)
    setFormError(null)
  }

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const onConfirm = useCallback(() => {
    changePassword(password).then(apiError => {
      if (apiError) {
        setFormError('Cannot change password at this time.')
      } else {
        closeForm()
      }
    })
  }, [password, changePassword])

  const [Modal, , showModal] = useConfirmModal({
    header: 'Confirm Changes',
    body: 'Are you sure you want to change email?',
    onConfirm: onConfirm
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError('')
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        showModal()
      } else {
        setFormError('Passwords do not match.')
      }
    } else {
      setFormError('Please enter a password.')
    }
  }

  return (
    <>
      {!isOpen ? (
        <Row className="my-2">
          <Col>
            <Button variant="info" size="sm" onClick={openForm}>
              Change Password
            </Button>
          </Col>
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Row className="my-2">
                <Col>
                  <Form.Control
                    className={formError ? ' is-invalid' : ''}
                    type="password"
                    placeholder="New password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={20}
                  />
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <Form.Control
                    className={formError ? ' is-invalid' : ''}
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={20}
                  />
                  {formError ? (
                    <div className="invalid-feedback">{formError}</div>
                  ) : null}
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <Button variant="secondary" size="sm" onClick={closeForm}>
                    Cancel
                  </Button>
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <Button type="submit" variant="primary" size="sm">
                    Change
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
      {Modal}
    </>
  )
}

export default PasswordForm
