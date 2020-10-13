import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeAllowedUsers } from '../../../store/editor/thunks'
import {} from '../../../store/editor/thunks'
const isValidUsername = str => /^[a-zA-Z0-9]{5,}$/.test(str)

const parseInvalidUsers = str => {
  return str.split(/\s*,+\s*,*/).filter(s => !isValidUsername(s))
}

/**
 * Parses allowed users from a comma-separated string.
 * @param {string} str Comma-separated string of valid usernames
 */
const parseAllowedUsers = str => {
  const users = str.split(/\s*,+\s*,*/).filter(s => s)
  if (users.length > 0 && users.every(user => isValidUsername(user))) {
    return users
  }
  return null
}

/**
 * Displays a text input for the user to input a list of allowed users
 */
const AllowedUsersInput = ({ defaultValue, changeAllowedUsers }) => {
  const [users, setUsers] = useState(defaultValue.join(','))
  const [isValid, setValid] = useState(true)

  const onChange = e => {
    setUsers(e.target.value)
    setValid(true)
  }

  const onBlur = () => {
    const allowedUsers = parseAllowedUsers(users)
    if (allowedUsers) {
      changeAllowedUsers(allowedUsers)
    } else {
      setValid(!users && !allowedUsers)
    }
  }

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="row">
          <div className="col">
            <label htmlFor="allowedUsersInput">Allowed users:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              className={'form-control' + (!isValid ? ' is-invalid' : '')}
              type="text"
              placeholder="User1, User2, ..."
              name="value"
              id="allowedUsersInput"
              value={users}
              onChange={onChange}
              onBlur={onBlur}
            />
            {!isValid ? (
              <div className="invalid-feedback">
                The following usernames are not valid:
                {' ' + parseInvalidUsers(users).join(', ')}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

AllowedUsersInput.propTypes = {
  defaultValue: PropTypes.array.isRequired,
  changeAllowedUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  defaultValue: state.editor.quiz.allowedUsers
})

export default connect(mapStateToProps, { changeAllowedUsers })(
  AllowedUsersInput
)
