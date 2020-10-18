import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Displays an error page to the user indicating they already took the quiz
 */
const QuizTakenError = () => {
  return (
    <div className='container error-container'>
      <div className='error-widget col'>
        <div className='row'>
          <div className='col'>
            <h3>You've already taken this quiz!</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col d-flex align-items-center justify-content-center'>
            <Link className='btn btn-success' to='/dashboard'>
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizTakenError
