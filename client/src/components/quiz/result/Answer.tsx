import React from 'react'

type Props = {
  index: number
  text: string
  selected: boolean
  correct: boolean
}

/**
 * Displays a single answer with appropriate border
 */
const Answer = ({ index, text, selected, correct }: Props) => {
  let border = ''

  if (correct) {
    border = 'answer--correct'
  } else if (selected) {
    border = 'answer--incorrect'
  }
  return (
    <div className="row mb-2">
      <div className="col">
        <p className={'answer answer__text py-1 ' + border}>
          {index + 1}. {text}
        </p>
      </div>
    </div>
  )
}

export default Answer
