import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays the brief info for a result
 * @param {object} props Component props
 * @param {string} props.title Title of the quiz
 * @param {number} props.score User's score on quiz
 * @param {string} props.createdBy User who created quiz
 */
const ResultItem = ({ title, score, createdBy }) => {
  return (
    <>
      <div className='row mb-1 align-items-center'>
        <div className='col d-flex align-items-center justify-content-start'>
          <h4 className='mb-0'>{title}</h4>
        </div>
        <div className='col d-flex align-items-center justify-content-end'>
          <button className='btn btn-primary btn-sm ml-1' type='button'>
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
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  createdBy: PropTypes.string.isRequired
}

export default ResultItem
