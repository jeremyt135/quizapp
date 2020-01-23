import React, { useState } from 'react'
import Answer from './Answer'

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
        <h2 className='mb-2'>
          {questionIndex + 1}. {text}
        </h2>
        {highlightMissing && answerIndex === null ? (
          <h5 className='text-danger mb-2'>Please select an answer.</h5>
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
