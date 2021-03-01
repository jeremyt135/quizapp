import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import { Button, Col, Container, Row } from 'react-bootstrap'

import Footer from 'components/quiz/common/Footer'
import Spinner from 'components/common/Spinner'
import ScoredQuestionList from './ScoredQuestionList'
import ErrorPage from 'components/errors/ErrorPage'

import { useQuery, useQuiz, useSingleResult } from 'hooks'
import { createAlert } from 'store/alerts/thunks'

const mapDispatch = { createAlert }
const connector = connect(undefined, mapDispatch)

type Props = ConnectedProps<typeof connector>

const colSize = {
  sm: 10,
  md: 8,
  lg: 7,
  xl: 6
}

/**
 * Displays a single quiz result.
 */
const QuizResult = ({ createAlert }: Props) => {
  const browserHistory = useHistory()
  const query = useQuery()
  const quizId = query.get('quiz')
  const userId = query.get('user')

  const [quiz, quizError, quizLoading] = useQuiz(quizId ?? '', 'form')
  const [result, resultError, resultLoading] = useSingleResult(
    quizId ?? '',
    userId ?? '',
    'full'
  )

  if (quizLoading || resultLoading) {
    return <Spinner />
  } else if (resultError && resultError.status !== 404) {
    createAlert({
      msg: "We couldn't load your quiz results right now.",
      type: 'danger'
    })
    return <ErrorPage status={resultError.status} />
  } else if (quizError) {
    createAlert({
      msg: "We couldn't load your quiz right now.",
      type: 'danger'
    })
    return <ErrorPage status={quizError.status} />
  }

  return (
    <>
      <div className="content">
        <Container fluid className="quiz-results">
          <Row>
            <Col {...colSize} className="quiz-results__block mx-auto">
              <Row className="mb-4">
                <Col className="d-flex align-items-center">
                  <h2 className="mb-0">
                    {result!.username}'s results for: <br />"{quiz!.title}"
                  </h2>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col className="d-flex align-items-center">
                  <h4>By {quiz!.user}</h4>
                </Col>
              </Row>
              <hr />
              <Row className="mb-4">
                <Col className="d-flex align-items-center">
                  <h3 className="mb-0">
                    Overall score: {result!.score * 100.0}%
                  </h3>
                </Col>
              </Row>
              <hr />
              <Row className="mb-4">
                <Col className="d-flex align-items-center">
                  <h3 className="mb-0">Graded questions:</h3>
                </Col>
              </Row>
              <ScoredQuestionList
                questions={quiz!.questions}
                results={result!.answers}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Footer>
        <Button
          variant="success"
          className="ml-1"
          onClick={() => browserHistory.goBack()}>
          Go back
        </Button>
      </Footer>
    </>
  )
}

export default connector(QuizResult)
