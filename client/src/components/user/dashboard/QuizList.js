import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import QuizItem from './QuizItem'
import Spinner from '../../common/Spinner'
/**
 *
 * @param {object} props Component props
 * @param {boolean} props.loading True if quiz list is loading
 * @param {[object]} props.quizzes List of quizzes
 */
const QuizList = ({ loading, quizzes }) => {
  return (
    <>
      <div className="row mb-2 align-items-center">
        <h3 className="col mb-0">Quizzes You Created:</h3>
      </div>

      <div className="row mb-1">
        <div className="col">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="row mb-2 align-items-center">
                <h6 className="col mb-0">
                  {quizzes.length === 0 ? "You haven't made any quizzes!" : ''}
                </h6>
              </div>

              <div className="row mb-1 align-items-center">
                <div className="col">
                  <Link
                    to="/quizzes/create"
                    className="btn btn-success btn-sm ml-auto">
                    Create A Quiz
                  </Link>
                </div>
              </div>

              <ul className="list-group w-100">
                {quizzes.map((quiz, index) => {
                  return (
                    <li key={index} className="list-group-item">
                      <QuizItem quiz={quiz} />
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}

QuizList.propTypes = {
  loading: PropTypes.bool.isRequired,
  quizzes: PropTypes.array
}

const mapStateToProps = state => ({
  loading: state.dashboard.loading,
  quizzes: state.dashboard.quizzes
})

export default connect(mapStateToProps)(QuizList)
