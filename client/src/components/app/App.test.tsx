import React from 'react'

import { render, screen } from 'util/test-utils'
import '@testing-library/jest-dom'

import App from './App'

describe('App', () => {
  const mockStore = {
    alerts: [],
    auth: { token: '', isAuthenticated: false }
  }
  it('renders without crashing', () => {
    render(<App />, mockStore)
  })
  it('starts up at landing page', () => {
    render(<App />, mockStore)
    expect(screen.getByText(/Assessing others/)).toBeInTheDocument()
  })
})
