import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import { quiz } from 'mocks/state'
import clone from 'clone'

import Question from './Question'

describe('Question', () => {
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })

  it('renders without crashing', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        text={question.text}
        answers={answers}
        highlightMissing={false}
        onChange={() => {}}
      />
    )
  })

  it('displays the question number and text', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        text={question.text}
        answers={answers}
        highlightMissing={false}
        onChange={() => {}}
      />
    )
    expect(
      screen.queryByText(`${questionIndex + 1}. ${question.text}`)
    ).not.toBeNull()
  })

  it('renders whatever answers are given', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        text={question.text}
        answers={answers}
        highlightMissing={true}
        onChange={() => {}}
      />
    )
    expect(screen.queryAllByTestId(/answer-choice/)).toHaveLength(
      answers.length
    )
  })

  it('does not display an error if an answer is selected', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        text={question.text}
        answers={answers}
        highlightMissing={true}
        onChange={() => {}}
      />
    )
    const answerInput = screen.getByLabelText(`1. ${answers[0].text}`)
    fireEvent.click(answerInput)
    expect(screen.queryByText(/please select an answer/i)).toBeNull()
  })

  it('displays an error message if no answer is selected', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        text={question.text}
        answers={answers}
        highlightMissing={true}
        onChange={() => {}}
      />
    )
    expect(screen.queryByText(/please select an answer/i)).not.toBeNull()
  })
})
