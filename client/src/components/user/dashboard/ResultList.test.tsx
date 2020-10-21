import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'

import { quizResults } from 'mocks/state'
import { ResultListing } from 'api'

import ResultList from './ResultList'

describe('ResultList', () => {
  let mockState: { results: ResultListing[]; loading: boolean }
  beforeEach(() => {
    mockState = { results: clone(quizResults), loading: false }
  })

  const renderList = () => {
    render(
      <ResultList
        loading={mockState.loading}
        results={mockState.results ?? []}
      />
    )
  }

  it('renders without crashing', () => {
    renderList()
  })

  it('renders a spinner if state is loading', () => {
    mockState.loading = true
    renderList()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('should display a message if no results are made', () => {
    mockState.results = []
    renderList()
    expect(screen.queryByText(/you haven't taken any quizzes/i)).not.toBeNull()
  })

  it('should render whatever results are availble', () => {
    mockState.results?.push({
      ...clone(mockState.results[0])
    })
    renderList()
    expect(screen.queryAllByText(/Score:/).length).toEqual(
      mockState.results!.length
    )
  })
})
