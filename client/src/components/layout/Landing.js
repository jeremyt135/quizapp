import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <section>
            <h1 className='display-4'>Quiz Maker</h1>
            <p>
              Assessing others and collecting feedback made easy. Get started
              making quizzes today by signing up for free.
            </p>
            <Link
              className='btn btn-primary btn-lg'
              to='/register'
              role='button'>
              Sign Up
            </Link>
          </section>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <section className='col-md-6'>
            <h2>Streamlined process</h2>
            <p>
              Making and delivering a quiz should be easy. With Quiz Maker,
              making quizzes is as easy as clicking buttons and editing text
              fields.
            </p>
          </section>
          <section className='col-md-6'>
            <h2>Privacy and control</h2>
            <p>
              Quizzes are set to private by default, which restricts access to
              only yourself and a list of allowed users (who can access the quiz
              through its link or their profile). Public quizzes can be accessed
              by anyone with the link.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}

export default Landing
