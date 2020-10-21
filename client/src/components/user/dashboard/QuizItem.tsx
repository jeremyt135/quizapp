import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import { Link, useHistory } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import moment from 'moment'

import { deleteQuiz } from 'store/user/thunks'
import {
  calculateTimeDifference,
  createTimestamp,
  isDateInPast
} from 'util/date'
import { QuizListing } from 'api'

import DeleteButton from './DeleteButton'

const connector = connect(undefined, { deleteQuiz })

type Props = ConnectedProps<typeof connector> & {
  quiz: QuizListing
}

/**
 * Displays the short info listing for a Quiz
 */
const QuizItem = ({
  quiz: { _id: id, title, expiration, date, questionCount, resultsCount },
  deleteQuiz
}: Props) => {
  const browserHistory = useHistory()

  const goToQuizEditor = () => {
    browserHistory.push(`/quizzes/${id}/edit`)
  }

  const goToQuiz = () => {
    browserHistory.push(`/quizzes/${id}`)
  }

  const [isExpired, setIsExpired] = useState(false)
  const [timestamp, setTimestamp] = useState('')

  // calculate if expired
  useEffect(() => {
    const now = moment()
    setTimestamp(createTimestamp(calculateTimeDifference(now, moment(date))))
    setIsExpired(isDateInPast(expiration))
  }, [expiration, date])

  const linkToQuiz = `/quizzes/${id}`
  return (
    <>
      <Row className="mb-1 align-items-center">
        <Col className="d-flex align-items-center justify-content-start">
          <h4 className="mb-0">{title}</h4>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <DeleteButton
            text="Delete"
            onClick={() => deleteQuiz(id!)}
            confirm={true}
            modalConfig={{
              header: 'Confirm Quiz Deletion',
              body:
                'Are you sure you want to delete this quiz? This action is irreversible!',
              confirmText: 'Yes, delete this quiz.'
            }}
          />
          <Button
            variant="info"
            size="sm"
            className="ml-1"
            onClick={() => goToQuizEditor()}>
            Edit
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="ml-1"
            onClick={() => goToQuiz()}>
            Results
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-1">
            {questionCount} {questionCount === 1 ? 'Question' : 'Questions'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-1">
            {resultsCount} {resultsCount === 1 ? 'Response' : 'Responses'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-1">
            Link:{' '}
            <Link target="_blank" to={linkToQuiz}>
              {linkToQuiz}
            </Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex">
          <small className="text-muted text-left">Created {timestamp}</small>
        </Col>
        {isExpired ? (
          <Col className="d-flex flex-row-reverse">
            <small className="text-danger text-right">Expired</small>
          </Col>
        ) : null}
      </Row>
    </>
  )
}

export default connector(QuizItem)
