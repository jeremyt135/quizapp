import React from 'react'
import { Answer as QuizAnswer } from 'api'

import AnswerText from './AnswerText'

type Props = {
  id: string
  value: QuizAnswer
  index: number
  correct: boolean
  editing: boolean
  validate: boolean
  onChange: (text: string) => void
  onChecked: (checked: boolean) => void
  onRemove: () => void
}

/**
 * Displays an answer with button to remove itself
 */
const AnswerEditor = ({
  id,
  value,
  index,
  correct,
  editing,
  validate,
  onChange,
  onChecked,
  onRemove
}: Props) => {
  return (
    <>
      <div className={'answer' + (correct ? ' answer--selected' : '')}>
        <div className="row mt-2">
          <div className="col d-flex align-items-start">
            <div className="form-check mb-1">
              <input
                className="form-check-input"
                type="radio"
                name={id}
                id={id}
                value={index}
                onChange={e => {
                  const checked = e.target.checked
                  onChecked(checked)
                }}
                checked={correct}
                disabled={editing}
              />
              <label htmlFor={id}>{index + 1}.</label>
            </div>
            <button
              className="btn btn-danger btn-sm ml-auto"
              onClick={onRemove}
              disabled={editing}>
              Delete
            </button>
          </div>
        </div>
        <AnswerText
          defaultValue={value.text}
          validate={validate}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default AnswerEditor
