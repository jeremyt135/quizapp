import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'

import ResultItem from './ResultItem'
import Spinner from 'components/common/Spinner'
import { ResultListing } from 'api'

type Props = {
  loading: boolean
  results: ResultListing[]
}

/**
 *
 * @param {object} props Component props
 * @param {[object]} props.results list of results to show
 * @param {boolean} props.loading true if results is still loading
 */
const ResultList = ({ loading, results }: Props) => {
  return (
    <>
      <Row className="mb-2 align-items-center">
        <Col>
          <h3 className="mb-0">Your Quiz Results:</h3>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
          {loading ? (
            <Spinner />
          ) : (
            <ListGroup className=" w-100">
              {results.length === 0 ? (
                <Row className="mb-1 align-items-center">
                  <Col>
                    <h6 className="mb-0">You haven't taken any quizzes!</h6>
                  </Col>
                </Row>
              ) : (
                results.map((result, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <ResultItem result={result} />
                    </ListGroup.Item>
                  )
                })
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ResultList
