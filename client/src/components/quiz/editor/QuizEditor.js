import React, { useState, useRef } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import moment from 'moment'

import Footer from '../common/Footer'
import AllowedUsersInput from './layout/AllowedUsersInput'
import PublicCheckbox from './layout/PublicCheckbox'
import Title from './layout/Title'

import '../../../styles/quiz.css'
import ExpirationPicker from './layout/ExpirationPicker'

const defaultExpiration = moment()
  .add(1, 'day')
  .set('hours', 23)
  .set('minutes', 59)
  .toISOString()

/**
 * Parses allowed users from a comma-separated string.
 * @param {string} str Comma-separated string of valid usernames
 */
const parseAllowedUsers = str => {
  const users = str.split(/\s*,+\s*,*/).filter(s => s)
  if (
    users.length > 0 &&
    users.every(username => /^[a-zA-Z0-9]{5,}$/.test(username))
  ) {
    return users
  }
  return null
}

/**
 * Displays subforms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditor = ({ isAuthenticated, user }) => {
  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />
  // }

  const [title, setTitle] = useState('My Quiz')
  const [isPublic, setIsPublic] = useState(false)
  const [allowedUsers, setAllowedUsers] = useState('')
  const expiresIn = useRef(defaultExpiration)

  const [questions, setQuestions] = useState([])

  const changeTitle = e => {
    setTitle(e.target.value)
  }

  const changeIsPublic = e => {
    setIsPublic(e.target.checked)
  }

  const changeAllowedUsers = e => {
    const userStr = e.target.value
    console.log(userStr)
    const userList = parseAllowedUsers(userStr)
    console.log(userList)
    if (userList) {
      setAllowedUsers(userList)
    } else {
      setAllowedUsers([])
    }
    console.log(allowedUsers)
  }

  const changeExpiresIn = dateStr => {
    expiresIn.current = dateStr
  }
  return (
    <>
      <section className='container'>
        <section className='content col-md-8 mx-auto mt-3'>
          <Title value={title} onChange={changeTitle} />
          <PublicCheckbox value={isPublic} onChange={changeIsPublic} />
          {!isPublic ? (
            <AllowedUsersInput
              onChange={changeAllowedUsers}
              isValid={allowedUsers.length > 0}
            />
          ) : null}
          <ExpirationPicker
            defaultValue={defaultExpiration}
            onChange={changeExpiresIn}
          />
        </section>
      </section>
      <Footer />
    </>
  )
}

QuizEditor.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user
})

export default connect(mapStateToProps)(QuizEditor)
