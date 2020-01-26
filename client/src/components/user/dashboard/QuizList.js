import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import QuizItem from './QuizItem'
import Spinner from '../../common/Spinner'

import { clearQuizList, getQuizList } from '../../../actions/user/quizlist'
import { deleteQuiz, goToQuizEditor } from '../../../actions/quiz/quiz'

/**
 *
 * @param {object} props Component props
 * @param {boolean} props.loading True if quiz list is loading
 * @param {[object]} props.quizzes List of quizzes
 * @param {function} props.deleteQuiz Function to delete a quiz
 * @param {function} props.getQuizList Function to get quiz list
 * @param {function} props.clearQuizList Function to clear quiz list
 */
const QuizList = ({ loading, quizzes, getQuizList, clearQuizList }) => {
  useEffect(() => {
    getQuizList()
    return clearQuizList
  }, [])

  return (
    <>
      <div className='row mb-2 align-items-center'>
        <h3 className='col mb-0'>Quizzes You Created:</h3>
      </div>
      {quizzes.length === 0 ? (
        <div className='row mb-2 align-items-center'>
          <h6 className='col mb-0'>You haven't made any quizzes!</h6>
        </div>
      ) : null}
      <div className='row mb-1 align-items-center'>
        <div className='col'>
          <Link to='/quizzes/create' className='btn btn-success btn-sm ml-auto'>
            Create A Quiz
          </Link>
        </div>
      </div>

      <div className='row mb-1'>
        <div className='col'>
          {loading ? (
            <Spinner />
          ) : (
            <ul className='list-group w-100'>
              {quizzes.map((quiz, index) => {
                return (
                  <li key={index} className='list-group-item'>
                    <QuizItem quiz={quiz} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

QuizList.propTypes = {
  loading: PropTypes.bool.isRequired,
  quizzes: PropTypes.array,
  deleteQuiz: PropTypes.func.isRequired,
  getQuizList: PropTypes.func.isRequired,
  clearQuizList: PropTypes.func.isRequired,
  goToQuizEditor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.quizList.loading,
  quizzes: state.quizList.quizzes
})

export default connect(mapStateToProps, {
  getQuizList,
  deleteQuiz,
  goToQuizEditor,
  clearQuizList
})(QuizList)
