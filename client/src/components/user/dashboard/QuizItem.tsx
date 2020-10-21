import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { deleteQuiz } from '../../../store/user/thunks'
import DeleteButton from './DeleteButton'
import moment from 'moment'

import {
  calculateTimeDifference,
  createTimestamp,
  isDateInPast
} from 'util/date'
import { QuizListing } from 'api'

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
  const now = moment()
  useEffect(() => {
    setTimestamp(createTimestamp(calculateTimeDifference(now, moment(date))))
    setIsExpired(isDateInPast(expiration))
  }, [expiration, date])

  return (
    <>
      <div className="row mb-1 align-items-center">
        <div className="col d-flex align-items-center justify-content-start">
          <h4 className="mb-0">{title}</h4>
        </div>
        <div className="col d-flex align-items-center justify-content-end">
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
          <button
            className="btn btn-info btn-sm ml-1"
            type="button"
            onClick={() => goToQuizEditor()}>
            Edit
          </button>
          <button
            className="btn btn-primary btn-sm ml-1"
            type="button"
            onClick={() => goToQuiz()}>
            Results
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="mb-1">
            {questionCount} {questionCount === 1 ? 'Question' : 'Questions'}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="mb-1">
            {resultsCount} {resultsCount === 1 ? 'Response' : 'Responses'}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="mb-1">Link: quizzes/{id}</p>
        </div>
      </div>
      <div className="row">
        <small className="col text-muted text-left">Created {timestamp}</small>
        {isExpired ? (
          <small className="col text-danger text-right">Expired</small>
        ) : null}
      </div>
    </>
  )
}

export default connector(QuizItem)
