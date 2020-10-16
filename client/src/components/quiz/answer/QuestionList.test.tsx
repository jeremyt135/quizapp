import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { quiz } from 'mocks/state'

import QuestionList from './QuestionList'

describe('QuestionList', () => {
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })
  it('renders without crashing', () => {
    render(
      <QuestionList
        error={mockState.error!}
        questions={mockState.quiz!.questions}
        onChange={() => {}}
      />
    )
  })
  it('should display questions with errors when error state is not null', () => {
    mockState.error = { status: 400, errors: [] }
    render(
      <QuestionList
        error={mockState.error}
        questions={mockState.quiz!.questions}
        onChange={() => {}}
      />
    )
    expect(screen.queryAllByText(/please select an answer/i)).toHaveLength(
      mockState.quiz!.questions.length
    )
  })
})
