import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import ResultList from './ResultList'

import { loadDashboard, clearDashboard } from '../../../actions/dashboard'

import '../../../styles/dashboard.scss'

/**
 * Dashboard for a user that shows their info and quizzes
 * @param {object} props
 * @param {{ isAuthenticated: boolean }} props.auth Redux auth state
 * @param {boolean} props.userLoading True if user data is loading
 * @param {function} props.loadDashboard Action creator to load user's dashboard data (quiz data, result data)
 * @param {function} props.clearDashboard Action creator to clear dashboard data
 */
const Dashboard = ({ auth, userLoading, loadDashboard, clearDashboard }) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  useEffect(() => {
    loadDashboard()
    return clearDashboard
  }, [])

  return userLoading ? (
    <Spinner />
  ) : (
    <div className='content'>
      <div className='dashboard container-fluid'>
        <div className='row pt-1 mt-1'>
          <section className='dashboard__block col-sm-8 mx-auto'>
            <UserInfo />
          </section>
        </div>
        <div className='row pt-1 mt-1'>
          <section className='dashboard__block col-sm-8 mx-auto'>
            <QuizList />
          </section>
        </div>
        <div className='row pt-1 mt-1'>
          <section className='dashboard__block col-sm-8 mx-auto'>
            <ResultList />
          </section>
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  userLoading: PropTypes.bool.isRequired,
  loadDashboard: PropTypes.func.isRequired,
  clearDashboard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  userLoading: state.user.loading
})

export default connect(mapStateToProps, { loadDashboard, clearDashboard })(
  Dashboard
)
