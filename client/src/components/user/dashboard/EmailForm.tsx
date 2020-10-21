import React, { useCallback, useState } from 'react'

import { useConfirmModal } from 'hooks/useconfirmmodal'
import { ApiError } from 'api'
import { Button, Col, Form, Row } from 'react-bootstrap'

type Props = {
  defaultValue: string
  changeEmail: (email: string) => Promise<ApiError | undefined>
}

/**
 * Displays and controls a form for the user to change their email.
 */
const EmailForm = ({ defaultValue, changeEmail }: Props) => {
  const [email, setEmail] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const closeForm = useCallback(() => {
    setEmail(defaultValue)
    setIsOpen(false)
    setFormError(null)
  }, [defaultValue])

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const onConfirm = useCallback(() => {
    changeEmail(email).then(apiError => {
      if (apiError) {
        if (apiError.status === 409) {
          setFormError('Email already in use.')
        } else {
          setFormError('Cannot change email at this time.')
        }
      } else {
        closeForm()
      }
    })
  }, [email, changeEmail, closeForm])

  const [Modal, , showModal] = useConfirmModal({
    header: 'Confirm Changes',
    body: 'Are you sure you want to change email?',
    onConfirm: onConfirm
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError('')
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email !== defaultValue) {
      showModal()
    } else {
      setFormError('You are already using this email.')
    }
  }

  return (
    <>
      {!isOpen ? (
        <Row className="my-2">
          <Col>
            <Button variant="info" size="sm" onClick={openForm}>
              Change Email
            </Button>
          </Col>
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row className="my-2">
            <Col>
              <Form.Control
                className={formError ? ' is-invalid' : ''}
                type="email"
                placeholder="New email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              {formError ? (
                <div className="invalid-feedback">{formError}</div>
              ) : null}
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={closeForm}>
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
        </Form>
      )}
      {Modal}
    </>
  )
}

export default EmailForm
