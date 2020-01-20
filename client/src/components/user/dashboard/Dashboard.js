import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import UserInfo from './UserInfo'
import Spinner from '../../common/Spinner'
import QuizList from './QuizList'
import {
  changeUserEmail,
  changeUserPassword,
  deleteUser
} from '../../../actions/user/user'
import { deleteQuiz, goToQuizEditor } from '../../../actions/quiz/quiz'
import { clearQuizList, getQuizList } from '../../../actions/quiz/quizlist'
import {
  clearResultList,
  getResultList
} from '../../../actions/quiz/resultlist'

import '../../../styles/dashboard.css'
import ResultList from './ResultList'

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({
  auth,
  user,
  quizList,
  resultList,
  changeUserEmail,
  changeUserPassword,
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
    if (!user.loading) {
      if (quizList.quizzes.length !== user.data.quizzes.length) {
        getQuizList()
      }
      if (resultList.results.length !== user.data.results.length) {
        getQuizList()
      }
    }
    return () => clearQuizList()
  }, [])
  const browserHistory = useHistory()

  return user.loading ? (
    <Spinner />
  ) : (
    <div className='dashboard container'>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-10 mx-auto'>
          <UserInfo
            user={user.data}
            changeUserEmail={changeUserEmail}
            changeUserPassword={changeUserPassword}
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
          <hr />
          <ResultList
            loading={resultList.loading}
            results={resultList.results}
          />
        </section>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeUserEmail: PropTypes.func.isRequired,
  changeUserPassword: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  getQuizList: PropTypes.func.isRequired,
  clearQuizList: PropTypes.func.isRequired,
  getResultList: PropTypes.func.isRequired,
  clearResultList: PropTypes.func.isRequired,
  goToQuizEditor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  quizList: state.quizList,
  resultList: state.resultList
})

export default connect(mapStateToProps, {
  changeUserEmail,
  changeUserPassword,
  deleteUser,
  deleteQuiz,
  getQuizList,
  clearQuizList,
  getResultList,
  clearResultList,
  goToQuizEditor
})(Dashboard)
