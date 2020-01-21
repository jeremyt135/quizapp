import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import ResultList from './ResultList'

import '../../../styles/dashboard.css'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({ auth, userLoading }) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  return userLoading ? (
    <Spinner />
  ) : (
    <div className='dashboard container'>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <UserInfo />
        </section>
      </div>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <QuizList />
        </section>
      </div>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <ResultList />
        </section>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  userLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  userLoading: state.user.loading
})

export default connect(mapStateToProps)(Dashboard)
