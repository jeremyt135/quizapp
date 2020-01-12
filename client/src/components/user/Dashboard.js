import React from 'react'
import '../../styles/dashboard.css'

const Dashboard = () => {
  return (
    <section className='dashboard container'>
      <div class='dashboard__block row p-3 my-3'>
        <section class='col-md-8 mx-auto'>
          <div className='row'>
            <h1 className='col'>
              Hello, <span>Username</span>
            </h1>
          </div>
          <div className='row'>
            <h4 className='col'>
              Joined: <span>01/01/2020</span>
            </h4>
          </div>
          <div className='row'>
            <div className='col'>
              <button class='btn btn-info btn-sm'>Edit</button>
            </div>
          </div>
          <div class='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='text'
                placeholder='New password'
                id='password'
              />
            </div>
          </div>
          <div class='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='text'
                placeholder='Confirm new password'
                id='confirmPassword'
              />
            </div>
          </div>
          <div class='row my-2'>
            <div className='col'>
              <button class='btn btn-danger btn-sm'>Change Password</button>
            </div>
          </div>
        </section>
      </div>
      <div class='dashboard__block row p-3 my-3'>
        <section class='col-md-8 mx-auto'>
          <div class='row mb-3'>
            <h3 class='col mb-0'>Your Quizzes:</h3>
            <div class='col d-flex align-items-end justify-content-end'>
              <a href='#' class='btn btn-success btn-sm ml-auto' role='button'>
                Create A Quiz
              </a>
            </div>
          </div>
          <ul class='list-group'>
            <li class='list-group-item'>
              <div class='d-flex w-100 justify-content-between mb-1'>
                <h5 class='mb-1'>Quiz Title</h5>
                <small class='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p class='mb-1'>50 Questions</p>
                </div>
                <div class='col d-flex justify-content-end align-items-end'>
                  <a href='#' class='btn btn-primary btn-sm' role='button'>
                    View Results
                  </a>
                </div>
              </div>
            </li>
            <li class='list-group-item'>
              <div class='d-flex w-100 justify-content-between mb-1'>
                <h5 class='mb-1'>Quiz Title</h5>
                <small class='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p class='mb-1'>50 Questions</p>
                </div>
                <div class='col d-flex justify-content-end align-items-end'>
                  <a href='#' class='btn btn-primary btn-sm' role='button'>
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

export default Dashboard
