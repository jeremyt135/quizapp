import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { createMemoryHistory } from 'history'
import clone from 'clone'

import { ResultListing } from 'api'
import { quizResults } from 'mocks/state'

import ResultItem from './ResultItem'

describe('ResultItem', () => {
  let result: ResultListing

  beforeEach(() => {
    result = clone(quizResults[0])
  })

  it('renders without crashing', () => {
    render(<ResultItem result={result} />)
  })

  it('renders the quiz title and creator', () => {
    render(<ResultItem result={result} />)
    expect(screen.queryByText(result.quizTitle)).not.toBeNull()
    expect(screen.queryByText(RegExp(`${result.ownerUsername}`))).not.toBeNull()
  })

  it('renders the quiz score as a percentage', () => {
    render(<ResultItem result={result} />)
    expect(
      screen.queryByText(RegExp(`${result.score * 100.0}%`))
    ).not.toBeNull()
  })

  it('redirects to the results page when clicking details button', () => {
    const history = createMemoryHistory()
    render(<ResultItem result={result} />, {}, history)
    const detailBtn = screen.getByText(/details/i)
    fireEvent.click(detailBtn)
    expect(history.location.pathname + history.location.search).toBe(
      `/results?quiz=${result.quiz}&user=${result.user}`
    )
  })
})
