import React, { useState } from 'react'

type Props = {
  defaultValue: string
  onChange: (title: string) => void
  validate: boolean
}

const TitleEditor = ({ defaultValue, onChange, validate }: Props) => {
  const [text, setText] = useState(defaultValue)
  const isInvalid = validate && text.length === 0

  return (
    <>
      <div className="row">
        <div className="col">
          <label htmlFor="quizTitle">Quiz Title:</label>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className={
              'form-control form-control-lg mb-0 ' +
              (isInvalid ? ' is-invalid' : '')
            }
            id="quizTitle"
            value={text}
            placeholder={'Quiz Title...'}
            onChange={e => {
              const text = e.target.value
              setText(text)
              onChange(text)
            }}
            minLength={1}
          />
          {isInvalid ? (
            <div className="invalid-feedback">
              Please enter at least one character.
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default TitleEditor
