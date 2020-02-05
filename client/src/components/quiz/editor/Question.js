import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import clone from 'clone'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import QuestionText from './QuestionText'
import CorrectAnswerDisplay from './CorrectAnswerDisplay'
import Answer from './Answer'

import {
  addAnswer,
  removeAnswer,
  changeQuestion,
  removeQuestion
} from '../../../actions/editor'

/**
 * Displays a question from a quiz with related answers.
 * @param {object} props Component props
 * @param {number} props.index Index of this question in the list
 * @param {status: number, errors: [object]} props.error Editor error state
 * @param {boolean} props.editing True if question is being edited
 * @param {{text: string, correctAnswer: number, answers: Array}} props.question Question data
 * @param {function} props.removeQuestion function to invoke when Question should be removed
 * @param {function} props.addAnswer function to add answer
 * @param {function} props.removeAnswer function to remove answer
 * @param {function} props.changeQuestion function to change question
 */
const Question = memo(
  ({
    index,
    error,
    editing,
    question,
    addAnswer,
    removeAnswer,
    changeQuestion,
    removeQuestion
  }) => {
    const { text, answers, correctAnswer } = question
    const questionName = `question${index}`

    const changeText = text => {
      changeQuestion(index, { text })
    }

    const changeAnswerText = (answerIndex, text) => {
      const nextAnswers = clone(answers)
      nextAnswers[answerIndex].text = text
      changeQuestion(index, { answers: nextAnswers })
    }

    const changeCorrectAnswer = answerIndex => {
      changeQuestion(index, { correctAnswer: answerIndex })
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
                    {error && error.status === 400 && answers.length < 2 ? (
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
              index={index}
              defaultValue={text}
              onBlur={changeText}
              error={error}
            />
            {answers.length > 0 ? (
              <CorrectAnswerDisplay number={correctAnswer + 1} />
            ) : null}
            {answers.map((answer, answerIndex) => (
              <Answer
                key={answerIndex}
                questionName={questionName}
                index={answerIndex}
                defaultText={answer.text}
                correct={correctAnswer === answerIndex}
                handleTextChange={changeAnswerText}
                handleChecked={changeCorrectAnswer}
                removeAnswer={() => removeAnswer(index, answerIndex)}
                disabled={editing}
                error={error}
              />
            ))}

            <div className='row mt-2'>
              <div className='col d-flex align-items-center justify-content-start'>
                <button
                  className='btn btn-secondary btn-sm mr-2'
                  onClick={() => addAnswer(index)}
                  disabled={editing}>
                  Add Answer
                </button>
                <button
                  className='btn btn-danger btn-sm mr-2'
                  onClick={() => removeQuestion(index)}
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
)

const mapStateToProps = (state, ownProps) => ({
  question: state.editor.quiz.questions[ownProps.index],
  editing: state.editor.editing,
  error: state.editor.error
})

Question.propTypes = {
  index: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  error: PropTypes.object,
  question: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  addAnswer,
  removeAnswer,
  changeQuestion,
  removeQuestion
})(Question)
