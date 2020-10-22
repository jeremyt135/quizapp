import async from 'async'

import ResultRepository from '../repositories/result'
import Result from '../models/result'

export default class ResultService {
  constructor(private resultRepository: ResultRepository) {
    this.resultRepository = resultRepository
  }

  async getResult(resultId) {
    const result = await this.resultRepository.findById(resultId)
    return result
  }

  async deleteResult(resultId) {
    await this.resultRepository.delete(resultId)
  }

  async getUserResultForQuiz(userId, quizId) {
    const result = await this.resultRepository.findByUserAndQuizId(
      userId,
      quizId
    )
    return result
  }

  async createResult(
    answers: any[],
    userId: any,
    quiz: any
  ): Promise<[string, any[]]> {
    const errors = []

    if (!quiz.allowMultipleResponses) {
      const duplicateResult: any = await async.some(
        quiz.results,
        async (resultId: string) => {
          console.log('in async')
          const result = await this.resultRepository.findById(resultId)
          console.log('got result', result)
          console.log(result && result.user.toString() === userId)
          return result && result.user.toString() === userId
        }
      )
      if (duplicateResult) {
        errors.push('duplicate')
        return [null, errors]
      }
    }

    const questions = quiz.questions
    if (answers.length !== questions.length) {
      errors.push('answers')
      return [null, errors]
    }

    let score = 0
    for (let i = 0; i < questions.length; ++i) {
      const question = questions[i]
      const answer = answers[i]

      if (answer.choice >= question.answers.length) {
        errors.push(`answer ${i + 1}`)
      } else {
        const correctAnswer = question.correctAnswer
        answer.isCorrect = correctAnswer === answer.choice
        if (answer.isCorrect) {
          score += 1 / answers.length
        }
        if (quiz.showCorrectAnswers) {
          answer.correctAnswer = correctAnswer
        }
      }
    }
    let result: Result | any = {}
    if (errors.length === 0) {
      result = await this.resultRepository.insert(
        new Result(userId, quiz._id, quiz.user, answers, score)
      )
    }

    return [result._id, errors]
  }
}