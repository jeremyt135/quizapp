import React, { useState } from 'react'

type Props = {
  defaultValue: string
  validate: boolean
  onChange: (text: string) => void
}

const AnswerText = ({ defaultValue, validate, onChange }: Props) => {
  const [text, setText] = useState(defaultValue)
  const isInvalid = validate && text.length === 0

  return (
    <div className="row mb-1">
      <div className="col">
        <input
          type="text"
          className={
            'form-control form-control-sm' + (isInvalid ? ' is-invalid' : '')
          }
          onChange={e => {
            setText(e.target.value)
          }}
          onBlur={e => {
            const text = e.target.value
            setText(text)
            onChange(text)
          }}
          value={text}
          placeholder={`Answer text...`}
          minLength={1}
        />
        {isInvalid ? (
          <div className="invalid-feedback">
            Please enter at least one character.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AnswerText
