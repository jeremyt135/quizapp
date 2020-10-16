import React from 'react'
import Answer from './Answer'
import PropTypes from 'prop-types'

/**
 * Displays a single scored question from a quiz
 * @param {object} props
 * @param {number} props.index Index of question
 * @param {string} props.text Question text
 * @param {Array<{ text: string }>} props.answers Answers to question
 * @param {{ correctAnswer?: number, isCorrect: boolean }} props.result Result data
 */
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

ScoredQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  result: PropTypes.object.isRequired
}

export default ScoredQuestion
