export type QuizId = string

export interface Answer {
  _id?: string
  text: string
}

export interface Question {
  _id?: string
  text: string
  correctAnswer: number
  answers: Answer[]
}

export interface Quiz {
  _id?: QuizId
  title: string
  isPublic: boolean
  allowedUsers: string[]
  expiration: string
  questions: Question[]
}

export interface FormQuestion {
  text: string
  answers: Answer[]
}

export interface QuizForm {
  _id: QuizId
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

export interface ResultListing {
  _id: string
  date: string
  user: string
  quiz: string
  quizOwner: string
  score: number
  username: string
}

export interface ResultAnswer {
  choice: number
  isCorrect: boolean
  correctAnswer: number
}

export interface Result {
  _id: string
  date: string
  user: string
  quiz: string
  quizOwner: string
  answers: ResultAnswer[]
  score: number
  quizTitle: string
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
