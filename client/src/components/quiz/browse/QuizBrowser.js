import React from 'react'

const QuizBrowser = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 mx-auto mt-3'>
          <h1 className='text-center mb-3'>Public Quizzes</h1>
          <ul className='list-group'>
            <li className='list-group-item'>
              <div className='d-flex w-100 justify-content-between mb-1'>
                <h5 className='mb-1'>Quiz Title</h5>
                <small className='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p className='mb-1'>50 Questions</p>
                  <small className='text-muted'>created by Username</small>
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
                    Take Quiz
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
                  <small className='text-muted'>created by Username</small>
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
                    Take Quiz
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuizBrowser
