import moment from 'moment'
import { AuthState } from 'store/auth/types'
import { DashboardState } from 'store/dashboard/types'
import { EditorState } from 'store/editor/types'
import { QuizState } from 'store/quiz/types'
import { ResultListingsState } from 'store/quizresults/types'
import { ResultState } from 'store/result/types'
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
    quizzes: [],
    results: []
  }
}
export const quiz: QuizState = {
  loading: false,
  error: null,
  quiz: {
    _id: quizid(0),
    date: now,
    user: username(0),
    title: 'quiz0',
    expiration: expiration,
    questions: [{ text: 'Q1', answers: [{ text: 'A1' }, { text: 'A2' }] }]
  }
}

export const quizResults: ResultListingsState = {
  loading: false,
  error: null,
  results: [
    {
      _id: resultid(0),
      date: now,
      user: userid(1),
      quiz: quizid(0),
      quizOwner: username(0),
      score: 0,
      username: username(1)
    }
  ]
}
export const result: ResultState = {
  loading: false,
  error: null,
  result: {
    _id: resultid(0),
    date: now,
    user: userid(1),
    quiz: quizid(0),
    quizOwner: userid(0),
    answers: [{ choice: 0, isCorrect: false, correctAnswer: 1 }],
    score: 0,
    quizTitle: 'quiz0',
    ownerUsername: username(0),
    username: username(1)
  }
}

export const dashboard: DashboardState = {
  loading: false,
  quizzes: [
    {
      _id: quizid(0),
      title: 'quiz0',
      expiration: expiration,
      questionCount: 1,
      resultsCount: 1
    }
  ],
  results: [
    {
      _id: resultid(0),
      date: now,
      user: userid(1),
      quiz: quizid(0),
      quizOwner: username(0),
      score: 0,
      username: username(1)
    }
  ],
  error: null
}

export const editor: EditorState = {
  loading: true,
  editing: false,
  error: null,
  quiz: {
    title: '',
    isPublic: true,
    allowedUsers: [],
    expiration: moment()
      .add(1, 'd')
      .hours(23)
      .minutes(59)
      .seconds(0)
      .toISOString(),
    questions: []
  }
}
