import React from 'react'

// .env file includes with NODE_PATH
//@ts-ignore
import '@testing-library/jest-dom'
import { render, screen, within } from 'util/test-utils'
import AlertBar from './AlertBar'

describe('AlertBar', () => {
  it('renders without crashing', () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: false
      }
    }
    render(<AlertBar />, mockStore)
    expect(screen.getByTestId('alertbar')).toBeInTheDocument()
  })
  it('renders outstanding alerts', () => {
    const mockStore = {
      alerts: [
        {
          id: 'alert1',
          msg: 'This is alert1',
          type: 'success'
        },
        {
          id: 'alert2',
          msg: 'This is alert2',
          type: 'success'
        }
      ],
      auth: {
        token: '',
        isAuthenticated: false
      }
    }
    render(<AlertBar />, mockStore)

    const bar = screen.getByTestId('alertbar')
    expect(bar.children.length).toEqual(mockStore.alerts.length)
    for (let i = 0; i < bar.children.length; ++i) {
      const alert = mockStore.alerts[i]
      const child = within(bar.children[i] as HTMLElement).getByText(alert.msg)
      expect(child).toBeDefined()
      expect(child.classList).toContain(`alert-${alert.type}`)
    }
  })
})
