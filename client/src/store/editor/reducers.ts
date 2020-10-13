import clone from 'clone'
import moment from 'moment'
import {
  ADD_ANSWER,
  ADD_QUESTION,
  CHANGE_ALLOWED_USERS,
  CHANGE_EXPIRATION,
  CHANGE_PUBLIC,
  CHANGE_QUESTION,
  CHANGE_TITLE,
  CLEAR_EDITOR,
  CREATE_QUIZ,
  CREATE_QUIZ_ERROR,
  EditorActionTypes,
  EditorState,
  EDIT_QUIZ,
  LOAD_QUIZ,
  LOAD_QUIZ_ERROR,
  POST_EDITED_QUIZ,
  POST_EDITED_QUIZ_ERROR,
  QuestionAnswer,
  Quiz,
  QuizQuestion,
  REMOVE_ANSWER,
  REMOVE_QUESTION
} from './types'

class Expiration {
  date = moment()
    .add(1, 'day')
    .hours(23)
    .minutes(59)
    .seconds(0)
    .milliseconds(0)
    .toISOString()

  toString = () => this.date
}

function createQuiz(): Quiz {
  return {
    title: '',
    isPublic: true,
    allowedUsers: [],
    expiration: new Expiration().toString(),
    questions: []
  }
}
function createQuestion(): QuizQuestion {
  return {
    text: '',
    correctAnswer: 0,
    answers: []
  }
}

function createEditorState(): EditorState {
  return {
    loading: true,
    editing: false,
    error: null,
    quiz: createQuiz()
  }
}

const addAnswerToQuestion = (
  questions: QuizQuestion[],
  questionIndex: number
) =>
  questions.map((question, index) => {
    if (index === questionIndex) {
      return {
        ...question,
        answers: [...question.answers, { text: '' }]
      }
    } else {
      return question
    }
  })
const removeAnswerFromQuestion = (
  questions: QuizQuestion[],
  questionIndex: number,
  answerIndex: number
) =>
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

const changeQuestion = (
  questions: QuizQuestion[],
  questionIndex: number,
  data: { text?: string; correctAnswer?: number; answers?: QuestionAnswer[] }
) =>
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

export const editorReducer = (
  state: EditorState = createEditorState(),
  action: EditorActionTypes
) => {
  switch (action.type) {
    case CREATE_QUIZ:
    case POST_EDITED_QUIZ:
      return {
        quiz: createQuiz(),
        loading: true,
        editing: false,
        error: null
      }
    case LOAD_QUIZ:
      return {
        quiz: action.payload,
        loading: false,
        editing: true,
        error: null
      }
    case EDIT_QUIZ:
      return {
        ...state,
        loading: true,
        editing: true
      }
    case ADD_QUESTION: {
      const { questions, ...quiz } = state.quiz
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: [...questions, createQuestion()]
        }
      }
    }
    case REMOVE_QUESTION: {
      const { questions, ...quiz } = state.quiz
      const index = action.payload
      return {
        ...state,
        quiz: {
          ...quiz,
          questions: questions.filter((_, i) => i !== index)
        }
      }
    }
    case ADD_ANSWER: {
      const { questions, ...quiz } = state.quiz
      const questionIndex = action.payload

      return {
        ...state,
        quiz: {
          ...quiz,
          questions: addAnswerToQuestion(questions, questionIndex)
        }
      }
    }
    case REMOVE_ANSWER: {
      const { questions, ...quiz } = state.quiz
      const { questionIndex, answerIndex } = action.payload
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
    case CHANGE_TITLE: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          title: action.payload
        }
      }
    }
    case CHANGE_PUBLIC: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          isPublic: action.payload
        }
      }
    }
    case CHANGE_ALLOWED_USERS: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          allowedUsers: action.payload
        }
      }
    }
    case CHANGE_EXPIRATION: {
      const { quiz, ...prev } = state
      return {
        ...prev,
        quiz: {
          ...quiz,
          expiration: action.payload
        }
      }
    }
    case CHANGE_QUESTION: {
      const { questions, ...quiz } = state.quiz
      const { questionIndex, questionData } = action.payload
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
    case CREATE_QUIZ_ERROR:
    case POST_EDITED_QUIZ_ERROR:
    case LOAD_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_EDITOR:
      return createEditorState()
    default:
      return state
  }
}
