import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PasswordForm from './layout/PasswordForm'
import EmailForm from './layout/EmailForm'

/**
 * Displays the User's info to a dashboard block. Allows editing of password and email
 * through child components.
 */
const UserInfo = ({ user, changeUserInfo, deleteUser }) => {
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)

  const { username, email, date } = user
  const dateString = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const submitChanges = ({ email, password }) => {
    if (email) {
      setEditingEmail(false)
    }
    if (password) {
      setEditingPassword(false)
    }
    changeUserInfo(email, password)
  }

  return (
    <div className='dashboard__block row p-3 my-3'>
      <section className='col-md-8 mx-auto'>
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
            submitChanges={submitChanges}
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
            submitChanges={submitChanges}
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
      </section>
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

export default UserInfo
