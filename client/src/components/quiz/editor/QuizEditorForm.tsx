import React, { useState } from 'react'

import clone from 'clone'

import { Button } from 'react-bootstrap'

import Footer from 'components/quiz/common/Footer'
import AllowedUsersEditor from './AllowedUsersEditor'
import PublicCheckbox from './PublicCheckbox'
import TitleEditor from './TitleEditor'
import ExpirationEditor from './ExpirationEditor'
import QuestionList from './QuestionList'

import { useBeforeUnload } from 'hooks'

import { Quiz } from 'api'

type Props = {
  defaultValue: Quiz
  cancelSubmit: () => void
  onSubmit: (quiz: Quiz) => void
  editing: boolean
  validate: boolean
}

/**
 * Displays forms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditorForm = ({
  defaultValue,
  onSubmit,
  cancelSubmit,
  editing,
  validate
}: Props) => {
  const [quiz, setQuiz] = useState<Quiz>(defaultValue)

  useBeforeUnload(e => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  return (
    <>
      <div className="content">
        <div className="quiz-editor container-fluid">
          <div className="row">
            <div className="quiz-editor__block col-sm-8 mx-auto">
              <TitleEditor
                defaultValue={quiz.title}
                validate={validate}
                onChange={title => {
                  setQuiz(prev => {
                    return { ...prev, title }
                  })
                }}
              />
              <PublicCheckbox
                defaultValue={quiz.isPublic}
                validate={validate}
                onChange={checked => {
                  setQuiz(prev => {
                    return { ...prev, isPublic: checked }
                  })
                }}
              />
              {!quiz.isPublic ? (
                <AllowedUsersEditor
                  defaultValue={quiz.allowedUsers}
                  onChange={users => {
                    setQuiz(prev => {
                      return { ...prev, allowedUsers: users }
                    })
                  }}
                />
              ) : null}
              <ExpirationEditor
                defaultValue={quiz.expiration}
                editing={editing}
                onChange={exp => {
                  setQuiz(prev => {
                    return { ...prev, expiration: exp }
                  })
                }}
              />
              <QuestionList
                value={quiz.questions}
                onAdd={question => {
                  setQuiz(prev => {
                    return {
                      ...prev,
                      questions: [...prev.questions, clone(question)]
                    }
                  })
                }}
                onRemove={index => {
                  setQuiz(prev => {
                    return {
                      ...prev,
                      questions: prev.questions.filter(
                        (_, ind) => ind !== index
                      )
                    }
                  })
                }}
                onChange={(index, question) => {
                  setQuiz(prev => {
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
        <Button variant="secondary" className="ml-1" onClick={cancelSubmit}>
          Cancel
        </Button>
        <Button
          variant="success"
          className="ml-1"
          onClick={() => {
            onSubmit(quiz)
          }}>
          {editing ? 'Confirm Edits' : 'Submit'}
        </Button>
      </Footer>
    </>
  )
}
export default QuizEditorForm
