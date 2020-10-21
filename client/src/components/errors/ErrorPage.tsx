import React from 'react'

import PropTypes from 'prop-types'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
  status: number
}

/**
 * Displays an error page/splash
 */
const ErrorPage = ({ status }: Props) => {
  let message = ''
  switch (status) {
    case 404:
      message = "That resource wasn't found."
      break
    case 401:
    case 403:
      message = 'You are not authorized to view this resource.'
      break
    case 500:
      message = 'Internal server error.'
      break
    default:
      message = ''
  }
  return (
    <Container className="error-container">
      <Col className="error-widget">
        <Row>
          <Col>
            <h1>{status}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{message}</p>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

ErrorPage.propTypes = {
  status: PropTypes.number.isRequired
}

export default ErrorPage
