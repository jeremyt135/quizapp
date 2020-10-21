import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import { v4 as uuid } from 'uuid'

import QuestionEditor from './QuestionEditor'
import { Question } from 'api'

type Props = {
  editing: boolean
  validate: boolean
  value: Question[]
  onAdd: (question: Question) => void
  onRemove: (index: number) => void
  onChange: (index: number, question: Question) => void
}

/**
 * Presentational component that displays a list of Question components
 */
const QuestionList = ({
  editing,
  validate,
  value,
  onAdd,
  onRemove,
  onChange
}: Props) => {
  return (
    <>
      {validate && value.length === 0 ? (
        <Row className="mb-2">
          <Col className=" d-flex align-items-center">
            <h5 className="text-danger mb-0">
              Please add at least one question.
            </h5>
            <Icon path={mdiAlertCircle} size={1} color="red" />
          </Col>
        </Row>
      ) : null}
      {value.map((question, index) => {
        let key: string
        if (question._id) {
          key = question._id
        } else {
          key = uuid()
          question._id = key
        }
        return (
          <QuestionEditor
            key={key}
            id={`question-${index}`}
            label={`Question ${index + 1}:`}
            editing={editing}
            validate={validate}
            value={question}
            onChange={question => {
              onChange(index, question)
            }}
            onRemove={() => {
              onRemove(index)
            }}
          />
        )
      })}
      <Row className="mt-4">
        <Col className="d-flex align-items-center justify-content-start">
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const question = {
                text: '',
                correctAnswer: 0,
                answers: []
              }
              onAdd(question)
            }}
            disabled={editing}>
            Add Question
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default QuestionList
