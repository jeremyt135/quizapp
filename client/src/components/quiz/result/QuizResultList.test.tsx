import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import { mocked } from 'ts-jest/utils'

jest.mock('hooks/usequiz')
import { useQuiz } from 'hooks/usequiz'

jest.mock('hooks/useresult')
import { useResultList } from 'hooks/useresult'

import { Quiz, ResultListing } from 'api'

import QuizResultList from './QuizResultList'
import moment from 'moment'

describe('QuizResultList', () => {
  const mockUseQuiz = mocked(useQuiz)
  const mockUseResultList = mocked(useResultList)
  const mockQuiz: Quiz = {
    _id: 'quizid0',
    title: 'My Quiz',
    isPublic: true,
    allowedUsers: [],
    expiration: moment().add(1, 'd').toISOString(),
    questions: []
  }
  const mockResults: ResultListing[] = [
    {
      _id: 'resultid0',
      date: moment().toISOString(),
      user: 'userid1',
      quiz: 'quizid0',
      quizOwner: 'userid0',
      score: 0,
      username: 'foobar'
    }
  ]
  it('renders witout crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseResultList.mockReturnValueOnce([mockResults, undefined, false])
    render(<QuizResultList />)
  })

  it('renders a spinner if quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([undefined, undefined, true])
    mockUseResultList.mockReturnValueOnce([mockResults, undefined, false])
    render(<QuizResultList />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if results are loading', () => {
    mockUseResultList.mockReturnValueOnce([undefined, undefined, true])
    mockUseQuiz.mockReturnValueOnce([undefined, undefined, true])
    render(<QuizResultList />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders an error page if quiz has an error', () => {
    mockUseQuiz.mockReturnValueOnce([
      undefined,
      { status: 404, errors: [] },
      false
    ])
    mockUseResultList.mockReturnValueOnce([mockResults, undefined, false])
    render(<QuizResultList />)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('renders an error page if results has an error', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseResultList.mockReturnValueOnce([
      undefined,
      { status: 404, errors: [] },
      false
    ])
    render(<QuizResultList />)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('displays the quiz title headline', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseResultList.mockReturnValueOnce([mockResults, undefined, false])
    render(<QuizResultList />)
    expect(screen.queryByText(RegExp(`${mockQuiz.title}`))).not.toBeNull()
  })

  it('displays a message if nobody has responded to the quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseResultList.mockReturnValueOnce([[], undefined, false])
    render(<QuizResultList />)
    expect(screen.queryByText(/nobody has responded/i)).not.toBeNull()
  })

  it('should render a ResultItem for each result', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseResultList.mockReturnValueOnce([mockResults, undefined, false])
    render(<QuizResultList />)
    expect(screen.queryAllByText(/details/i)).toHaveLength(mockResults.length)
  })
})
