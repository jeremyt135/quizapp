import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <section class='jumbotron jumbotron-fluid'>
        <div class='container'>
          <h1 class='display-4'>Quiz Maker</h1>
          <p>
            Assessing others and collecting feedback made easy. Ensuring
            response authenticity is easier than ever with the private quiz
            option, available to any registered user.
          </p>
          <hr />
          <p>Get started making quizzes today by signing up for free.</p>
          <Link class='btn btn-primary btn-lg' to='/register' role='button'>
            Sign Up
          </Link>
        </div>
      </section>
      <div class='container'>
        <div class='row'>
          <section class='col-md-6'>
            <h2>Streamlined process</h2>
            <p>
              Making and delivering a quiz should be easy. With Quiz Maker,
              making quizzes is as easy as clicking buttons and editing text
              fields.
            </p>
            <Link
              class='btn btn-secondary btn-lg'
              to='/quiz/create'
              role='button'>
              Make A Quiz
            </Link>
          </section>
          <section class='col-md-6'>
            <h2>Private or public</h2>
            <p>
              Private quizzes allow you to specify who can answer your quiz.
              Want anyone to be able to answer? Public quizzes are available to
              anyone with the link by default.
            </p>
            <Link
              class='btn btn-secondary btn-lg'
              to='/quiz/public'
              role='button'>
              Browse Quizzes
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}

export default Landing
