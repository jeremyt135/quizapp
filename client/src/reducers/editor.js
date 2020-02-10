import { Editor } from '../actions/types'
import clone from 'clone'
import moment from 'moment'

class Expiration {
  date = moment()
    .add(1, 'day')
    .set('hours', 23)
    .set('minutes', 59)
    .toISOString()

  toString = () => this.date
}

class Question {
  text = ''
  correctAnswer = 0
  answers = []
}

class Answer {
  text = ''
}

class Quiz {
  title = ''
  isPublic = true
  allowedUsers = []
  expiresIn = new Expiration().toString()
  questions = []
}

class EditorState {
  quiz = new Quiz()
  loading = true
  editing = false
  error = null
}

const addAnswerToQuestion = (questions, questionIndex) =>
  questions.map((question, index) => {
    if (index === questionIndex) {
      return {
        ...question,
        answers: [...question.answers, new Answer()]
      }
    } else {
      return question
    }
  })
const removeAnswerFromQuestion = (questions, questionIndex, answerIndex) =>
  questions.map((question, index) => {
    if (index === questionIndex) {
      let correctAnswer = question.correctAnswer
      if (correctAnswer === answerIndex) {
        correctAnswer = Math.max(0, correctAnswer - 1)
      }
      return {
        ...question,
        correctAnswer,
        answers: question.answers.filter((_, i) => i !== answerIndex)
      }
    } else {
      return question
    }
  })

const changeQuestion = (questions, questionIndex, data) =>
  questions.map((question, index) => {
    if (index === questionIndex) {
      return {
        ...question,
        ...data
      }
    } else {
      return question
    }
  })

/**
 * Editor reducer
 * @param {quiz: object, loading: boolean, error: { status: number, errors: [object]}} state
 */
export const editor = (state = new EditorState(), action) => {
  switch (action.type) {
    case Editor.CREATE_QUIZ:
    case Editor.POST_EDITED_QUIZ:
      return {
        quiz: new Quiz(),
        loading: true,
        editing: false,
        error: null
      }
    case Editor.LOAD_QUIZ:
      return {
        quiz: action.data,
        loading: false,
        editing: true,
        error: null
      }
    case Editor.EDIT_QUIZ:
      return {
        ...state,
        loading: true,
        editing: true
      }
    case Editor.ADD_QUESTION: {
      const { questions, ...quiz } = state.quiz
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: [...questions, new Question()]
        }
      }
    }
    case Editor.REMOVE_QUESTION: {
      const { questions, ...quiz } = state.quiz
      const index = action.data
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: questions.filter((_, i) => i !== index)
        }
      }
    }
    case Editor.ADD_ANSWER: {
      const { questions, ...quiz } = state.quiz
      const questionIndex = action.data

      return {
        ...state,
        quiz: {
          ...quiz,
          questions: addAnswerToQuestion(questions, questionIndex)
        }
      }
    }
    case Editor.REMOVE_ANSWER: {
      const { questions, ...quiz } = state.quiz
      const { questionIndex, answerIndex } = action.data
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: removeAnswerFromQuestion(
            questions,
            questionIndex,
            answerIndex
          )
        }
      }
    }
    case Editor.CHANGE_TITLE: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          title: action.data
        }
      }
    }
    case Editor.CHANGE_PUBLIC: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          isPublic: action.data
        }
      }
    }
    case Editor.CHANGE_ALLOWED_USERS: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          allowedUsers: action.data
        }
      }
    }
    case Editor.CHANGE_EXPIRATION: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          expiresIn: action.data
        }
      }
    }
    case Editor.CHANGE_QUESTION: {
      const { questions, ...quiz } = state.quiz
      const { questionIndex, questionData } = action.data
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: changeQuestion(
            questions,
            questionIndex,
            clone(questionData)
          )
        }
      }
    }
    case Editor.CREATE_QUIZ_ERROR:
    case Editor.POST_EDITED_QUIZ_ERROR:
    case Editor.LOAD_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.data
      }
    case Editor.CLEAR_EDITOR:
      return new EditorState()
    default:
      return state
  }
}
