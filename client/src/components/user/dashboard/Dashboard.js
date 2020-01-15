import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import { changeUserInfo, deleteUser } from '../../../actions/user/user'
import { getQuizInfoList } from '../../../actions/quiz/quizlist'

import '../../../styles/dashboard.css'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({
  auth,
  user,
  changeUserInfo,
  deleteUser,
  getQuizInfoList
}) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  if (user.loading || !user.data) {
    return <Spinner />
  }

  getQuizInfoList(user.data.quizzes)

  return (
    <section className='dashboard container'>
      <UserInfo
        user={user.data}
        changeUserInfo={changeUserInfo}
        deleteUser={deleteUser}
      />
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-8 mx-auto'>
          <div className='row mb-1 align-items-center'>
            <h3 className='col mb-0'>Quizzes You Created:</h3>
          </div>
          <div className='row mb-1 aling-items-center'>
            <div className='col'>
              <Link
                to='/quiz/create'
                className='btn btn-success btn-sm ml-auto'>
                Create A Quiz
              </Link>
            </div>
          </div>
          <QuizList />
        </section>
      </div>
    </section>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getQuizInfoList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, {
  changeUserInfo,
  deleteUser,
  getQuizInfoList
})(Dashboard)
