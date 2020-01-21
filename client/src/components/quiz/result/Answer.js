import React from 'react'

const Answer = ({ index, text, selected, correct }) => {
  let border = ''

  if (correct || (selected && correct)) {
    border = 'answer--correct'
  } else if (selected) {
    border = 'answer--incorrect'
  }
  return (
    <div className={'row mb-2 answer ' + border}>
      <div className='col'>
        <p>
          {index + 1}. {text}
        </p>
      </div>
    </div>
  )
}

export default Answer
