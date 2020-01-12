import React from 'react'

const QuizBrowser = () => {
  return (
    <section class='container'>
      <div class='row'>
        <section class='col-md-8 mx-auto mt-3'>
          <h1 class='text-center mb-3'>Public Quizzes</h1>
          <ul class='list-group'>
            <li class='list-group-item'>
              <div class='d-flex w-100 justify-content-between mb-1'>
                <h5 class='mb-1'>Quiz Title</h5>
                <small class='text-muted'>3 days ago</small>
              </div>
              <div class='row'>
                <div class='col'>
                  <p class='mb-1'>50 Questions</p>
                  <small class='text-muted'>created by Username</small>
                </div>
                <div class='col d-flex justify-content-end align-items-end'>
                  <a href='#' class='btn btn-primary btn-sm' role='button'>
                    Take Quiz
                  </a>
                </div>
              </div>
            </li>
            <li class='list-group-item'>
              <div class='d-flex w-100 justify-content-between mb-1'>
                <h5 class='mb-1'>Quiz Title</h5>
                <small class='text-muted'>3 days ago</small>
              </div>
              <div class='row'>
                <div class='col'>
                  <p class='mb-1'>50 Questions</p>
                  <small class='text-muted'>created by Username</small>
                </div>
                <div class='col d-flex justify-content-end align-items-end'>
                  <a href='#' class='btn btn-primary btn-sm' role='button'>
                    Take Quiz
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

export default QuizBrowser
