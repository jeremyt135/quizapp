import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import { createMemoryHistory } from 'history'

import clone from 'clone'
import { result } from 'mocks/state'

import ResultItem from './ResultItem'
import { Result } from 'store/result/types'

describe('ResultItem', () => {
  let mockResult: Result
  beforeEach(() => {
    mockResult = clone(result!.result!)
  })
  it('renders the result headline with the username', () => {
    render(<ResultItem result={{ ...mockResult }} />)
    expect(screen.queryByText(`Results for ${mockResult.username}`))
  })
  it('renders the result score as a percentage', () => {
    render(<ResultItem result={{ ...mockResult }} />)
    expect(screen.queryByText(`Results for ${mockResult.score * 100.0}%`))
  })
  it('redirects to the result page when clicking the details button', () => {
    const history = createMemoryHistory()
    render(<ResultItem result={{ ...mockResult }} />, {}, history)
    const detailsBtn = screen.getByText('Details')
    fireEvent.click(detailsBtn)
    expect(history.location.pathname + history.location.search).toEqual(
      `/results?quiz=${mockResult.quiz}&user=${mockResult.user}`
    )
  })
})
