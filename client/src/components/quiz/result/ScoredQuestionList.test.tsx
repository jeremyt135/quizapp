import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { quiz, result } from 'mocks/state'

import { FormQuestion as QuizQuestion, ResultAnswer } from 'api'

import ScoredQuestionList from './ScoredQuestionList'

describe('ScoredQuestionList', () => {
  let mockQuestions: QuizQuestion[]
  let mockResults: ResultAnswer[]
  beforeEach(() => {
    mockQuestions = clone(quiz.questions)
    mockResults = clone(result.answers)
  })

  it('renders a ScoredQuestion for each given questions and results', () => {
    mockQuestions.push(clone(mockQuestions[0]))
    mockResults.push(clone(mockResults[0]))
    render(
      <ScoredQuestionList questions={mockQuestions} results={mockResults} />
    )
    expect(screen.queryAllByText(/Correct answer/)).toHaveLength(
      mockResults.length
    )
  })
})
