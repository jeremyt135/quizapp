import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const contentSize = {
  md: 10,
  lg: 9,
  xl: 8
}

/**
 * The homepage of the website.
 */
const Landing = () => {
  return (
    <>
      <Jumbotron fluid className="mb-0">
        <Container>
          <Row>
            <Col {...contentSize} className="mx-auto">
              <h1 className="display-4">QuizNow</h1>
              <p>
                Assessing others and collecting feedback made easy. Get started
                making quizzes for your class or organization today by signing
                up for free.
              </p>
              <Link
                className="btn btn-signup btn-lg"
                to="/register"
                role="button">
                Sign Up
              </Link>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container fluid>
        <Row className="info info--about">
          <Col {...contentSize} className="mx-auto">
            <Row className="mb-4">
              <Col className="d-flex flex-column justify-content-center align-items-center ">
                <h2>Features</h2>
                <p className="text-justify">
                  QuizNow is packed with features without overcomplicating
                  things, allowing you to make quizzes fast.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <h3 className="text-center">Streamlined process</h3>
                <p className="text-justify">
                  Making and delivering quizzes should be easy. With QuizNow,
                  making quizzes is as easy as clicking buttons and editing text
                  fields. Deliver your quizzes by sharing its direct link.
                </p>
              </Col>
              <Col md={4}>
                <h3 className="text-center">Full control</h3>
                <p className="text-justify">
                  Control who can answer a quiz by setting it to private.
                  Quizzes also have expiration dates to ensure timely responses.
                </p>
              </Col>
              <Col md={4}>
                <h3 className="text-center">Instant feedback</h3>
                <p className="text-justify">
                  Quiz results are instant and can be found on users'
                  dashboards. Quiz administrators can also view results for quiz
                  takers.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="info info--quickstart">
          <Col {...contentSize} className="mx-auto">
            <Row className="mb-4">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <h2>How it works</h2>
                <p className="text-justify">
                  The process of making and delivering quizzes is quicker than
                  ever with QuizNow and takes only a few steps.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="circled-number" role="heading">
                  1
                </div>
                <p className="text-justify">
                  Register for a free account or login to your existing one.
                  Make sure your audience has also registered.
                </p>
              </Col>
              <Col>
                <div className="circled-number" role="heading">
                  2
                </div>
                <p className="text-justify">
                  Click the create a quiz button on the dashboard, and edit your
                  quiz as you see fit. You can change the title, allowed users,
                  expiration date, questions, and more.
                </p>
              </Col>
              <Col>
                <div className="circled-number" role="heading">
                  3
                </div>
                <p className="text-justify">
                  Your dashboard will show the link to your quiz. Share this
                  link with other users so they can take your quiz. Results for
                  your quiz can be found through the dashboard.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container fluid className="landing-footer">
        <Row className="h-100">
          <Col className="d-flex align-items-center justify-content-end">
            <p className="mb-0">
              A project by
              <a
                href="https://github.com/jeremyt135/"
                target="_blank"
                rel="noreferrer noopener">
                {' '}
                Jeremy Taylor
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Landing
