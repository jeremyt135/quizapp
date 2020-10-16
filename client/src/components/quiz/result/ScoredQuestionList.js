import React from 'react'
import ScoredQuestion from './ScoredQuestion'
import PropTypes from 'prop-types'

/**
 * Displays a list of scored questions
 * @param {object} props
 * @param {Array<{ text: string, answers: Array<{ text: string }> }>} props.questions List of questions
 * @param {Array<{ choice: number, correctAnswer?: number, isCorrect: boolean}>} props.results List of results
 */
const ScoredQuestionList = ({ questions, results }) => {
  return (
    <>
      {Array.from({ length: questions.length }, (_, index) => {
        const question = questions[index]
        const result = results[index]
        return (
          <ScoredQuestion
            key={index}
            index={index}
            text={question.text}
            answers={question.answers}
            result={result}
          />
        )
      })}
    </>
  )
}

ScoredQuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired
}

export default ScoredQuestionList
