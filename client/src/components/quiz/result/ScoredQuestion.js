import React from 'react'
import Answer from './Answer'

const ScoredQuestion = ({ index: questionIndex, text, answers, result }) => {
  return (
    <div className='row mb-4'>
      <div className='col'>
        <h3 className='mb-2'>
          {questionIndex + 1}. {text}
        </h3>
        {result.correctAnswer !== undefined ? (
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h5 className='mb-0'>
                Correct answer: {result.correctAnswer + 1}
              </h5>
            </div>
          </div>
        ) : null}
        {answers.map((answer, index) => (
          <Answer
            key={index}
            index={index}
            text={answer.text}
            selected={index === result.choice}
            correct={
              result.correctAnswer !== undefined
                ? result.correctAnswer === index
                : result.isCorrect
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ScoredQuestion
