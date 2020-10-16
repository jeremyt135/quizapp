import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import { quiz } from 'mocks/state'

import Answer from './Answer'
import clone from 'clone'

describe('Answer', () => {
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })
  it('renders without crashing', () => {
    const questionIndex = 0
    const answers = mockState.quiz!.questions[questionIndex].answers
    const answerIndex = 0
    render(
      <Answer
        questionIndex={questionIndex}
        index={answerIndex}
        text={answers[answerIndex].text}
        selected={false}
        onChecked={() => {}}
      />
    )
  })
  it('renders the question index and answer text', () => {
    const questionIndex = 0
    const answers = mockState.quiz!.questions[questionIndex].answers
    const answerIndex = 1
    const text = answers[answerIndex].text
    render(
      <Answer
        questionIndex={questionIndex}
        index={answerIndex}
        text={text}
        selected={false}
        onChecked={() => {}}
      />
    )
    expect(screen.getByText(`${answerIndex + 1}. ${text}`)).not.toBeNull()
  })
  it('highlights the answer with answer--selected if selected', () => {
    const questionIndex = 0
    const answers = mockState.quiz!.questions[questionIndex].answers
    const answerIndex = 0
    render(
      <Answer
        questionIndex={questionIndex}
        index={answerIndex}
        text={answers[answerIndex].text}
        selected={true}
        onChecked={() => {}}
      />
    )
    expect(
      screen.queryByTestId(`answer-choice-${answerIndex}`)?.classList
    ).toContain('answer--selected')
  })
})
