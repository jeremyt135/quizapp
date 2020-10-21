import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Displays an error to the user that the quiz they are taking has expired
 */
const QuizExpiredError = () => {
  return (
    <div className='container error-container'>
      <div className='error-widget col'>
        <div className='row'>
          <div className='col'>
            <h3>This quiz has expired.</h3>
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

export default QuizExpiredError
