import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

/**
 * Displays the brief info for a result
 * @param {object} props Component props
 * @param {object} props.result Result object
 * @param {string} props.result.quizTitle Title of the quiz
 * @param {number} props.result.score User's score on quiz
 * @param {string} props.result.ownerUsername User who created quiz
 */
const ResultItem = ({
  result: {
    quiz: quizId,
    user: userId,
    quizTitle: title,
    score,
    ownerUsername: createdBy
  }
}) => {
  const browserHistory = useHistory()
  const goToResult = () => {
    browserHistory.push(`/results?quiz=${quizId}&user=${userId}`)
  }
  return (
    <>
      <div className='row mb-1 align-items-center'>
        <div className='col d-flex align-items-center justify-content-start'>
          <h4 className='mb-0'>{title}</h4>
        </div>
        <div className='col d-flex align-items-center justify-content-end'>
          <button
            className='btn btn-primary btn-sm ml-1'
            type='button'
            onClick={() => goToResult()}>
            Details
          </button>
        </div>
      </div>
      <div className='row'>
        <small className='col text-muted text-left'>by {createdBy} </small>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>Score: {score * 100.0}%</p>
        </div>
      </div>
    </>
  )
}

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
}

export default ResultItem
