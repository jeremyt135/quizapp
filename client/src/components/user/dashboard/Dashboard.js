import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import { changeUserInfo, deleteUser } from '../../../actions/user/user'
import { deleteQuiz } from '../../../actions/quiz/quiz'
import { getQuizList, clearQuizList } from '../../../actions/quiz/quizlist'

import '../../../styles/dashboard.css'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({
  auth,
  user,
  quizList,
  changeUserInfo,
  deleteUser,
  deleteQuiz,
  getQuizList,
  clearQuizList
}) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  const quizIds = user.data ? user.data.quizzes : []
  useEffect(() => {
    // load the quiz list once on load to ensure it's there
    getQuizList(quizIds)
    return clearQuizList
  }, [quizIds])

  if (user.loading || quizList.loading) {
    return <Spinner />
  }

  return (
    <div className='dashboard container'>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <UserInfo
            user={user.data}
            changeUserInfo={changeUserInfo}
            deleteUser={deleteUser}
          />
        </section>
      </div>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <QuizList quizzes={quizList.quizzes} deleteQuiz={deleteQuiz} />
        </section>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  getQuizList: PropTypes.func.isRequired,
  clearQuizList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  quizList: state.quizList
})

export default connect(mapStateToProps, {
  changeUserInfo,
  deleteUser,
  deleteQuiz,
  getQuizList,
  clearQuizList
})(Dashboard)
