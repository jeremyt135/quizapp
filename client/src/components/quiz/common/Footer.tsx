import React from 'react'
import { Col, Container } from 'react-bootstrap'

type Props = {
  children: React.ReactNode
}

/**
 * Displays a footer with children placed starting from the right end of the footer bar.
 */
const Footer = ({ children }: Props) => {
  return (
    <footer className="footer">
      <Container fluid className="h-100">
        <Col
          sm={8}
          className="mx-auto h-100 d-flex align-items-center justify-content-end">
          {children}
        </Col>
      </Container>
    </footer>
  )
}

export default Footer
