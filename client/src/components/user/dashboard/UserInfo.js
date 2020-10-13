import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PasswordForm from './PasswordForm'
import EmailForm from './EmailForm'
import DeleteAccountButton from './DeleteAccountButton'
import { deleteUser } from '../../../store/user/thunks'

/**
 * Displays the User's info to a dashboard block. Allows editing of password and email
 * through child components.
 */
const UserInfo = ({ user, deleteUser }) => {
  const { username, email, date } = user.user
  const dateString = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <div className="row">
        <h1 className="col">
          Hello, <span>{username}</span>
        </h1>
      </div>
      <div className="row mb-1">
        <h4 className="col mb-0">
          Email: <span>{email}</span>
        </h4>
      </div>
      <div className="row">
        <h4 className="col">
          Joined: <span>{dateString}</span>
        </h4>
      </div>

      <EmailForm initialEmail={email} />
      <PasswordForm />
      <div className="row my-2">
        <div className="col">
          <DeleteAccountButton text="Delete Account" onClick={deleteUser} />
        </div>
      </div>
    </>
  )
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { deleteUser })(UserInfo)
