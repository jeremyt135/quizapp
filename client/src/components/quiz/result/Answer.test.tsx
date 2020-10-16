import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import Answer from './Answer'

describe('Answer', () => {
  const props = {
    index: 0,
    text: 'Text',
    selected: false,
    correct: false
  }
  const queryByAnswerText = () => {
    return screen.queryByText(`${props.index + 1}. ${props.text}`)
  }
  it('renders the answer text', () => {
    render(<Answer {...props} />)
    expect(queryByAnswerText()).not.toBeNull()
  })
  it('does not display a border if it is not the user choice or correct', () => {
    render(<Answer {...props} />)
    expect(queryByAnswerText()?.classList).not.toContain('answer--correct')
    expect(queryByAnswerText()?.classList).not.toContain('answer--incorrect')
  })
  it('displays the answer--correct border on the correct answer', () => {
    render(<Answer {...props} correct={true} />)
    expect(queryByAnswerText()?.classList).toContain('answer--correct')
  })
  it('displays the answer--incorrect border on a selected and incorrect answer', () => {
    render(<Answer {...props} selected={true} />)
    expect(queryByAnswerText()?.classList).toContain('answer--incorrect')
  })
})
