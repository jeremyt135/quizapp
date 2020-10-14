export type QuizError = { status: number; errors: any[] }
export type QuizAnswers = any
export type QuizId = string

export interface QuizAnswer {
  text: string
}

export interface QuizQuestion {
  text: string
  answers: QuizAnswer[]
}

export interface Quiz {
  _id: QuizId
  date: string
  user: string
  title: string
  expiration: string
  questions: QuizQuestion[]
}

export interface QuizState {
  loading: boolean
  quiz: Quiz | null
  error: QuizError | null
}

// User getting the quiz form to answer
export const LOAD_QUIZ = 'LOAD_ANSWER_FORM'
export const LOAD_QUIZ_ERROR = 'LOAD_ANSWER_FORM_ERROR'
// User submits answers to a quiz
export const POST_ANSWERS = 'POST_ANSWERS'
export const POST_ANSWERS_ERROR = 'POST_ANSWERS_ERROR'
export const CLEAR_QUIZ = 'CLEAR_QUIZ'

interface LoadQuizAction {
  type: typeof LOAD_QUIZ
  payload: Quiz
}

interface LoadQuizErrorAction {
  type: typeof LOAD_QUIZ_ERROR
  payload: QuizError
}

interface PostAnswersAction {
  type: typeof POST_ANSWERS
}

interface PostAnswersErrorAction {
  type: typeof POST_ANSWERS_ERROR
  payload: QuizError
}

interface ClearQuizAction {
  type: typeof CLEAR_QUIZ
}

export type QuizActionTypes =
  | LoadQuizAction
  | LoadQuizErrorAction
  | PostAnswersAction
  | PostAnswersErrorAction
  | ClearQuizAction
