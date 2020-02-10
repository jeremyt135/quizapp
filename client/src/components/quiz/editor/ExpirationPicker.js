import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DateTimePicker from '../../common/DateTimePicker'
import { changeExpiration } from '../../../actions/editor'
const ExpirationPicker = ({ defaultValue, changeExpiration, editing }) => {
  const [date, setDate] = useState(defaultValue)
  const onChange = str => {
    setDate(str)
    changeExpiration(str)
  }
  return (
    <>
      <div className='row'>
        <div className='col'>
          <label htmlFor='expirationPicker'>Expires on:</label>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <DateTimePicker
            label={'Expires on:'}
            id={'expirationPicker'}
            defaultValue={date}
            minValue={!editing ? new Date().toISOString() : date}
            onChange={onChange}
          />
          <small className='text-muted'>Click to change date and time</small>
        </div>
      </div>
    </>
  )
}

ExpirationPicker.propTypes = {
  defaultValue: PropTypes.string,
  changeExpiration: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  defaultValue: state.editor.quiz.expiresIn,
  editing: state.editor.editing
})

export default connect(mapStateToProps, { changeExpiration })(ExpirationPicker)
