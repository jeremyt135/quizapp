import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeIsPublic } from '../../../actions/editor'

const PublicCheckbox = ({ defaultValue, changeIsPublic }) => {
  const [checked, setChecked] = useState(defaultValue)
  const onChange = e => {
    const value = e.target.checked
    setChecked(value)
    changeIsPublic(value)
  }
  return (
    <div className='row mb-4'>
      <div className='col d-flex align-items-center'>
        <div className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='publicCheckbox'
            checked={checked}
            onChange={onChange}
          />
          <label className='custom-control-label' htmlFor='publicCheckbox'>
            Public
          </label>
        </div>
      </div>
    </div>
  )
}

PublicCheckbox.propTypes = {
  defaultValue: PropTypes.bool.isRequired,
  changeIsPublic: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  defaultValue: state.editor.quiz.isPublic
})

export default connect(mapStateToProps, { changeIsPublic })(PublicCheckbox)
