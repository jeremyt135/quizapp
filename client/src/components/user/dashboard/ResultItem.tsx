import { ResultListing } from 'api'
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'

type Props = {
  result: ResultListing
}

/**
 * Displays a ResultListing with buttons to navigate to the full Result.
 */
const ResultItem = ({
  result: {
    quiz: quizId,
    user: userId,
    quizTitle: title,
    score,
    ownerUsername: createdBy
  }
}: Props) => {
  const browserHistory = useHistory()
  const goToResult = () => {
    browserHistory.push(`/results?quiz=${quizId}&user=${userId}`)
  }
  return (
    <>
      <Row className="mb-1 align-items-center">
        <Col className="d-flex align-items-center justify-content-start">
          <h4 className="mb-0">{title}</h4>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <Button
            variant="primary"
            size="sm"
            className="ml-1"
            onClick={() => goToResult()}>
            Details
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <small className="text-muted text-left">by {createdBy} </small>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="mb-1">Score: {score * 100.0}%</p>
        </Col>
      </Row>
    </>
  )
}

export default ResultItem
