import React from 'react'

type Props = {
  questionIndex: number
  index: number
  text: string
  selected: boolean
  /**
   * Callback for when the user selects this Answer
   */
  onChecked: () => void
}

/**
 * Displays one answer for a question.
 */
const Answer = ({ questionIndex, index, text, selected, onChecked }: Props) => {
  const question = `question${questionIndex}`
  const answer = `${question}answer${index}`
  return (
    <div className="row mb-2 px-3">
      <div className="col">
        <div
          data-testid={`answer-choice-${index}`}
          className={
            'form-check mb-0 pt-1 answer' +
            (selected ? ' answer--selected' : '')
          }>
          <input
            className="form-check-input"
            type="radio"
            name={question}
            id={answer}
            value={index}
            onChange={onChecked}
            checked={selected}
          />
          <label htmlFor={answer} className="answer__text">
            {index + 1}. {text}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Answer
