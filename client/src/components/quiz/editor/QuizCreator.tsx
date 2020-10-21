import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import moment from 'moment'

import Api, { ApiError } from 'api'
import { useBeforeUnload } from 'hooks'
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
const QuizCreator = ({ createAlert, loadUser }: Props) => {
  const history = useHistory()

  const defaultQuiz = {
    title: '',
    isPublic: true,
    allowedUsers: [],
    date: moment().toISOString(),
    expiration: moment().add(1, 'd').toISOString(),
    questions: []
  }
  const [submitError, setSubmitError] = useState<ApiError>()

  useBeforeUnload(e => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  const goToDashboard = () => {
    history.push('/dashboard')
  }

  const submitQuiz = (quiz: Quiz) => {
    Api.quiz.post(quiz).then(res => {
      if (res.error) {
        setSubmitError(res.error)
        createAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      } else {
        createAlert({
          msg: 'Quiz created successfully',
          type: 'success'
        })
        loadUser().then(() => goToDashboard())
      }
    })
  }

  const validate = submitError?.status === 400

  return (
    <QuizEditorForm
      defaultValue={defaultQuiz}
      cancelSubmit={goToDashboard}
      onSubmit={submitQuiz}
      validate={validate}
      editing={false}
    />
  )
}
export default connector(QuizCreator)
