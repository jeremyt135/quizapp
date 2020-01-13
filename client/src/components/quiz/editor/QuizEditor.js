import React, { useState, useRef } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import moment from 'moment'

import Footer from '../common/Footer'
import Title from './Title'
import Options from './Options'

import '../../../styles/quiz.css'

const defaultOptions = {
  isPublic: false,
  allowedUsers: [],
  expiresIn: moment()
    .add(1, 'day')
    .set('hours', 23)
    .set('minutes', 59)
    .toISOString()
}

const defaultData = {
  user: null,
  title: 'My Quiz',
  questions: [],
  ...defaultOptions
}

/**
 * Displays subforms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditor = ({ isAuthenticated, user }) => {
  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />
  // }

  const quizData = useRef({
    ...defaultData
  })

  const setQuizData = data => {
    console.log(data)
    quizData.current = { ...quizData.current, ...data }
    console.log(quizData.current)
  }

  return (
    <>
      <section className='container'>
        <section className='content col-md-8 mx-auto mt-3'>
          <Title defaultValue={defaultData.title} setQuizData={setQuizData} />
          <Options defaultOptions={defaultOptions} setQuizData={setQuizData} />
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
