import React, { memo } from 'react'

type Props = {
  value: number
}

const CorrectAnswerDisplay = ({ value }: Props) => {
  return (
    <>
      <div className="row mb-0">
        <div className="col">
          <h6 className="px-2 mb-0">Correct Answer: {value}</h6>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <small className="px-2 text-muted">
            Click an answer's radio box to change the correct answer
          </small>
        </div>
      </div>
    </>
  )
}

export default memo(CorrectAnswerDisplay)
