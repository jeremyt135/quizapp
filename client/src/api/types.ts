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
