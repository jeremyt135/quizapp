import React from 'react'
import PropTypes from 'prop-types'

import ResultItem from './layout/ResultItem'
import Spinner from '../../common/Spinner'

/**
 *
 * @param {object} props Component props
 * @param {[object]} props.results list of results to show
 * @param {boolean} props.loading true if results is still loading
 */
const ResultList = ({ loading, results }) => {
  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='row mb-2 align-items-center'>
        <h3 className='col mb-0'>Your Quiz Results:</h3>
      </div>
      <div className='row mb-2'>
        <div className='col'>
          <ul className='list-group w-100'>
            {results.length === 0 ? (
              <div className='row mb-1 align-items-center'>
                <h6 className='col mb-0'>You haven't taken any quizzes!</h6>
              </div>
            ) : (
              results.map((result, index) => {
                return (
                  <li key={index} className='list-group-item'>
                    <ResultItem
                      title={result.quizTitle}
                      score={result.score}
                      createdBy={result.ownerUsername}
                    />
                  </li>
                )
              })
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

ResultList.propTypes = {
  loading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired
}

export default ResultList
