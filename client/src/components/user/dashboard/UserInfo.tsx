import React, { useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'

import { connect, ConnectedProps } from 'react-redux'

import {
  deleteUser,
  changeUserEmail,
  changeUserPassword
} from 'store/user/thunks'
import { dateToLongLocaleString } from 'util/date'
import { RootState } from 'store/store'

import PasswordForm from './PasswordForm'
import EmailForm from './EmailForm'
import DeleteButton from './DeleteButton'

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
      <Row>
        <Col>
          <h1>
            Hello, <span>{username}</span>
          </h1>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col>
          <h4 className="mb-0">
            Email: <span>{email}</span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>
            Joined: <span>{dateString}</span>
          </h4>
        </Col>
      </Row>

      <EmailForm defaultValue={email} changeEmail={changeEmail} />
      <PasswordForm changePassword={changePassword} />
      <Row className="my-2">
        <Col>
          <DeleteButton
            text="Delete Account"
            onClick={() => deleteUser()}
            confirm={true}
            modalConfig={{
              header: 'Confirm Account Deletion',
              body:
                'Are you sure you want to delete your account? This action is irreversible!',
              confirmText: 'Yes, delete my account.'
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default connector(UserInfo)
