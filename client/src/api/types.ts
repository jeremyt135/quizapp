export type ID = string

export interface Answer {
  _id?: ID
  text: string
}

export interface Question {
  _id?: ID
  text: string
  correctAnswer: number
  answers: Answer[]
}

export interface Quiz {
  _id?: ID
  date: string
  title: string
  user?: string
  allowedUsers: string[]
  questions: Question[]
  results?: Result[]
  isPublic: boolean
  expiration: string
}

export interface QuizListing {
  _id?: ID
  date: string
  title: string
  user?: string
  isPublic: boolean
  expiration: string
  resultsCount: number
  questionCount: number
}

export interface FormResponse {
  choice?: number
}

export type FormAnswer = Answer

export interface FormQuestion {
  text: string
  answers: FormAnswer[]
}

export interface QuizForm {
  _id: ID
  date: string
  user: string
  title: string
  expiration: string
  questions: FormQuestion[]
}

export type QuizFormat = 'full' | 'form'
export type QuizType<FormatType> = FormatType extends 'full'
  ? Quiz
  : FormatType extends 'form'
  ? QuizForm
  : never

export type QuizListFormat = 'full' | 'listing'
export type QuizListType<FormatType> = FormatType extends 'full'
  ? Quiz[]
  : FormatType extends 'listing'
  ? QuizListing[]
  : never

export interface ResultListing {
  _id: ID
  date: string
  user: string
  quiz: string
  quizTitle: string
  score: number
  ownerUsername: string
  username: string
}

export interface ResultAnswer {
  choice: number
  isCorrect: boolean
  correctAnswer?: number
}

export interface Result {
  _id: ID
  date: string
  user: string
  quiz: string
  quizTitle: string
  answers: ResultAnswer[]
  score: number
  ownerUsername: string
  username: string
}

export type ResultFormat = 'full' | 'listing'
export type SingleResultType<FormatType> = FormatType extends 'full'
  ? Result
  : FormatType extends 'listing'
  ? ResultListing
  : never

export type ResultListType<FormatType> = FormatType extends 'full'
  ? Result[]
  : FormatType extends 'listing'
  ? ResultListing[]
  : never
