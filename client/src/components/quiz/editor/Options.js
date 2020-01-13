import React from 'react'
import PropTypes from 'prop-types'

import DateTimePicker from './DateTimePicker'

import PublicCheckbox from './PublicCheckbox'
import AllowedUsers from './AllowedUsers'

/**
 * Displays and controls editing of quiz options.
 */
const Options = ({ defaultOptions, setQuizData }) => {
  return (
    <>
      <PublicCheckbox
        defaultValue={defaultOptions.isPublic}
        setQuizData={setQuizData}
      />
      <AllowedUsers setQuizData={setQuizData} />
      <DateTimePicker
        label={'Expires on'}
        defaultValue={defaultOptions.expiresIn}
        minValue={new Date().toISOString()}
        setQuizData={setQuizData}
      />
    </>
  )
}

Options.propTypes = {
  defaultOptions: PropTypes.object.isRequired,
  setQuizData: PropTypes.func.isRequired
}

export default Options
