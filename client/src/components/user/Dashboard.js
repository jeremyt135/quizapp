import React from 'react'
import '../../styles/dashboard.css'

const Dashboard = () => {
  return (
    <section className='dashboard container'>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-8 mx-auto'>
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
              <button className='btn btn-info btn-sm'>Edit</button>
            </div>
          </div>
          <div className='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='text'
                placeholder='New password'
                id='password'
              />
            </div>
          </div>
          <div className='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='text'
                placeholder='Confirm new password'
                id='confirmPassword'
              />
            </div>
          </div>
          <div className='row my-2'>
            <div className='col'>
              <button className='btn btn-danger btn-sm'>Change Password</button>
            </div>
          </div>
        </section>
      </div>
      <div className='dashboard__block row p-3 my-3'>
        <section className='col-md-8 mx-auto'>
          <div className='row mb-3'>
            <h3 className='col mb-0'>Your Quizzes:</h3>
            <div className='col d-flex align-items-end justify-content-end'>
              <a
                href='#'
                className='btn btn-success btn-sm ml-auto'
                role='button'>
                Create A Quiz
              </a>
            </div>
          </div>
          <ul className='list-group'>
            <li className='list-group-item'>
              <div className='d-flex w-100 justify-content-between mb-1'>
                <h5 className='mb-1'>Quiz Title</h5>
                <small className='text-muted'>3 days ago</small>
              </div>
              <div className='row'>
                <div className='col'>
                  <p className='mb-1'>50 Questions</p>
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
                    View Results
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
                </div>
                <div className='col d-flex justify-content-end align-items-end'>
                  <a href='#' className='btn btn-primary btn-sm' role='button'>
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
