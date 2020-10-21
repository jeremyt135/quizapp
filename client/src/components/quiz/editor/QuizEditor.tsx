import React, { useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import ErrorPage from '../../errors/ErrorPage'
import Spinner from '../../common/Spinner'

import Api, { ApiError } from 'api'
import { useQuiz, useBeforeUnload } from 'hooks'
import { createAlert } from 'store/alerts/thunks'
import { loadUser } from 'store/user/thunks'

import { connect, ConnectedProps } from 'react-redux'

import { Quiz } from 'api'
import QuizEditorForm from './QuizEditorForm'

const mapDispatch = {
  createAlert,
  loadUser
}

const connector = connect(undefined, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays forms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditor = ({ createAlert, loadUser }: Props) => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()

  const [userQuiz, quizError, loading] = useQuiz(id ?? '', 'full')
  const [submitError, setSubmitError] = useState<ApiError>()

  useBeforeUnload(e => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  const goToDashboard = () => {
    history.push('/dashboard')
  }

  const submitQuiz = (quiz: Quiz) => {
    Api.quiz.put(quiz).then(res => {
      if (res.error) {
        setSubmitError(res.error)
        createAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      } else {
        createAlert({
          msg: 'Quiz edited successfully',
          type: 'success'
        })
        loadUser().then(() => goToDashboard())
      }
    })
  }

  const validate = submitError?.status === 400
  if (loading) {
    return <Spinner />
  } else if (quizError) {
    return <ErrorPage status={quizError.status} />
  }

  return (
    <QuizEditorForm
      defaultValue={userQuiz!}
      cancelSubmit={goToDashboard}
      onSubmit={submitQuiz}
      validate={validate}
      editing={true}
    />
  )
}
export default connector(QuizEditor)
