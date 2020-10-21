import { ResultListing } from 'api'
import React from 'react'

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
      <div className="row mb-1 align-items-center">
        <div className="col d-flex align-items-center justify-content-start">
          <h4 className="mb-0">{title}</h4>
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
        <small className="col text-muted text-left">by {createdBy} </small>
      </div>
      <div className="row">
        <div className="col">
          <p className="mb-1">Score: {score * 100.0}%</p>
        </div>
      </div>
    </>
  )
}

export default ResultItem
