import { Quiz, QuizForm, QuizListing, Result, ResultListing } from 'api'
import moment from 'moment'
import { AuthState } from 'store/auth/types'
import { UserState } from 'store/user/types'

const now = moment().toISOString()
const expiration = moment(now).add(1, 'd').toISOString()

const id = (t: string, n: number) => `${t}-id-${n}`
const userid = (n: number) => id('user', n)
const quizid = (n: number) => id('quiz', n)
const resultid = (n: number) => id('result', n)

const username = (n: number) => `username-${n}`

export const auth: AuthState = {
  token: '',
  isAuthenticated: false
}
export const user: UserState = {
  loading: false,
  error: null,
  user: {
    _id: userid(0),
    date: now,
    username: username(0),
    email: 'email@email.com',
    quizzes: [quizid(0)],
    results: []
  }
}
export const quiz: QuizForm = {
  _id: quizid(0),
  date: now,
  user: username(0),
  title: 'quiz0',
  expiration: expiration,
  questions: [{ text: 'Q1', answers: [{ text: 'A1' }, { text: 'A2' }] }]
}
export const scoredQuiz: Quiz = {
  _id: quizid(0),
  date: now,
  user: username(0),
  title: 'quiz0',
  expiration: expiration,
  allowedUsers: [],
  isPublic: true,
  questions: [
    { text: 'Q1', correctAnswer: 0, answers: [{ text: 'A1' }, { text: 'A2' }] }
  ]
}
export const quizResults: ResultListing[] = [
  {
    _id: resultid(0),
    date: now,
    user: userid(1),
    quiz: quizid(0),
    quizTitle: 'quiz0',
    ownerUsername: username(0),
    score: 0,
    username: username(1)
  }
]

export const result: Result = {
  _id: resultid(0),
  date: now,
  user: userid(1),
  quiz: quizid(0),
  answers: [{ choice: 0, isCorrect: false, correctAnswer: 1 }],
  score: 0,
  quizTitle: 'quiz0',
  ownerUsername: username(0),
  username: username(1)
}

export const quizzes: QuizListing[] = [
  {
    _id: quizid(0),
    title: 'quiz0',
    date: now,
    expiration: expiration,
    questionCount: 1,
    resultsCount: 1,
    isPublic: true
  }
]
