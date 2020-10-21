import React from 'react'

import { connect, ConnectedProps } from 'react-redux'
import { Alert, Col, Container, Row } from 'react-bootstrap'

import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  alerts: state.alerts
})

const connector = connect(mapState)

type Props = ConnectedProps<typeof connector>

/**
 * Contains and renders Alert components
 */
const AlertBar = ({ alerts }: Props) => {
  return (
    <Container data-testid="alertbar" fluid className="alertbar">
      {alerts.map(alert => (
        <Row key={alert.id} className="my-1">
          <Col xs={10} sm={6} className="mx-auto px-0">
            <Alert variant={alert.type}>{alert.msg}</Alert>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default connector(AlertBar)
