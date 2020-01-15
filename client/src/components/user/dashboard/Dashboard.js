import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import { changeUserInfo, deleteUser } from '../../../actions/user/user'
import '../../../styles/dashboard.css'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({ auth, user, changeUserInfo, deleteUser }) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  if (user.loading || !user.data) {
    return <Spinner />
  }

  return (
    <section className='dashboard container'>
      <UserInfo
        user={user.data}
        changeUserInfo={changeUserInfo}
        deleteUser={deleteUser}
      />
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <QuizList quizIds={user.data.quizzes} />
        </section>
      </div>
    </section>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, {
  changeUserInfo,
  deleteUser
})(Dashboard)
