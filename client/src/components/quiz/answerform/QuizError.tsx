import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
  message: string
}

/**
 * Displays an error page to the user indicating they already took the quiz
 */
const QuizError = ({ message }: Props) => {
  return (
    <Container className="error-container">
      <Col className="error-widget">
        <Row>
          <Col>
            <h3>{message}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Link className="btn btn-success" to="/dashboard">
              Back to dashboard
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default QuizError
