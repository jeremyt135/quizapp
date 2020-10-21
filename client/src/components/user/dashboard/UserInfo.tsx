import React, { useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import PasswordForm from './PasswordForm'
import EmailForm from './EmailForm'
import DeleteButton from './DeleteButton'

import {
  deleteUser,
  changeUserEmail,
  changeUserPassword
} from 'store/user/thunks'
import { dateToLongLocaleString } from 'util/date'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  user: state.user.user
})

const mapDispatch = {
  deleteUser,
  changeUserEmail,
  changeUserPassword
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays the User's info to a dashboard block. Allows editing of password and email
 * through child components.
 */
const UserInfo = ({
  user,
  changeUserEmail,
  changeUserPassword,
  deleteUser
}: Props) => {
  const { username, email, date } = user!
  const dateString = dateToLongLocaleString(date)
  const changeEmail = useCallback((email: string) => changeUserEmail(email), [
    changeUserEmail
  ])
  const changePassword = useCallback(
    (password: string) => changeUserPassword(password),
    [changeUserPassword]
  )
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

      <EmailForm defaultValue={email} changeEmail={changeEmail} />
      <PasswordForm changePassword={changePassword} />
      <div className="row my-2">
        <div className="col">
          <DeleteButton
            text="Delete Account"
            onClick={deleteUser}
            confirm={true}
            modalConfig={{
              header: 'Confirm Account Deletion',
              body:
                'Are you sure you want to delete your account? This action is irreversible!',
              confirmText: 'Yes, delete my account.'
            }}
          />
        </div>
      </div>
    </>
  )
}

export default connector(UserInfo)
