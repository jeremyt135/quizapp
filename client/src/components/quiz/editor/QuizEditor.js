import React, { useState } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Footer from '../common/Footer'

import QuizOptions from './QuizOptions'
import EditText from './EditText'
import moment from 'moment'

import '../../../styles/quiz.css'

/**
 * Displays and handles editing of a quiz.
 */
const QuizEditor = ({ isAuthenticated, user }) => {
  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />
  // }

  const [quizData, setQuizData] = useState({
    user: null,
    title: 'My Quiz',
    expiresIn: moment()
      .add(1, 'day')
      .toISOString(),
    isPublic: false,
    questions: [],
    allowedUsers: []
  })

  const setOptions = options => {
    setQuizData({ ...quizData, ...options })
  }

  return (
    <>
      <section className='container'>
        <section className='content col-md-8 mx-auto mt-3'>
          <div className='row'>
            <div className='col'>
              <label htmlFor='title'>Quiz title:</label>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col'>
              <input
                type='text'
                className='form-control form-control-lg mb-0'
                name='title'
                value={quizData.title}
                onChange={e =>
                  setQuizData({ ...quizData, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <QuizOptions
            defaultOptions={{
              isPublic: quizData.isPublic,
              allowedUsers: quizData.allowedUsers,
              expiresIn: quizData.expiresIn
            }}
            setOptions={setOptions}
          />
          {/* <div className='row mb-2'>
              <div className='col'>
                <div className='row'>
                  <div className='col d-flex align-items-center'>
                    <h2 className='mb-2'>
                      1. <span>Question 1</span>
                    </h2>
                    <button className='btn btn-danger btn-sm ml-auto'>
                      Delete
                    </button>
                    <button className='btn btn-primary btn-sm ml-2'>
                      Edit
                    </button>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-sm-6 mr-auto'>
                    <h5>
                      Correct Answer: <span>1</span>
                    </h5>
                  </div>
                </div>
                <div className='answer answer--selected'>
                  <div className='row mt-2'>
                    <div className='col d-flex align-items-start'>
                      <div className='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer1'
                          value='1'
                          checked
                        />
                        <label htmlFor='answer1'>1.</label>
                      </div>
                      <button className='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button className='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label className='px-4' htmlFor='answer1'>
                        Answer 1 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div className='row mt-2'>
                    <div className='col d-flex align-items-start'>
                      <div className='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer2'
                          value='2'
                        />
                        <label htmlFor='answer2'>2.</label>
                      </div>
                      <button className='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button className='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label className='px-4' htmlFor='answer2'>
                        Answer 2 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div className='row mt-2'>
                    <div className='col d-flex align-items-start'>
                      <div className='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer3'
                          value='3'
                        />
                        <label htmlFor='answer3'>3.</label>
                      </div>
                      <button className='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button className='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label className='px-4' htmlFor='answer3'>
                        Answer 3 Text
                      </label>
                    </div>
                  </div>
                </div>

                <div className='row mt-2'>
                  <div className='col d-flex align-items-center justify-content-start'>
                    <button className='btn btn-secondary btn-sm mr-2'>
                      Add Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col d-flex align-items-center justify-content-start'>
                <button className='btn btn-primary btn-sm'>Add Question</button>
              </div>
            </div> */}
        </section>
      </section>
      <Footer />
    </>
  )
}

QuizEditor.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user
})

export default connect(mapStateToProps)(QuizEditor)
