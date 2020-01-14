import React from 'react'
import PropTypes from 'prop-types'

import QuestionText from './layout/QuestionText'
import CorrectAnswerDisplay from './layout/CorrectAnswerDisplay'
import Answer from './Answer'

/**
 * Displays a question from a quiz with related answers.
 */
const Question = ({ index, value, onChange, remove }) => {
  const questionName = `question${index}`
  const { text, answers, correctAnswer } = value

  const addAnswer = () => {
    onChange(
      {
        text,
        correctAnswer,
        answers: [...answers, { text: '' }]
      },
      index
    )
  }

  const removeAnswer = answerIndex => {
    onChange(
      {
        text,
        answers: answers.filter((v, index) => answerIndex !== index),
        correctAnswer: Math.max(0, correctAnswer - 1)
      },
      index
    )
  }

  const changeText = updatedText => {
    if (updatedText !== text) {
      onChange(
        {
          text: updatedText,
          answers,
          correctAnswer
        },
        index
      )
    }
  }

  const changeAnswer = (updatedAnswer, answerIndex) => {
    answers[answerIndex] = { ...updatedAnswer }
    onChange({ text, answers, correctAnswer }, index)
  }

  const selectAnswer = answerIndex => {
    onChange({ text, answers, correctAnswer: answerIndex }, index)
  }

  return (
    <>
      <div className='row mb-2'>
        <div className='col'>
          <QuestionText
            placeholder={`Question ${index + 1} text...`}
            onBlur={changeText}
          />
          {answers.length > 0 ? (
            <CorrectAnswerDisplay number={correctAnswer + 1} />
          ) : null}
          {answers.map((answer, index) => (
            <Answer
              key={index}
              questionName={questionName}
              index={index}
              text={answer.text}
              correct={correctAnswer === index}
              onChange={changeAnswer}
              onChecked={selectAnswer}
              remove={removeAnswer}
            />
          ))}

          <div className='row mt-2'>
            <div className='col d-flex align-items-center justify-content-start'>
              <button
                className='btn btn-secondary btn-sm mr-2'
                onClick={addAnswer}>
                Add Answer
              </button>
              <button
                className='btn btn-danger btn-sm mr-2'
                onClick={() => remove(index)}>
                Delete Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Question
