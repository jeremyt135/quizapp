import React, { useEffect, useRef, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import { Button, Col, Container, Row } from 'react-bootstrap'

import QuestionList from './QuestionList'
import Footer from 'components/quiz/common/Footer'
import Spinner from 'components/common/Spinner'
import ErrorPage from 'components/errors/ErrorPage'
import QuizTakenError from './QuizTakenError'
import QuizExpiredError from './QuizExpiredError'

import { createAlert } from 'store/alerts/thunks'
import { RootState } from 'store/store'

import { isDateInPast } from 'util/date'

import { useQuiz, useSingleResult } from 'hooks'
import Api, { ApiError, FormResponse } from 'api'

const mapState = (state: RootState) => ({
  userId: state.user.user?._id
})

const mapDispatch = {
  createAlert
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays a form for a user to take/answer a quiz.
 */
const QuizAnswerForm = ({ userId, createAlert }: Props) => {
  const browserHistory = useHistory()
  const { id: quizId } = useParams<{ id: string }>()

  const [quiz, quizError, quizLoading] = useQuiz(quizId, 'form')
  const [result, , resultLoading] = useSingleResult(
    quizId,
    userId ?? '',
    'full'
  )
  const [submitError, setSubmitError] = useState<ApiError>()

  const answers = useRef<FormResponse[]>()
  useEffect(() => {
    if (quiz) {
      answers.current = Array.from({ length: quiz.questions.length }, () => {
        return {}
      })
    }
  }, [quiz])

  const goToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  const changeAnswer = (answerIndex: number, questionIndex: number) => {
    answers.current![questionIndex].choice = answerIndex
  }

  const submitAnswers = () => {
    Api.results.post(quizId!, answers.current!).then(res => {
      if (res.error) {
        createAlert({
          msg:
            'Failed to submit answers - are there invalid or missing answers?',
          type: 'danger'
        })
        setSubmitError(res.error)
      } else {
        createAlert({
          msg: 'Quiz answers submitted successfully',
          type: 'success'
        })
        goToDashboard()
      }
    })
  }

  if (quizLoading || resultLoading) {
    return <Spinner />
  } else if (quizError) {
    const status = quizError.status
    if (status === 403 && quizError.errors.length > 0) {
      const expired = quizError.errors.some(e => e.hasOwnProperty('expiration'))
      if (expired) {
        return <QuizExpiredError />
      }
    } else if (status !== 400) {
      return <ErrorPage status={status} />
    }
  } else if (result) {
    // Result already exists on server for this user
    return <QuizTakenError />
  } else if (isDateInPast(quiz!.expiration)) {
    // Quiz has expired
    return <QuizExpiredError />
  }

  return (
    <>
      <div data-testid="quiz-answer-form" className="content">
        <Container fluid className="quiz-answer-form">
          <Row>
            <Col sm={8} className="quiz-answer-form__block mx-auto mt-3">
              <Row className="mb-4">
                <Col className="d-flex align-items-center">
                  <h1 className="mb-0">{quiz!.title}</h1>
                </Col>
              </Row>
              <Row className="row mb-4">
                <Col className="d-flex align-items-center">
                  <h3>By {quiz!.user}</h3>
                </Col>
              </Row>
              <QuestionList
                error={submitError}
                questions={quiz!.questions}
                onChange={changeAnswer}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer>
        <Button variant="secondary" className="ml-1" onClick={goToDashboard}>
          Cancel
        </Button>
        <Button variant="success" className="ml-1" onClick={submitAnswers}>
          Submit
        </Button>
      </Footer>
    </>
  )
}

export default connector(QuizAnswerForm)
