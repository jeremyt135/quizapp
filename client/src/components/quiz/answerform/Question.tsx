import React, { useState } from 'react'
import Answer from './Answer'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import { FormAnswer } from 'api'

type Props = {
  index: number
  text: string
  answers: FormAnswer[]
  highlightMissing: boolean

  /**
   * Callback for when the answer choice for a question changes.
   */
  onChange: (answerIndex: number, questionIndex: number) => void
}

/**
 * Displays one Question from a quiz.
 */
const Question = ({
  index: questionIndex,
  text,
  answers,
  highlightMissing,
  onChange
}: Props) => {
  const [answerIndex, setAnswerIndex] = useState<number>()

  const selectAnswer = (index: number) => {
    setAnswerIndex(index)
    onChange(index, questionIndex)
  }
  return (
    <div className="row">
      <div className="col">
        <div className="row mb-2">
          <h2 className="col mb-0">
            {questionIndex + 1}. {text}{' '}
          </h2>
        </div>
        {answerIndex == null && highlightMissing ? (
          <div className="row mb-2">
            <div className="col d-flex align-items-center ">
              <h5 className="text-danger mb-0">Please select an answer. </h5>
              <Icon path={mdiAlertCircle} size={1} color="red" />
            </div>
          </div>
        ) : null}
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionIndex={questionIndex}
            index={index}
            text={answer.text}
            selected={answerIndex !== null && answerIndex === index}
            onChecked={() => selectAnswer(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Question
