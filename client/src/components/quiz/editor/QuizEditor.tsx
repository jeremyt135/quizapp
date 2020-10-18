import React, { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import clone from 'clone'

import { Button } from 'react-bootstrap'

import Footer from '../common/Footer'
import AllowedUsersEditor from './AllowedUsersEditor'
import PublicCheckbox from './PublicCheckbox'
import TitleEditor from './TitleEditor'
import ExpirationEditor from './ExpirationEditor'
import QuestionList from './QuestionList'
import ErrorPage from '../../errors/ErrorPage'
import Spinner from '../../common/Spinner'

import Api, { ApiError } from 'api'
import { useQuiz, useBeforeUnload } from 'hooks'
import { createAlert } from 'store/alerts/thunks'
import { connect, ConnectedProps } from 'react-redux'

import { Quiz } from 'api'

const mapDispatch = {
  createAlert
}

const connector = connect(undefined, mapDispatch)

type Props = ConnectedProps<typeof connector>

const useEdits = (
  initialQuiz: Quiz,
  loading: boolean
): [
  Quiz | undefined,
  React.Dispatch<React.SetStateAction<Quiz | undefined>>
] => {
  const [edits, setEdits] = useState<Quiz>()
  useEffect(() => {
    if (!loading) {
      setEdits({ ...initialQuiz })
    }
  }, [loading])
  return [edits, setEdits]
}

/**
 * Displays forms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditor = ({ createAlert }: Props) => {
  const history = useHistory()
  const { id } = useParams<{ id?: string }>()
  const editing = id != null

  const { quiz: existingQuiz, error: quizError, loading } = useQuiz(id)
  const [submitError, setSubmitError] = useState<ApiError>()

  const [edits, setEdits] = useEdits(existingQuiz, loading)

  useBeforeUnload(e => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  const goToDashboard = () => {
    history.push('/dashboard')
  }

  const submitEdits = () => {
    if (edits) {
      Api.quiz.put(edits).then(res => {
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
          goToDashboard()
        }
      })
    }
  }

  const submitNewQuiz = () => {
    if (edits) {
      Api.quiz.post(edits).then(res => {
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
          goToDashboard()
        }
      })
    }
  }

  const validate = submitError?.status === 400
  if (!edits || loading) {
    return <Spinner />
  } else if (quizError && quizError.status !== 400) {
    return <ErrorPage status={quizError.status} />
  }

  return (
    <>
      <div className="content">
        <div className="quiz-editor container-fluid">
          <div className="row">
            <div className="quiz-editor__block col-sm-8 mx-auto">
              <TitleEditor
                defaultValue={edits!.title}
                validate={validate}
                onChange={title => {
                  setEdits(prev => {
                    if (!prev) return prev
                    return { ...prev, title }
                  })
                }}
              />
              <PublicCheckbox
                defaultValue={edits.isPublic}
                validate={validate}
                onChange={checked => {
                  setEdits(prev => {
                    if (!prev) return prev
                    return { ...prev, isPublic: checked }
                  })
                }}
              />
              {!edits.isPublic ? (
                <AllowedUsersEditor
                  defaultValue={edits.allowedUsers}
                  onChange={users => {
                    setEdits(prev => {
                      if (!prev) return prev
                      return { ...prev, allowedUsers: users }
                    })
                  }}
                />
              ) : null}
              <ExpirationEditor
                defaultValue={edits.expiration}
                editing={editing}
                onChange={exp => {
                  setEdits(prev => {
                    if (!prev) return prev
                    return { ...prev, expiration: exp }
                  })
                }}
              />
              <QuestionList
                value={edits.questions}
                onAdd={question => {
                  setEdits(prev => {
                    if (!prev) return prev
                    return {
                      ...prev,
                      questions: [...prev.questions, clone(question)]
                    }
                  })
                }}
                onRemove={index => {
                  setEdits(prev => {
                    if (!prev) return prev
                    return {
                      ...prev,
                      questions: prev.questions.filter(
                        (_, ind) => ind !== index
                      )
                    }
                  })
                }}
                onChange={(index, question) => {
                  setEdits(prev => {
                    if (!prev) return prev
                    const questions = [...prev.questions]
                    questions[index] = clone(question)
                    return {
                      ...prev,
                      questions
                    }
                  })
                }}
                editing={editing}
                validate={validate}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Button variant="secondary" className="ml-1" onClick={goToDashboard}>
          Cancel
        </Button>
        <Button
          variant="success"
          className="ml-1"
          onClick={() => {
            if (editing) {
              submitEdits()
            } else {
              submitNewQuiz()
            }
          }}>
          {editing ? 'Confirm edits' : 'Submit'}
        </Button>
      </Footer>
    </>
  )
}
export default connector(QuizEditor)
