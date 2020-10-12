import {
  CLEAR_QUIZ,
  LOAD_QUIZ,
  LOAD_QUIZ_ERROR,
  POST_ANSWERS,
  POST_ANSWERS_ERROR,
  Quiz,
  QuizError
} from './types'

export function loadQuiz(quiz: Quiz) {
  return {
    type: LOAD_QUIZ,
    payload: quiz
  }
}
export function loadQuizError(error: QuizError) {
  return {
    type: LOAD_QUIZ_ERROR,
    payload: error
  }
}
export function postAnswers() {
  return {
    type: POST_ANSWERS
  }
}
export function postAnswersError(error: QuizError) {
  return {
    type: POST_ANSWERS_ERROR,
    payload: error
  }
}

export function clearQuiz() {
  return {
    type: CLEAR_QUIZ
  }
}
