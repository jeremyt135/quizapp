import React from 'react'

import ScoredQuestion from './ScoredQuestion'

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

export default ScoredQuestionList
