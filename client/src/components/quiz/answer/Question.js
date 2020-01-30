import React, { useState } from 'react'
import Answer from './Answer'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
const Question = ({
  index: questionIndex,
  text,
  answers,
  highlightMissing,
  onChange
}) => {
  const [answerIndex, setAnswerIndex] = useState(null)
  const selectAnswer = index => {
    setAnswerIndex(index)
    onChange(index, questionIndex)
  }
  return (
    <div className='row'>
      <div className='col'>
        <div className='row mb-2'>
          <h2 className='col mb-0'>
            {questionIndex + 1}. {text}{' '}
          </h2>
        </div>
        {highlightMissing && answerIndex === null ? (
          <div className='row mb-2'>
            <div className='col d-flex align-items-center '>
              <h5 className='text-danger mb-0'>Please select an answer. </h5>
              <Icon path={mdiAlertCircle} size={1} color='red' />
            </div>
          </div>
        ) : null}
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionIndex={questionIndex}
            index={index}
            text={answer.text}
            selected={answerIndex !== null && answerIndex === index}
            onChecked={() => selectAnswer(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
