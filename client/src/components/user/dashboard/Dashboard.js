import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import { changeUserInfo } from '../../../actions/user/user'

import '../../../styles/dashboard.css'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({ isAuthenticated, user, changeUserInfo }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />
  }

  if (!user) {
    return <Spinner />
  }

  return (
    <section className='dashboard container'>
      <UserInfo user={user} changeUserInfo={changeUserInfo} />
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-8 mx-auto'>
          <div className='row mb-3'>
            <h3 className='col mb-0'>Quizzes You Created:</h3>
            <div className='col d-flex align-items-end justify-content-end'>
              <a
                href='#'
                className='btn btn-success btn-sm ml-auto'
                role='button'>
                Create A Quiz
              </a>
            </div>
          </div>
          <ul className='list-group'>
            <li className='list-group-item'>
              <div className='d-flex w-100 justify-content-between mb-1'>
                <h5 className='mb-1'>Quiz Title</h5>
                <small className='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p className='mb-1'>50 Questions</p>
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
                    View Results
                  </a>
                </div>
              </div>
            </li>
            <li className='list-group-item'>
              <div className='d-flex w-100 justify-content-between mb-1'>
                <h5 className='mb-1'>Quiz Title</h5>
                <small className='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p className='mb-1'>50 Questions</p>
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
                    View Results
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  changeUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user
})

export default connect(mapStateToProps, { changeUserInfo })(Dashboard)
