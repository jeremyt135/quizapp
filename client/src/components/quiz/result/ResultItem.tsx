import React from 'react'
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
      <div className="row mb-1 align-items-center">
        <div className="col d-flex align-items-center justify-content-start">
          <h5 className="mb-0">Results for {username}:</h5>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <button
            className="btn btn-primary btn-sm ml-1"
            type="button"
            onClick={() => goToResult()}>
            Details
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="mb-1">Score: {score * 100.0}%</p>
        </div>
      </div>
    </>
  )
}

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
}

export default ResultItem
