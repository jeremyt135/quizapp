import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'
import { ResultListing } from 'api'

type Props = {
  result: ResultListing
}

/**
 * Displays the brief info for a user's quiz result
 */
const ResultItem = ({
  result: { quiz: quizId, user: userId, username, score }
}: Props) => {
  const browserHistory = useHistory()
  const goToResult = () => {
    browserHistory.push(`/results?quiz=${quizId}&user=${userId}`)
  }

  return (
    <>
      <Row className="mb-1 align-items-center">
        <Col className="d-flex align-items-center justify-content-start">
          <h5 className="mb-0">Results for {username}:</h5>
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
          <p className="mb-1">Score: {score * 100.0}%</p>
        </Col>
      </Row>
    </>
  )
}

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
}

export default ResultItem
