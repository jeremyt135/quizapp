import React from 'react'

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
      <div className="row mb-2 align-items-center">
        <h3 className="col mb-0">Your Quiz Results:</h3>
      </div>

      <div className="row mb-2">
        <div className="col">
          {loading ? (
            <Spinner />
          ) : (
            <ul className="list-group w-100">
              {results.length === 0 ? (
                <div className="row mb-1 align-items-center">
                  <h6 className="col mb-0">You haven't taken any quizzes!</h6>
                </div>
              ) : (
                results.map((result, index) => {
                  return (
                    <li key={index} className="list-group-item">
                      <ResultItem result={result} />
                    </li>
                  )
                })
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default ResultList
