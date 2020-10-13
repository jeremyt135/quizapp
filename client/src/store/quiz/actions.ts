import {
  CLEAR_QUIZ,
  LOAD_QUIZ,
  LOAD_QUIZ_ERROR,
  POST_ANSWERS,
  POST_ANSWERS_ERROR,
  Quiz,
  QuizActionTypes,
  QuizError
} from './types'

export function loadQuiz(quiz: Quiz): QuizActionTypes {
  return {
    type: LOAD_QUIZ,
    payload: quiz
  }
}
export function loadQuizError(error: QuizError): QuizActionTypes {
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
export function postAnswersError(error: QuizError): QuizActionTypes {
  return {
    type: POST_ANSWERS_ERROR,
    payload: error
  }
}

export function clearQuiz(): QuizActionTypes {
  return {
    type: CLEAR_QUIZ
  }
}
