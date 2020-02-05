import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a single answer with appropriate border
 * @param {object} props
 * @param {number} props.index Answer index
 * @param {string} props.text Answer text
 * @param {boolean} props.selected True if answer was selected
 * @param {boolean} props.correct True if answer is correct
 */
const Answer = ({ index, text, selected, correct }) => {
  let border = ''

  if (correct) {
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

Answer.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  correct: PropTypes.bool.isRequired
}

export default Answer
