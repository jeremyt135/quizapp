import React from 'react'

const Answer = ({ questionIndex, index, text, selected, onChecked }) => {
  const question = `question${questionIndex}`
  const answer = `${question}answer${index}`
  return (
    <div className='row mb-2 px-3'>
      <div className='col'>
        <div
          className={
            'form-check mb-0 pt-1 answer' +
            (selected ? ' answer--selected' : '')
          }>
          <input
            className='form-check-input'
            type='radio'
            name={question}
            id={answer}
            value={index}
            onChange={onChecked}
            checked={selected}
          />
          <label htmlFor={answer} className='answer__text'>
            {index + 1}. {text}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Answer
