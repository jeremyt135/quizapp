import React from 'react'

// .env file includes with NODE_PATH
//@ts-ignore
import { render, screen } from 'test-utils'
import '@testing-library/jest-dom'

import App from './App'

describe('App', () => {
  const mockStore = {
    alerts: [],
    auth: { isAuthenticated: false }
  }
  it('renders without crashing', () => {
    render(<App />, mockStore)
  })
  it('starts up at landing page', () => {
    render(<App />, mockStore)
    expect(screen.getByText(/Assessing others/)).toBeInTheDocument()
  })
})
