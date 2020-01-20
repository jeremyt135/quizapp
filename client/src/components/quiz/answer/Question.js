import React, { useState } from 'react'
import Answer from './Answer'

const Question = ({ index: questionIndex, text, answers, onChange }) => {
  const [answerIndex, setAnswerIndex] = useState(0)
  const selectAnswer = index => {
    setAnswerIndex(index)
    onChange(index, questionIndex)
  }
  return (
    <div className='row mb-4'>
      <div className='col'>
        <h2 className='mb-4'>
          {questionIndex + 1}. {text}
        </h2>
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionIndex={questionIndex}
            index={index}
            text={answer.text}
            selected={answerIndex === index}
            onChecked={() => selectAnswer(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
