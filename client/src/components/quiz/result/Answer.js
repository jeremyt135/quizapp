import React from 'react'

const Answer = ({ index, text, selected, correct }) => {
  let border = ''

  if (correct || (selected && correct)) {
    border = 'answer--correct'
  } else if (selected) {
    border = 'answer--incorrect'
  }
  return (
    <div className='row mb-2'>
      <div className='col'>
        <p className={'answer answer__text py-1 ' + border}>
          {index + 1}. {text}
        </p>
      </div>
    </div>
  )
}

export default Answer
