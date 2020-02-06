import React from 'react'
import { Link } from 'react-router-dom'

/**
 * The homepage of the website.
 */
const Landing = () => {
  return (
    <>
      <div className='jumbotron jumbotron-fluid qa-jumbotron'>
        <div className='container'>
          <section>
            <h1 className='display-4'>QuizNow</h1>
            <p>
              Assessing others and collecting feedback made easy. Get started
              making quizzes for your class or organization today by signing up
              for free.
            </p>
            <Link
              className='btn btn-signup btn-lg'
              to='/register'
              role='button'>
              Sign Up
            </Link>
          </section>
        </div>
      </div>
      <div className='container qa-info'>
        <div className='row mb-4'>
          <section className='col d-flex justify-content-center '>
            <h2>Why QuizNow?</h2>
          </section>
        </div>
        <div className='row'>
          <section className='col-md-4'>
            <h3 className='text-center'>Streamlined process</h3>
            <p className='text-justify'>
              Making and delivering quizzes should be easy. With QuizNow, making
              quizzes is as easy as clicking buttons and editing text fields.
              Deliver your quizzes by sharing its direct link.
            </p>
          </section>
          <section className='col-md-4'>
            <h3 className='text-center'>Full control</h3>
            <p className='text-justify'>
              Control who can answer a quiz by setting it to private. Quizzes
              also have expiration dates to ensure timely responses.
            </p>
          </section>
          <section className='col-md-4'>
            <h3 className='text-center'>Instant feedback</h3>
            <p className='text-justify'>
              Quiz results are instant and can be found on users' dashboards.
              Quiz administrators can also view results for quiz takers.
            </p>
          </section>
        </div>
        <div className='row mb-4'>
          <section className='col d-flex justify-content-center '>
            <h2>Quick Start</h2>
          </section>
        </div>
        <div className='row'>
          <section className='col-md-4'>
            <h3 className='text-center'>
              <span className='circled-number'>1</span>
            </h3>
            <p className='text-justify'></p>
          </section>
          <section className='col-md-4'>
            <h3 className='text-center'>
              <span className='circled-number'>2</span>
            </h3>
            <p className='text-justify'></p>
          </section>
          <section className='col-md-4'>
            <h3 className='text-center'>
              <span className='circled-number'>3</span>
            </h3>
            <p className='text-justify'></p>
          </section>
        </div>
      </div>
    </>
  )
}

export default Landing
