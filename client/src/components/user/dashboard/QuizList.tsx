import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { QuizListing } from 'api'

import Spinner from 'components/common/Spinner'
import QuizItem from './QuizItem'

type Props = {
  loading: boolean
  quizzes: QuizListing[]
}

/**
 * Displays a list of Quizzes created by the user with buttons to navigate
 * to the QuizEditor or full Quiz.
 */
const QuizList = ({ loading, quizzes }: Props) => {
  return (
    <>
      <Row className="row mb-2 align-items-center">
        <Col>
          <h3 className="mb-0">Quizzes You Created:</h3>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Row className="mb-2 align-items-center">
                <Col>
                  <h6 className="mb-0">
                    {quizzes.length === 0
                      ? "You haven't made any quizzes!"
                      : ''}
                  </h6>
                </Col>
              </Row>

              <Row className="mb-1 align-items-center">
                <Col>
                  <Link
                    to="/quizzes/create"
                    className="btn btn-success btn-sm ml-auto">
                    Create A Quiz
                  </Link>
                </Col>
              </Row>

              <ListGroup className="w-100">
                {quizzes.map((quiz, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <QuizItem quiz={quiz} />
                    </ListGroup.Item>
                  )
                })}
              </ListGroup>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default QuizList
