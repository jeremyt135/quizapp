import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import { changeUserInfo, deleteUser } from '../../../actions/user/user'
import { deleteQuiz, goToQuizEditor } from '../../../actions/quiz/quiz'
import { clearQuizList, getQuizList } from '../../../actions/quiz/quizlist'

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
  clearQuizList,
  goToQuizEditor
}) => {
  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />
  }

  useEffect(() => {
    getQuizList()
    return () => clearQuizList()
  }, [user.data.quizzes.length])

  const browserHistory = useHistory()

  return user.loading ? (
    <Spinner />
  ) : (
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
          <QuizList
            loading={quizList.loading}
            quizzes={quizList.loading ? [] : quizList.quizzes}
            deleteQuiz={deleteQuiz}
            editQuiz={id => goToQuizEditor(id, browserHistory)}
          />
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
  clearQuizList: PropTypes.func.isRequired,
  goToQuizEditor: PropTypes.func.isRequired
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
  clearQuizList,
  goToQuizEditor
})(Dashboard)
