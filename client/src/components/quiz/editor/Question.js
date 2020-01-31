import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import uuidv4 from 'uuid/v4'

import QuestionText from './layout/QuestionText'
import CorrectAnswerDisplay from './layout/CorrectAnswerDisplay'
import Answer from './Answer'

/**
 * Callback for changing Question data in QuizEditor
 *
 * @callback onChange
 * @param {{text: string, correctAnswer: number, answers: Array}} question Question data
 * @param {number} questionIndex
 */

/**
 * Callback for removing a Question
 * @callback remove
 * @param {number} questionIndex
 */

/**
 * Displays a question from a quiz with related answers.
 * @param {object} props Component props
 * @param {number} props.index Index of this question in the list
 * @param {boolean} props.editing True if question is being edited
 * @param {{text: string, correctAnswer: number, answers: Array}} props.defaultValue Default Question data
 * @param {onChange} props.onChange function to invoke when Question data changes
 * @param {remove} props.remove function to invoke when Question should be removed
 */
const Question = ({ index, editing, defaultValue, onChange, remove }) => {
  // Name of the question to use as ID for labels
  const questionName = `question${index}`
  // Text value for question text field
  const [text, setText] = useState(defaultValue.text)
  // Index of the correct answer
  const [correctAnswer, setCorrectAnswer] = useState(
    defaultValue.correctAnswer || 0
  )
  const answers = defaultValue.answers

  const changeText = e => {
    setText(e.target.value)
    onChange(
      {
        text: e.target.value,
        answers,
        correctAnswer
      },
      index
    )
  }

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
    const updatedCorrectAnswer = Math.max(0, correctAnswer - 1)
    setCorrectAnswer(updatedCorrectAnswer)
    onChange(
      {
        text,
        answers: [
          ...answers.slice(0, answerIndex),
          ...answers.slice(answerIndex + 1)
        ],
        correctAnswer: updatedCorrectAnswer
      },
      index
    )
  }

  const changeAnswer = (updatedAnswer, answerIndex) => {
    answers[answerIndex] = { ...updatedAnswer }
    onChange({ text, answers: [...answers], correctAnswer }, index)
  }

  const selectAnswer = answerIndex => {
    setCorrectAnswer(answerIndex)
    onChange({ text, answers, correctAnswer: answerIndex }, index)
  }

  return (
    <>
      <div className='row mb-2'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <div className='row'>
                <label
                  className='col d-flex align-items-center'
                  htmlFor={questionName}>
                  Question {index + 1}
                  {answers.length < 2 ? (
                    <span className='px-3 d-inline-flex align-items-center text-danger'>
                      Please add at least two answers.
                      <Icon path={mdiAlertCircle} size={0.8} color='red' />
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
          <QuestionText
            text={text}
            id={questionName}
            placeholder={`Question ${index + 1} text...`}
            onChange={changeText}
          />
          {answers.length > 0 ? (
            <CorrectAnswerDisplay number={correctAnswer + 1} />
          ) : null}
          {answers.map((answer, index) => (
            <Answer
              key={uuidv4()}
              questionName={questionName}
              index={index}
              defaultValue={answer.text}
              correct={correctAnswer === index}
              onChange={changeAnswer}
              onChecked={selectAnswer}
              disabled={editing}
              remove={removeAnswer}
            />
          ))}

          <div className='row mt-2'>
            <div className='col d-flex align-items-center justify-content-start'>
              <button
                className='btn btn-secondary btn-sm mr-2'
                onClick={addAnswer}
                disabled={editing}>
                Add Answer
              </button>
              <button
                className='btn btn-danger btn-sm mr-2'
                onClick={() => remove(index)}
                disabled={editing}>
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
  editing: PropTypes.bool.isRequired,
  defaultValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Question
