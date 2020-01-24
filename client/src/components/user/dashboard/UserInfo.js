import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PasswordForm from './/PasswordForm'
import EmailForm from './/EmailForm'

import {
  changeUserEmail,
  changeUserPassword,
  deleteUser
} from '../../../actions/user/user'

/**
 * Displays the User's info to a dashboard block. Allows editing of password and email
 * through child components.
 */
const UserInfo = ({
  user,
  changeUserEmail,
  changeUserPassword,
  deleteUser
}) => {
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)

  const { username, email, date } = user.data
  const dateString = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const submitPassword = password => {
    setEditingPassword(false)
    changeUserPassword(password)
  }

  const submitEmail = email => {
    setEditingEmail(false)
    changeUserEmail(email)
  }

  return (
    <>
      <div className='row'>
        <h1 className='col'>
          Hello, <span>{username}</span>
        </h1>
      </div>
      <div className='row mb-1'>
        <h4 className='col mb-0'>
          Email: <span>{email}</span>
        </h4>
      </div>
      <div className='row'>
        <h4 className='col'>
          Joined: <span>{dateString}</span>
        </h4>
      </div>
      {editingEmail ? (
        <EmailForm
          initialEmail={email}
          submitChanges={submitEmail}
          closeForm={() => setEditingEmail(false)}
        />
      ) : (
        <div className='row my-2'>
          <div className='col'>
            <button
              className='btn btn-info btn-sm'
              onClick={() => setEditingEmail(true)}>
              Change Email
            </button>
          </div>
        </div>
      )}
      {editingPassword ? (
        <PasswordForm
          submitChanges={submitPassword}
          closeForm={() => setEditingPassword(false)}
        />
      ) : (
        <div className='row my-2'>
          <div className='col'>
            <button
              className='btn btn-info btn-sm'
              onClick={() => setEditingPassword(true)}>
              Change Password
            </button>
          </div>
        </div>
      )}
      <div className='row my-2'>
        <div className='col'>
          <button className='btn btn-danger btn-sm' onClick={deleteUser}>
            Delete Account
          </button>
        </div>
      </div>
    </>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  changeUserEmail: PropTypes.func.isRequired,
  changeUserPassword: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {
  changeUserEmail,
  changeUserPassword,
  deleteUser
})(UserInfo)
