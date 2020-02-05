import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

/**
 * Contains and renders Alert components
 * @param {[{id: string, type: string, msg: string}]} alerts Array of alert objects
 */
const AlertBar = ({ alerts }) => {
  return (
    <div className='container-fluid'>
      {alerts.map(alert => (
        <div key={alert.id} className='row my-1'>
          <div className='col-sm-8 mx-auto px-0'>
            <Alert variant={alert.type}>{alert.msg}</Alert>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  alerts: state.alerts
})

AlertBar.propTypes = {
  alerts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(AlertBar)
