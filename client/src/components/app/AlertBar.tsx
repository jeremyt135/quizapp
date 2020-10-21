import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Alert } from 'react-bootstrap'
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
    <div data-testid="alertbar" className="container-fluid alertbar">
      {alerts.map(alert => (
        <div key={alert.id} className="row my-1">
          <div className="col-10 col-sm-6 mx-auto px-0">
            <Alert variant={alert.type}>{alert.msg}</Alert>
          </div>
        </div>
      ))}
    </div>
  )
}

export default connector(AlertBar)
