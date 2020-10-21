import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { quiz } from 'mocks/state'

import QuestionList from './QuestionList'

describe('QuestionList', () => {
  const error400 = { status: 400, errors: [] }
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })
  it('renders without crashing', () => {
    render(<QuestionList questions={mockState.questions} onChange={() => {}} />)
  })
  it('should display questions with errors when error state is not null', () => {
    render(
      <QuestionList
        error={error400}
        questions={mockState.questions}
        onChange={() => {}}
      />
    )
    expect(screen.queryAllByText(/please select an answer/i)).toHaveLength(
      mockState.questions.length
    )
  })
})
