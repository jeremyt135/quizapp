import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { scoredQuiz, result } from 'mocks/state'

import { Question, ResultAnswer } from 'api'

import ScoredQuestion from './ScoredQuestion'

describe('ScoredQuestion', () => {
  let mockQuestion: Question
  let mockResult: ResultAnswer
  beforeEach(() => {
    mockQuestion = clone(scoredQuiz.questions[0])
    mockResult = clone(result.answers[0])
  })
  it('renders the question text', () => {
    render(<ScoredQuestion index={0} {...mockQuestion} result={mockResult} />)
    expect(screen.queryByText(`1. ${mockQuestion.text}`)).not.toBeNull()
  })
  it('renders the correct answer when given', () => {
    render(<ScoredQuestion index={0} {...mockQuestion} result={mockResult} />)
    expect(
      screen.getByText(`Correct answer: ${mockResult.correctAnswer! + 1}`)
    ).not.toBeNull()
  })
  it('does not render the correct answer text if it is not given', () => {
    render(
      <ScoredQuestion
        index={0}
        {...mockQuestion}
        result={{
          ...mockResult,
          correctAnswer: undefined
        }}
      />
    )
    expect(screen.queryByText(/Correct answer/)).toBeNull()
  })
  it('renders whatever answers are given', () => {
    render(<ScoredQuestion index={0} {...mockQuestion} result={mockResult} />)
    mockQuestion.answers.forEach(answer => {
      expect(screen.queryByText(RegExp(`${answer.text}`))).not.toBeNull()
    })
  })
})
