import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const isValidUsername = (str: string) => /^[a-zA-Z0-9]{5,}$/.test(str)

const parseInvalidUsers = (str: string) => {
  return str.split(/\s*,+\s*,*/).filter(s => !isValidUsername(s))
}

/**
 * Parses allowed users from a comma-separated string.
 */
const parseAllowedUsers = (str: string) => {
  const users = str.split(/\s*,+\s*,*/).filter(s => s)
  if (users.length > 0 && users.every(user => isValidUsername(user))) {
    return users
  }
  return []
}

type Props = {
  defaultValue: string[]
  onChange: (users: string[]) => void
}

/**
 * Displays a text input for the user to input a list of allowed users
 */
const AllowedUsersEditor = (props: Props) => {
  const [users, setUsers] = useState(props.defaultValue.join(','))
  const [isValid, setValid] = useState(true)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const users = e.target.value
    setUsers(users)
    const allowedUsers = parseAllowedUsers(users)
    if (allowedUsers.length > 0 || users.length === 0) {
      props.onChange(allowedUsers)
      setValid(true)
    } else if (users.length > 0) {
      setValid(false)
    }
  }
  return (
    <Row className="mb-4">
      <Col>
        <Row>
          <Col>
            <label htmlFor="allowedUsersInput">Allowed users:</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              className={!isValid ? ' is-invalid' : ''}
              type="text"
              placeholder="User1, User2, ..."
              name="value"
              id="allowedUsersInput"
              value={users}
              onChange={onChange}
            />
            {!isValid ? (
              <div className="invalid-feedback">
                The following usernames are not valid:
                {' ' + parseInvalidUsers(users).join(', ')}
              </div>
            ) : null}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AllowedUsersEditor
